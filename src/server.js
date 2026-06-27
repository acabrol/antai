const http = require("http");
const path = require("path");
const fs = require("fs/promises");
const crypto = require("crypto");
const { spawn } = require("child_process");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 3100);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");
const DATA_DIR = path.join(PROJECT_ROOT, "data");
const APP_DIR = path.join(DATA_DIR, "app");
const USERS_DIR = path.join(APP_DIR, "users");
const SIGHTINGS_DIR = path.join(APP_DIR, "sightings");
const CONNECTORS_DIR = path.join(APP_DIR, "connectors");
const SPECIES_DIR = path.join(DATA_DIR, "species");
const NEWS_DIR = path.join(DATA_DIR, "news");
const NEWS_INDEX_FILE = path.join(NEWS_DIR, "index.md");
const NEWS_CACHE_DIR = path.join(NEWS_DIR, "cache");
const NEWS_CACHE_FILE = path.join(NEWS_CACHE_DIR, "articles.json");
const PROJECTS_DIR = path.join(DATA_DIR, "projects");
const PASSWD_FILE = path.join(USERS_DIR, "passwd");
const CONNECTORS_FILE = path.join(CONNECTORS_DIR, "settings.md");

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8"
};

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

function notFound(res) {
  sendJson(res, 404, { error: "Not found" });
}

function sanitizeSlug(text) {
  return (text || "unnamed")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "") || "unnamed";
}

function sha1Htpasswd(password) {
  return `{SHA}${crypto.createHash("sha1").update(password || "").digest("base64")}`;
}

function parseScalarValue(value) {
  if ((value.startsWith("[") && value.endsWith("]")) || (value.startsWith("{") && value.endsWith("}"))) {
    try {
      return JSON.parse(value);
    } catch (err) {
      // Keep raw string if JSON parsing fails.
    }
  }
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null") return null;
  if (value !== "" && !Number.isNaN(Number(value))) return Number(value);
  return value;
}

function parseFrontMatter(text) {
  const result = { metadata: {}, content: "" };
  if (!text) return result;
  const lines = text.split("\n");
  if (lines[0] && lines[0].trim() === "---") {
    let i = 1;
    const yamlLines = [];
    while (i < lines.length && lines[i].trim() !== "---") {
      yamlLines.push(lines[i]);
      i += 1;
    }

    let inBlock = false;
    let blockKey = "";
    let blockLines = [];

    yamlLines.forEach(line => {
      if (inBlock) {
        if (line.startsWith("  ")) {
          blockLines.push(line.slice(2));
          return;
        }
        result.metadata[blockKey] = blockLines.join("\n");
        inBlock = false;
        blockKey = "";
        blockLines = [];
      }

      const idx = line.indexOf(":");
      if (idx === -1) return;
      const key = line.slice(0, idx).trim();
      let value = line.slice(idx + 1).trim();
      if (value === "|") {
        inBlock = true;
        blockKey = key;
        return;
      }
      if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      result.metadata[key] = parseScalarValue(value);
    });

    if (inBlock && blockKey) {
      result.metadata[blockKey] = blockLines.join("\n");
    }

    result.content = lines.slice(i + 1).join("\n").trim();
  } else {
    result.content = text.trim();
  }
  return result;
}

function stringifyFrontMatter(metadata, content = "") {
  let yaml = "---\n";
  Object.entries(metadata)
    .filter(([key, value]) => key !== "id" && !key.startsWith("_") && value !== undefined && value !== null)
    .forEach(([key, value]) => {
      if (typeof value === "string" && value.includes("\n")) {
        yaml += `${key}: |\n${value.split("\n").map(line => `  ${line}`).join("\n")}\n`;
      } else if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
        yaml += `${key}: ${JSON.stringify(value)}\n`;
      } else {
        yaml += `${key}: ${value}\n`;
      }
    });
  yaml += "---\n";
  if (content) {
    yaml += `\n${content.trim()}\n`;
  }
  return yaml;
}

async function handleCliProxy(req, res) {
  const { agent, prompt } = await parseJsonBody(req);
  if (!prompt) {
    sendJson(res, 400, { error: "Prompt is required." });
    return;
  }

  res.writeHead(200, {
    "Content-Type": "text/plain",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive"
  });

  let command = agent || "agy";
  let args = [];

  if (command === "codex") {
    args = ["exec", "-a", "never", prompt];
  } else if (command === "claude") {
    args = ["--print", "--permission-mode", "dontAsk", prompt];
  } else {
    command = "agy";
    args = ["--print", "--dangerously-skip-permissions", prompt];
  }

  const child = spawn(command, args, { cwd: PROJECT_ROOT, shell: true });

  child.stdout.pipe(res, { end: false });
  child.stderr.pipe(res, { end: false });

  child.on("error", (err) => {
    res.write(`\nError: ${err.message}\n`);
  });

  child.on("close", (code) => {
    res.end(`\n\n[Agent finished with code ${code}]`);
  });
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function readJsonFile(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch (err) {
    return fallback;
  }
}

async function readPasswd() {
  try {
    const text = await fs.readFile(PASSWD_FILE, "utf8");
    const store = {};
    text.split("\n").forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const idx = trimmed.indexOf(":");
      if (idx === -1) return;
      store[trimmed.slice(0, idx)] = trimmed.slice(idx + 1);
    });
    return store;
  } catch (err) {
    if (err.code === "ENOENT") return {};
    throw err;
  }
}

async function writePasswd(store) {
  await ensureDir(USERS_DIR);
  const text = Object.entries(store).map(([username, hash]) => `${username}:${hash}`).join("\n");
  await fs.writeFile(PASSWD_FILE, text ? `${text}\n` : "", "utf8");
}

async function readMarkdownRecord(filePath, extra = {}) {
  const parsed = parseFrontMatter(await fs.readFile(filePath, "utf8"));
  const item = { ...parsed.metadata, ...extra };
  if (parsed.content) {
    item.notes = parsed.content;
    item.desc = parsed.content;
  }
  return item;
}

async function listMarkdownFiles(dirPath, extraFactory = () => ({})) {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const items = [];
    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
      const filePath = path.join(dirPath, entry.name);
      items.push(await readMarkdownRecord(filePath, { _fileName: entry.name, ...extraFactory(entry.name) }));
    }
    return items;
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function readSpeciesIndexEntries() {
  const indexPath = path.join(SPECIES_DIR, "index.md");
  try {
    const parsed = parseFrontMatter(await fs.readFile(indexPath, "utf8"));
    return parsed.content
      .split("\n")
      .map(line => line.trim())
      .map(line => {
        const markdownLink = line.match(/^-\s*\[([^\]]+)\]\(([^)]+)\)/);
        if (markdownLink) {
          return {
            name: markdownLink[1].trim(),
            id: sanitizeSlug(path.basename(markdownLink[2], ".md"))
          };
        }
        const plain = line.match(/^-\s+(.+)$/);
        if (!plain) return null;
        const name = plain[1].replace(/\s+-\s+.+$/, "").trim();
        return { name, id: sanitizeSlug(name) };
      })
      .filter(Boolean);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function loadSpeciesList() {
  const indexEntries = await readSpeciesIndexEntries();
  const species = [];
  for (const entry of indexEntries) {
    const fileName = `${entry.id}.md`;
    let item = { id: entry.id, name: entry.name, _fileName: fileName };
    try {
      item = {
        ...item,
        ...await readMarkdownRecord(path.join(SPECIES_DIR, fileName), {
          id: entry.id,
          _fileName: fileName
        })
      };
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }
    item.id = item.id || entry.id;
    item.name = item.name || item.scientificName || entry.name;
    species.push(item);
  }
  return species.sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
}

function decodeXmlEntities(text) {
  return String(text || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .trim();
}

function stripHtml(text) {
  return decodeXmlEntities(text).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getXmlTag(block, tagName) {
  const escaped = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = block.match(new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`, "i"));
  return match ? decodeXmlEntities(match[1]) : "";
}

function getXmlLink(block) {
  const atom = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*>/i);
  if (atom) return decodeXmlEntities(atom[1]);
  return getXmlTag(block, "link");
}

function parseFeedItems(xml, feed) {
  const text = String(xml || "");
  const channelTitle = stripHtml(getXmlTag(text, "title")) || feed.title || feed.url;
  const rssBlocks = Array.from(text.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)).map(match => match[1]);
  const atomBlocks = Array.from(text.matchAll(/<entry(?:\s[^>]*)?>([\s\S]*?)<\/entry>/gi)).map(match => match[1]);
  const blocks = rssBlocks.length ? rssBlocks : atomBlocks;

  return blocks.map((block, index) => {
    const title = stripHtml(getXmlTag(block, "title")) || "Untitled article";
    const link = getXmlLink(block);
    const summary = stripHtml(getXmlTag(block, "description") || getXmlTag(block, "summary") || getXmlTag(block, "content:encoded") || getXmlTag(block, "content"));
    const dateValue = getXmlTag(block, "pubDate") || getXmlTag(block, "published") || getXmlTag(block, "updated") || "";
    const parsedDate = dateValue ? new Date(dateValue) : null;
    const date = parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : "";
    const guid = getXmlTag(block, "guid") || getXmlTag(block, "id") || link || `${feed.url}#${index}`;
    return {
      id: crypto.createHash("sha1").update(`${feed.url}:${guid}`).digest("hex"),
      title,
      summary: summary || "No summary provided by this RSS feed.",
      content: summary || "",
      url: link,
      date,
      category: channelTitle,
      feedTitle: channelTitle,
      feedUrl: feed.url
    };
  });
}

function getHtmlTitle(html) {
  return stripHtml((String(html || "").match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "");
}

function extractReadableArticle(html) {
  let text = String(html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");
  const article = text.match(/<article[\s\S]*?<\/article>/i);
  const main = text.match(/<main[\s\S]*?<\/main>/i);
  if (article) {
    text = article[0];
  } else if (main) {
    text = main[0];
  } else {
    const body = text.match(/<body[\s\S]*?<\/body>/i);
    if (body) text = body[0];
  }
  return stripHtml(text);
}

async function fetchArticleContent(article) {
  if (!article || !article.url || !/^https?:\/\//i.test(article.url)) return article;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(article.url, {
      signal: controller.signal,
      headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "User-Agent": "Antai local RSS cache"
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const contentType = response.headers.get("content-type") || "";
    const raw = await response.text();
    const fullText = contentType.includes("html") ? extractReadableArticle(raw) : stripHtml(raw);
    return {
      ...article,
      fullTitle: getHtmlTitle(raw) || article.title,
      fullContent: fullText || article.content || article.summary,
      fullContentFetchedAt: new Date().toISOString(),
      fullContentStatus: "ok"
    };
  } catch (err) {
    return {
      ...article,
      fullContent: article.content || article.summary || "",
      fullContentFetchedAt: new Date().toISOString(),
      fullContentStatus: "failed",
      fullContentError: err.message
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function loadNewsFeeds() {
  try {
    const parsed = parseFrontMatter(await fs.readFile(NEWS_INDEX_FILE, "utf8"));
    return parsed.content.split("\n").map(line => {
      const trimmed = line.trim();
      const link = trimmed.match(/^-\s*\[([^\]]+)\]\(([^)]+)\)/);
      if (link) return { title: link[1].trim(), url: link[2].trim() };
      const plain = trimmed.match(/^-\s+(https?:\/\/\S+)/i);
      if (plain) return { title: "", url: plain[1].trim() };
      return null;
    }).filter(feed => feed && /^https?:\/\//i.test(feed.url));
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function saveNewsFeeds(feeds) {
  await ensureDir(NEWS_DIR);
  const cleanFeeds = (Array.isArray(feeds) ? feeds : [])
    .map(feed => ({
      title: String(feed.title || "").trim(),
      url: String(feed.url || "").trim()
    }))
    .filter(feed => /^https?:\/\//i.test(feed.url));
  const lines = [
    "# News RSS Feeds",
    "",
    "Articles shown in the news page are downloaded from the feeds listed below, in this order.",
    "",
    ...cleanFeeds.map(feed => feed.title ? `- [${feed.title}](${feed.url})` : `- ${feed.url}`)
  ];
  await fs.writeFile(NEWS_INDEX_FILE, stringifyFrontMatter({ title: "News RSS Feeds" }, lines.join("\n")), "utf8");
  return cleanFeeds;
}

async function loadCachedNews() {
  return readJsonFile(NEWS_CACHE_FILE, { feeds: [], articles: [], refreshedAt: null, errors: [] });
}

async function refreshNewsFromFeeds() {
  const feeds = await loadNewsFeeds();
  const cached = await loadCachedNews();
  const feedUrls = new Set(feeds.map(feed => feed.url));
  const cachedForCurrentFeeds = (cached.articles || []).filter(article => feedUrls.has(article.feedUrl));
  const articles = [];
  const errors = [];

  for (const feed of feeds) {
    try {
      const response = await fetch(feed.url, {
        headers: {
          "Accept": "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
          "User-Agent": "Antai local RSS cache"
        }
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const xml = await response.text();
      const feedArticles = parseFeedItems(xml, feed);
      if (!feedArticles.length) {
        throw new Error("No RSS or Atom items found in feed response.");
      }
      for (const article of feedArticles) {
        articles.push(await fetchArticleContent(article));
      }
    } catch (err) {
      errors.push({ url: feed.url, message: err.message });
    }
  }

  const deduped = Array.from(new Map(articles.map(article => [article.id, article])).values())
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  const payload = {
    feeds,
    articles: deduped.length ? deduped : cachedForCurrentFeeds,
    refreshedAt: new Date().toISOString(),
    errors,
    fromCache: !deduped.length
  };
  await ensureDir(NEWS_CACHE_DIR);
  await fs.writeFile(NEWS_CACHE_FILE, JSON.stringify(payload, null, 2), "utf8");
  return payload;
}

function getSlugNameForRecord(collection, item) {
  if (collection === "colonies") return sanitizeSlug(item.name || "colony");
  if (collection === "events") {
    const type = item.type || "event";
    const date = item.dateTime ? item.dateTime.slice(0, 10) : new Date().toISOString().slice(0, 10);
    return sanitizeSlug(`${type}-${date}`);
  }
  if (collection === "reminders") return sanitizeSlug(item.title || "reminder");
  if (collection === "maps") return sanitizeSlug(item.name || "map");
  if (collection === "zones") return sanitizeSlug(item.name || "zone");
  if (collection === "rules") return sanitizeSlug(`rule-${item.trigger || "automation"}`);
  if (collection === "sightings") return sanitizeSlug(`${item.species || "sighting"}-${item.location || "loc"}`);
  if (collection === "users") return sanitizeSlug(item.username || "user");
  return sanitizeSlug(item.uuid || item.id || "record");
}

function getColonyIdForRecord(state, collection, item) {
  if (collection === "colonies") return item.uuid || item.id;
  if (item.colonyId) return item.colonyId;
  if (item.mapId) {
    const map = state.maps.find(entry => entry.id === item.mapId);
    if (map) return map.colonyId;
  }
  if (item.zoneId) {
    const zone = state.zones.find(entry => entry.id === item.zoneId);
    if (zone) {
      const map = state.maps.find(entry => entry.id === zone.mapId);
      if (map) return map.colonyId;
    }
  }
  return null;
}

function getProjectSlugForRecord(state, collection, item) {
  let projectId = item.projectId;
  if (!projectId && collection !== "projects") {
    if (collection === "colonies") {
      projectId = item.projectId;
    } else {
      const colonyId = getColonyIdForRecord(state, collection, item);
      const colony = state.colonies.find(entry => entry.id === colonyId);
      if (colony) projectId = colony.projectId;
    }
  }
  const project = state.projects.find(entry => entry.uuid === projectId);
  if (project && project._slug) return project._slug;
  if (project && project.name) return sanitizeSlug(project.name);
  return "default-project";
}

async function uniqueDirectoryName(baseDir, baseName) {
  let name = baseName;
  let count = 0;
  while (true) {
    try {
      await fs.access(path.join(baseDir, name));
      count += 1;
      name = `${baseName}-${count}`;
    } catch (err) {
      return name;
    }
  }
}

async function uniqueFileName(baseDir, baseSlug) {
  let name = `${baseSlug}.md`;
  let count = 0;
  while (true) {
    try {
      await fs.access(path.join(baseDir, name));
      count += 1;
      name = `${baseSlug}-${count}.md`;
    } catch (err) {
      return name;
    }
  }
}

function getRecordPathParts(collection, item, projectSlug, colonyFolder) {
  if (collection === "users") return ["app", "users"];
  if (collection === "sightings") return ["app", "sightings"];
  if (collection === "projects") return ["projects", item._slug || projectSlug];
  if (collection === "colonies") return ["projects", projectSlug, colonyFolder];
  const subfolderMap = {
    events: "events",
    reminders: "reminders",
    maps: "maps",
    zones: "zones",
    rules: "rules"
  };
  return ["projects", projectSlug, colonyFolder, subfolderMap[collection] || "others"];
}

function getExtensionFromMimeType(mimeType) {
  const normalized = String(mimeType || "").toLowerCase();
  if (normalized === "image/jpeg") return ".jpg";
  if (normalized === "image/png") return ".png";
  if (normalized === "image/webp") return ".webp";
  if (normalized === "image/gif") return ".gif";
  if (normalized === "image/svg+xml") return ".svg";
  return ".bin";
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      "Accept": "application/json",
      "User-Agent": "Antai local species cache"
    }
  });
  if (!response.ok) {
    throw new Error(`GBIF request failed with HTTP ${response.status}`);
  }
  return response.json();
}

function buildGbifSpeciesBody(data) {
  const lines = [
    `# ${data.name}`,
    "",
    data.summary || "No public GBIF species description is currently available for this species.",
    "",
    "## Taxonomy",
    "",
    `- Kingdom: ${data.kingdom || "Unknown"}`,
    `- Phylum: ${data.phylum || "Unknown"}`,
    `- Class: ${data.class || "Unknown"}`,
    `- Order: ${data.order || "Unknown"}`,
    `- Family: ${data.family || "Unknown"}`,
    `- Genus: ${data.genus || "Unknown"}`,
    `- Scientific name: ${data.scientificName || data.name}`,
    `- Authorship: ${data.authorship || "Unknown"}`,
    `- Taxonomic status: ${data.taxonomicStatus || "Unknown"}`,
    "",
    "## Occurrence",
    "",
    `- Occurrence records: ${data.occurrenceCount || 0}`,
    `- Countries: ${Array.isArray(data.topCountries) && data.topCountries.length ? data.topCountries.join(", ") : "Not available"}`,
    `- Habitats: ${Array.isArray(data.habitats) && data.habitats.length ? data.habitats.join(", ") : "Not specified"}`,
    "",
    "## Source",
    "",
    `- GBIF species record: ${data.sourceUrl}`,
    data.antwebUrl ? `- AntWeb page: ${data.antwebUrl}` : ""
  ];
  return lines.filter(line => line !== "").join("\n");
}

function getAntWebSpeciesUrl(name) {
  const parts = String(name || "").trim().split(/\s+/);
  if (parts.length < 2) return "https://www.antweb.org/";
  return `https://www.antweb.org/description.do?genus=${encodeURIComponent(parts[0].toLowerCase())}&species=${encodeURIComponent(parts.slice(1).join(" ").toLowerCase())}&rank=species`;
}

async function refreshSpeciesSheetFromGbif(speciesName) {
  const requestedName = String(speciesName || "").trim();
  if (!requestedName) return null;
  await ensureDir(SPECIES_DIR);

  const match = await fetchJson(`https://api.gbif.org/v1/species/match?kingdom=Animalia&family=Formicidae&name=${encodeURIComponent(requestedName)}`);
  const usageKey = match.usageKey || match.speciesKey;
  if (!usageKey) {
    throw new Error(`No GBIF species match found for ${requestedName}`);
  }

  const [detail, descriptions, vernaculars, occurrences] = await Promise.all([
    fetchJson(`https://api.gbif.org/v1/species/${usageKey}`),
    fetchJson(`https://api.gbif.org/v1/species/${usageKey}/descriptions`),
    fetchJson(`https://api.gbif.org/v1/species/${usageKey}/vernacularNames`),
    fetchJson(`https://api.gbif.org/v1/occurrence/search?taxon_key=${usageKey}&limit=0&facet=country&facetLimit=12`)
  ]);

  const canonicalName = detail.canonicalName || match.canonicalName || requestedName;
  const id = sanitizeSlug(canonicalName);
  const description = Array.isArray(descriptions.results)
    ? descriptions.results.map(item => stripHtml(item.description)).find(Boolean)
    : "";
  const vernacularResults = Array.isArray(vernaculars.results) ? vernaculars.results : [];
  const englishVernaculars = vernacularResults
    .filter(item => String(item.language || "").toLowerCase().startsWith("eng"))
    .map(item => item.vernacularName)
    .filter(Boolean);
  const allVernaculars = vernacularResults.map(item => item.vernacularName).filter(Boolean);
  const vernacularNames = Array.from(new Set([...englishVernaculars, ...allVernaculars])).slice(0, 12);
  const countryFacet = Array.isArray(occurrences.facets)
    ? occurrences.facets.find(item => item.field === "COUNTRY" || item.field === "country")
    : null;
  const topCountries = countryFacet && Array.isArray(countryFacet.counts)
    ? countryFacet.counts.slice(0, 12).map(item => item.name || item.value).filter(Boolean)
    : [];

  const data = {
    id,
    name: canonicalName,
    scientificName: detail.scientificName || match.scientificName || canonicalName,
    canonicalName,
    commonName: vernacularNames[0] || "",
    vernacularNames,
    authorship: detail.authorship || match.authorship || "",
    taxonomicStatus: detail.taxonomicStatus || match.status || "",
    rank: detail.rank || match.rank || "SPECIES",
    kingdom: detail.kingdom || "Animalia",
    phylum: detail.phylum || "Arthropoda",
    class: detail.class || "Insecta",
    order: detail.order || "Hymenoptera",
    family: detail.family || "Formicidae",
    genus: detail.genus || canonicalName.split(/\s+/)[0],
    parent: detail.parent || "",
    extinct: Boolean(detail.extinct),
    habitats: detail.habitats || [],
    nomenclaturalStatus: detail.nomenclaturalStatus || [],
    threatStatuses: detail.threatStatuses || [],
    occurrenceCount: occurrences.count || detail.numOccurrences || 0,
    topCountries,
    summary: description || "",
    gbifKey: usageKey,
    gbifDatasetKey: detail.datasetKey || "",
    taxonID: detail.taxonID || `gbif:${usageKey}`,
    sourceName: "GBIF species API",
    sourceUrl: `https://www.gbif.org/species/${usageKey}`,
    sourceApiUrl: `https://api.gbif.org/v1/species/${usageKey}`,
    antwebUrl: getAntWebSpeciesUrl(canonicalName),
    gbifUpdatedAt: new Date().toISOString()
  };

  await fs.writeFile(path.join(SPECIES_DIR, `${id}.md`), stringifyFrontMatter(data, buildGbifSpeciesBody(data)), "utf8");
  return data;
}

function parseDataUrl(dataUrl) {
  const value = String(dataUrl || "");
  const match = value.match(/^data:([^;,]+);base64,(.+)$/);
  if (!match) return null;
  return {
    mimeType: match[1],
    buffer: Buffer.from(match[2], "base64")
  };
}

async function uniqueAssetName(baseDir, baseSlug, ext) {
  let name = `${baseSlug}${ext}`;
  let count = 0;
  while (true) {
    try {
      await fs.access(path.join(baseDir, name));
      count += 1;
      name = `${baseSlug}-${count}${ext}`;
    } catch (err) {
      return name;
    }
  }
}

async function persistColonyPhotoAsset(dataUrl, projectSlug, colonyFolder, baseSlug) {
  const parsed = parseDataUrl(dataUrl);
  if (!parsed) return dataUrl;

  const photosDir = path.join(PROJECTS_DIR, projectSlug, colonyFolder, "photos");
  await ensureDir(photosDir);
  const ext = getExtensionFromMimeType(parsed.mimeType);
  const fileName = await uniqueAssetName(photosDir, baseSlug, ext);
  await fs.writeFile(path.join(photosDir, fileName), parsed.buffer);
  return `/data/projects/${projectSlug}/${colonyFolder}/photos/${fileName}`;
}

async function materializeColonyPhotos(savedItem, projectSlug) {
  if (!savedItem || !savedItem._colonyFolder) return savedItem;

  const photoEntries = Array.isArray(savedItem.customPhotos) ? savedItem.customPhotos : [];
  const dataUrlMap = new Map();
  const persistedPhotos = [];

  for (let index = 0; index < photoEntries.length; index += 1) {
    const entry = photoEntries[index];
    if (typeof entry === "string" && entry.startsWith("data:")) {
      const persistedPath = await persistColonyPhotoAsset(
        entry,
        projectSlug,
        savedItem._colonyFolder,
        sanitizeSlug(`${savedItem.name || "colony"}-photo-${index + 1}`)
      );
      dataUrlMap.set(entry, persistedPath);
      persistedPhotos.push(persistedPath);
    } else {
      persistedPhotos.push(entry);
    }
  }

  if (typeof savedItem.photo === "string" && savedItem.photo.startsWith("data:")) {
    savedItem.photo = dataUrlMap.get(savedItem.photo)
      || await persistColonyPhotoAsset(
        savedItem.photo,
        projectSlug,
        savedItem._colonyFolder,
        sanitizeSlug(`${savedItem.name || "colony"}-cover`)
      );
  }

  savedItem.customPhotos = persistedPhotos;
  return savedItem;
}

function getNormalizedGalleryItems(savedItem) {
  const galleryItems = Array.isArray(savedItem && savedItem.galleryItems) ? savedItem.galleryItems : [];
  const normalized = galleryItems
    .map((item, index) => {
      const itemPath = String(item && (item.path || item.src || "")).trim();
      if (!itemPath) return null;
      const fallbackTitle = decodeURIComponent(itemPath.split("/").pop() || `Photo ${index + 1}`);
      return {
        path: itemPath,
        title: String(item.title || fallbackTitle).trim() || fallbackTitle,
        description: String(item.description || "").trim()
      };
    })
    .filter(Boolean);

  const legacyPaths = Array.isArray(savedItem && savedItem.customPhotos) ? savedItem.customPhotos : [];
  legacyPaths.forEach((itemPath, index) => {
    const pathValue = String(itemPath || "").trim();
    if (!pathValue || normalized.some(item => item.path === pathValue)) return;
    normalized.push({
      path: pathValue,
      title: decodeURIComponent(pathValue.split("/").pop() || `Photo ${index + 1}`),
      description: ""
    });
  });

  return normalized;
}

function toGalleryMarkdownImagePath(itemPath) {
  const value = String(itemPath || "").trim();
  if (!value) return "";
  const marker = "/photos/";
  const markerIndex = value.indexOf(marker);
  if (markerIndex !== -1) {
    return `./photos/${value.slice(markerIndex + marker.length)}`;
  }
  if (value.startsWith("./") || value.startsWith("../")) return value;
  return value;
}

async function writeColonyGalleryFile(savedItem, projectSlug) {
  if (!savedItem || !savedItem._colonyFolder) return;
  const galleryItems = getNormalizedGalleryItems(savedItem);
  savedItem.galleryItems = galleryItems;
  savedItem.customPhotos = galleryItems.map(item => item.path);

  const galleryPath = path.join(PROJECTS_DIR, projectSlug, savedItem._colonyFolder, "gallery.md");
  const lines = [
    `# ${savedItem.name || "Colony"} Gallery`,
    "",
    `Profile photo: ${savedItem.photo || "None"}`,
    ""
  ];

  if (!galleryItems.length) {
    lines.push("No gallery pictures saved yet.", "");
  } else {
    galleryItems.forEach((item, index) => {
      lines.push(`## ${index + 1}. ${item.title}`);
      lines.push("");
      if (item.description) {
        lines.push(item.description, "");
      }
      lines.push(`![${item.title}](${toGalleryMarkdownImagePath(item.path)})`, "");
    });
  }

  await fs.writeFile(galleryPath, `${lines.join("\n").trim()}\n`, "utf8");
}

async function loadBootstrapData() {
  await ensureDir(USERS_DIR);
  const users = await listMarkdownFiles(USERS_DIR);
  const settingsParsed = parseFrontMatter(await fs.readFile(CONNECTORS_FILE, "utf8").catch(() => "---\n---\n"));
  const speciesList = await loadSpeciesList();
  const newsCache = await loadCachedNews();
  const newsFeeds = await loadNewsFeeds();
  const newsList = newsCache.articles || [];
  const sightings = (await listMarkdownFiles(SIGHTINGS_DIR))
    .map(item => ({ ...item, id: item.uuid }));

  const projects = [];
  const colonies = [];
  const events = [];
  const reminders = [];
  const maps = [];
  const zones = [];
  const automationRules = [];

  try {
    const projectEntries = await fs.readdir(PROJECTS_DIR, { withFileTypes: true });
    for (const projectEntry of projectEntries) {
      if (!projectEntry.isDirectory()) continue;
      const projectSlug = projectEntry.name;
      const projectDir = path.join(PROJECTS_DIR, projectSlug);
      const projectPath = path.join(projectDir, "project.md");
      let project = null;
      try {
        project = await readMarkdownRecord(projectPath, { _slug: projectSlug, _fileName: "project.md" });
      } catch (err) {
        continue;
      }
      projects.push(project);

      const colonyEntries = await fs.readdir(projectDir, { withFileTypes: true });
      for (const colonyEntry of colonyEntries) {
        if (!colonyEntry.isDirectory()) continue;
        const colonyFolder = colonyEntry.name;
        const colonyDir = path.join(projectDir, colonyFolder);
        const colonyPath = path.join(colonyDir, "colony.md");
        try {
          const colony = await readMarkdownRecord(colonyPath, {
            _fileName: "colony.md",
            _colonyFolder: colonyFolder
          });
          colony.id = colony.uuid;
          colony.projectId = colony.projectId || project.uuid;
          colonies.push(colony);
        } catch (err) {
          continue;
        }

        const subfolders = [
          ["events", events],
          ["reminders", reminders],
          ["maps", maps],
          ["zones", zones],
          ["rules", automationRules]
        ];

        for (const [subfolder, target] of subfolders) {
          const dirPath = path.join(colonyDir, subfolder);
          const items = await listMarkdownFiles(dirPath, fileName => ({
            _colonyFolder: colonyFolder,
            _fileName: fileName,
            projectId: project.uuid
          }));
          items.forEach(item => {
            item.id = item.uuid;
            target.push(item);
          });
        }
      }
    }
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }

  return {
    users,
    projects,
    colonies,
    events,
    reminders,
    sightings,
    maps,
    zones,
    automationRules,
    apiKeys: settingsParsed.metadata.geminiApiKey ? { gemini: settingsParsed.metadata.geminiApiKey } : {},
    speciesList,
    newsFeeds,
    newsList
  };
}

function publicUser(user) {
  const clean = { ...user };
  delete clean._fileName;
  return clean;
}

async function parseJsonBody(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
  }
  return raw ? JSON.parse(raw) : {};
}

async function parseRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

async function findUserByEmail(email) {
  const state = await loadBootstrapData();
  const normalizedEmail = String(email || "").trim().toLowerCase();
  return state.users.find(user => user.email && user.email.toLowerCase() === normalizedEmail) || null;
}

async function findUserByUsername(username) {
  const state = await loadBootstrapData();
  const normalizedUsername = String(username || "").trim().toLowerCase();
  return state.users.find(user => user.username && user.username.toLowerCase() === normalizedUsername) || null;
}

async function findUserByLogin(login) {
  const state = await loadBootstrapData();
  const normalizedLogin = String(login || "").trim().toLowerCase();
  return state.users.find(user =>
    (user.email && user.email.toLowerCase() === normalizedLogin) ||
    (user.username && user.username.toLowerCase() === normalizedLogin)
  ) || null;
}

async function saveUserRecord(user) {
  await ensureDir(USERS_DIR);
  const safeUser = { ...user };
  if (!safeUser._fileName) {
    const baseSlug = sanitizeSlug(safeUser.username || safeUser.email.split("@")[0]);
    safeUser._fileName = await uniqueFileName(USERS_DIR, baseSlug);
  }
  const content = stringifyFrontMatter(safeUser, safeUser.notes || safeUser.desc || "");
  await fs.writeFile(path.join(USERS_DIR, safeUser._fileName), content, "utf8");
  return safeUser;
}

async function handleBootstrap(res) {
  sendJson(res, 200, await loadBootstrapData());
}

async function handleRegister(req, res) {
  const { username, email, password, newsletter } = await parseJsonBody(req);
  if (!username || !email || !password) {
    sendJson(res, 400, { error: "Username, email, and password are required." });
    return;
  }
  const normalizedUsername = username.trim();
  const normalizedEmail = email.trim();
  const existingUser = await findUserByEmail(normalizedEmail);
  if (existingUser) {
    sendJson(res, 409, { error: "An account already exists for that email." });
    return;
  }
  const existingUsername = await findUserByUsername(normalizedUsername);
  if (existingUsername) {
    sendJson(res, 409, { error: "That username is already in use." });
    return;
  }

  const user = await saveUserRecord({
    uuid: crypto.randomUUID(),
    username: normalizedUsername,
    email: normalizedEmail,
    newsletter: Boolean(newsletter),
    haConnected: false,
    jeedomConnected: false,
    domoticzConnected: false
  });

  const passwd = await readPasswd();
  passwd[normalizedEmail] = sha1Htpasswd(password);
  await writePasswd(passwd);
  sendJson(res, 201, publicUser(user));
}

async function handleLogin(req, res) {
  const { login, email, password } = await parseJsonBody(req);
  const loginId = String(login || email || "").trim();
  if (!loginId || !password) {
    sendJson(res, 400, { error: "Email or username and password are required." });
    return;
  }
  const user = await findUserByLogin(loginId);
  if (!user) {
    sendJson(res, 401, { error: "Invalid email, username, or password." });
    return;
  }
  const passwd = await readPasswd();
  if (passwd[user.email] !== sha1Htpasswd(password)) {
    sendJson(res, 401, { error: "Invalid email, username, or password." });
    return;
  }
  sendJson(res, 200, publicUser(user));
}

async function handleProfileUpdate(req, res) {
  const { user, oldEmail } = await parseJsonBody(req);
  if (!user || !user.email || !user.uuid) {
    sendJson(res, 400, { error: "User payload is required." });
    return;
  }

  const state = await loadBootstrapData();
  const current = state.users.find(entry => entry.uuid === user.uuid);
  const merged = { ...(current || {}), ...user };
  const saved = await saveUserRecord(merged);

  if (oldEmail && oldEmail !== saved.email) {
    const passwd = await readPasswd();
    if (passwd[oldEmail]) {
      passwd[saved.email] = passwd[oldEmail];
      delete passwd[oldEmail];
      await writePasswd(passwd);
    }
  }

  sendJson(res, 200, publicUser(saved));
}

async function handleGeminiSettings(req, res) {
  const { geminiApiKey } = await parseJsonBody(req);
  await ensureDir(CONNECTORS_DIR);
  await fs.writeFile(CONNECTORS_FILE, stringifyFrontMatter({ geminiApiKey: geminiApiKey || "" }), "utf8");
  sendJson(res, 200, { ok: true });
}

async function handleWriteRecord(req, res) {
  const { collection, item } = await parseJsonBody(req);
  if (!collection || !item) {
    sendJson(res, 400, { error: "Collection and item are required." });
    return;
  }

  const state = await loadBootstrapData();
  const savedItem = { ...item };

  if (collection === "projects") {
    let slug = savedItem._slug || sanitizeSlug(savedItem.name || "unnamed-project");
    const dirPath = path.join(PROJECTS_DIR, slug);
    if (!savedItem._slug) {
      slug = await uniqueDirectoryName(PROJECTS_DIR, slug);
    }
    savedItem._slug = slug;
    savedItem._fileName = "project.md";
    await ensureDir(dirPath);
    await fs.writeFile(path.join(dirPath, "project.md"), stringifyFrontMatter(savedItem), "utf8");
    sendJson(res, 200, savedItem);
    return;
  }

  const projectSlug = getProjectSlugForRecord(state, collection, savedItem);

  if (collection === "colonies" && !savedItem._colonyFolder) {
    await ensureDir(path.join(PROJECTS_DIR, projectSlug));
    savedItem._colonyFolder = await uniqueDirectoryName(
      path.join(PROJECTS_DIR, projectSlug),
      getSlugNameForRecord("colonies", savedItem)
    );
    savedItem._fileName = "colony.md";
  }

  if (collection !== "users" && collection !== "sightings" && collection !== "colonies" && !savedItem._colonyFolder) {
    const colonyId = getColonyIdForRecord(state, collection, savedItem);
    const colony = state.colonies.find(entry => entry.id === colonyId || entry.uuid === colonyId);
    savedItem._colonyFolder = colony && colony._colonyFolder ? colony._colonyFolder : sanitizeSlug(colonyId || "unknown-colony");
  }

  const pathParts = getRecordPathParts(collection, savedItem, projectSlug, savedItem._colonyFolder);
  const absoluteDir = path.join(DATA_DIR, ...pathParts);
  await ensureDir(absoluteDir);

  if (collection === "colonies") {
    await materializeColonyPhotos(savedItem, projectSlug);
    if (savedItem.species) {
      try {
        await refreshSpeciesSheetFromGbif(savedItem.species);
      } catch (err) {
        console.warn(`Species refresh failed for ${savedItem.species}:`, err.message);
      }
    }
  }

  if (!savedItem._fileName) {
    savedItem._fileName = await uniqueFileName(absoluteDir, getSlugNameForRecord(collection, savedItem));
  }

  const content = collection === "sightings" || collection === "users" || collection === "colonies" || collection === "events" || collection === "reminders" || collection === "maps" || collection === "zones" || collection === "rules"
    ? stringifyFrontMatter(savedItem, savedItem.notes || savedItem.desc || "")
    : stringifyFrontMatter(savedItem);
  await fs.writeFile(path.join(absoluteDir, savedItem._fileName), content, "utf8");
  if (collection === "colonies") {
    await writeColonyGalleryFile(savedItem, projectSlug);
  }
  sendJson(res, 200, savedItem);
}

async function handleSpeciesRefresh(req, res) {
  const { speciesName, id } = await parseJsonBody(req);
  let name = String(speciesName || "").trim();
  if (!name && id) {
    const speciesList = await loadSpeciesList();
    const match = speciesList.find(item => item.id === id);
    name = match ? match.name : "";
  }
  if (!name) {
    sendJson(res, 400, { error: "Species name is required." });
    return;
  }
  const species = await refreshSpeciesSheetFromGbif(name);
  sendJson(res, 200, species);
}

async function handleNewsFeeds(req, res) {
  if (req.method === "GET") {
    sendJson(res, 200, { feeds: await loadNewsFeeds() });
    return;
  }
  const { feeds } = await parseJsonBody(req);
  const savedFeeds = await saveNewsFeeds(feeds || []);
  sendJson(res, 200, { feeds: savedFeeds });
}

async function handleNewsRefresh(res) {
  const payload = await refreshNewsFromFeeds();
  sendJson(res, 200, payload);
}

async function handleUploadColonyPhoto(req, res, colonyId, url) {
  if (!colonyId) {
    sendJson(res, 400, { error: "Colony id is required." });
    return;
  }

  const state = await loadBootstrapData();
  const colony = state.colonies.find(entry => entry.id === colonyId || entry.uuid === colonyId);
  if (!colony || !colony._colonyFolder) {
    sendJson(res, 404, { error: "Colony not found." });
    return;
  }

  const body = await parseRawBody(req);
  if (!body.length) {
    sendJson(res, 400, { error: "Photo body is empty." });
    return;
  }

  const projectSlug = getProjectSlugForRecord(state, "colonies", colony);
  const photosDir = path.join(PROJECTS_DIR, projectSlug, colony._colonyFolder, "photos");
  await ensureDir(photosDir);

  const fileType = String(req.headers["x-file-type"] || req.headers["content-type"] || "").toLowerCase();
  const rawFileName = decodeURIComponent(String(req.headers["x-file-name"] || url.searchParams.get("filename") || "photo"));
  const originalExt = path.extname(rawFileName).toLowerCase();
  const ext = originalExt || getExtensionFromMimeType(fileType);
  const baseName = path.basename(rawFileName, originalExt || path.extname(rawFileName));
  const fileName = await uniqueAssetName(photosDir, sanitizeSlug(baseName || `${colony.name || "colony"}-photo`), ext || ".bin");
  await fs.writeFile(path.join(photosDir, fileName), body);

  sendJson(res, 200, {
    path: `/data/projects/${projectSlug}/${colony._colonyFolder}/photos/${fileName}`,
    fileName
  });
}

async function handleDeleteRecord(req, res) {
  const { collection, itemId, record } = await parseJsonBody(req);
  if (!collection || !itemId) {
    sendJson(res, 400, { error: "Collection and itemId are required." });
    return;
  }

  const state = await loadBootstrapData();
  const source = record || {};
  let fileName = source._fileName || `${itemId}.md`;
  let colonyFolder = source._colonyFolder || "unknown-colony";
  const projectSlug = getProjectSlugForRecord(state, collection, source);

  if (collection !== "users" && collection !== "sightings" && collection !== "colonies" && !source._colonyFolder) {
    const colonyId = getColonyIdForRecord(state, collection, source);
    const colony = state.colonies.find(entry => entry.id === colonyId || entry.uuid === colonyId);
    if (colony && colony._colonyFolder) {
      colonyFolder = colony._colonyFolder;
    }
  }

  const pathParts = collection === "projects"
    ? ["projects", source._slug || sanitizeSlug(itemId)]
    : getRecordPathParts(collection, source, projectSlug, colonyFolder);

  const targetPath = collection === "projects"
    ? path.join(DATA_DIR, ...pathParts, "project.md")
    : path.join(DATA_DIR, ...pathParts, fileName);

  try {
    await fs.unlink(targetPath);
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }

  sendJson(res, 200, { ok: true });
}

async function serveStatic(res, pathname) {
  const target = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const isDataRequest = target.startsWith("data/");
  const baseDir = isDataRequest ? PROJECT_ROOT : PUBLIC_DIR;
  const resolved = path.normalize(path.join(baseDir, target));
  if (!resolved.startsWith(baseDir)) {
    notFound(res);
    return;
  }

  try {
    const stat = await fs.stat(resolved);
    const filePath = stat.isDirectory() ? path.join(resolved, "index.html") : resolved;
    const body = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": CONTENT_TYPES[ext] || "application/octet-stream",
      "Content-Length": body.length
    });
    res.end(body);
  } catch (err) {
    notFound(res);
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`);

    if (req.method === "GET" && url.pathname === "/api/health") {
      sendJson(res, 200, { ok: true });
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/bootstrap") {
      await handleBootstrap(res);
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/auth/register") {
      await handleRegister(req, res);
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/auth/login") {
      await handleLogin(req, res);
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/profile") {
      await handleProfileUpdate(req, res);
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/settings/gemini") {
      await handleGeminiSettings(req, res);
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/data/write") {
      await handleWriteRecord(req, res);
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/species/refresh") {
      await handleSpeciesRefresh(req, res);
      return;
    }
    if ((req.method === "GET" || req.method === "POST") && url.pathname === "/api/news/feeds") {
      await handleNewsFeeds(req, res);
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/news/refresh") {
      await handleNewsRefresh(res);
      return;
    }
    if (req.method === "POST" && url.pathname.startsWith("/api/colonies/") && url.pathname.endsWith("/photos")) {
      const parts = url.pathname.split("/");
      const colonyId = parts[3] || "";
      await handleUploadColonyPhoto(req, res, colonyId, url);
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/data/delete") {
      await handleDeleteRecord(req, res);
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/cli") {
      await handleCliProxy(req, res);
      return;
    }

    await serveStatic(res, url.pathname);
  } catch (err) {
    console.error(err);
    sendJson(res, 500, { error: "Internal server error" });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Antai server listening at http://${HOST}:${PORT}`);
});
