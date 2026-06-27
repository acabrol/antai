/**
 * Antai — Single Page Application (SPA) Logic
 * Written in Pure Vanilla JavaScript.
 */

// --- Data Models and Seeding ---
const DEFAULT_SPECIES = [
  {
    id: "lasius-niger",
    name: "Lasius niger",
    commonName: "Common Black Garden Ant",
    origin: "Europe, Asia",
    founding: "Claustral (Queen founds colony alone without feeding)",
    tempRange: "18°C - 24°C",
    humRange: "50% - 60%",
    diet: "Sugars (honey, sugar water, sweet fruits), Proteins (flies, mosquitoes, mealworms)",
    temperament: "Docile and easily frightened at first, but highly active and aggressive in large numbers.",
    growth: "Fast. Eggs hatch to workers in ~4-6 weeks under warm conditions.",
    notes: "Excellent beginner species. Highly resilient to mistakes and fast-growing. Requires hibernation from November to March."
  },
  {
    id: "messor-barbarus",
    name: "Messor barbarus",
    commonName: "Red-headed Harvester Ant",
    origin: "Mediterranean Europe & North Africa",
    founding: "Claustral (Queen founds colony alone)",
    tempRange: "22°C - 28°C",
    humRange: "30% - 50% (dry nest zones needed)",
    diet: "Granivorous (grass seeds, chia, dandelion, millet, bird seed mix), occasional protein (crickets, mealworms)",
    temperament: "Generally calm, easily stressed by vibrations, minors are timid, majors are defensive.",
    growth: "Moderate. Requires patience in the first year, accelerates once majors emerge.",
    notes: "Fascinating harvester species showing polymorphism (distinct minor, media, and major worker castes). Needs a humidity gradient: dry chambers for seed storage ('ant bread'), humid chambers for brood."
  },
  {
    id: "camponotus-vagus",
    name: "Camponotus vagus",
    commonName: "Giant Black Carpenter Ant",
    origin: "Europe, Central Asia",
    founding: "Claustral",
    tempRange: "22°C - 28°C (requires heated zone)",
    humRange: "40% - 50%",
    diet: "Sugars (honey-water, agave nectar), Proteins (insects like crickets, roaches, flies)",
    temperament: "Bold, highly active, aggressive when disturbed, strong bite and sprays formic acid.",
    growth: "Slow to Moderate. First-year growth is small, but larvae grow large.",
    notes: "One of the largest European species. Prefers wood nests (cork, rotting logs) or dry gypsum nests with a water reservoir. Nest wood must not be kept overly damp."
  },
  {
    id: "atta-sexdens",
    name: "Atta sexdens",
    commonName: "Leafcutter Ant",
    origin: "Central & South America",
    founding: "Claustral (Queen carries fungus pellet from mother nest)",
    tempRange: "24°C - 27°C (Strict)",
    humRange: "80% - 90% (Strict for fungus growth)",
    diet: "Fresh leaves (bramble, oak, rose petals, citrus leaves), flowers, oatmeal",
    temperament: "Highly organized, defensive, soldiers will bite and cut skin.",
    growth: "Very Fast. Can grow to millions of workers within 3-4 years.",
    notes: "Advanced species. They do not eat leaves directly; they chew them to cultivate a specialized fungus garden which is their sole food. Requires a complex multi-chamber setup and strict environmental control."
  }
];

const DEFAULT_NEWS = [
  {
    id: "news-1",
    title: "Founding Queens: The Critical First 3 Months",
    summary: "How to avoid the most common mistakes during the claustral founding stage in test tube setups.",
    content: "The founding stage is the most vulnerable period for a new ant colony. A newly mated queen has a single goal: rear her first generation of workers (minors) using only her body's fat reserves and wing muscle energy. To support her:\n\n1. Keep her in complete dark. Wrap the test tube in foil or cardboard.\n2. Limit inspections to once every 2 weeks. Vibrations and light scare the queen, causing her to eat her own eggs.\n3. Do not feed. Claustral queens do not need food until workers emerge. Adding food only causes mold growth.\n4. Ensure humidity. The water chamber behind the cotton plug must be clean and not leaking.",
    date: "2026-06-20",
    category: "Husbandry Guide"
  },
  {
    id: "news-2",
    title: "Understanding Hibernation (Diapause) Requirements",
    summary: "Why temperate species need a cold rest, and how to safely winter your colonies.",
    content: "For temperate ant species like Lasius niger or Messor barbarus, hibernation (diapause) is a biological necessity triggered by seasonal changes. Without it, the queen's egg-laying rate drops, worker lifespan decreases, and the colony eventually collapses.\n\nKey steps for successful diapause:\n- Prepare in Autumn: Gradually lower temperatures. Stop feeding proteins; feed sugars.\n- Cooling: Keep colonies between 5°C and 10°C. Mini-fridges, cellars, or insulated garages work well.\n- Water Check: Ensure the water reservoir does not dry out. Dry air kills ants faster than cold temperatures.\n- Duration: Maintain diapause for 3 to 4 months (usually November to March). Do not disturb them during this time.",
    date: "2026-05-15",
    category: "Seasonal Advice"
  },
  {
    id: "news-3",
    title: "Formicarium Hydration Systems Compared",
    summary: "An in-depth look at Gypsum, Ytong, Acrylic, and 3D Printed Nest humidification.",
    content: "Hydration is the single most important aspect of formicarium design. Ants require high relative humidity to breathe through their spiracles and prevent eggs and larvae from drying out. Here is how the materials compare:\n\n- Ytong (Autoclaved Aerated Concrete): Excellent water absorption and capillary pull. Easy to create gradients, but holds mold easily if not ventilated.\n- Gypsum (Plaster): Very natural feel, retains moisture well, resists mold slightly better than Ytong, but can be chewed through by leafcutters or harvester species.\n- Acrylic Nests: Zero absorption. Relies on water chambers underneath steel mesh. Very clean and escape-proof, but harder to establish a fine humidity gradient.\n- 3D Printed (PLA/PETG): Combined with plaster or sponge reservoirs. Offers complete structural freedom and easy modular expansions.",
    date: "2026-04-10",
    category: "Equipment Review"
  }
];

function generateUUID() {
  if (typeof self !== 'undefined' && self.crypto && typeof self.crypto.randomUUID === 'function') {
    return self.crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function parseScalarFrontMatterValue(value) {
  if ((value.startsWith("[") && value.endsWith("]")) || (value.startsWith("{") && value.endsWith("}"))) {
    try {
      return JSON.parse(value);
    } catch (err) {
      // Fall through to raw string handling.
    }
  }
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null") return null;
  if (!isNaN(value) && value !== "") return Number(value);
  return value;
}

function normalizePhotoList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value.trim()) return [value];
  return [];
}

function dedupePhotoList(list) {
  return Array.from(new Set(normalizePhotoList(list).map(value => String(value).trim()).filter(Boolean)));
}

function formatBytes(bytes) {
  const value = Number(bytes || 0);
  if (!value) return "";
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

function decodeExifAscii(bytes, start, length) {
  let result = "";
  for (let i = start; i < start + length && i < bytes.length; i++) {
    const code = bytes[i];
    if (!code) break;
    result += String.fromCharCode(code);
  }
  return result.trim();
}

function exifRationalToNumber(view, offset, littleEndian) {
  const numerator = view.getUint32(offset, littleEndian);
  const denominator = view.getUint32(offset + 4, littleEndian);
  if (!denominator) return 0;
  return numerator / denominator;
}

function exifGpsToDecimal(values, ref) {
  if (!Array.isArray(values) || values.length !== 3) return null;
  let decimal = values[0] + values[1] / 60 + values[2] / 3600;
  if (ref === "S" || ref === "W") decimal *= -1;
  return Number(decimal.toFixed(6));
}

function formatExifDate(value) {
  if (!value || typeof value !== "string") return "";
  const normalized = value.trim().replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3").replace(" ", "T");
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function extractExifMetadataFromBuffer(arrayBuffer) {
  if (!(arrayBuffer instanceof ArrayBuffer) || arrayBuffer.byteLength < 8) return {};
  const view = new DataView(arrayBuffer);
  if (view.getUint16(0, false) !== 0xFFD8) return {};

  let offset = 2;
  while (offset + 4 <= view.byteLength) {
    const marker = view.getUint16(offset, false);
    offset += 2;
    if (marker === 0xFFDA || marker === 0xFFD9) break;
    const segmentLength = view.getUint16(offset, false);
    if (segmentLength < 2 || offset + segmentLength > view.byteLength) break;

    if (marker === 0xFFE1) {
      const segmentStart = offset + 2;
      if (decodeExifAscii(new Uint8Array(arrayBuffer), segmentStart, 6) !== "Exif") {
        offset += segmentLength;
        continue;
      }

      const tiffOffset = segmentStart + 6;
      const littleEndian = view.getUint16(tiffOffset, false) === 0x4949;
      const firstIfdOffset = view.getUint32(tiffOffset + 4, littleEndian);
      const bytes = new Uint8Array(arrayBuffer);
      const exif = {};

      const readIfd = (ifdOffsetAbsolute) => {
        if (!ifdOffsetAbsolute || ifdOffsetAbsolute + 2 > view.byteLength) return [];
        const count = view.getUint16(ifdOffsetAbsolute, littleEndian);
        const entries = [];
        for (let i = 0; i < count; i++) {
          const entryOffset = ifdOffsetAbsolute + 2 + i * 12;
          if (entryOffset + 12 > view.byteLength) break;
          entries.push(entryOffset);
        }
        return entries;
      };

      const readValue = (entryOffset) => {
        const tag = view.getUint16(entryOffset, littleEndian);
        const type = view.getUint16(entryOffset + 2, littleEndian);
        const count = view.getUint32(entryOffset + 4, littleEndian);
        const valueOffsetRaw = view.getUint32(entryOffset + 8, littleEndian);
        const typeSizes = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8 };
        const byteLength = (typeSizes[type] || 1) * count;
        const valueOffset = byteLength <= 4 ? entryOffset + 8 : tiffOffset + valueOffsetRaw;
        if (valueOffset + byteLength > view.byteLength) return { tag, value: null };

        let value = null;
        if (type === 2) {
          value = decodeExifAscii(bytes, valueOffset, count);
        } else if (type === 3) {
          value = count === 1
            ? view.getUint16(valueOffset, littleEndian)
            : Array.from({ length: count }, (_, idx) => view.getUint16(valueOffset + idx * 2, littleEndian));
        } else if (type === 4) {
          value = count === 1
            ? view.getUint32(valueOffset, littleEndian)
            : Array.from({ length: count }, (_, idx) => view.getUint32(valueOffset + idx * 4, littleEndian));
        } else if (type === 5) {
          value = count === 1
            ? exifRationalToNumber(view, valueOffset, littleEndian)
            : Array.from({ length: count }, (_, idx) => exifRationalToNumber(view, valueOffset + idx * 8, littleEndian));
        } else if (type === 1) {
          value = count === 1 ? bytes[valueOffset] : Array.from(bytes.slice(valueOffset, valueOffset + count));
        }
        return { tag, value };
      };

      const rootEntries = readIfd(tiffOffset + firstIfdOffset);
      let exifIfdPointer = 0;
      let gpsIfdPointer = 0;

      rootEntries.forEach(entryOffset => {
        const { tag, value } = readValue(entryOffset);
        if (tag === 0x010F) exif.make = value;
        if (tag === 0x0110) exif.model = value;
        if (tag === 0x8769) exifIfdPointer = value || 0;
        if (tag === 0x8825) gpsIfdPointer = value || 0;
      });

      if (exifIfdPointer) {
        readIfd(tiffOffset + exifIfdPointer).forEach(entryOffset => {
          const { tag, value } = readValue(entryOffset);
          if (tag === 0x9003) exif.dateTaken = value;
          if (tag === 0x9004 && !exif.dateTaken) exif.dateTaken = value;
        });
      }

      let latRef = "";
      let lonRef = "";
      let latValues = null;
      let lonValues = null;
      if (gpsIfdPointer) {
        readIfd(tiffOffset + gpsIfdPointer).forEach(entryOffset => {
          const { tag, value } = readValue(entryOffset);
          if (tag === 0x0001) latRef = value;
          if (tag === 0x0002) latValues = value;
          if (tag === 0x0003) lonRef = value;
          if (tag === 0x0004) lonValues = value;
        });
      }

      const latitude = exifGpsToDecimal(latValues, latRef);
      const longitude = exifGpsToDecimal(lonValues, lonRef);
      if (latitude !== null && longitude !== null) {
        exif.location = { latitude, longitude };
      }
      return exif;
    }

    offset += segmentLength;
  }
  return {};
}

function parseMarkdownWithFrontMatter(text) {
  const result = { metadata: {}, content: "" };
  if (!text) return result;
  const lines = text.split("\n");
  if (lines[0] && lines[0].trim() === "---") {
    let i = 1;
    let yamlLines = [];
    while (i < lines.length && lines[i].trim() !== "---") {
      yamlLines.push(lines[i]);
      i++;
    }
    // Parse simple key-value YAML
    let inBlock = false;
    let blockKey = "";
    let blockLines = [];
    
    yamlLines.forEach(line => {
      if (inBlock) {
        if (line.startsWith("  ")) {
          blockLines.push(line.slice(2));
          return;
        } else {
          result.metadata[blockKey] = blockLines.join("\n");
          inBlock = false;
          blockKey = "";
          blockLines = [];
        }
      }
      
      const idx = line.indexOf(":");
      if (idx !== -1) {
        const key = line.slice(0, idx).trim();
        let val = line.slice(idx + 1).trim();
        if (val === "|") {
          inBlock = true;
          blockKey = key;
          return;
        }
        // remove surrounding quotes if any
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        result.metadata[key] = parseScalarFrontMatterValue(val);
      }
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

function stringifyMarkdownWithFrontMatter(metadata, content) {
  let yamlStr = "---\n";
  for (const [key, value] of Object.entries(metadata)) {
    if (key === "id") continue; // We store it as uuid, no need to duplicate id
    if (value !== undefined && value !== null) {
      if (typeof value === "string" && value.includes("\n")) {
        yamlStr += `${key}: |\n` + value.split("\n").map(l => `  ${l}`).join("\n") + "\n";
      } else if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
        yamlStr += `${key}: ${JSON.stringify(value)}\n`;
      } else {
        yamlStr += `${key}: ${value}\n`;
      }
    }
  }
  yamlStr += "---\n";
  if (content) {
    yamlStr += "\n" + content.trim() + "\n";
  }
  return yamlStr;
}

function sanitizeSlug(text) {
  if (!text) return "unnamed";
  return text.toLowerCase()
             .replace(/[^a-z0-9\s-]/g, "")
             .replace(/\s+/g, "-")
             .replace(/-+/g, "-")
             .replace(/(^-|-$)/g, "");
}

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function truncateText(text, maxLength = 280) {
  const value = String(text || "").replace(/\s+/g, " ").trim();
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1)}…`;
}

class AntaiApp {
  constructor() {
    this.currentUser = null;
    this.users = [];
    this.passwordStore = {};
    this.projects = [];
    this.activeProjectId = null;
    this.colonies = [];
    this.events = [];
    this.reminders = [];
    this.sightings = [];
    this.maps = [];
    this.zones = [];
    this.automationRules = [];
    this.apiKeys = {};
    this.speciesList = [];
    this.newsList = [];
    this.speciesCatalogCacheKey = "antai-species-catalog-v1";
    this.speciesInfoCacheKey = "antai-species-info-v1";
    this.speciesCatalogLoaded = false;
    this.speciesCatalogRefreshPromise = null;
    this.speciesInfoCache = this.readCache(this.speciesInfoCacheKey, {});
    this.liveSpeciesCatalogUpdatedAt = null;
    this.sidebarCollapsed = this.readCache("antai-sidebar-collapsed-v1", false);
    this.aiPaneHidden = this.readCache("antai-ai-pane-hidden-v1", false);
    this.aiPaneWidth = this.readCache("antai-ai-pane-width-v1", 420);
    this.aiPromptRollupOpen = this.readCache("antai-ai-prompt-rollup-open-v1", true);
    this.aiProviderRollupOpen = this.readCache("antai-ai-provider-rollup-open-v1", true);
    this.aiUtilityRollupOpen = this.readCache("antai-ai-utility-rollup-open-v1", true);
    this.preparedPrompts = [];
    this.preparedPromptCommon = "";
    this.preparedPromptsLoaded = false;
    this.preparedPromptsLoadError = "";
    this.lastAiResponseText = "";
    this.lastStructuredAiResult = null;
    this.aiProviderUrl = this.readCache("antai-ai-provider-url-v1", "https://chatgpt.com");
    this.aiPaneResizeBound = false;
    this.aiPaneResizeState = null;
    
    // Active UI states
    this.currentView = "auth";
    this.selectedColonyId = null;
    this.selectedSpeciesId = null;
    this.activeReminderTab = "today";
    this.activeColonyTab = "colony-tab-overview";
    this.activeMapId = null;
    this.editingColonyId = null;
    this.colonyPhotosBuffer = [];
    this.colonyPhotoEntries = [];
    this.colonySelectedPhotoIndex = -1;
    this.colonyDetailPhotosBuffer = [];
    this.colonyDetailSelectedPhotoIndex = -1;
    this.colonyDetailGalleryItems = [];
    this.photoMetadataCache = {};
    this.colonyAiInsightsState = null;
    this.transientViewReturnState = null;
    this.editingEventId = null;
    this.editingReminderId = null;
    this.editingMapId = null;
    this.editingZoneId = null;
    this.colonyDetailEditMode = false;
    this.projectEditMode = false;
    
    // Preset Scanner Images
    this.scannerPresets = [
      "assets/queen_ant_eggs.jpg",
      "assets/ant_nest_workers.jpg",
      "assets/ant_feeding_honey.jpg"
    ];
    this.currentScannerPresetIndex = 0;
    this.sensorSimInterval = null;
    
  }

  async apiRequest(path, options = {}) {
    const response = await fetch(path, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    });
    const contentType = response.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await response.json()
      : await response.text();
    if (!response.ok) {
      throw new Error(payload && payload.error ? payload.error : `HTTP ${response.status}`);
    }
    return payload;
  }

  isOnline() {
    return typeof navigator === "undefined" ? true : navigator.onLine !== false;
  }

  readCache(cacheKey, fallback) {
    try {
      const raw = window.localStorage.getItem(cacheKey);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (err) {
      return fallback;
    }
  }

  writeCache(cacheKey, value) {
    try {
      window.localStorage.setItem(cacheKey, JSON.stringify(value));
    } catch (err) {
      console.warn(`Failed to write cache ${cacheKey}:`, err);
    }
  }

  getCachedSpeciesCatalog() {
    return this.readCache(this.speciesCatalogCacheKey, null);
  }

  getSpeciesCacheNameKey(name) {
    return String(name || "").trim().toLowerCase();
  }

  getSpeciesByName(name) {
    const query = this.getSpeciesCacheNameKey(name);
    return this.speciesList.find(species => {
      const names = [
        species.name,
        species.canonicalName,
        species.scientificName,
        species.commonName,
        species.vernacularName
      ].filter(Boolean).map(value => this.getSpeciesCacheNameKey(value));
      return names.includes(query);
    }) || null;
  }

  normalizeLiveSpeciesEntry(entry) {
    const canonicalName = entry.canonicalName || entry.species || entry.name || entry.scientificName;
    const name = canonicalName || entry.scientificName;
    if (!name) return null;
    return {
      id: entry.key ? `gbif-${entry.key}` : sanitizeSlug(name),
      name,
      scientificName: entry.scientificName || name,
      canonicalName: canonicalName || name,
      commonName: entry.vernacularName || "",
      vernacularName: entry.vernacularName || "",
      authorship: entry.authorship || "",
      rank: entry.rank || "SPECIES",
      taxonomicStatus: entry.taxonomicStatus || entry.status || "",
      origin: entry.origin || "",
      habitats: entry.habitats || [],
      threatStatuses: entry.threatStatuses || [],
      gbifKey: entry.key || entry.speciesKey || null,
      source: "gbif"
    };
  }

  mergeSpeciesCatalog(baseList, liveList = []) {
    const merged = new Map();
    const put = (entry, sourcePriority) => {
      if (!entry || !entry.name) return;
      const key = this.getSpeciesCacheNameKey(entry.name);
      const existing = merged.get(key);
      if (!existing) {
        merged.set(key, { ...entry, _sourcePriority: sourcePriority });
        return;
      }
      const winner = existing._sourcePriority <= sourcePriority
        ? { ...entry, ...existing, _sourcePriority: existing._sourcePriority }
        : { ...existing, ...entry, _sourcePriority: sourcePriority };
      if (existing._sourcePriority === sourcePriority) {
        merged.set(key, { ...existing, ...entry, _sourcePriority: sourcePriority });
      } else {
        merged.set(key, winner);
      }
    };

    (liveList || []).forEach(entry => put(entry, 2));
    (baseList || []).forEach(entry => put(entry, 1));

    return Array.from(merged.values())
      .map(({ _sourcePriority, ...entry }) => entry)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async initializeSpeciesCatalog() {
    const fallbackSpecies = this.speciesList.length > 0 ? this.speciesList : DEFAULT_SPECIES;
    const cachedCatalog = this.getCachedSpeciesCatalog();
    if (cachedCatalog && Array.isArray(cachedCatalog.species)) {
      this.speciesList = this.mergeSpeciesCatalog(fallbackSpecies, cachedCatalog.species);
      this.liveSpeciesCatalogUpdatedAt = cachedCatalog.updatedAt || null;
    } else {
      this.speciesList = this.mergeSpeciesCatalog(fallbackSpecies, []);
    }
    this.populateSpeciesDropdowns();
    this.updateSpeciesCatalogStatus();

    if (this.isOnline()) {
      this.loadLiveSpeciesCatalog().catch(err => {
        console.warn("Live species catalog refresh failed:", err);
        this.updateSpeciesCatalogStatus("Using cached species catalog because the live refresh failed.");
      });
    }
  }

  async loadLiveSpeciesCatalog(forceRefresh = false) {
    if (this.speciesCatalogRefreshPromise && !forceRefresh) {
      return this.speciesCatalogRefreshPromise;
    }

    this.updateSpeciesCatalogStatus("Refreshing live ant species catalog...");
    this.speciesCatalogRefreshPromise = (async () => {
      const cachedCatalog = this.getCachedSpeciesCatalog();
      const cacheAgeMs = cachedCatalog && cachedCatalog.updatedAt
        ? Date.now() - new Date(cachedCatalog.updatedAt).getTime()
        : Number.POSITIVE_INFINITY;
      const oneDayMs = 24 * 60 * 60 * 1000;
      if (!forceRefresh && cachedCatalog && cacheAgeMs < oneDayMs) {
        this.liveSpeciesCatalogUpdatedAt = cachedCatalog.updatedAt;
        this.updateSpeciesCatalogStatus();
        return cachedCatalog.species || [];
      }

      const liveSpecies = [];
      let offset = 0;
      const limit = 1000;
      while (true) {
        const res = await fetch(`https://api.gbif.org/v1/species/search?higherTaxonKey=4342&rank=SPECIES&status=ACCEPTED&limit=${limit}&offset=${offset}`);
        if (!res.ok) {
          throw new Error(`GBIF species catalog request failed with HTTP ${res.status}`);
        }
        const payload = await res.json();
        const results = Array.isArray(payload.results) ? payload.results : [];
        results.forEach(entry => {
          const normalized = this.normalizeLiveSpeciesEntry(entry);
          if (normalized) liveSpecies.push(normalized);
        });
        offset += results.length;
        if (!results.length || payload.endOfRecords) break;
      }

      this.liveSpeciesCatalogUpdatedAt = new Date().toISOString();
      this.writeCache(this.speciesCatalogCacheKey, {
        updatedAt: this.liveSpeciesCatalogUpdatedAt,
        species: liveSpecies
      });

      this.speciesList = this.mergeSpeciesCatalog(this.speciesList, liveSpecies);
      this.speciesCatalogLoaded = true;
      this.populateSpeciesDropdowns();
      this.updateSpeciesCatalogStatus();

      return liveSpecies;
    })();

    try {
      return await this.speciesCatalogRefreshPromise;
    } finally {
      this.speciesCatalogRefreshPromise = null;
    }
  }

  updateSpeciesCatalogStatus(message) {
    const statusEl = document.getElementById("colony-species-status");
    if (!statusEl) return;
    if (message) {
      statusEl.innerText = message;
      return;
    }
    if (this.liveSpeciesCatalogUpdatedAt) {
      const updated = new Date(this.liveSpeciesCatalogUpdatedAt).toLocaleString();
      statusEl.innerText = `Offline cache ready. Live catalog last refreshed on ${updated}.`;
      return;
    }
    statusEl.innerText = this.isOnline()
      ? "Using bundled species list while live catalog refresh starts."
      : "Offline mode: using bundled species list and cached species details.";
  }

  applyShellLayout() {
    const appContainer = document.getElementById("app-container");
    if (!appContainer) return;
    const width = this.clampAiPaneWidth(this.aiPaneWidth);
    appContainer.style.setProperty("--ai-pane-width", `${width}px`);
    
    // Force hide sidebar and AI pane on auth view OR if not logged in
    const isGuest = !this.currentUser;
    const isAuthView = this.currentView === "auth";
    const hideSidebar = isAuthView || Boolean(this.sidebarCollapsed);
    const hideAiPane = isAuthView || isGuest || Boolean(this.aiPaneHidden);
    
    appContainer.classList.toggle("sidebar-collapsed", hideSidebar);
    appContainer.classList.toggle("ai-pane-hidden", hideAiPane);
    this.updateShellToggleButtons();
  }

  updateShellToggleButtons() {
    const sidebarBtn = document.getElementById("sidebar-toggle-desktop-btn");
    if (sidebarBtn) {
      sidebarBtn.textContent = this.sidebarCollapsed ? "☰ Show Navigation" : "☰ Hide Navigation";
    }
    const aiBtn = document.getElementById("ai-pane-toggle-btn");
    if (aiBtn) {
      aiBtn.textContent = this.aiPaneHidden ? "🤖 Show AI Assistant" : "🤖 Hide AI Assistant";
      // Hide AI assistant toggle entirely if user is not logged in
      aiBtn.style.display = !this.currentUser ? "none" : "";
    }
  }

  toggleSidebarPane() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.writeCache("antai-sidebar-collapsed-v1", this.sidebarCollapsed);
    this.applyShellLayout();
  }

  toggleAiPane() {
    if (this.currentView === "auth") return;
    this.aiPaneHidden = !this.aiPaneHidden;
    this.writeCache("antai-ai-pane-hidden-v1", this.aiPaneHidden);
    this.applyShellLayout();
    if (!this.aiPaneHidden) {
      this.renderAIAssistant();
      const input = document.getElementById("ai-prompt-search");
      if (input && window.innerWidth > 900) input.focus();
    }
  }

  clampAiPaneWidth(width) {
    const min = 320;
    const max = 720;
    const viewportMax = Math.max(320, Math.floor(window.innerWidth * 0.7));
    return Math.max(min, Math.min(Number(width) || 420, Math.min(max, viewportMax)));
  }

  setAiPaneWidth(width, persist = true) {
    this.aiPaneWidth = this.clampAiPaneWidth(width);
    if (persist) {
      this.writeCache("antai-ai-pane-width-v1", this.aiPaneWidth);
    }
    this.applyShellLayout();
  }

  setupAiPaneResize() {
    if (this.aiPaneResizeBound) return;
    const handle = document.getElementById("ai-pane-resizer");
    if (!handle) return;
    handle.addEventListener("pointerdown", event => {
      if (this.aiPaneHidden || window.innerWidth <= 900) return;
      event.preventDefault();
      handle.setPointerCapture?.(event.pointerId);
      this.aiPaneResizeState = {
        startX: event.clientX,
        startWidth: this.clampAiPaneWidth(this.aiPaneWidth)
      };
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";
    });
    window.addEventListener("pointermove", event => {
      if (!this.aiPaneResizeState) return;
      const delta = this.aiPaneResizeState.startX - event.clientX;
      this.setAiPaneWidth(this.aiPaneResizeState.startWidth + delta);
      const promptList = document.getElementById("ai-prompt-list");
      if (promptList) promptList.scrollTop = promptList.scrollTop;
    });
    window.addEventListener("pointerup", () => {
      if (!this.aiPaneResizeState) return;
      this.aiPaneResizeState = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    });
    window.addEventListener("pointercancel", () => {
      if (!this.aiPaneResizeState) return;
      this.aiPaneResizeState = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    });
    this.aiPaneResizeBound = true;
  }

  handleAiSectionToggle(section, event) {
    const open = Boolean(event?.target?.open);
    if (section === "provider") {
      this.aiProviderRollupOpen = open;
      this.writeCache("antai-ai-provider-rollup-open-v1", open);
      const hint = document.getElementById("ai-provider-rollup-hint");
      if (hint) {
        hint.textContent = open ? "Collapse" : "Expand";
      }
      return;
    }
    if (section === "utility") {
      this.aiUtilityRollupOpen = open;
      this.writeCache("antai-ai-utility-rollup-open-v1", open);
      const hint = document.getElementById("ai-utility-rollup-hint");
      if (hint) {
        hint.textContent = open ? "Collapse" : "Expand";
      }
      return;
    }
    this.aiPromptRollupOpen = open;
    this.writeCache("antai-ai-prompt-rollup-open-v1", open);
    const hint = document.getElementById("ai-prompt-rollup-hint");
    if (hint) {
      hint.textContent = open ? "Collapse" : "Expand";
    }
  }

  getAiProviderMap() {
    return {
      chatgpt: "https://chatgpt.com",
      codex: "https://platform.openai.com/playground?mode=complete&model=code-davinci-002",
      gemini: "https://gemini.google.com",
      claude: "https://claude.ai"
    };
  }

  openAiProvider(provider) {
    if (provider === 'other') {
      const customUrl = prompt("Enter the URL of the AI provider:");
      if (customUrl) window.open(customUrl, "_blank", "noopener,noreferrer");
      return;
    }
    const providerMap = this.getAiProviderMap();
    const url = providerMap[provider] || provider;
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  handleApiProviderChange() {
    const providerSelect = document.getElementById('ai-api-provider');
    const modelSelect = document.getElementById('ai-api-model');
    const otherInput = document.getElementById('ai-api-model-other');
    if (!providerSelect || !modelSelect || !otherInput) return;

    const provider = providerSelect.value;
    modelSelect.innerHTML = '';
    modelSelect.style.display = 'block';
    otherInput.style.display = 'none';

    let options = [];
    if (provider === 'chatgpt') {
      options = [
        { value: 'gpt-4o', label: 'gpt-4o' },
        { value: 'gpt-4-turbo', label: 'gpt-4-turbo' },
        { value: 'gpt-3.5-turbo', label: 'gpt-3.5-turbo' }
      ];
    } else if (provider === 'gemini') {
      options = [
        { value: 'gemini-1.5-pro', label: 'gemini-1.5-pro' },
        { value: 'gemini-1.5-flash', label: 'gemini-1.5-flash' }
      ];
    } else if (provider === 'claude') {
      options = [
        { value: 'claude-3-5-sonnet', label: 'claude-3.5-sonnet' },
        { value: 'claude-3-opus', label: 'claude-3-opus' },
        { value: 'claude-3-haiku', label: 'claude-3-haiku' }
      ];
    } else if (provider === 'other') {
      modelSelect.style.display = 'none';
      otherInput.style.display = 'block';
      return;
    }

    options.forEach(opt => {
      const el = document.createElement('option');
      el.value = opt.value;
      el.textContent = opt.label;
      modelSelect.appendChild(el);
    });
  }

  setAiMode(mode) {
    this.aiMode = mode;
    document.querySelectorAll('.ai-mode-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.style.background = 'transparent';
      btn.style.color = 'var(--text-secondary)';
    });
    
    const activeBtn = document.getElementById(`btn-mode-${mode}`);
    if (activeBtn) {
      activeBtn.classList.add('active');
      activeBtn.style.background = 'var(--bg-tertiary)';
      activeBtn.style.color = 'var(--text-primary)';
    }

    const desc = document.getElementById('ai-mode-desc');
    if (mode === 'browser') desc.textContent = 'Manual copy/paste workflow via external browser tab.';
    if (mode === 'api') desc.textContent = 'Direct integration using your own API key.';
    if (mode === 'cli') desc.textContent = 'CLI Mode uses the selected backend CLI engine (Codex, Claude, or agy). It can read all repository files and autonomously update the data folder for you.';

    document.querySelectorAll('.ai-mode-view').forEach(view => {
      view.style.display = 'none';
    });
    
    const activeView = document.getElementById(`ai-view-${mode}`);
    if (activeView) {
      activeView.style.display = mode === 'browser' ? 'block' : 'flex';
    }

    if (mode === 'api') {
      if (this.currentUser && this.currentUser.aiSettings) {
        const providerSelect = document.getElementById('ai-api-provider');
        const keyInput = document.getElementById('ai-api-key');
        const modelSelect = document.getElementById('ai-api-model');
        const otherInput = document.getElementById('ai-api-model-other');
        
        if (providerSelect && this.currentUser.aiSettings.provider) {
          providerSelect.value = this.currentUser.aiSettings.provider;
        } else if (providerSelect) {
          providerSelect.value = 'chatgpt';
        }
        
        this.handleApiProviderChange();
        
        if (keyInput) keyInput.value = this.currentUser.aiSettings.apiKey || '';
        
        const provider = providerSelect ? providerSelect.value : 'chatgpt';
        if (provider === 'other' && otherInput) {
          otherInput.value = this.currentUser.aiSettings.model || '';
        } else if (modelSelect && this.currentUser.aiSettings.model) {
          modelSelect.value = this.currentUser.aiSettings.model;
        }
      } else {
        this.handleApiProviderChange();
      }
    }
  }

  async saveAiSettings() {
    if (!this.currentUser) return;
    const provider = document.getElementById('ai-api-provider') ? document.getElementById('ai-api-provider').value : 'chatgpt';
    const apiKey = document.getElementById('ai-api-key') ? document.getElementById('ai-api-key').value : '';
    
    let model = '';
    if (provider === 'other') {
      const otherInput = document.getElementById('ai-api-model-other');
      if (otherInput) model = otherInput.value;
    } else {
      const modelSelect = document.getElementById('ai-api-model');
      if (modelSelect) model = modelSelect.value;
    }
    
    this.currentUser.aiSettings = {
      provider: provider,
      apiKey: apiKey,
      model: model
    };
    
    try {
      await this.apiPost("/api/profile", { user: this.currentUser });
    } catch (e) {
      console.error("Failed to save AI settings:", e);
    }
  }

  runApiMode() {
    alert("API mode functionality not yet implemented on backend.");
  }

  runCliMode() {
    const promptInput = document.getElementById("ai-cli-prompt");
    const agentSelect = document.getElementById("ai-cli-agent");
    const statusDiv = document.getElementById("ai-cli-status");
    
    if (!promptInput || !promptInput.value.trim()) {
      alert("Please enter a task for the CLI agent.");
      return;
    }
    
    const prompt = promptInput.value.trim();
    const agent = agentSelect ? agentSelect.value : "agy";
    
    statusDiv.style.display = "block";
    statusDiv.style.padding = "12px";
    statusDiv.style.background = "#1e1e1e";
    statusDiv.style.borderRadius = "var(--radius-md)";
    statusDiv.style.maxHeight = "250px";
    statusDiv.style.overflowY = "auto";
    statusDiv.style.color = "#d4d4d4";
    statusDiv.innerHTML = "<div>Starting CLI proxy...</div>";
    
    fetch('/api/cli', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, agent })
    }).then(response => {
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      
      const readChunk = () => {
        reader.read().then(({ done, value }) => {
          if (done) {
             setTimeout(() => this.navigate('dashboard'), 1500);
             return;
          }
          const chunk = decoder.decode(value, { stream: true });
          const el = document.createElement('span');
          el.textContent = chunk;
          el.style.whiteSpace = "pre-wrap";
          statusDiv.appendChild(el);
          statusDiv.scrollTop = statusDiv.scrollHeight;
          readChunk();
        });
      };
      readChunk();
    }).catch(err => {
      statusDiv.innerHTML += `<div style="color:#f87171">Error: ${err.message}</div>`;
    });
  }

  getCurrentAiContextExport() {
    const selectedColony = this.colonies.find(colony => colony.id === this.selectedColonyId) || null;
    const relatedReminders = selectedColony
      ? this.reminders.filter(item => item.colonyId === selectedColony.id)
      : [];
    const relatedEvents = selectedColony
      ? this.events.filter(item => item.colonyId === selectedColony.id)
      : [];
    const relatedMaps = selectedColony
      ? this.maps.filter(item => item.colonyId === selectedColony.id)
      : [];
    const relatedZones = selectedColony
      ? this.zones.filter(zone => relatedMaps.some(map => map.id === zone.mapId))
      : [];

    return {
      schemaVersion: "antai.ai.context/v1",
      exportedAt: new Date().toISOString(),
      project: this.getActiveProject() || null,
      selectedColony,
      speciesContext: selectedColony ? this.getSpeciesByName(selectedColony.species) : null,
      reminders: relatedReminders,
      recentEvents: relatedEvents.slice(-20),
      maps: relatedMaps,
      zones: relatedZones,
      aiImportInstructions: this.getAiResultSchemaInstructions(),
      aiImportSchema: this.getAiResultSchemaTemplate()
    };
  }

  buildColonyPhotoList(col) {
    return this.getNormalizedColonyGalleryItems(col).map(item => item.path);
  }

  getNormalizedColonyGalleryItems(col) {
    if (!col) return [];
    const legacyPaths = dedupePhotoList([...normalizePhotoList(col.customPhotos), col.photo]);
    const galleryItems = Array.isArray(col.galleryItems) ? col.galleryItems : [];
    const normalized = galleryItems
      .map((item, index) => {
        const path = String(item && (item.path || item.src || "")).trim();
        if (!path) return null;
        return {
          path,
          title: String(item.title || this.getPhotoDisplayName(path, index)).trim() || this.getPhotoDisplayName(path, index),
          description: String(item.description || "").trim()
        };
      })
      .filter(Boolean);

    legacyPaths.forEach((path, index) => {
      if (!normalized.some(item => item.path === path)) {
        normalized.push({
          path,
          title: this.getPhotoDisplayName(path, normalized.length || index),
          description: ""
        });
      }
    });

    return normalized;
  }

  ensureColonyDetailPhotoState(col) {
    const galleryItems = this.getNormalizedColonyGalleryItems(col);
    const photoList = galleryItems.map(item => item.path);
    const currentSelected = this.colonyDetailPhotosBuffer[this.colonyDetailSelectedPhotoIndex];
    const desiredSelected = col && col.photo ? col.photo : currentSelected;
    const sameList = JSON.stringify(photoList) === JSON.stringify(this.colonyDetailPhotosBuffer || []);
    const sameGallery = JSON.stringify(galleryItems) === JSON.stringify(this.colonyDetailGalleryItems || []);
    if (!sameGallery) {
      this.colonyDetailGalleryItems = galleryItems.map(item => ({ ...item }));
    }
    if (!sameList) {
      this.colonyDetailPhotosBuffer = [...photoList];
    }
    const selectedIndex = this.colonyDetailPhotosBuffer.indexOf(desiredSelected);
    this.colonyDetailSelectedPhotoIndex = selectedIndex >= 0 ? selectedIndex : (this.colonyDetailPhotosBuffer.length ? 0 : -1);
  }

  getSelectedColonyDetailPhoto() {
    if (this.colonyDetailSelectedPhotoIndex < 0 || this.colonyDetailSelectedPhotoIndex >= this.colonyDetailPhotosBuffer.length) {
      return "";
    }
    return this.colonyDetailPhotosBuffer[this.colonyDetailSelectedPhotoIndex] || "";
  }

  getPhotoDisplayName(photoSrc, index = 0) {
    const value = String(photoSrc || "").trim();
    if (!value) return `Photo ${index + 1}`;
    if (value.startsWith("data:")) return `Upload ${index + 1}`;
    const parts = value.split("/");
    return decodeURIComponent(parts[parts.length - 1] || `Photo ${index + 1}`);
  }

  createStoredColonyPhotoEntry(src) {
    return { kind: "stored", src: String(src || "") };
  }

  createPendingColonyPhotoEntry(file) {
    return {
      kind: "pending",
      file,
      src: URL.createObjectURL(file),
      name: file.name || "upload",
      type: file.type || "",
      size: file.size || 0
    };
  }

  getSelectedColonyPhotoEntry() {
    return Array.isArray(this.colonyPhotoEntries)
      ? this.colonyPhotoEntries[this.colonySelectedPhotoIndex] || null
      : null;
  }

  async buildPhotoMetadataFromFile(file, previewSrc = "") {
    const metadata = {
      dateTaken: "",
      location: "",
      camera: "",
      dimensions: "",
      size: formatBytes(file.size),
      type: file.type || "",
      tags: []
    };
    try {
      const image = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Image metadata unavailable"));
        img.src = previewSrc || URL.createObjectURL(file);
      });
      metadata.dimensions = image.naturalWidth && image.naturalHeight
        ? `${image.naturalWidth} × ${image.naturalHeight}`
        : "";
      const exif = extractExifMetadataFromBuffer(await file.arrayBuffer());
      metadata.dateTaken = formatExifDate(exif.dateTaken || "");
      metadata.camera = [exif.make, exif.model].filter(Boolean).join(" ").trim();
      if (exif.location) {
        metadata.location = `${exif.location.latitude}, ${exif.location.longitude}`;
      }
    } catch (err) {
      metadata.error = err.message;
    }
    metadata.tags = [
      file.name,
      metadata.dateTaken ? `Taken ${metadata.dateTaken}` : "",
      metadata.location ? `GPS ${metadata.location}` : "",
      metadata.camera ? metadata.camera : "",
      metadata.dimensions ? `${metadata.dimensions}px` : "",
      metadata.size || "",
      metadata.type ? metadata.type.replace("image/", "").toUpperCase() : ""
    ].filter(Boolean);
    return metadata;
  }

  async uploadColonyPhotoFile(colony, file, index = 0) {
    if (!colony || !colony.id) {
      throw new Error("Colony must exist before uploading photos.");
    }
    const response = await fetch(`/api/colonies/${encodeURIComponent(colony.id)}/photos?filename=${encodeURIComponent(file.name || `photo-${index + 1}`)}`, {
      method: "POST",
      headers: {
        "Content-Type": file.type || "application/octet-stream",
        "X-File-Name": file.name || `photo-${index + 1}`,
        "X-File-Type": file.type || "application/octet-stream"
      },
      body: file
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || "Photo upload failed.");
    }
    return payload.path;
  }

  async loadPhotoMetadata(photoSrc) {
    if (!photoSrc) return null;
    if (this.photoMetadataCache[photoSrc]) {
      return await this.photoMetadataCache[photoSrc];
    }

    this.photoMetadataCache[photoSrc] = (async () => {
      const metadata = {
        dateTaken: "",
        location: "",
        camera: "",
        dimensions: "",
        size: "",
        type: "",
        tags: []
      };

      try {
        const response = await fetch(photoSrc);
        const blob = await response.blob();
        metadata.type = blob.type || "";
        metadata.size = formatBytes(blob.size);

        const image = await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error("Image metadata unavailable"));
          img.src = photoSrc;
        });
        metadata.dimensions = image.naturalWidth && image.naturalHeight
          ? `${image.naturalWidth} × ${image.naturalHeight}`
          : "";

        const exif = extractExifMetadataFromBuffer(await blob.arrayBuffer());
        metadata.dateTaken = formatExifDate(exif.dateTaken || "");
        metadata.camera = [exif.make, exif.model].filter(Boolean).join(" ").trim();
        if (exif.location) {
          metadata.location = `${exif.location.latitude}, ${exif.location.longitude}`;
        }
      } catch (err) {
        metadata.error = err.message;
      }

      metadata.tags = [
        metadata.dateTaken ? `Taken ${metadata.dateTaken}` : "",
        metadata.location ? `GPS ${metadata.location}` : "",
        metadata.camera ? metadata.camera : "",
        metadata.dimensions ? `${metadata.dimensions}px` : "",
        metadata.size || "",
        metadata.type ? metadata.type.replace("image/", "").toUpperCase() : ""
      ].filter(Boolean);

      return metadata;
    })();

    return await this.photoMetadataCache[photoSrc];
  }

  renderColonyDetailPrimaryPhotoPicker() {
    const container = document.getElementById("colony-detail-primary-photo-picker");
    if (!container) return;
    const selectedPhoto = this.getSelectedColonyDetailPhoto();
    const photos = this.colonyDetailPhotosBuffer || [];

    if (!photos.length) {
      container.innerHTML = `<div style="font-size:12px; color:var(--text-muted);">No colony photos yet. Add images in the Gallery tab.</div>`;
      return;
    }

    container.innerHTML = `
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        ${photos.map((photo, index) => `
          <button type="button" class="btn ${selectedPhoto === photo ? "btn-primary" : "btn-secondary"}" style="padding:6px; display:flex; flex-direction:column; align-items:center; gap:6px; width:96px;" onclick="app.selectColonyDetailProfilePhoto(${index})">
            <img src="${photo}" alt="${escapeHtml(this.getPhotoDisplayName(photo, index))}" style="width:84px; height:84px; object-fit:cover; border-radius:8px;">
            <span style="font-size:11px; white-space:normal; line-height:1.25;">${escapeHtml(this.getPhotoDisplayName(photo, index))}</span>
          </button>
        `).join("")}
      </div>
    `;
  }

  async handleColonyDetailGallerySelected(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const col = this.colonies.find(entry => entry.id === this.selectedColonyId);
    if (!col) {
      alert("Select a colony before uploading pictures.");
      return;
    }
    if (!Array.isArray(this.colonyDetailPhotosBuffer)) {
      this.colonyDetailPhotosBuffer = [];
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const previewUrl = URL.createObjectURL(file);
      const storedPath = await this.uploadColonyPhotoFile(col, file, i);
      this.colonyDetailPhotosBuffer.push(storedPath);
      this.colonyDetailGalleryItems.push({
        path: storedPath,
        title: file.name || this.getPhotoDisplayName(storedPath, this.colonyDetailGalleryItems.length),
        description: ""
      });
      this.photoMetadataCache[storedPath] = this.buildPhotoMetadataFromFile(file, previewUrl);
    }

    if (this.colonyDetailSelectedPhotoIndex === -1 && this.colonyDetailPhotosBuffer.length > 0) {
      this.colonyDetailSelectedPhotoIndex = 0;
    }

    this.renderColonyDetailPrimaryPhotoPicker();
    this.renderColonyGallery();
    await this.persistSelectedColonyGalleryState();
    event.target.value = "";
  }

  async selectColonyDetailProfilePhoto(index) {
    if (index < 0 || index >= this.colonyDetailPhotosBuffer.length) return;
    this.colonyDetailSelectedPhotoIndex = index;
    this.renderColonyDetailPrimaryPhotoPicker();
    this.renderColonyGallery();
    await this.persistSelectedColonyGalleryState();
  }

  async moveColonyDetailPhoto(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= this.colonyDetailPhotosBuffer.length) return;
    const selectedPhoto = this.getSelectedColonyDetailPhoto();
    const photos = [...this.colonyDetailPhotosBuffer];
    const [moved] = photos.splice(index, 1);
    photos.splice(targetIndex, 0, moved);
    this.colonyDetailPhotosBuffer = photos;
    const galleryItems = [...this.colonyDetailGalleryItems];
    const [movedItem] = galleryItems.splice(index, 1);
    galleryItems.splice(targetIndex, 0, movedItem);
    this.colonyDetailGalleryItems = galleryItems;
    this.colonyDetailSelectedPhotoIndex = photos.indexOf(selectedPhoto);
    this.renderColonyDetailPrimaryPhotoPicker();
    this.renderColonyGallery();
    await this.persistSelectedColonyGalleryState();
  }

  async removeColonyDetailPhoto(index) {
    if (index < 0 || index >= this.colonyDetailPhotosBuffer.length) return;
    const removedPhoto = this.colonyDetailPhotosBuffer[index];
    this.colonyDetailPhotosBuffer.splice(index, 1);
    this.colonyDetailGalleryItems.splice(index, 1);
    delete this.photoMetadataCache[removedPhoto];
    if (this.colonyDetailSelectedPhotoIndex === index) {
      this.colonyDetailSelectedPhotoIndex = this.colonyDetailPhotosBuffer.length ? Math.min(index, this.colonyDetailPhotosBuffer.length - 1) : -1;
    } else if (this.colonyDetailSelectedPhotoIndex > index) {
      this.colonyDetailSelectedPhotoIndex -= 1;
    }
    this.renderColonyDetailPrimaryPhotoPicker();
    this.renderColonyGallery();
    await this.persistSelectedColonyGalleryState();
  }

  async updateColonyDetailGalleryText(index, field, value) {
    if (!Array.isArray(this.colonyDetailGalleryItems) || !this.colonyDetailGalleryItems[index]) return;
    const key = field === "description" ? "description" : "title";
    this.colonyDetailGalleryItems[index][key] = String(value || "");
    if (key === "title") {
      const titleEl = document.getElementById(`colony-gallery-title-${index}`);
      if (titleEl) titleEl.textContent = this.colonyDetailGalleryItems[index][key] || this.getPhotoDisplayName(this.colonyDetailGalleryItems[index].path, index);
    }
    await this.persistSelectedColonyGalleryState();
  }

  async persistSelectedColonyGalleryState() {
    if (!this.hasPermission("write") || !this.selectedColonyId) return;
    const col = this.colonies.find(entry => entry.id === this.selectedColonyId);
    if (!col) return;

    const previousPhoto = col.photo;
    const previousCustomPhotos = Array.isArray(col.customPhotos) ? [...col.customPhotos] : normalizePhotoList(col.customPhotos);
    const previousGalleryItems = Array.isArray(col.galleryItems) ? col.galleryItems.map(item => ({ ...item })) : [];
    try {
      col.galleryItems = this.colonyDetailGalleryItems.map((item, index) => ({
        path: item.path,
        title: String(item.title || this.getPhotoDisplayName(item.path, index)).trim() || this.getPhotoDisplayName(item.path, index),
        description: String(item.description || "").trim()
      }));
      col.customPhotos = dedupePhotoList(col.galleryItems.map(item => item.path));
      col.photo = this.getSelectedColonyDetailPhoto() || col.customPhotos[0] || "";
      await this.writeRecord("colonies", col);
      this.ensureColonyDetailPhotoState(col);
      this.renderColonyDetailPrimaryPhotoPicker();
      this.renderColonyGallery();
      const sidebarImg = document.querySelector("#colony-detail-sidebar .sidebar-colony-img");
      if (sidebarImg) sidebarImg.src = col.photo || "assets/queen_ant_eggs.jpg";
    } catch (err) {
      col.photo = previousPhoto;
      col.customPhotos = previousCustomPhotos;
      col.galleryItems = previousGalleryItems;
      this.ensureColonyDetailPhotoState(col);
      this.renderColonyDetailPrimaryPhotoPicker();
      this.renderColonyGallery();
      alert(`Failed to save colony gallery: ${err.message}`);
    }
  }

  renderColonyGallery() {
    const container = document.getElementById("colony-gallery-grid");
    const emptyState = document.getElementById("colony-gallery-empty");
    if (!container || !emptyState) return;

    const photos = this.colonyDetailPhotosBuffer || [];
    const selectedPhoto = this.getSelectedColonyDetailPhoto();
    emptyState.style.display = photos.length ? "none" : "block";
    container.innerHTML = "";

    photos.forEach((photo, index) => {
      const galleryItem = this.colonyDetailGalleryItems[index] || {
        path: photo,
        title: this.getPhotoDisplayName(photo, index),
        description: ""
      };
      const card = document.createElement("div");
      card.className = "colony-gallery-card";
      const isProfile = photo === selectedPhoto;
      const canWrite = this.hasPermission("write");
      card.innerHTML = `
        <div class="colony-gallery-frame">
          <img src="${photo}" alt="${escapeHtml(galleryItem.title || this.getPhotoDisplayName(photo, index))}" class="colony-gallery-image">
          ${isProfile ? `<div class="colony-gallery-badge">Profile</div>` : ""}
        </div>
        <div class="colony-gallery-body">
          <div class="colony-gallery-title" id="colony-gallery-title-${index}">${escapeHtml(galleryItem.title || this.getPhotoDisplayName(photo, index))}</div>
          <div class="form-group" style="margin-bottom:10px;">
            <label style="font-size:11px; color:var(--text-muted);">Title</label>
            <input type="text" class="form-control" value="${escapeHtml(galleryItem.title || this.getPhotoDisplayName(photo, index))}" ${canWrite ? "" : "disabled"} onchange="app.updateColonyDetailGalleryText(${index}, 'title', this.value)" style="margin-top:4px; padding:8px 10px;">
          </div>
          <div class="form-group" style="margin-bottom:10px;">
            <label style="font-size:11px; color:var(--text-muted);">Description</label>
            <textarea class="form-control" ${canWrite ? "" : "disabled"} onchange="app.updateColonyDetailGalleryText(${index}, 'description', this.value)" style="min-height:74px; margin-top:4px; padding:8px 10px;">${escapeHtml(galleryItem.description || "")}</textarea>
          </div>
          <div class="colony-gallery-meta" id="colony-gallery-meta-${index}">Loading image metadata…</div>
          <div class="colony-gallery-actions">
            ${canWrite ? `
              <button type="button" class="btn ${isProfile ? "btn-primary" : "btn-secondary"}" style="padding:5px 8px; font-size:11px;" onclick="app.selectColonyDetailProfilePhoto(${index})">${isProfile ? "Profile" : "Set Profile"}</button>
              <button type="button" class="btn btn-secondary" style="padding:5px 8px; font-size:11px;" onclick="app.moveColonyDetailPhoto(${index}, -1)" ${index === 0 ? "disabled" : ""}>↑</button>
              <button type="button" class="btn btn-secondary" style="padding:5px 8px; font-size:11px;" onclick="app.moveColonyDetailPhoto(${index}, 1)" ${index === photos.length - 1 ? "disabled" : ""}>↓</button>
              <button type="button" class="btn btn-secondary" style="padding:5px 8px; font-size:11px; color:var(--accent-danger);" onclick="app.removeColonyDetailPhoto(${index})">Remove</button>
            ` : `<span style="font-size:12px; color:var(--text-muted);">Read only</span>`}
          </div>
        </div>
      `;
      container.appendChild(card);

      this.loadPhotoMetadata(photo).then(metadata => {
        const metaEl = document.getElementById(`colony-gallery-meta-${index}`);
        if (!metaEl) return;
        metaEl.innerHTML = metadata && metadata.tags && metadata.tags.length
          ? metadata.tags.map(tag => `<span class="colony-gallery-chip">${escapeHtml(tag)}</span>`).join("")
          : `<span style="color:var(--text-muted);">No EXIF metadata available.</span>`;
      }).catch(() => {
        const metaEl = document.getElementById(`colony-gallery-meta-${index}`);
        if (metaEl) {
          metaEl.innerHTML = `<span style="color:var(--text-muted);">No EXIF metadata available.</span>`;
        }
      });
    });
  }

  renderColonyDetailEditor(col) {
    const overviewTab = document.getElementById("colony-tab-overview");
    if (!overviewTab) return;

    const existing = document.getElementById("colony-inline-editor-panel");
    if (existing) existing.remove();

    if (!this.hasPermission("write") || !this.colonyDetailEditMode) return;
    this.ensureColonyDetailPhotoState(col);

    const projectOptions = this.projects.map(project => `
      <option value="${project.uuid}" ${project.uuid === col.projectId ? "selected" : ""}>${escapeHtml(project.name)}</option>
    `).join("");
    const statusOptions = [
      ["healthy", "Healthy"],
      ["founding", "Founding"],
      ["hibernation", "Hibernation"],
      ["decline", "Decline"],
      ["archived", "Archived"]
    ].map(([value, label]) => `
      <option value="${value}" ${col.status === value ? "selected" : ""}>${label}</option>
    `).join("");

    overviewTab.insertAdjacentHTML("afterbegin", `
      <div class="widget-panel" id="colony-inline-editor-panel" style="margin-bottom:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:16px;">
          <h3 class="card-title" style="margin:0;">Edit Colony</h3>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="btn btn-secondary" type="button" onclick="app.showEditColonyModal('${col.id}')">Photo Uploader</button>
            <button class="btn btn-primary" type="button" onclick="app.saveColonyDetailEdits()">Save Colony</button>
          </div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px;">
          <div class="form-group">
            <label for="colony-detail-project-input">Project</label>
            <select id="colony-detail-project-input" class="form-control">${projectOptions}</select>
          </div>
          <div class="form-group">
            <label for="colony-detail-name-input">Name</label>
            <input id="colony-detail-name-input" class="form-control" value="${escapeHtml(col.name || "")}">
          </div>
          <div class="form-group">
            <label for="colony-detail-species-input">Species</label>
            <input id="colony-detail-species-input" class="form-control" value="${escapeHtml(col.species || "")}">
          </div>
          <div class="form-group">
            <label for="colony-detail-status-input">Status</label>
            <select id="colony-detail-status-input" class="form-control">${statusOptions}</select>
          </div>
          <div class="form-group">
            <label for="colony-detail-queens-input">Queens</label>
            <input id="colony-detail-queens-input" class="form-control" type="number" value="${escapeHtml(String(col.queens || ""))}">
          </div>
          <div class="form-group">
            <label for="colony-detail-workers-input">Workers</label>
            <input id="colony-detail-workers-input" class="form-control" type="number" value="${escapeHtml(String(col.workers || ""))}">
          </div>
          <div class="form-group">
            <label for="colony-detail-founded-input">Founded</label>
            <input id="colony-detail-founded-input" class="form-control" type="date" value="${escapeHtml(col.founded || "")}">
          </div>
          <div class="form-group">
            <label>Primary Photo</label>
            <div id="colony-detail-primary-photo-picker"></div>
            <div style="font-size:12px; color:var(--text-muted); margin-top:8px;">Choose any image from the Gallery tab as the profile picture.</div>
          </div>
        </div>
        <div class="form-group" style="margin-top:16px;">
          <label for="colony-detail-notes-input">Notes</label>
          <textarea id="colony-detail-notes-input" class="form-control" style="min-height:120px;">${escapeHtml(col.notes || "")}</textarea>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-top:16px;">
          <div class="form-group">
            <label for="colony-detail-setup-input">Setup</label>
            <textarea id="colony-detail-setup-input" class="form-control" style="min-height:120px;">${escapeHtml(col.setup || "")}</textarea>
          </div>
          <div class="form-group">
            <label for="colony-detail-diet-input">Diet</label>
            <textarea id="colony-detail-diet-input" class="form-control" style="min-height:120px;">${escapeHtml(col.diet || "")}</textarea>
          </div>
        </div>
        <div class="form-group" style="margin-top:16px;">
          <label class="form-checkbox">
            <input type="checkbox" id="colony-detail-is-public-input" ${col.isPublic ? "checked" : ""}>
            Make this colony public
          </label>
        </div>
        <div class="form-group" style="margin-top:16px;">
          <label>Public Page Content</label>
          <div class="wysiwyg-toolbar" style="display:flex; gap:5px; margin-bottom:5px; background:var(--bg-card); padding:5px; border-radius:4px; border:1px solid var(--border-color);">
            <button type="button" class="btn btn-secondary" style="padding:4px 8px; font-size:12px;" onclick="document.execCommand('bold', false, null)"><b>B</b></button>
            <button type="button" class="btn btn-secondary" style="padding:4px 8px; font-size:12px;" onclick="document.execCommand('italic', false, null)"><i>I</i></button>
            <button type="button" class="btn btn-secondary" style="padding:4px 8px; font-size:12px;" onclick="document.execCommand('formatBlock', false, 'H2')">H2</button>
            <button type="button" class="btn btn-secondary" style="padding:4px 8px; font-size:12px;" onclick="document.execCommand('insertUnorderedList', false, null)">List</button>
          </div>
          <div id="colony-detail-public-html-input" contenteditable="true" class="form-control" style="min-height:150px; overflow-y:auto; background:var(--bg-input);">${col.publicPageHtml || ""}</div>
        </div>
      </div>
    `);

    const speciesInput = document.getElementById("colony-detail-species-input");
    if (speciesInput) {
      const refresh = () => this.refreshColonyDetailSpeciesContext({ ...col, species: speciesInput.value });
      speciesInput.addEventListener("input", refresh);
      speciesInput.addEventListener("change", refresh);
    }
    this.renderColonyDetailPrimaryPhotoPicker();
  }

  toggleColonyDetailEditMode(forceValue = null) {
    if (!this.hasPermission("write")) return;
    this.colonyDetailEditMode = typeof forceValue === "boolean" ? forceValue : !this.colonyDetailEditMode;
    if (this.colonyDetailEditMode) {
      this.activeColonyTab = "colony-tab-overview";
    }
    this.renderColonyDetail();
  }

  async saveColonyDetailEdits() {
    const col = this.colonies.find(entry => entry.id === this.selectedColonyId);
    if (!col) return;
    if (!this.hasPermission("write")) {
      alert("You do not have permission to modify this colony.");
      return;
    }

    const projectId = document.getElementById("colony-detail-project-input")?.value || col.projectId;
    const name = document.getElementById("colony-detail-name-input")?.value.trim() || "";
    const species = document.getElementById("colony-detail-species-input")?.value.trim() || "";
    const status = document.getElementById("colony-detail-status-input")?.value || "healthy";
    const queens = document.getElementById("colony-detail-queens-input")?.value || "";
    const workers = document.getElementById("colony-detail-workers-input")?.value || "";
    const founded = document.getElementById("colony-detail-founded-input")?.value || "";
    const photo = this.getSelectedColonyDetailPhoto();
    const customPhotos = dedupePhotoList(this.colonyDetailPhotosBuffer);
    const galleryItems = this.colonyDetailGalleryItems.map((item, index) => ({
      path: item.path,
      title: String(item.title || this.getPhotoDisplayName(item.path, index)).trim() || this.getPhotoDisplayName(item.path, index),
      description: String(item.description || "").trim()
    }));
    const notes = document.getElementById("colony-detail-notes-input")?.value || "";
    const setup = document.getElementById("colony-detail-setup-input")?.value || "";
    const diet = document.getElementById("colony-detail-diet-input")?.value || "";
    const isPublic = document.getElementById("colony-detail-is-public-input")?.checked || false;
    const publicPageHtml = document.getElementById("colony-detail-public-html-input")?.innerHTML || "";

    if (!name || !species) {
      alert("Name and species are required.");
      return;
    }

    const oldProjectId = col.projectId;
    if (oldProjectId && oldProjectId !== projectId) {
      if (this.workspaceDir) {
        await this.deleteRecord("colonies", col.id, col);
      }
      this.events.filter(e => e.colonyId === col.id).forEach(e => {
        const oldRecord = { ...e };
        e.projectId = projectId;
        if (this.workspaceDir) {
          this.deleteRecord("events", e.id, oldRecord);
          this.writeRecord("events", e);
        }
      });
      this.reminders.filter(r => r.colonyId === col.id).forEach(r => {
        const oldRecord = { ...r };
        r.projectId = projectId;
        if (this.workspaceDir) {
          this.deleteRecord("reminders", r.id, oldRecord);
          this.writeRecord("reminders", r);
        }
      });
      this.maps.filter(m => m.colonyId === col.id).forEach(m => {
        const oldRecord = { ...m };
        m.projectId = projectId;
        if (this.workspaceDir) {
          this.deleteRecord("maps", m.id, oldRecord);
          this.writeRecord("maps", m);
        }
      });
      this.zones.filter(z => this.maps.some(m => m.id === z.mapId && m.colonyId === col.id)).forEach(z => {
        const oldRecord = { ...z };
        z.projectId = projectId;
        if (this.workspaceDir) {
          this.deleteRecord("zones", z.id, oldRecord);
          this.writeRecord("zones", z);
        }
      });
      this.automationRules.filter(r => this.zones.some(z => z.id === r.zoneId && this.maps.some(m => m.id === z.mapId && m.colonyId === col.id))).forEach(r => {
        const oldRecord = { ...r };
        r.projectId = projectId;
        if (this.workspaceDir) {
          this.deleteRecord("rules", r.id, oldRecord);
          this.writeRecord("rules", r);
        }
      });
    }

    col.projectId = projectId;
    col.name = name;
    col.species = species;
    col.status = status;
    col.queens = queens;
    col.workers = workers;
    col.founded = founded;
    col.photo = photo;
    col.customPhotos = customPhotos;
    col.galleryItems = galleryItems;
    col.notes = notes;
    col.setup = setup;
    col.diet = diet;
    col.isPublic = isPublic;
    col.publicPageHtml = publicPageHtml;

    await this.writeRecord("colonies", col);
    this.colonyDetailEditMode = false;
    this.activeProjectId = projectId;
    this.renderSidebar();
    this.renderColonyDetail();
    alert("Colony details saved.");
  }

  getColonySensorSnapshot(colonyId) {
    const cache = window.sensorCache || {};
    if (!colonyId) return [];
    const relatedMaps = this.maps.filter(map => map.colonyId === colonyId);
    const relatedZones = this.zones.filter(zone => relatedMaps.some(map => map.id === zone.mapId));
    return relatedZones.map(zone => ({
      zoneId: zone.id,
      zoneName: zone.name,
      mapId: zone.mapId,
      temperatureSensor: zone.tempSensor || "",
      humiditySensor: zone.humSensor || "",
      temperatureValue: zone.tempSensor ? cache[zone.tempSensor] || "" : "",
      humidityValue: zone.humSensor ? cache[zone.humSensor] || "" : ""
    }));
  }

  getColonyConditionsHistory() {
    const pointsCount = 10;
    const history = [];
    for (let i = 0; i < pointsCount; i++) {
      const hoursAgo = (pointsCount - 1 - i) * 2.5;
      const temperature = 22.5 + Math.sin(i / 1.5) * 1.5 + (i % 2 === 0 ? 0.3 : -0.3);
      const humidity = 50.0 + Math.cos(i / 2) * 5 + (i % 2 === 0 ? -1.5 : 1.5);
      history.push({
        hoursAgo: Number(hoursAgo.toFixed(1)),
        temperatureC: Number(temperature.toFixed(1)),
        humidityPct: Number(humidity.toFixed(1))
      });
    }
    return history;
  }

  getDefaultColonyAiInsightsPayload(colony = null) {
    const targetColony = colony || this.colonies.find(entry => entry.id === this.selectedColonyId) || null;
    return {
      colonyId: targetColony ? targetColony.id : "",
      colonyName: targetColony ? targetColony.name : "",
      generatedAt: new Date().toISOString(),
      overallStatus: "info",
      summary: targetColony
        ? `Insights for ${targetColony.name} will appear here. Upload an LLM JSON result or generate the local heuristic analysis.`
        : "Select a colony to generate insights.",
      rows: [
        {
          category: "Overview",
          status: "info",
          insight: "No AI insights applied yet.",
          recommendation: "Upload an AI result JSON or run the local scan."
        }
      ]
    };
  }

  normalizeColonyAiInsightsPayload(payload) {
    if (!payload || typeof payload !== "object") return null;
    const source = payload.colonyAiInsights && typeof payload.colonyAiInsights === "object"
      ? payload.colonyAiInsights
      : payload;
    if (!Array.isArray(source.rows)) return null;
    return {
      colonyId: String(source.colonyId || this.selectedColonyId || ""),
      colonyName: String(source.colonyName || ""),
      generatedAt: String(source.generatedAt || new Date().toISOString()),
      overallStatus: String(source.overallStatus || "info"),
      summary: String(source.summary || ""),
      rows: source.rows.map(row => ({
        category: String(row.category || ""),
        status: String(row.status || "info"),
        insight: String(row.insight || ""),
        recommendation: String(row.recommendation || "")
      }))
    };
  }

  getColonyAiInsightsSchemaTemplate() {
    return {
      colonyAiInsights: {
        colonyId: "selected colony id",
        colonyName: "selected colony name",
        generatedAt: "2026-06-27T12:00:00.000Z",
        overallStatus: "success | info | warning | danger",
        summary: "Short overall assessment of the colony across all tabs.",
        rows: [
          {
            category: "Feeding",
            status: "warning",
            insight: "No feeding observation logged in the last 6 days.",
            recommendation: "Add a feeding task and log the next protein or seed feeding."
          }
        ]
      }
    };
  }

  getColonyAiInsightsInstructions() {
    return [
      "Review all colony tabs in the provided JSON context: overview, journal, reminders, maps, conditions, and current AI insights.",
      "Return a fenced ```json block or raw JSON using the colonyAiInsights schema.",
      "Summarize cross-tab findings and provide actionable recommendations per row.",
      "Keep statuses limited to success, info, warning, or danger."
    ].join("\n");
  }

  getCurrentColonyAiContextExport() {
    const selectedColony = this.colonies.find(colony => colony.id === this.selectedColonyId) || null;
    const activeProject = this.getActiveProject() || null;
    const speciesContext = selectedColony ? this.buildSpeciesContext(selectedColony.species) : null;
    const relatedEvents = selectedColony
      ? this.events.filter(item => item.colonyId === selectedColony.id).sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
      : [];
    const relatedReminders = selectedColony
      ? this.reminders.filter(item => item.colonyId === selectedColony.id)
      : [];
    const relatedMaps = selectedColony
      ? this.maps.filter(item => item.colonyId === selectedColony.id)
      : [];
    const relatedZones = selectedColony
      ? this.zones.filter(zone => relatedMaps.some(map => map.id === zone.mapId))
      : [];
    const relatedAutomationRules = selectedColony
      ? this.automationRules.filter(rule => relatedZones.some(zone => zone.id === rule.zoneId))
      : [];
    const sensorSnapshot = selectedColony ? this.getColonySensorSnapshot(selectedColony.id) : [];
    const currentInsights = this.colonyAiInsightsState && this.colonyAiInsightsState.colonyId === this.selectedColonyId
      ? this.colonyAiInsightsState
      : this.getDefaultColonyAiInsightsPayload(selectedColony);

    return {
      schemaVersion: "antai.colony.ai.context/v2",
      exportedAt: new Date().toISOString(),
      llmTask: "Review every colony tab and produce actionable AI insights that can be rendered into the editable AI Insights table.",
      llmInstructions: this.getColonyAiInsightsInstructions(),
      aiInsightsImportSchema: this.getColonyAiInsightsSchemaTemplate(),
      project: activeProject,
      colony: selectedColony,
      tabs: {
        overview: {
          colonySummary: selectedColony ? {
            name: selectedColony.name,
            species: selectedColony.species,
            status: selectedColony.status,
            queens: selectedColony.queens,
            workers: selectedColony.workers,
            founded: selectedColony.founded,
            notes: selectedColony.notes || "",
            setup: selectedColony.setup || "",
            diet: selectedColony.diet || "",
            photo: selectedColony.photo || "",
            customPhotos: normalizePhotoList(selectedColony.customPhotos),
            galleryItems: this.getNormalizedColonyGalleryItems(selectedColony),
            isPublic: Boolean(selectedColony.isPublic),
            publicPageHtml: selectedColony.publicPageHtml || ""
          } : null,
          speciesContext
        },
        journal: {
          totalEvents: relatedEvents.length,
          events: relatedEvents
        },
        reminders: {
          totalReminders: relatedReminders.length,
          reminders: relatedReminders
        },
        maps: {
          maps: relatedMaps,
          zones: relatedZones,
          automationRules: relatedAutomationRules
        },
        gallery: {
          profilePhoto: selectedColony ? (selectedColony.photo || "") : "",
          photos: selectedColony ? this.buildColonyPhotoList(selectedColony) : [],
          items: selectedColony ? this.getNormalizedColonyGalleryItems(selectedColony) : []
        },
        conditions: {
          sensorSnapshot,
          recentHistory: this.getColonyConditionsHistory()
        },
        aiInsights: currentInsights
      }
    };
  }

  buildColonyAiInsightsPrompt() {
    const context = this.getCurrentColonyAiContextExport();
    return [
      "# Colony AI Insights",
      "Analyze the attached colony JSON context from AntAI.",
      "",
      "Requirements:",
      this.getColonyAiInsightsInstructions(),
      "",
      "Return JSON schema:",
      JSON.stringify(this.getColonyAiInsightsSchemaTemplate(), null, 2),
      "",
      "Context JSON:",
      JSON.stringify(context, null, 2)
    ].join("\n");
  }

  copyColonyAiInsightsPrompt() {
    this.copyPreparedPrompt(this.buildColonyAiInsightsPrompt());
  }

  getCurrentViewFormContext() {
    const activeView = document.querySelector('.view.active');
    if (!activeView) return { error: "No active view found" };
    
    const fieldsToFulfill = [];
    const responseSchema = {};
    
    activeView.querySelectorAll('input, select, textarea').forEach(el => {
      if (el.type === 'hidden' || el.style.display === 'none' || el.type === 'file') return;
      if (!el.id) return;
      
      const labelEl = activeView.querySelector(`label[for="${el.id}"]`);
      const labelText = labelEl ? labelEl.innerText.trim() : "";
      
      // Determine default value
      let defVal = "";
      if (el.tagName === 'SELECT') {
        const defaultOpt = el.querySelector('option[selected]') || el.options[0];
        defVal = defaultOpt ? defaultOpt.value : "";
      } else {
        defVal = el.defaultValue || "";
      }
      
      // If the field hasn't been changed from its default, output empty
      let outValue = el.value;
      if (outValue === defVal) {
        outValue = "";
      }
      
      fieldsToFulfill.push({
        fieldId: el.id,
        label: labelText,
        placeholder: el.placeholder || "",
        type: el.type,
        currentValue: outValue
      });
      
      let schemaDesc = `value for ${labelText || el.id}`;
      if (defVal) {
        schemaDesc += ` (e.g. ${defVal})`;
      }
      responseSchema[el.id] = schemaDesc;
    });
    
    const viewTitleEl = activeView.querySelector('h1, h2, h3');
    const viewDescEl = activeView.querySelector('p');
    
    return {
      formName: viewTitleEl ? viewTitleEl.innerText.trim() : activeView.id,
      formDescription: viewDescEl ? viewDescEl.innerText.trim() : "",
      fieldsToFulfill,
      responseSchema
    };
  }

  downloadActiveColonyDataFile() {
    if (this.currentView === "colony-detail" && this.selectedColonyId) {
      const payload = this.getCurrentColonyAiContextExport();
      this.downloadJsonFile(`antai-colony-ai-context-${Date.now()}.json`, payload);
      return;
    }
    const payload = this.getCurrentViewFormContext();
    this.downloadJsonFile(`antai-form-context-${Date.now()}.json`, payload);
  }

  getPreparedPrompts() {
    return Array.isArray(this.preparedPrompts) ? this.preparedPrompts : [];
  }

  async loadMarkdownFile(filePath) {
    const res = await fetch(filePath);
    if (!res.ok) {
      throw new Error(`Failed to load ${filePath}: HTTP ${res.status}`);
    }
    return parseMarkdownWithFrontMatter(await res.text());
  }

  parsePromptFileList(rawValue) {
    return String(rawValue || "")
      .split(/\r?\n|,/)
      .map(value => value.trim())
      .filter(value => value && !value.startsWith("#"));
  }

  async loadPreparedPrompts() {
    this.preparedPromptsLoaded = false;
    this.preparedPromptsLoadError = "";
    this.preparedPrompts = [];
    this.preparedPromptCommon = "";
    try {
      const indexParsed = await this.loadMarkdownFile("data/prompts/index.md");
      const commonFile = (indexParsed.metadata.commonFile || "common.md").trim();
      const promptFiles = this.parsePromptFileList(indexParsed.metadata.promptFiles || indexParsed.content);

      if (commonFile) {
        const commonParsed = await this.loadMarkdownFile(`data/prompts/${commonFile}`);
        this.preparedPromptCommon = commonParsed.content.trim();
      }

      const prompts = [];
      for (const fileName of promptFiles) {
        const parsed = await this.loadMarkdownFile(`data/prompts/${fileName}`);
        const key = String(parsed.metadata.key || fileName.replace(/\.md$/i, "")).trim();
        prompts.push({
          key,
          title: parsed.metadata.title || key,
          category: parsed.metadata.category || "General",
          summary: parsed.metadata.summary || "",
          order: Number(parsed.metadata.order || 0),
          body: parsed.content.trim(),
          fileName,
          sourcePath: `data/prompts/${fileName}`
        });
      }

      prompts.sort((a, b) => (a.order - b.order) || a.title.localeCompare(b.title));
      this.preparedPrompts = prompts;
    } catch (err) {
      console.error("Failed to load prepared prompts:", err);
      this.preparedPromptsLoadError = err.message || "Failed to load prepared prompts.";
    } finally {
      this.preparedPromptsLoaded = true;
      this.renderPreparedPromptList();
    }
  }

  getPreparedPromptContext() {
    const context = this.getCurrentAiContextExport();
    return {
      colonyName: context.selectedColony ? context.selectedColony.name : "the active colony",
      speciesName: context.selectedColony ? context.selectedColony.species : "the selected species",
      projectName: context.project ? context.project.name : "the active project",
      schemaReminder: this.getAiResultSchemaInstructions(),
      contextJson: JSON.stringify(context, null, 2),
      resultSchemaJson: JSON.stringify(this.getAiResultSchemaTemplate(), null, 2)
    };
  }

  renderPromptTemplate(template, values = {}) {
    return String(template || "").replace(/\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}/g, (_, token) => {
      const parts = token.split(".");
      let current = values;
      for (const part of parts) {
        if (current == null) return "";
        current = current[part];
      }
      return current == null ? "" : String(current);
    });
  }

  buildPreparedPromptText(item) {
    const context = this.getPreparedPromptContext();
    const commonText = this.renderPromptTemplate(this.preparedPromptCommon, context).trim();
    const bodyText = this.renderPromptTemplate(item.body, context).trim();
    return [
      `# ${item.title}`,
      item.summary ? `> ${item.summary}` : "",
      commonText,
      bodyText
    ].filter(Boolean).join("\n\n").trim();
  }

  ensureAiPaneVisible() {
    if (this.currentView === "auth") return;
    if (!this.aiPaneHidden) return;
    this.aiPaneHidden = false;
    this.writeCache("antai-ai-pane-hidden-v1", this.aiPaneHidden);
    this.applyShellLayout();
  }

  copyPreparedPromptByKey(promptKey) {
    const prompt = this.getPreparedPrompts().find(item => item.key === promptKey);
    if (!prompt) {
      alert(`Prepared prompt not found: ${promptKey}`);
      return;
    }
    this.ensureAiPaneVisible();
    const searchInput = document.getElementById("ai-prompt-search");
    if (searchInput) {
      searchInput.value = "";
    }
    this.copyPreparedPrompt(this.buildPreparedPromptText(prompt));
    this.renderPreparedPromptList();
  }

  buildAiActionBar(promptKey, label) {
    const prompt = this.getPreparedPrompts().find(item => item.key === promptKey);
    const title = prompt ? prompt.title : label || promptKey;
    const summary = prompt ? prompt.summary : "";
    const useColonyInsightsWorkflow = this.currentView === "colony-detail" && Boolean(this.selectedColonyId);
    const summaryHtml = summary
      ? `<span class="ai-action-summary">${escapeHtml(truncateText(summary, 100))}</span>`
      : "";
    return `
      <div class="ai-action-bar">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="stroke:var(--accent-primary); flex-shrink:0;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        <span class="ai-action-title">${escapeHtml(title)}</span>
        ${summaryHtml}
        <div class="ai-action-buttons">
          <button class="btn btn-secondary ai-action-button" onclick="app.downloadActiveColonyDataFile()">📥 1. Download AI Context</button>
          <button class="btn btn-primary ai-action-button" onclick="${useColonyInsightsWorkflow ? "app.copyColonyAiInsightsPrompt()" : `app.copyPreparedPromptByKey('${promptKey}')`}">📋 2. Copy AI Prompt</button>
          <button class="btn btn-secondary ai-action-button" onclick="app.triggerAiResultImport()">📤 3. Upload AI Result</button>
        </div>
      </div>`;
  }

  async copyPreparedPrompt(promptText) {
    try {
      await navigator.clipboard.writeText(promptText);
      const notice = document.getElementById("ai-iframe-notice");
      if (notice) {
        notice.textContent = "Prepared prompt copied to clipboard. Paste it into the selected LLM page together with the downloaded colony context file.";
      }
    } catch (err) {
      alert("Failed to copy the prepared prompt to the clipboard.");
    }
  }

  renderPreparedPromptList() {
    const container = document.getElementById("ai-prompt-list");
    if (!container) return;
    if (!this.preparedPromptsLoaded) {
      container.innerHTML = `<div class="ai-prompt-item"><div class="ai-prompt-item-text">Loading prepared prompts from the data folder...</div></div>`;
      return;
    }
    if (this.preparedPromptsLoadError) {
      container.innerHTML = `<div class="ai-prompt-item"><div class="ai-prompt-item-text">Failed to load prepared prompts: ${escapeHtml(this.preparedPromptsLoadError)}</div></div>`;
      return;
    }
    const query = (document.getElementById("ai-prompt-search")?.value || "").trim().toLowerCase();
    const prompts = this.getPreparedPrompts().filter(item => {
      if (!query) return true;
      const renderedText = this.buildPreparedPromptText(item).toLowerCase();
      return item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        renderedText.includes(query);
    });
    if (!prompts.length) {
      container.innerHTML = `<div class="ai-prompt-item"><div class="ai-prompt-item-text">No prepared prompts match your search.</div></div>`;
      return;
    }
    container.innerHTML = prompts.map(item => `
      <div class="ai-prompt-item">
        <div class="ai-prompt-item-title">${escapeHtml(item.title)}</div>
        <div class="ai-prompt-item-text">${escapeHtml(truncateText(item.summary || this.buildPreparedPromptText(item), 220))}</div>
        <div class="ai-prompt-item-actions">
          <span style="font-size:11px; color:var(--text-muted); align-self:center;">${escapeHtml(item.category)}</span>
          <button class="btn btn-secondary" style="padding:8px 10px; font-size:12px;" onclick="app.copyPreparedPrompt(${JSON.stringify(this.buildPreparedPromptText(item))})">📋 2. Copy AI Prompt</button>
        </div>
      </div>
    `).join("");
  }

  getAiResultSchemaTemplate() {
    return {
      "example-field-id": "value to fill in the field",
      "another-field-id": "another value"
    };
  }

  getAiResultSchemaInstructions() {
    return [
      "Return a fenced ```json block containing a JSON object.",
      "The JSON object must map form field IDs to their intended values.",
      "Use the provided form context to determine the field IDs to fulfill."
    ].join("\n");
  }

  buildAiPromptWithSchema(query) {
    const selectedColony = this.colonies.find(colony => colony.id === this.selectedColonyId) || null;
    const dataContext = {
      activeProject: this.getActiveProject(),
      selectedColony,
      colonies: this.colonies,
      recentEvents: this.events.slice(0, 10),
      reminders: this.reminders.slice(0, 10),
      speciesCatalogSample: this.speciesList.slice(0, 20)
    };
    return [
      `User request: ${query}`,
      "",
      "AntAI data context:",
      JSON.stringify(dataContext),
      "",
      this.getAiResultSchemaInstructions()
    ].join("\n");
  }

  extractStructuredAiResult(text) {
    const source = String(text || "");
    const fencedMatches = source.match(/```json\s*([\s\S]*?)```/i);
    const candidate = fencedMatches ? fencedMatches[1].trim() : source.trim();
    if (!candidate) return null;
    try {
      const parsed = JSON.parse(candidate);
      return this.validateAiResultSchema(parsed) ? parsed : null;
    } catch (err) {
      return null;
    }
  }

  validateAiResultSchema(payload) {
    if (payload === null || typeof payload !== 'object' || Array.isArray(payload)) {
      throw new Error("Payload must be a flat JSON object.");
    }
    if (this.normalizeColonyAiInsightsPayload(payload)) {
      return true;
    }
    
    const context = this.getCurrentViewFormContext();
    if (context && context.fieldsToFulfill) {
      const missingFields = context.fieldsToFulfill.filter(f => !(f.fieldId in payload));
      if (missingFields.length > 0) {
        throw new Error(`Missing expected fields: ${missingFields.map(f => f.fieldId).join(', ')}`);
      }
    }
    return true;
  }

  downloadJsonFile(filename, payload) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  downloadAiSchema() {
    const payload = this.getCurrentViewFormContext();
    this.downloadJsonFile(`antai-form-fields-${Date.now()}.json`, payload);
  }

  downloadLatestAiResult() {
    const structured = this.lastStructuredAiResult || this.extractStructuredAiResult(this.lastAiResponseText);
    if (!structured) {
      alert("No valid structured AI result is available yet. Ask the AI for a structured response first.");
      return;
    }
    this.downloadJsonFile(`antai-ai-result-${Date.now()}.json`, structured);
  }

  triggerAiResultImport() {
    const input = document.getElementById("ai-result-import-input");
    if (input) input.click();
  }

  async handleAiResultFileSelected(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const payload = JSON.parse(text);
      this.validateAiResultSchema(payload);
      await this.applyAiResult(payload);
      this.lastStructuredAiResult = payload;
      alert("AI result imported into AntAI.");
    } catch (err) {
      alert(`Failed to import AI result: ${err.message}`);
    } finally {
      event.target.value = "";
    }
  }

  async handleColonyPhotosSelected(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    if (!Array.isArray(this.colonyPhotoEntries)) {
      this.colonyPhotoEntries = [];
    }
    if (typeof this.colonySelectedPhotoIndex !== "number") {
      this.colonySelectedPhotoIndex = -1;
    }
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.colonyPhotoEntries.push(this.createPendingColonyPhotoEntry(file));
    }
    
    if (this.colonySelectedPhotoIndex === -1 && this.colonyPhotoEntries.length > 0) {
      this.colonySelectedPhotoIndex = 0;
    }
    this.renderColonyPhotosPreview();
    
    // Clear input so same files can be re-selected if needed
    event.target.value = "";
  }

  renderColonyPhotosPreview() {
    const container = document.getElementById("colony-photos-preview");
    const hiddenInput = document.getElementById("colony-selected-photo");
    if (!container || !hiddenInput) return;
    if (!Array.isArray(this.colonyPhotoEntries)) {
      this.colonyPhotoEntries = [];
    }
    if (typeof this.colonySelectedPhotoIndex !== "number") {
      this.colonySelectedPhotoIndex = -1;
    }
    
    container.innerHTML = "";
    this.colonyPhotoEntries.forEach((entry, index) => {
      const img = document.createElement("img");
      img.src = entry.src;
      img.style.width = "60px";
      img.style.height = "60px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "4px";
      img.style.cursor = "pointer";
      img.style.flexShrink = "0";
      img.style.border = this.colonySelectedPhotoIndex === index ? "3px solid var(--accent-primary)" : "1px solid transparent";
      img.onclick = () => {
        this.colonySelectedPhotoIndex = index;
        this.renderColonyPhotosPreview();
      };
      
      const wrap = document.createElement("div");
      wrap.style.position = "relative";
      wrap.style.display = "inline-block";
      
      const removeBtn = document.createElement("div");
      removeBtn.innerHTML = "×";
      removeBtn.style.position = "absolute";
      removeBtn.style.top = "-5px";
      removeBtn.style.right = "-5px";
      removeBtn.style.background = "red";
      removeBtn.style.color = "white";
      removeBtn.style.borderRadius = "50%";
      removeBtn.style.width = "18px";
      removeBtn.style.height = "18px";
      removeBtn.style.lineHeight = "16px";
      removeBtn.style.textAlign = "center";
      removeBtn.style.cursor = "pointer";
      removeBtn.style.fontSize = "14px";
      removeBtn.onclick = (e) => {
        e.stopPropagation();
        const [removed] = this.colonyPhotoEntries.splice(index, 1);
        if (removed && removed.kind === "pending" && removed.src) {
          URL.revokeObjectURL(removed.src);
        }
        if (this.colonySelectedPhotoIndex === index) {
          this.colonySelectedPhotoIndex = this.colonyPhotoEntries.length > 0 ? 0 : -1;
        } else if (this.colonySelectedPhotoIndex > index) {
          this.colonySelectedPhotoIndex--;
        }
        this.renderColonyPhotosPreview();
      };
      
      wrap.appendChild(img);
      wrap.appendChild(removeBtn);
      container.appendChild(wrap);
    });
    
    if (this.colonySelectedPhotoIndex >= 0 && this.colonySelectedPhotoIndex < this.colonyPhotoEntries.length) {
      const selectedEntry = this.colonyPhotoEntries[this.colonySelectedPhotoIndex];
      hiddenInput.value = selectedEntry && selectedEntry.kind === "stored" ? selectedEntry.src : "";
    } else {
      hiddenInput.value = "";
    }
  }

  resolveColonyFromAiRef(colonyRef) {
    if (!colonyRef) return null;
    return this.colonies.find(colony =>
      (colonyRef.id && colony.id === colonyRef.id) ||
      (colonyRef.name && colony.name === colonyRef.name)
    ) || null;
  }

  appendFieldValue(originalValue, appendedValue) {
    const base = String(originalValue || "").trim();
    const addition = String(appendedValue || "").trim();
    if (!addition) return base;
    if (!base) return addition;
    return `${base}\n\n${addition}`;
  }

  async applyAiResult(payload) {
    const colonyInsights = this.normalizeColonyAiInsightsPayload(payload);
    if (colonyInsights) {
      this.applyColonyAiInsightsResult(colonyInsights);
      console.log("Applied AI insights result.");
      return;
    }
    let appliedCount = 0;
    for (const [id, value] of Object.entries(payload)) {
      const el = document.getElementById(id);
      if (el) {
        el.value = value;
        // Trigger change event to update any binding or UI logic
        el.dispatchEvent(new Event('change', { bubbles: true }));
        el.dispatchEvent(new Event('input', { bubbles: true }));
        appliedCount++;
      }
    }
    console.log(`Applied ${appliedCount} fields from AI result.`);
  }

  applyColonyAiInsightsResult(payload) {
    this.colonyAiInsightsState = payload;
    this.renderColonyAiInsightsPanel();
  }

  getStatusBadgeClass(status) {
    if (status === "success") return "badge-success";
    if (status === "warning") return "badge-warning";
    if (status === "danger") return "badge-danger";
    return "badge-info";
  }

  buildColonyAiInsightsClipboardText() {
    const colony = this.colonies.find(entry => entry.id === this.selectedColonyId) || null;
    const payload = this.colonyAiInsightsState && this.colonyAiInsightsState.colonyId === this.selectedColonyId
      ? this.colonyAiInsightsState
      : this.getDefaultColonyAiInsightsPayload(colony);
    const lines = [
      `Summary\t${payload.summary || ""}`,
      "Category\tStatus\tInsight\tRecommendation"
    ];
    (payload.rows || []).forEach(row => {
      lines.push([
        row.category || "",
        row.status || "",
        (row.insight || "").replace(/\n/g, " "),
        (row.recommendation || "").replace(/\n/g, " ")
      ].join("\t"));
    });
    return lines.join("\n");
  }

  async copyColonyAiInsightsTable() {
    try {
      await navigator.clipboard.writeText(this.buildColonyAiInsightsClipboardText());
    } catch (err) {
      alert("Failed to copy AI insights table.");
    }
  }

  readColonyAiInsightsFromEditor() {
    const summaryEl = document.getElementById("colony-ai-summary-input");
    const rowEls = document.querySelectorAll("#colony-ai-insights-table tbody tr");
    const colony = this.colonies.find(entry => entry.id === this.selectedColonyId) || null;
    const rows = Array.from(rowEls).map(row => ({
      category: row.querySelector('[data-col="category"]')?.textContent.trim() || "",
      status: row.querySelector('[data-col="status"]')?.textContent.trim() || "info",
      insight: row.querySelector('[data-col="insight"]')?.textContent.trim() || "",
      recommendation: row.querySelector('[data-col="recommendation"]')?.textContent.trim() || ""
    })).filter(row => row.category || row.insight || row.recommendation);
    this.colonyAiInsightsState = {
      colonyId: colony ? colony.id : "",
      colonyName: colony ? colony.name : "",
      generatedAt: new Date().toISOString(),
      overallStatus: this.colonyAiInsightsState?.overallStatus || "info",
      summary: summaryEl ? summaryEl.value.trim() : "",
      rows: rows.length ? rows : this.getDefaultColonyAiInsightsPayload(colony).rows
    };
  }

  addColonyAiInsightsRow() {
    this.readColonyAiInsightsFromEditor();
    if (!this.colonyAiInsightsState) {
      this.colonyAiInsightsState = this.getDefaultColonyAiInsightsPayload();
    }
    this.colonyAiInsightsState.rows.push({
      category: "",
      status: "info",
      insight: "",
      recommendation: ""
    });
    this.renderColonyAiInsightsPanel();
  }

  renderColonyAiInsightsPanel() {
    const outEl = document.getElementById("colony-ai-insights-output");
    if (!outEl) return;
    const colony = this.colonies.find(entry => entry.id === this.selectedColonyId) || null;
    const payload = this.colonyAiInsightsState && this.colonyAiInsightsState.colonyId === this.selectedColonyId
      ? this.colonyAiInsightsState
      : this.getDefaultColonyAiInsightsPayload(colony);
    const badgeClass = this.getStatusBadgeClass(payload.overallStatus);
    const rows = Array.isArray(payload.rows) && payload.rows.length ? payload.rows : this.getDefaultColonyAiInsightsPayload(colony).rows;

    outEl.innerHTML = `
      <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px; display:flex; flex-direction:column; gap:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
          <strong style="font-family: var(--font-heading); font-size:16px;">Editable AI Insights</strong>
          <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
            <span class="badge ${badgeClass}">${escapeHtml(payload.overallStatus || "info")}</span>
            <button class="btn btn-secondary" style="padding:6px 10px; font-size:12px;" onclick="app.copyColonyAiInsightsTable()">Copy Table</button>
            <button class="btn btn-secondary" style="padding:6px 10px; font-size:12px;" onclick="app.addColonyAiInsightsRow()">Add Row</button>
          </div>
        </div>
        <div>
          <label for="colony-ai-summary-input" style="display:block; margin-bottom:6px; font-size:12px; color:var(--text-muted);">Summary</label>
          <textarea id="colony-ai-summary-input" class="form-control" style="min-height:88px;" oninput="app.readColonyAiInsightsFromEditor()">${escapeHtml(payload.summary || "")}</textarea>
        </div>
        <div style="overflow-x:auto;">
          <table id="colony-ai-insights-table" style="width:100%; border-collapse:collapse; font-size:12.5px;">
            <thead>
              <tr>
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border-color);">Category</th>
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border-color);">Status</th>
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border-color);">Insight</th>
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border-color);">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map(row => `
                <tr>
                  <td contenteditable="true" data-col="category" oninput="app.readColonyAiInsightsFromEditor()" style="vertical-align:top; padding:10px; border-bottom:1px solid var(--border-color); min-width:120px;">${escapeHtml(row.category || "")}</td>
                  <td contenteditable="true" data-col="status" oninput="app.readColonyAiInsightsFromEditor()" style="vertical-align:top; padding:10px; border-bottom:1px solid var(--border-color); min-width:90px;">${escapeHtml(row.status || "info")}</td>
                  <td contenteditable="true" data-col="insight" oninput="app.readColonyAiInsightsFromEditor()" style="vertical-align:top; padding:10px; border-bottom:1px solid var(--border-color); min-width:260px; white-space:pre-wrap;">${escapeHtml(row.insight || "")}</td>
                  <td contenteditable="true" data-col="recommendation" oninput="app.readColonyAiInsightsFromEditor()" style="vertical-align:top; padding:10px; border-bottom:1px solid var(--border-color); min-width:260px; white-space:pre-wrap;">${escapeHtml(row.recommendation || "")}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  applyBootstrapData(snapshot) {
    this.users = snapshot.users || [];
    this.passwordStore = snapshot.passwordStore || {};
    this.projects = snapshot.projects || [];
    this.activeProjectId = this.projects[0] ? this.projects[0].uuid : null;
    this.colonies = snapshot.colonies || [];
    this.events = snapshot.events || [];
    this.reminders = snapshot.reminders || [];
    this.sightings = snapshot.sightings || [];
    this.maps = snapshot.maps || [];
    this.zones = snapshot.zones || [];
    this.automationRules = snapshot.automationRules || [];
    this.apiKeys = snapshot.apiKeys || {};
    this.speciesList = snapshot.speciesList || [];
    this.newsList = snapshot.newsList || [];
  }

  async init() {
    if (!this.isFileMode()) {
      await this.loadData();
    } else {
      this.currentUser = null;
      this.users = [];
      this.projects = [];
      this.colonies = [];
      this.events = [];
      this.reminders = [];
      this.sightings = [];
      this.maps = [];
      this.zones = [];
      this.automationRules = [];
      this.speciesList = [];
      this.newsList = [];
    }
    await this.initializeSpeciesCatalog();
    await this.loadPreparedPrompts();
    this.setupEventListeners();
    this.populateSpeciesDropdowns();
    this.applyShellLayout();
    this.renderSidebar();
    this.renderSidebarFooter();
    this.renderAIAssistant();
    this.updateWorkspaceStatusUI();
    const savedUserUuid = this.readCache("antai-current-user-uuid-v1");
    if (savedUserUuid && !this.currentUser) {
      this.currentUser = this.users.find(u => u.uuid === savedUserUuid) || null;
    }
    if (this.currentUser) {
      this.navigate("dashboard");
    } else {
      this.navigate("public-home");
    }
    this.startSensorSimulation();
    window.addEventListener("online", () => {
      this.updateSpeciesCatalogStatus("Network restored. Refreshing live species catalog...");
      this.loadLiveSpeciesCatalog(true).catch(err => {
        console.warn("Live species refresh on reconnect failed:", err);
        this.updateSpeciesCatalogStatus("Network restored, but live species refresh failed. Cached data is still available.");
      });
    });
    window.addEventListener("resize", () => {
      this.applyShellLayout();
    });
  }

  async loadSpeciesAndNews() {
    try {
      const res = await fetch("data/app/species.json");
      if (res.ok) {
        this.speciesList = await res.json();
      } else {
        throw new Error("HTTP error " + res.status);
      }
    } catch (err) {
      console.error("Failed to load species from data/app/species.json:", err);
      this.speciesList = [];
    }

    try {
      const res = await fetch("data/app/news.json");
      if (res.ok) {
        this.newsList = await res.json();
      } else {
        throw new Error("HTTP error " + res.status);
      }
    } catch (err) {
      console.error("Failed to load news from data/app/news.json:", err);
      this.newsList = [];
    }
  }

  async resolveGbifSpeciesContext(speciesName) {
    const cacheKey = this.getSpeciesCacheNameKey(speciesName);
    const cached = this.speciesInfoCache[cacheKey];
    const cacheAgeMs = cached && cached.fetchedAt
      ? Date.now() - new Date(cached.fetchedAt).getTime()
      : Number.POSITIVE_INFINITY;
    const oneWeekMs = 7 * 24 * 60 * 60 * 1000;

    if (cached && (!this.isOnline() || cacheAgeMs < oneWeekMs)) {
      return cached.data;
    }

    const existingSpecies = this.getSpeciesByName(speciesName);
    let gbifKey = existingSpecies && existingSpecies.gbifKey ? existingSpecies.gbifKey : null;
    let matchPayload = null;

    if (!gbifKey) {
      const matchRes = await fetch(`https://api.gbif.org/v1/species/match?name=${encodeURIComponent(speciesName)}`);
      if (!matchRes.ok) {
        throw new Error(`Species match failed with HTTP ${matchRes.status}`);
      }
      matchPayload = await matchRes.json();
      gbifKey = matchPayload.usageKey || matchPayload.speciesKey || null;
    }

    if (!gbifKey) {
      return cached ? cached.data : null;
    }

    const [detailRes, descriptionRes, occurrenceRes] = await Promise.all([
      fetch(`https://api.gbif.org/v1/species/${gbifKey}`),
      fetch(`https://api.gbif.org/v1/species/${gbifKey}/descriptions`),
      fetch(`https://api.gbif.org/v1/occurrence/search?taxonKey=${gbifKey}&limit=0&facet=country&facetLimit=8`)
    ]);

    if (!detailRes.ok) {
      throw new Error(`Species detail failed with HTTP ${detailRes.status}`);
    }

    const detail = await detailRes.json();
    const descriptionsPayload = descriptionRes.ok ? await descriptionRes.json() : { results: [] };
    const occurrencePayload = occurrenceRes.ok ? await occurrenceRes.json() : { count: 0, facets: [] };
    const descriptions = Array.isArray(descriptionsPayload.results) ? descriptionsPayload.results : [];
    const bestDescription = descriptions.find(item => item.language === "eng" && item.description)
      || descriptions.find(item => item.description)
      || null;
    const countryFacet = Array.isArray(occurrencePayload.facets)
      ? occurrencePayload.facets.find(facet => facet.field === "COUNTRY")
      : null;

    const liveData = {
      gbifKey,
      scientificName: detail.scientificName || (matchPayload && matchPayload.scientificName) || speciesName,
      canonicalName: detail.canonicalName || (matchPayload && matchPayload.canonicalName) || speciesName,
      commonName: detail.vernacularName || "",
      authorship: detail.authorship || "",
      rank: detail.rank || "SPECIES",
      taxonomicStatus: detail.taxonomicStatus || "",
      family: detail.family || "Formicidae",
      genus: detail.genus || "",
      order: detail.order || "Hymenoptera",
      habitats: detail.habitats || [],
      threatStatuses: detail.threatStatuses || [],
      occurrenceCount: occurrencePayload.count || 0,
      topCountries: countryFacet ? countryFacet.counts.map(entry => `${entry.name} (${entry.count})`) : [],
      summary: bestDescription ? truncateText(bestDescription.description.replace(/<[^>]*>/g, " ")) : "",
      fetchedAt: new Date().toISOString()
    };

    this.speciesInfoCache[cacheKey] = {
      fetchedAt: liveData.fetchedAt,
      data: liveData
    };
    this.writeCache(this.speciesInfoCacheKey, this.speciesInfoCache);

    const speciesEntry = this.getSpeciesByName(speciesName);
    if (speciesEntry) {
      Object.assign(speciesEntry, liveData);
    }

    return liveData;
  }

  buildSpeciesContext(speciesName, liveData = null) {
    const species = this.getSpeciesByName(speciesName);
    if (!species && !liveData) return null;
    const base = species || {};
    const merged = { ...(liveData || {}), ...base };
    if (liveData) {
      merged.scientificName = liveData.scientificName || merged.scientificName || merged.name;
      merged.canonicalName = liveData.canonicalName || merged.canonicalName || merged.name;
      merged.commonName = merged.commonName || liveData.commonName || "";
      merged.occurrenceCount = liveData.occurrenceCount || 0;
      merged.topCountries = liveData.topCountries || [];
      merged.summary = liveData.summary || merged.summary || "";
      merged.family = liveData.family || merged.family || "Formicidae";
      merged.genus = liveData.genus || merged.genus || "";
      merged.order = liveData.order || merged.order || "Hymenoptera";
      merged.habitats = liveData.habitats || merged.habitats || [];
      merged.threatStatuses = liveData.threatStatuses || merged.threatStatuses || [];
    }
    return merged;
  }

  renderSpeciesInfoCard(speciesContext) {
    if (!speciesContext) {
      return `<div style="color: var(--text-muted);">No species context available.</div>`;
    }
    const badges = [
      speciesContext.rank,
      speciesContext.taxonomicStatus,
      speciesContext.habitats && speciesContext.habitats.length ? speciesContext.habitats.join(", ") : ""
    ].filter(Boolean);
    const topCountries = speciesContext.topCountries && speciesContext.topCountries.length
      ? escapeHtml(speciesContext.topCountries.join(", "))
      : "No public occurrence summary cached yet.";
    return `
      <div style="display:flex; flex-direction:column; gap:10px; padding:14px; border:1px solid var(--border-color); border-radius:var(--radius-md); background-color:var(--bg-secondary);">
        <div>
          <strong style="font-size:14px; color:var(--text-primary);">${escapeHtml(speciesContext.scientificName || speciesContext.name)}</strong>
          ${speciesContext.commonName ? `<div style="color:var(--accent-primary); margin-top:4px;">${escapeHtml(speciesContext.commonName)}</div>` : ""}
        </div>
        ${badges.length ? `<div style="font-size:11px; color:var(--text-muted); text-transform:uppercase;">${escapeHtml(badges.join(" • "))}</div>` : ""}
        <div style="font-size:12.5px; color:var(--text-secondary);">
          <strong>Taxonomy:</strong> ${escapeHtml([speciesContext.order, speciesContext.family, speciesContext.genus].filter(Boolean).join(" / "))}
        </div>
        ${speciesContext.summary ? `<div style="font-size:12.5px; color:var(--text-secondary);">${escapeHtml(speciesContext.summary)}</div>` : ""}
        <div style="font-size:12px; color:var(--text-muted);">
          <strong>Occurrence samples:</strong> ${escapeHtml(String(speciesContext.occurrenceCount || 0))}<br>
          <strong>Top countries:</strong> ${topCountries}
        </div>
      </div>
    `;
  }

  renderSpeciesCareHints(speciesContext) {
    const dietHint = speciesContext && speciesContext.diet
      ? `<strong>Care diet reference:</strong> ${escapeHtml(speciesContext.diet)}`
      : "No curated diet reference cached for this species yet.";
    const setupHintParts = [
      speciesContext && speciesContext.founding ? `Founding: ${speciesContext.founding}` : "",
      speciesContext && speciesContext.tempRange ? `Temperature: ${speciesContext.tempRange}` : "",
      speciesContext && speciesContext.humRange ? `Humidity: ${speciesContext.humRange}` : "",
      speciesContext && speciesContext.origin ? `Origin: ${speciesContext.origin}` : ""
    ].filter(Boolean);
    const setupHint = setupHintParts.length
      ? escapeHtml(setupHintParts.join(" • "))
      : "No curated setup guidance cached for this species yet.";
    return { dietHint, setupHint };
  }

  async refreshColonySpeciesContext(speciesName = null) {
    const selectedSpecies = speciesName || document.getElementById("colony-species-select")?.value || "";
    const contextEl = document.getElementById("colony-species-context");
    const setupEl = document.getElementById("colony-setup-context");
    const dietEl = document.getElementById("colony-diet-context");

    if (!selectedSpecies) {
      if (contextEl) contextEl.innerHTML = "Select a species to load taxonomy, occurrence, and care context.";
      if (setupEl) setupEl.innerHTML = "Species-specific setup and founding context will appear here when available.";
      if (dietEl) dietEl.innerHTML = "Species-specific diet guidance will appear here when available.";
      return;
    }

    if (contextEl) contextEl.innerHTML = `<div style="color: var(--text-muted);">Loading species context for ${escapeHtml(selectedSpecies)}...</div>`;

    let liveData = null;
    try {
      if (this.isOnline()) {
        liveData = await this.resolveGbifSpeciesContext(selectedSpecies);
      }
    } catch (err) {
      console.warn(`Failed to refresh live species context for ${selectedSpecies}:`, err);
    }

    const speciesContext = this.buildSpeciesContext(selectedSpecies, liveData);
    if (contextEl) contextEl.innerHTML = this.renderSpeciesInfoCard(speciesContext);

    const hints = this.renderSpeciesCareHints(speciesContext);
    if (setupEl) setupEl.innerHTML = hints.setupHint;
    if (dietEl) dietEl.innerHTML = hints.dietHint;
  }

  async refreshColonyDetailSpeciesContext(colony) {
    const targetColony = colony || this.colonies.find(entry => entry.id === this.selectedColonyId);
    const contextEl = document.getElementById("colony-detail-species-context");
    const setupEl = document.getElementById("colony-detail-setup-context");
    const dietEl = document.getElementById("colony-detail-diet-context");
    const sidebarEl = document.getElementById("colony-detail-sidebar-species-context");
    if (!targetColony || !contextEl || !setupEl || !dietEl) return;

    contextEl.innerHTML = `<div style="color: var(--text-muted);">Loading species context for ${escapeHtml(targetColony.species)}...</div>`;
    if (sidebarEl) {
      sidebarEl.innerHTML = `<div style="font-size:12px; color:var(--text-muted);">Refreshing species context...</div>`;
    }
    let liveData = null;
    try {
      if (this.isOnline()) {
        liveData = await this.resolveGbifSpeciesContext(targetColony.species);
      }
    } catch (err) {
      console.warn(`Failed to refresh detail species context for ${targetColony.species}:`, err);
    }
    const speciesContext = this.buildSpeciesContext(targetColony.species, liveData);
    contextEl.innerHTML = this.renderSpeciesInfoCard(speciesContext);
    if (sidebarEl) {
      const sidebarLines = [
        speciesContext && speciesContext.commonName ? speciesContext.commonName : "",
        speciesContext && speciesContext.origin ? `Origin: ${speciesContext.origin}` : "",
        speciesContext && speciesContext.tempRange ? `Temp: ${speciesContext.tempRange}` : "",
        speciesContext && speciesContext.humRange ? `Humidity: ${speciesContext.humRange}` : ""
      ].filter(Boolean);
      sidebarEl.innerHTML = sidebarLines.length
        ? `<div style="padding:12px; border:1px solid var(--border-color); border-radius:var(--radius-md); background-color:var(--bg-secondary); font-size:12px; color:var(--text-secondary); line-height:1.6;">${escapeHtml(sidebarLines.join(" • "))}</div>`
        : `<div style="font-size:12px; color:var(--text-muted);">No cached sidebar context for this species yet.</div>`;
    }

    const hints = this.renderSpeciesCareHints(speciesContext);
    setupEl.innerHTML = `<div style="font-size:12px; color:var(--text-muted);">${hints.setupHint}</div>`;
    dietEl.innerHTML = `<div style="font-size:12px; color:var(--text-muted);">${hints.dietHint}</div>`;
  }

  populateSpeciesDropdowns() {
    this.renderSpeciesOptions("colony");
    this.renderSpeciesOptions("sighting");
  }

  getSpeciesSelectConfig(target) {
    if (target === "colony") {
      return {
        selectId: "colony-species-select",
        filterId: "colony-species-filter"
      };
    }
    return {
      selectId: "sight-species",
      filterId: "sight-species-filter"
    };
  }

  getFilteredSpeciesList(target) {
    const { filterId } = this.getSpeciesSelectConfig(target);
    const filterValue = document.getElementById(filterId)?.value.trim().toLowerCase() || "";
    if (!filterValue) return this.speciesList;
    return this.speciesList.filter(species => {
      const haystack = [
        species.name,
        species.scientificName,
        species.canonicalName,
        species.commonName,
        species.vernacularName,
        species.genus,
        species.family
      ].filter(Boolean).join(" ").toLowerCase();
      return haystack.includes(filterValue);
    });
  }

  renderSpeciesOptions(target) {
    const { selectId } = this.getSpeciesSelectConfig(target);
    const select = document.getElementById(selectId);
    if (!select) return;

    const currentValue = select.value;
    const filteredSpecies = this.getFilteredSpeciesList(target);
    select.innerHTML = filteredSpecies.map(species => {
      const label = species.commonName
        ? `${species.name} (${species.commonName})`
        : species.name;
      return `<option value="${escapeHtml(species.name)}">${escapeHtml(label)}</option>`;
    }).join("");

    if (currentValue && filteredSpecies.some(species => species.name === currentValue)) {
      select.value = currentValue;
    } else if (filteredSpecies[0]) {
      select.value = filteredSpecies[0].name;
    }
  }

  filterSpeciesOptions(target) {
    this.renderSpeciesOptions(target);
    if (target === "colony") {
      this.refreshColonySpeciesContext();
    }
  }

  showAuthTab(tabName) {
    const tabLogin = document.getElementById("auth-tab-login");
    const tabSignup = document.getElementById("auth-tab-signup");
    const formLogin = document.getElementById("login-form");
    const formSignup = document.getElementById("signup-form");

    if (!tabLogin || !tabSignup || !formLogin || !formSignup) return;

    const showSignup = tabName === "signup";
    tabLogin.classList.toggle("active", !showSignup);
    tabSignup.classList.toggle("active", showSignup);
    formLogin.style.display = showSignup ? "none" : "block";
    formSignup.style.display = showSignup ? "block" : "none";
  }

  isFileMode() {
    return window.location.protocol === "file:";
  }

  updateWorkspaceStatusUI() {
    const connected = Boolean(this.workspaceDir);
    const authStatus = document.getElementById("auth-data-status");
    const authButton = document.getElementById("auth-connect-workspace-btn");
    const profileButton = document.getElementById("connect-workspace-btn");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const guestBtn = document.getElementById("guest-login-btn");

    if (authStatus) {
      authStatus.textContent = connected
        ? "Data folder connected."
        : this.isFileMode()
          ? "Connect the repository data/ folder to enable login and registration."
          : "Using server-backed data from the data/ folder.";
    }

    if (authButton) {
      authButton.textContent = this.isFileMode()
        ? (connected ? "Data Folder Connected" : "Connect data/ Folder")
        : "Data Folder Managed By Server";
      authButton.disabled = !this.isFileMode();
    }

    if (profileButton) {
      profileButton.textContent = this.isFileMode()
        ? (connected ? "Connected to data/" : "Connect data/ Folder")
        : "Data Managed By Server";
      profileButton.disabled = !this.isFileMode();
    }

    const shouldDisableAuth = this.isFileMode() && !connected;
    const toggleForm = (form, disabled) => {
      if (!form) return;
      Array.from(form.elements).forEach(el => {
        el.disabled = disabled;
      });
    };
    toggleForm(loginForm, shouldDisableAuth);
    toggleForm(signupForm, shouldDisableAuth);
    if (guestBtn) guestBtn.disabled = shouldDisableAuth;
  }

  sha1Base64Fallback(text) {
    const bytes = new TextEncoder().encode(text || "");
    const words = [];
    for (let i = 0; i < bytes.length; i++) {
      words[i >> 2] |= bytes[i] << (24 - (i % 4) * 8);
    }
    words[bytes.length >> 2] |= 0x80 << (24 - (bytes.length % 4) * 8);
    words[(((bytes.length + 8) >> 6) << 4) + 15] = bytes.length * 8;

    const w = new Array(80);
    let h0 = 0x67452301;
    let h1 = 0xefcdab89;
    let h2 = 0x98badcfe;
    let h3 = 0x10325476;
    let h4 = 0xc3d2e1f0;

    const rol = (n, bits) => ((n << bits) | (n >>> (32 - bits))) >>> 0;

    for (let i = 0; i < words.length; i += 16) {
      for (let t = 0; t < 16; t++) w[t] = words[i + t] >>> 0 || 0;
      for (let t = 16; t < 80; t++) w[t] = rol(w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16], 1);

      let a = h0;
      let b = h1;
      let c = h2;
      let d = h3;
      let e = h4;

      for (let t = 0; t < 80; t++) {
        let f;
        let k;
        if (t < 20) {
          f = (b & c) | (~b & d);
          k = 0x5a827999;
        } else if (t < 40) {
          f = b ^ c ^ d;
          k = 0x6ed9eba1;
        } else if (t < 60) {
          f = (b & c) | (b & d) | (c & d);
          k = 0x8f1bbcdc;
        } else {
          f = b ^ c ^ d;
          k = 0xca62c1d6;
        }
        const temp = (rol(a, 5) + f + e + k + w[t]) >>> 0;
        e = d;
        d = c;
        c = rol(b, 30);
        b = a;
        a = temp;
      }

      h0 = (h0 + a) >>> 0;
      h1 = (h1 + b) >>> 0;
      h2 = (h2 + c) >>> 0;
      h3 = (h3 + d) >>> 0;
      h4 = (h4 + e) >>> 0;
    }

    const digestBytes = [];
    [h0, h1, h2, h3, h4].forEach(word => {
      digestBytes.push((word >>> 24) & 0xff, (word >>> 16) & 0xff, (word >>> 8) & 0xff, word & 0xff);
    });
    let binary = "";
    digestBytes.forEach(byte => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  }

  parsePasswdFile(text) {
    const store = {};
    if (!text) return store;
    text.split("\n").forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const idx = trimmed.indexOf(":");
      if (idx === -1) return;
      const username = trimmed.slice(0, idx).trim();
      const hash = trimmed.slice(idx + 1).trim();
      if (username && hash) {
        store[username] = hash;
      }
    });
    return store;
  }

  stringifyPasswdFile(store) {
    return Object.entries(store)
      .map(([username, hash]) => `${username}:${hash}`)
      .join("\n") + (Object.keys(store).length ? "\n" : "");
  }

  async hashPassword(password) {
    if (!globalThis.crypto || !crypto.subtle) {
      return `{SHA}${this.sha1Base64Fallback(password)}`;
    }
    const bytes = new TextEncoder().encode(password || "");
    const digest = await crypto.subtle.digest("SHA-1", bytes);
    let binary = "";
    new Uint8Array(digest).forEach(byte => {
      binary += String.fromCharCode(byte);
    });
    return `{SHA}${btoa(binary)}`;
  }

  async loadPasswordStore(sourcePath = "data/app/users/passwd") {
    try {
      const res = await fetch(sourcePath);
      if (!res.ok) {
        this.passwordStore = {};
        return;
      }
      const text = await res.text();
      this.passwordStore = this.parsePasswdFile(text);
    } catch (err) {
      this.passwordStore = {};
    }
  }

  async persistPasswordStore() {
    if (!this.workspaceDir) return false;
    return await this.writeWorkspaceFile(["app", "users"], "passwd", this.stringifyPasswdFile(this.passwordStore), false);
  }

  downloadTextFile(fileName, text) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async verifyWorkspaceWriteAccess() {
    if (!this.workspaceDir) return false;
    try {
      const testName = ".antai-write-test";
      const ok = await this.writeWorkspaceFile(["app", "users"], testName, "ok", false);
      if (!ok) return false;
      await this.deleteWorkspaceFile(["app", "users"], testName);
      return true;
    } catch (e) {
      return false;
    }
  }

  async normalizeWorkspaceDir(dirHandle) {
    try {
      await dirHandle.getFileHandle("seed_manifest.json", { create: false });
      return dirHandle;
    } catch (e) {
      try {
        const dataDir = await dirHandle.getDirectoryHandle("data", { create: false });
        await dataDir.getFileHandle("seed_manifest.json", { create: false });
        return dataDir;
      } catch (inner) {
        throw new Error("Select the repository data folder or the repo root containing a data/ subfolder.");
      }
    }
  }

  // --- In-Memory Session State ---
  async loadData() {
    if (this.isFileMode()) {
      await this.seedDemoData();
      this.currentUser = null;
      return;
    }

    const snapshot = await this.apiRequest("/api/bootstrap");
    this.applyBootstrapData(snapshot);
    this.currentUser = null;
  }

  saveData() {
    // Intentionally disabled. State is kept in memory only unless written to the
    // checked-in data folder through the workspace/file APIs.
  }

  async seedDemoData() {
    try {
      const manifestRes = await fetch("data/seed_manifest.json");
      if (!manifestRes.ok) throw new Error("Seed manifest load failed");
      const manifest = await manifestRes.json();

      // Helper to fetch and parse a single markdown file
      const fetchMD = async (path) => {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`Load failed for ${path}`);
        const text = await res.text();
        const parsed = parseMarkdownWithFrontMatter(text);
        const item = { ...parsed.metadata };
        if (parsed.content) {
          item.notes = parsed.content;
          item.desc = parsed.content;
        }
        // Save disk tracking variables
        item._fileName = path.split("/").pop();
        const parts = path.split("/");
        const projectsIdx = parts.indexOf("projects");
        if (projectsIdx !== -1 && parts.length > projectsIdx + 2) {
          item._colonyFolder = parts[projectsIdx + 2];
        }
        return item;
      };

      // Load users list
      this.users = [];
      try {
        const userData = await fetchMD(manifest.user);
        this.users.push(userData);

        try {
          const beatriceData = await fetchMD("data/app/users/beatrice-bee.md");
          this.users.push(beatriceData);
        } catch (e) {
          this.users.push({
            uuid: "user-beatrice",
            username: "Beatrice Bee",
            email: "beatrice@dummy.org",
            newsletter: false
          });
        }
        try {
          const charlieData = await fetchMD("data/app/users/charlie-cocoon.md");
          this.users.push(charlieData);
        } catch (e) {
          this.users.push({
            uuid: "user-charlie",
            username: "Charlie Cocoon",
            email: "charlie@dummy.org",
            newsletter: true
          });
        }
      } catch (e) {
        console.error("Failed to load seed user:", e);
      }

      try {
        await this.loadPasswordStore(manifest.passwords || "data/app/users/passwd");
      } catch (e) {
        console.error("Failed to load seed password store:", e);
      }

      // Load Projects
      this.projects = [];
      try {
        const projData = await fetchMD("data/projects/default-project/project.md");
        projData._slug = "default-project";
        this.projects.push(projData);
      } catch (e) {
        this.projects.push({
          uuid: "proj-default",
          name: "Default Project",
          owner: this.currentUser ? this.currentUser.uuid : "a47f2081-3091-4d1e-8e6d-74d1a58140db",
          members: [],
          _slug: "default-project"
        });
      }
      this.activeProjectId = "proj-default";

      // Load API keys / connectors settings
      try {
        const connectorsData = await fetchMD(manifest.connectors);
        if (connectorsData.geminiApiKey) {
          this.apiKeys.gemini = connectorsData.geminiApiKey;
        }
      } catch (e) {
        console.error("Failed to load seed connectors:", e);
      }

      // Load species & news
      try {
        const speciesRes = await fetch(manifest.species);
        this.speciesList = await speciesRes.json();
      } catch (e) {}

      try {
        const newsRes = await fetch(manifest.news);
        this.newsList = await newsRes.json();
      } catch (e) {}

      // Load sightings
      const rawSightings = [];
      for (const sPath of manifest.sightings || []) {
        try {
          rawSightings.push(await fetchMD(sPath));
        } catch (e) {}
      }

      // Load colonies and sub-collections
      const rawColonies = [];
      const rawEvents = [];
      const rawReminders = [];
      const rawMaps = [];
      const rawZones = [];
      const rawRules = [];

      for (const colEntry of manifest.colonies || []) {
        try {
          const colData = await fetchMD(colEntry.colony);
          rawColonies.push(colData);

          for (const evPath of colEntry.events || []) {
            rawEvents.push(await fetchMD(evPath));
          }
          for (const remPath of colEntry.reminders || []) {
            rawReminders.push(await fetchMD(remPath));
          }
          for (const mapPath of colEntry.maps || []) {
            rawMaps.push(await fetchMD(mapPath));
          }
          for (const zonePath of colEntry.zones || []) {
            rawZones.push(await fetchMD(zonePath));
          }
          for (const rulePath of colEntry.rules || []) {
            rawRules.push(await fetchMD(rulePath));
          }
        } catch (e) {
          console.error("Error loading seed colony entry:", e);
        }
      }

      const now = new Date();

      this.colonies = rawColonies.map(c => ({
        id: c.uuid,
        uuid: c.uuid,
        projectId: c.projectId || "proj-default",
        ...c
      }));

      this.events = rawEvents.map(e => {
        const dt = new Date(now.getTime() + e.relativeDays * 24 * 60 * 60 * 1000);
        return {
          ...e,
          id: e.uuid,
          uuid: e.uuid,
          dateTime: dt.toISOString().slice(0, 16)
        };
      });

      this.reminders = rawReminders.map(r => {
        const dt = new Date(now.getTime() + r.relativeHours * 60 * 60 * 1000);
        return {
          ...r,
          id: r.uuid,
          uuid: r.uuid,
          dueDate: dt.toISOString().slice(0, 16)
        };
      });

      this.sightings = rawSightings.map(s => {
        const dt = new Date(now.getTime() + s.relativeDays * 24 * 60 * 60 * 1000);
        return {
          ...s,
          id: s.uuid,
          uuid: s.uuid,
          date: dt.toISOString().slice(0, 10)
        };
      });

      this.maps = rawMaps.map(m => ({
        ...m,
        id: m.uuid,
        uuid: m.uuid
      }));

      this.zones = rawZones.map(z => ({
        ...z,
        id: z.uuid,
        uuid: z.uuid
      }));

      this.automationRules = rawRules.map(r => ({
        ...r,
        id: r.uuid,
        uuid: r.uuid
      }));

    } catch (err) {
      console.error("Failed to load folder-based seed:", err);
      throw err;
    }
    
    this.saveData();
  }

  generateFallbackSeedData() {
    this.currentUser = {
      uuid: "a47f2081-3091-4d1e-8e6d-74d1a58140db",
      username: "Alex Antkeeper",
      email: "alex@dummy.org",
      newsletter: true
    };
    
    this.users = [
      {
        uuid: "a47f2081-3091-4d1e-8e6d-74d1a58140db",
        username: "Alex Antkeeper",
        email: "alex@dummy.org",
        newsletter: true
      },
      {
        uuid: "user-beatrice",
        username: "Beatrice Bee",
        email: "beatrice@dummy.org",
        newsletter: false
      },
      {
        uuid: "user-charlie",
        username: "Charlie Cocoon",
        email: "charlie@dummy.org",
        newsletter: true
      }
    ];

    this.projects = [
      {
        uuid: "proj-default",
        name: "Default Project",
        owner: "a47f2081-3091-4d1e-8e6d-74d1a58140db",
        members: [],
        _slug: "default-project"
      }
    ];
    this.activeProjectId = "proj-default";

    this.colonies = [
      {
        id: "5b6e2d93-c46b-4e12-8d76-c56aef793b8e",
        uuid: "5b6e2d93-c46b-4e12-8d76-c56aef793b8e",
        projectId: "proj-default",
        name: "Messor Kingdom",
        species: "Messor barbarus",
        queens: 1,
        workers: 84,
        founded: "2025-05-10",
        status: "healthy",
        notes: "A thriving harvester colony. Very sensitive to light. The majors have started emerging and they can crush larger seeds now.",
        diet: "Likes: Organic chia seeds, grass seeds, small dried crickets.\nDislikes: Honey syrup (drowns easily).",
        setup: "Gypsum horizontal formicarium connected to a medium acrylic outworld.",
        photo: "assets/ant_nest_workers.jpg"
      },
      {
        id: "7f502d91-e401-4475-b6d3-cf584ee385c3",
        uuid: "7f502d91-e401-4475-b6d3-cf584ee385c3",
        projectId: "proj-default",
        name: "Founding Lasius",
        species: "Lasius niger",
        queens: 1,
        workers: 12,
        founded: "2026-06-01",
        status: "founding",
        notes: "Queen caught during swarming last season. Very active and alert. Brood has been developing rapidly.",
        diet: "Likes: Honey water on cotton, freshly killed fruit flies.\nDislikes: Large seeds (ignored).",
        setup: "Standard 15cm glass test tube nest wrapped in red film.",
        photo: "assets/queen_ant_eggs.jpg"
      }
    ];

    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().slice(0, 16);

    this.events = [
      {
        id: "0608e9a2-4a0b-4b2a-bfb6-6d6bf7b12d5d",
        uuid: "0608e9a2-4a0b-4b2a-bfb6-6d6bf7b12d5d",
        colonyId: "5b6e2d93-c46b-4e12-8d76-c56aef793b8e",
        type: "feeding",
        dateTime: threeDaysAgo,
        workers: 80,
        broodState: "all",
        notes: "Added fresh chia seed supply and one freeze-dried fruit fly. They immediately dragged the fly to the queen's chamber."
      },
      {
        id: "fe1fb1cf-9c60-4966-8805-4c07d3f8f106",
        uuid: "fe1fb1cf-9c60-4966-8805-4c07d3f8f106",
        colonyId: "7f502d91-e401-4475-b6d3-cf584ee385c3",
        type: "observation",
        dateTime: twoDaysAgo,
        workers: 12,
        broodState: "pupae",
        notes: "Counted 12 workers and a fresh batch of 8 pupae. Queen looks healthy and fat. No mold present in the cotton water buffer."
      },
      {
        id: "c3031024-bc6d-4950-84a1-1be8c962b800",
        uuid: "c3031024-bc6d-4950-84a1-1be8c962b800",
        colonyId: "5b6e2d93-c46b-4e12-8d76-c56aef793b8e",
        type: "cleaning",
        dateTime: yesterday,
        notes: "Cleaned out the garbage corner in the outworld. Removed discarded seed husks and ant bodies."
      }
    ];

    const todayDate = new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString().slice(0, 16);
    const tomorrowDate = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
    const overdueDate = new Date(now.getTime() - 36 * 60 * 60 * 1000).toISOString().slice(0, 16);

    this.reminders = [
      {
        id: "4238e8cb-df8d-4b8c-85a0-cd9e414c1d43",
        uuid: "4238e8cb-df8d-4b8c-85a0-cd9e414c1d43",
        colonyId: "7f502d91-e401-4475-b6d3-cf584ee385c3",
        title: "Feed Honey Water",
        dueDate: todayDate,
        repeat: "weekly",
        notes: "Add small drop of honey-water onto a foil strip in the test tube.",
        status: "pending"
      },
      {
        id: "83f8ee73-4552-4467-8ca5-e87f8f6354a3",
        uuid: "83f8ee73-4552-4467-8ca5-e87f8f6354a3",
        colonyId: "5b6e2d93-c46b-4e12-8d76-c56aef793b8e",
        title: "Check Nest Moisture Level",
        dueDate: overdueDate,
        repeat: "biweekly",
        notes: "Add 5ml of distilled water to the gypsum hydration chamber.",
        status: "overdue"
      },
      {
        id: "e49fb995-1f9f-43b6-9bb2-bfd7915fbcd2",
        uuid: "e49fb995-1f9f-43b6-9bb2-bfd7915fbcd2",
        colonyId: "5b6e2d93-c46b-4e12-8d76-c56aef793b8e",
        title: "Protein Feed (Crickets)",
        dueDate: tomorrowDate,
        repeat: "weekly",
        notes: "Thaw and feed a small cricket in the outworld.",
        status: "pending"
      }
    ];

    this.sightings = [
      {
        id: "7d5497ee-c397-449e-b9b2-a4e99f57fa96",
        uuid: "7d5497ee-c397-449e-b9b2-a4e99f57fa96",
        species: "Lasius niger",
        location: "London, UK",
        x: 45,
        y: 35,
        notes: "Massive flight reported in parks after afternoon showers. Weather 24°C, highly humid.",
        date: yesterday.slice(0, 10)
      },
      {
        id: "a53e8093-6b45-4299-8cf9-f9c3c1e27a6f",
        uuid: "a53e8093-6b45-4299-8cf9-f9c3c1e27a6f",
        species: "Messor barbarus",
        location: "Madrid, Spain",
        x: 52,
        y: 65,
        notes: "Warm evening swarming around streetlights. Dozens of wingless queens crawling.",
        date: threeDaysAgo.slice(0, 10)
      }
    ];

    this.maps = [
      {
        id: "d2be2f42-491d-4074-b52b-285657ef7cf8",
        uuid: "d2be2f42-491d-4074-b52b-285657ef7cf8",
        colonyId: "5b6e2d93-c46b-4e12-8d76-c56aef793b8e",
        name: "Main Formicarium Chambers",
        image: "assets/ant_nest_workers.jpg"
      }
    ];

    this.zones = [
      {
        id: "e0e7a250-93cb-4dbb-9669-df41d1db265e",
        uuid: "e0e7a250-93cb-4dbb-9669-df41d1db265e",
        mapId: "d2be2f42-491d-4074-b52b-285657ef7cf8",
        name: "Brood Nest Area",
        desc: "Main humid chambers where queen and larvae reside",
        x: 25,
        y: 38,
        width: 35,
        height: 25,
        tempSensor: "sensor-temp-1",
        humSensor: "sensor-hum-1"
      },
      {
        id: "78c005b8-500b-4c55-8968-07a8296a84d4",
        uuid: "78c005b8-500b-4c55-8968-07a8296a84d4",
        mapId: "d2be2f42-491d-4074-b52b-285657ef7cf8",
        name: "Granary Storage",
        desc: "Dry chambers used for storage of seeds",
        x: 62,
        y: 12,
        width: 25,
        height: 25,
        tempSensor: "sensor-temp-2",
        humSensor: "sensor-hum-2"
      }
    ];

    this.automationRules = [
      {
        id: "05963f0d-13f5-46f0-b997-ec49a04a6cb1",
        uuid: "05963f0d-13f5-46f0-b997-ec49a04a6cb1",
        trigger: "temp-low",
        zoneId: "e0e7a250-93cb-4dbb-9669-df41d1db265e",
        threshold: "21°C",
        action: "Turn on Home Assistant Nest Heater Switch",
        active: true
      }
    ];
  }

  // --- Real-time Sensor Simulator ---
  startSensorSimulation() {
    this.sensorSimInterval = setInterval(() => {
      // Simulate slight fluctuations in temperature and humidity
      const temp1 = (23.5 + Math.sin(Date.now() / 100000) * 1.5).toFixed(1);
      const hum1 = (55.0 + Math.cos(Date.now() / 80000) * 3).toFixed(1);
      
      const temp2 = (24.2 + Math.sin(Date.now() / 120000) * 1).toFixed(1);
      const hum2 = (38.0 + Math.cos(Date.now() / 90000) * 2).toFixed(1);

      // Save to window object or simple cache
      window.sensorCache = {
        "sensor-temp-1": temp1,
        "sensor-hum-1": hum1,
        "sensor-temp-2": temp2,
        "sensor-hum-2": hum2
      };

      this.updateSensorWidgets();
    }, 4000);
  }

  updateSensorWidgets() {
    const cache = window.sensorCache;
    if (!cache) return;

    // If viewing dashboard, update sensor summary
    if (this.currentView === "dashboard") {
      const listEl = document.getElementById("dash-sensors-list");
      if (listEl) {
        listEl.innerHTML = `
          <div class="sensor-pill-group" style="margin-bottom:12px;">
            <div class="sensor-pill" style="cursor: pointer;" onclick="app.navigate('detailed-table', { type: 'sensors' })">
              <div class="sensor-pill-icon temp">🌡️</div>
              <div>
                <div class="sensor-pill-value">${cache["sensor-temp-1"]}°C</div>
                <div class="sensor-pill-label">Nest Chamber A</div>
              </div>
            </div>
            <div class="sensor-pill" style="cursor: pointer;" onclick="app.navigate('detailed-table', { type: 'sensors' })">
              <div class="sensor-pill-icon humidity">💧</div>
              <div>
                <div class="sensor-pill-value">${cache["sensor-hum-1"]}%</div>
                <div class="sensor-pill-label">Nest Chamber A</div>
              </div>
            </div>
          </div>
          <div class="sensor-pill-group">
            <div class="sensor-pill" style="cursor: pointer;" onclick="app.navigate('detailed-table', { type: 'sensors' })">
              <div class="sensor-pill-icon temp">🌡️</div>
              <div>
                <div class="sensor-pill-value">${cache["sensor-temp-2"]}°C</div>
                <div class="sensor-pill-label">Dry Granary B</div>
              </div>
            </div>
            <div class="sensor-pill" style="cursor: pointer;" onclick="app.navigate('detailed-table', { type: 'sensors' })">
              <div class="sensor-pill-icon humidity">💧</div>
              <div>
                <div class="sensor-pill-value">${cache["sensor-hum-2"]}%</div>
                <div class="sensor-pill-label">Dry Granary B</div>
              </div>
            </div>
          </div>
        `;
      }
    }

    // If viewing colony detail, update conditions tab elements
    if (this.currentView === "colony-detail" && this.selectedColonyId === "5b6e2d93-c46b-4e12-8d76-c56aef793b8e") {
      const tempValEl1 = document.getElementById("colony-sensor-status-temp");
      const humValEl1 = document.getElementById("colony-sensor-status-humidity");

      if (tempValEl1 && humValEl1) {
        tempValEl1.innerHTML = `
          <h3 class="card-title">Temperature Levels</h3>
          <div style="font-size: 32px; font-family: var(--font-heading); font-weight:700; color: var(--accent-danger); margin: 8px 0;">
            ${cache["sensor-temp-1"]}°C
          </div>
          <p style="font-size:12px; color: var(--text-secondary);">Target: 22°C - 28°C (Ideal for Messor barbarus)</p>
        `;
        humValEl1.innerHTML = `
          <h3 class="card-title">Humidity Levels</h3>
          <div style="font-size: 32px; font-family: var(--font-heading); font-weight:700; color: var(--accent-info); margin: 8px 0;">
            ${cache["sensor-hum-1"]}%
          </div>
          <p style="font-size:12px; color: var(--text-secondary);">Target: 30% - 50% (gradient required)</p>
        `;
      }
    }
  }

  triggerSensorSimulation() {
    if (window.sensorCache) {
      window.sensorCache["sensor-temp-1"] = (parseFloat(window.sensorCache["sensor-temp-1"]) + 1.2).toFixed(1);
      window.sensorCache["sensor-hum-1"] = (parseFloat(window.sensorCache["sensor-hum-1"]) - 2.5).toFixed(1);
      this.updateSensorWidgets();
      this.renderColonySensorChart();
    }
  }

  // --- Router / View Switching ---
  navigate(viewName, params = {}) {
    // If not logged in, enforce guest views
    const guestViews = ["auth", "public-home", "public-directory", "public-page"];
    if (!this.currentUser && !guestViews.includes(viewName)) {
      viewName = "public-home";
    }

    const previousView = this.currentView;
    const transientViews = new Set([
      "add-colony",
      "add-event",
      "add-reminder",
      "add-map",
      "add-zone",
      "add-automation",
      "add-sighting",
      "create-project",
      "gemini-key",
      "zone-detail"
    ]);
    const isTargetTransient = transientViews.has(viewName);
    const isPreviousTransient = transientViews.has(previousView);
    if (isTargetTransient && !isPreviousTransient) {
      this.transientViewReturnState = this.getCurrentRouteState();
    } else if (!isTargetTransient && !isPreviousTransient) {
      this.transientViewReturnState = null;
    }
    this.currentView = viewName;

    // Handle parameter loading
    if (viewName === "colony-detail" && params.id) {
      if (this.selectedColonyId !== params.id) {
        this.colonyDetailEditMode = false;
      }
      this.selectedColonyId = params.id;
      this.activeColonyTab = params.tabId || "colony-tab-overview";
    }
    if (viewName === "projects" && previousView !== "projects") {
      this.projectEditMode = false;
    }
    if (viewName === "species-detail" && params.id) {
      this.selectedSpeciesId = params.id;
    }
    if (viewName === "detailed-table") {
      this.detailedTableType = params.type || "colonies";
      this.highlightId = params.highlightId || null;
    }
    if (viewName === "public-page" && params.highlightId) {
      this.highlightId = params.highlightId;
      this.detailedTableType = params.type;
    }

    // Toggle active view elements
    const views = document.querySelectorAll(".view");
    views.forEach(v => {
      if (v.id === `view-${viewName}`) {
        v.classList.add("active");
      } else {
        v.classList.remove("active");
      }
    });

    // Hide right pane, sidebar, and toolbar on auth view; restore on leave
    const appContainer = document.getElementById("app-container");
    const shellToolbar = document.getElementById("shell-toolbar");
    if (viewName === "auth") {
      if (appContainer) appContainer.classList.add("ai-pane-hidden", "sidebar-collapsed");
      if (shellToolbar) shellToolbar.style.display = "none";
    } else {
      if (shellToolbar) shellToolbar.style.display = "";
      if (previousView === "auth") {
        // Restore user preferences when leaving auth
        this.applyShellLayout();
      }
    }

    // Trigger specific rendering based on view destination
    this.onViewRender(viewName);
    
    // Rerender sidebar to update tree highlighting and nav items
    this.renderSidebar();
    
    // Close sidebar on mobile after navigating
    const sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.remove("active");
  }

  getCurrentRouteState() {
    const state = { view: this.currentView, params: {} };
    if (this.currentView === "colony-detail" && this.selectedColonyId) {
      state.params.id = this.selectedColonyId;
      state.params.tabId = this.activeColonyTab || "colony-tab-overview";
    } else if (this.currentView === "species-detail" && this.selectedSpeciesId) {
      state.params.id = this.selectedSpeciesId;
    } else if (this.currentView === "detailed-table") {
      state.params.type = this.detailedTableType || "colonies";
      if (this.highlightId) state.params.highlightId = this.highlightId;
    } else if (this.currentView === "public-page") {
      if (this.highlightId) state.params.highlightId = this.highlightId;
      if (this.detailedTableType) state.params.type = this.detailedTableType;
    }
    return state;
  }

  closeTransientView() {
    const fallback = { view: "dashboard", params: {} };
    const target = this.transientViewReturnState || fallback;
    this.transientViewReturnState = null;
    this.navigate(target.view, target.params || {});
  }

  onViewRender(viewName) {
    switch (viewName) {
      case "dashboard":
        this.renderDashboard();
        break;
      case "public-home":
        // Static view
        break;
      case "public-directory":
        this.renderPublicDirectory();
        break;
      case "public-page":
        this.renderPublicPage(this.highlightId, this.detailedTableType);
        break;
      case "colonies":
        this.renderColonyList();
        break;
      case "colony-detail":
        this.renderColonyDetail();
        break;
      case "reminders":
        this.renderReminders();
        break;
      case "species":
        this.renderSpeciesList();
        break;
      case "species-detail":
        this.renderSpeciesDetail();
        break;
      case "ai-assistant":
        this.aiPaneHidden = false;
        this.writeCache("antai-ai-pane-hidden-v1", this.aiPaneHidden);
        this.applyShellLayout();
        this.renderAIAssistant();
        break;
      case "swarm-map":
        this.renderSwarmMap();
        break;
      case "news":
        this.renderNewsList();
        break;
      case "projects":
        this.renderProjectsView();
        break;
      case "profile":
        this.renderProfile();
        break;
      case "add-colony":
        const writeProjects = this.projects.filter(p => {
          if (p.owner === this.currentUser.uuid) return true;
          const member = p.members && p.members.find(m => m.userUuid === this.currentUser.uuid);
          return member && (member.role === "manager" || member.role === "contributor" || member.role === "owner");
        });
        if (writeProjects.length === 0) {
          alert("Please create a project first before adding a colony.");
          this.navigate("dashboard");
          return;
        }
        this.populateColonyProjectSelect();
        const filterInput = document.getElementById("colony-species-filter");
        if (filterInput && !this.editingColonyId) {
          filterInput.value = "";
        }
        this.renderSpeciesOptions("colony");
        this.refreshColonySpeciesContext();
        break;
      case "detailed-table":
        this.renderDetailedTable();
        break;
    }
    this.injectViewAiActionBar(viewName);
  }

  injectViewAiActionBar(viewName) {
    // Map views to their prompt keys
    const viewPromptMap = {
      "dashboard": "weekly-summary",
      "reminders": "reminder-planner",
      "swarm-map": "sighting-report",
      "projects": "project-setup",
      "species-detail": "species-check",
      "colonies": "care-plan"
    };
    const promptKey = viewPromptMap[viewName];
    if (!promptKey) return;

    const viewEl = document.getElementById(`view-${viewName}`);
    if (!viewEl) return;

    // Remove any previously injected bar in this view
    const prev = viewEl.querySelector(".ai-action-bar");
    if (prev) prev.remove();

    // Insert after the view-header
    const header = viewEl.querySelector(".view-header");
    if (header) {
      header.insertAdjacentHTML("afterend", this.buildAiActionBar(promptKey));
    }
  }

  getActiveProject() {
    return this.projects.find(p => p.uuid === this.activeProjectId);
  }

  getCurrentUserRole() {
    if (!this.currentUser) return null;
    const project = this.getActiveProject();
    if (!project) return null;
    if (project.owner === this.currentUser.uuid) return 'owner';
    const member = project.members && project.members.find(m => m.userUuid === this.currentUser.uuid);
    return member ? member.role : null;
  }

  hasPermission(action) {
    const role = this.getCurrentUserRole();
    if (!role) return false;
    if (role === 'owner') return true;
    if (role === 'manager') {
      return action !== 'manage_permissions' && action !== 'manage_project';
    }
    if (role === 'contributor') {
      return action === 'read' || action === 'write' || action === 'write_record' || action === 'delete_record';
    }
    if (role === 'guest') {
      return action === 'read';
    }
    return false;
  }

  renderProjectSelector() {
    const container = document.getElementById("project-selector-container");
    if (!container) return;
    container.innerHTML = "";
    container.style.display = "none";
  }

  setActiveProject(projectId) {
    this.activeProjectId = projectId;
    
    // Clear active UI selections
    this.selectedColonyId = null;
    this.activeMapId = null;

    // Rerender
    this.renderSidebar();
    this.onViewRender(this.currentView);
  }

  selectProject(projectId) {
    this.setActiveProject(projectId);
    this.navigate('projects');
  }

  selectColonyAndProject(colonyId, projectId) {
    this.activeProjectId = projectId;
    this.selectedColonyId = colonyId;
    this.activeColonyTab = "colony-tab-overview";
    this.activeMapId = null;

    this.renderSidebar();
    this.navigate("colony-detail", { id: colonyId });
  }

  showAddColonyForProject(projectId) {
    this.activeProjectId = projectId;
    this.navigate('add-colony');
    const select = document.getElementById("colony-project-select");
    if (select) {
      select.value = projectId;
    }
  }

  renderProjectsView() {
    const detailsEl = document.getElementById("project-details-card");
    const sharingEl = document.getElementById("project-sharing-container");
    if (!detailsEl || !sharingEl) return;

    const activeProj = this.getActiveProject();
    if (!activeProj) {
      detailsEl.innerHTML = `<p style="color:var(--text-muted);">No active project selected.</p>`;
      sharingEl.innerHTML = ``;
      return;
    }

    const ownerUser = this.users.find(u => u.uuid === activeProj.owner) || { username: "Unknown User", email: "" };
    const userRole = this.getCurrentUserRole();
    const isOwner = userRole === "owner";
    const isManager = userRole === "manager" || isOwner;

    // 1. Details Card
    let projectSettingsHtml = "";
    if (isManager && this.projectEditMode) {
      const isPub = activeProj.isPublic ? "checked" : "";
      const pubHtml = activeProj.publicPageHtml || "";
      projectSettingsHtml = `
        <div class="form-group" style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color);">
          <label style="font-size:12px; font-weight:600; color:var(--text-secondary);">Project Settings</label>
          <div style="margin-top: 12px;">
            <label for="project-rename-input" style="font-size:11px;">Project Name</label>
            <input type="text" id="project-rename-input" class="form-control" value="${activeProj.name}" required style="padding:6px 10px;">
          </div>
          <div style="margin-top: 16px;">
            <label style="font-size:11px;">Public Visibility</label>
            <div style="display: flex; align-items: center; gap: 10px; margin-top: 4px;">
              <input type="checkbox" id="project-edit-is-public" style="width: 16px; height: 16px;" ${isPub}>
              <label for="project-edit-is-public" style="margin:0; font-weight:normal; font-size:12px;">Make this project public</label>
            </div>
          </div>
          <div style="margin-top: 16px;">
            <label style="font-size:11px;">Public Page Content (WYSIWYG)</label>
            <div class="wysiwyg-toolbar" style="display:flex; gap:5px; margin-bottom:5px; background:var(--bg-card); padding:5px; border-radius:4px; border:1px solid var(--border-color);">
              <button type="button" class="btn btn-secondary" style="padding:4px 8px; font-size:12px;" onclick="document.execCommand('bold', false, null)"><b>B</b></button>
              <button type="button" class="btn btn-secondary" style="padding:4px 8px; font-size:12px;" onclick="document.execCommand('italic', false, null)"><i>I</i></button>
              <button type="button" class="btn btn-secondary" style="padding:4px 8px; font-size:12px;" onclick="document.execCommand('formatBlock', false, 'H2')">H2</button>
              <button type="button" class="btn btn-secondary" style="padding:4px 8px; font-size:12px;" onclick="document.execCommand('insertUnorderedList', false, null)">List</button>
            </div>
            <div id="project-edit-public-html" contenteditable="true" class="form-control" style="min-height: 150px; overflow-y:auto; background:var(--bg-input);">${pubHtml}</div>
          </div>
          <button class="btn btn-primary" style="margin-top: 16px;" onclick="app.updateProjectSettings()">Save Project Settings</button>
        </div>
      `;
    }

    const projectEditToggleHtml = isManager ? `
      <button class="btn ${this.projectEditMode ? "btn-primary" : "btn-secondary"}" type="button" title="${this.projectEditMode ? "Close project editor" : "Edit project"}" aria-label="${this.projectEditMode ? "Close project editor" : "Edit project"}" onclick="app.toggleProjectEditMode()" style="padding:6px 10px; min-width:38px; margin-left:auto;">✎</button>
    ` : "";

    let deleteBtnHtml = "";
    if (isOwner && activeProj.uuid !== "proj-default") {
      deleteBtnHtml = `
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color);">
          <button class="btn btn-danger" style="width:100%; font-size:12px; padding:8px;" onclick="app.deleteActiveProject()">
            ⚠️ Delete Project (Deletes metadata file on disk)
          </button>
        </div>
      `;
    }

    detailsEl.innerHTML = `
      <div class="project-info-card">
        <div style="display:flex; justify-content:flex-end; margin-bottom:12px;">
          ${projectEditToggleHtml}
        </div>
        <div class="project-meta-item">
          <span class="project-meta-label">Project ID</span>
          <span class="project-meta-value" style="font-family:monospace; font-size:12px;">${activeProj.uuid}</span>
        </div>
        <div class="project-meta-item">
          <span class="project-meta-label">Project Name</span>
          <span class="project-meta-value" style="font-size:16px; font-weight:600;">${activeProj.name}</span>
        </div>
        <div class="project-meta-item">
          <span class="project-meta-label">Owner</span>
          <span class="project-meta-value">${ownerUser.username} (${ownerUser.email || 'No email'})</span>
        </div>
        <div class="project-meta-item">
          <span class="project-meta-label">Your Role</span>
          <span class="project-meta-value" style="color:var(--accent-primary); font-weight:600;">${userRole.toUpperCase()}</span>
        </div>
        ${projectSettingsHtml}
        ${deleteBtnHtml}
      </div>
    `;

    // 2. Collaborators & Sharing
    const members = activeProj.members || [];
    let membersRows = "";

    if (members.length === 0) {
      membersRows = `<tr><td colspan="3" style="text-align:center; color:var(--text-muted); padding:16px 0;">No other users have been granted access yet.</td></tr>`;
    } else {
      membersRows = members.map(m => {
        const u = this.users.find(user => user.uuid === m.userUuid) || { username: "Unknown User", email: m.userUuid };
        
        let roleCol = "";
        let actionCol = "";

        if (isOwner) {
          roleCol = `
            <select class="form-control" style="padding:4px 6px; font-size:12px; width:auto;" onchange="app.changeProjectRole('${m.userUuid}', this.value)">
              <option value="guest" ${m.role === 'guest' ? 'selected' : ''}>Guest</option>
              <option value="contributor" ${m.role === 'contributor' ? 'selected' : ''}>Contributor</option>
              <option value="manager" ${m.role === 'manager' ? 'selected' : ''}>Manager</option>
              <option value="owner" ${m.role === 'owner' ? 'selected' : ''}>Owner</option>
            </select>
          `;
          actionCol = `
            <button class="btn btn-secondary" style="padding:4px 8px; font-size:11px; color:var(--accent-danger);" onclick="app.revokeProjectAccess('${m.userUuid}')">Revoke</button>
          `;
        } else {
          roleCol = `<span style="font-weight:600; text-transform:capitalize;">${m.role}</span>`;
          actionCol = `<span style="color:var(--text-muted); font-size:11px;">None</span>`;
        }

        return `
          <tr>
            <td>
              <div style="font-weight:600;">${u.username}</div>
              <div style="font-size:11px; color:var(--text-muted);">${u.email || ''}</div>
            </td>
            <td>${roleCol}</td>
            <td>${actionCol}</td>
          </tr>
        `;
      }).join("");
    }

    let grantFormHtml = "";
    if (isOwner) {
      const otherUsers = this.users.filter(u => u.uuid !== this.currentUser.uuid);
      if (otherUsers.length === 0) {
        grantFormHtml = `
          <div class="grant-access-form">
            <h4 style="font-size:14px; font-weight:600; margin-bottom:12px;">Grant Access</h4>
            <p style="color:var(--text-muted); font-size:12.5px; text-align:center; padding:12px 0;">No other registered users found in the system.</p>
          </div>
        `;
      } else {
        const userOptionsHtml = otherUsers.map(u => `<option value="${u.uuid}">${u.username} (${u.email})</option>`).join("");
        grantFormHtml = `
          <div class="grant-access-form">
            <h4 style="font-size:14px; font-weight:600; margin-bottom:12px;">Grant Access</h4>
            <form id="grant-access-form" onsubmit="app.grantProjectAccess(event)">
              <div class="form-group">
                <label for="grant-user-select">Select User</label>
                <select id="grant-user-select" class="form-control" required style="margin-top:6px;">
                  ${userOptionsHtml}
                </select>
              </div>
              <div class="form-group" style="margin-top: 12px;">
                <label for="grant-role-select">Role Permission</label>
                <select id="grant-role-select" class="form-control" style="margin-top:6px;">
                  <option value="guest">Guest (Read Only)</option>
                  <option value="contributor">Contributor (Read & Write logs/events)</option>
                  <option value="manager">Manager (Read & Write & Delete colonies)</option>
                  <option value="owner">Owner (Full control & Permissions management)</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary" style="width:100%; margin-top:16px; font-size:12px;">Grant Permission</button>
            </form>
          </div>
        `;
      }
    }

    sharingEl.innerHTML = `
      <table class="collaborators-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${membersRows}
        </tbody>
      </table>
      ${grantFormHtml}
    `;
  }

  async updateProjectSettings() {
    const nameInput = document.getElementById("project-rename-input");
    const isPublicCheck = document.getElementById("project-edit-is-public");
    const htmlDiv = document.getElementById("project-edit-public-html");
    
    if (!nameInput || !nameInput.value.trim()) return;

    const activeProj = this.getActiveProject();
    if (!activeProj) return;

    if (!this.hasPermission("write")) {
      alert("You do not have permission to modify this project.");
      return;
    }

    activeProj.name = nameInput.value.trim();
    activeProj.isPublic = isPublicCheck?.checked || false;
    activeProj.publicPageHtml = htmlDiv?.innerHTML || "";
    
    await this.writeRecord("projects", activeProj);
    
    alert("Project settings saved successfully!");
    this.projectEditMode = false;
    this.renderSidebar();
    this.renderProjectsView();
  }

  toggleProjectEditMode(forceValue = null) {
    const role = this.getCurrentUserRole();
    if (role !== "manager" && role !== "owner") return;
    this.projectEditMode = typeof forceValue === "boolean" ? forceValue : !this.projectEditMode;
    this.renderProjectsView();
  }

  async deleteActiveProject() {
    const activeProj = this.getActiveProject();
    if (!activeProj) return;

    if (activeProj.uuid === "proj-default") {
      alert("The Default Project cannot be deleted.");
      return;
    }

    if (this.getCurrentUserRole() !== "owner") {
      alert("Only the owner of a project can delete it.");
      return;
    }

    if (!confirm(`Are you absolutely sure you want to delete "${activeProj.name}"?\nThis will remove the project metadata file and its association.`)) {
      return;
    }

    await this.deleteRecord("projects", activeProj.uuid, activeProj);
    this.projects = this.projects.filter(p => p.uuid !== activeProj.uuid);
    this.setActiveProject("proj-default");
    alert("Project deleted successfully.");
  }

  async grantProjectAccess(event) {
    event.preventDefault();
    const userSelect = document.getElementById("grant-user-select");
    const roleSelect = document.getElementById("grant-role-select");
    if (!userSelect || !roleSelect) return;

    const activeProj = this.getActiveProject();
    if (!activeProj) return;

    if (this.getCurrentUserRole() !== "owner") {
      alert("Only the owner of the project can grant permissions.");
      return;
    }

    const userUuid = userSelect.value;
    const role = roleSelect.value;

    if (!activeProj.members) activeProj.members = [];
    
    const existing = activeProj.members.find(m => m.userUuid === userUuid);
    if (existing) {
      existing.role = role;
    } else {
      activeProj.members.push({ userUuid, role });
    }

    await this.writeRecord("projects", activeProj);
    this.renderProjectsView();
    alert("Permission granted successfully!");
  }

  async revokeProjectAccess(userUuid) {
    const activeProj = this.getActiveProject();
    if (!activeProj) return;

    if (this.getCurrentUserRole() !== "owner") {
      alert("Only the owner can manage permissions.");
      return;
    }

    if (!confirm("Are you sure you want to revoke access for this user?")) {
      return;
    }

    activeProj.members = activeProj.members.filter(m => m.userUuid !== userUuid);
    await this.writeRecord("projects", activeProj);
    this.renderProjectsView();
    alert("Access revoked.");
  }

  async changeProjectRole(userUuid, newRole) {
    const activeProj = this.getActiveProject();
    if (!activeProj) return;

    if (this.getCurrentUserRole() !== "owner") {
      alert("Only the owner can manage permissions.");
      return;
    }

    const member = activeProj.members.find(m => m.userUuid === userUuid);
    if (member) {
      member.role = newRole;
      await this.writeRecord("projects", activeProj);
      this.renderProjectsView();
      alert("Role updated.");
    }
  }

  // --- Sidebar Renderers ---
  renderSidebar() {
    // Render project selector
    this.renderProjectSelector();

    const menuEl = document.getElementById("sidebar-menu");
    if (!menuEl) return;

    if (!this.currentUser) {
      // Guest Sidebar
      const isHomeActive = this.currentView === 'public-home' ? 'active' : '';
      const isDirActive = this.currentView === 'public-directory' ? 'active' : '';
      const isAuthActive = this.currentView === 'auth' ? 'active' : '';
      menuEl.innerHTML = `
        <a class="nav-item ${isHomeActive}" data-view="public-home" onclick="app.navigate('public-home')">
          <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Home
        </a>
        <a class="nav-item ${isDirActive}" data-view="public-directory" onclick="app.navigate('public-directory')">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          Public Directory
        </a>
        <div class="sidebar-section" style="margin-top:20px;">
          <a class="nav-item ${isAuthActive}" data-view="auth" onclick="app.navigate('auth')">
            <svg viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
            Login / Register
          </a>
        </div>
      `;
      return;
    }

    // Filter projects where current user is owner or member
    const userProjects = this.projects.filter(p => 
      p.owner === this.currentUser.uuid || 
      (p.members && p.members.some(m => m.userUuid === this.currentUser.uuid))
    );

    const treeHtml = userProjects.map(p => {
      const isProjectActive = p.uuid === this.activeProjectId;
      const projectColonies = this.colonies.filter(c => c.projectId === p.uuid && c.status !== "archived");
      
      let role = "Guest";
      if (p.owner === this.currentUser.uuid) role = "Owner";
      else {
        const m = p.members.find(mem => mem.userUuid === this.currentUser.uuid);
        if (m) role = m.role.charAt(0).toUpperCase() + m.role.slice(1);
      }

      const coloniesHtml = projectColonies.map(c => {
        const isColonyActive = this.currentView === "colony-detail" && this.selectedColonyId === c.id;
        return `
          <div class="tree-colony-item ${isColonyActive ? 'active' : ''}" onclick="app.selectColonyAndProject('${c.id}', '${p.uuid}')" title="${c.name}">
            <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
            <span class="tree-colony-name">${c.name}</span>
          </div>
        `;
      }).join("");

      return `
        <div class="tree-project-wrap">
          <div class="tree-project-item ${isProjectActive ? 'active' : ''}" onclick="app.selectProject('${p.uuid}')" title="${p.name}">
            <svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            <span class="tree-project-name">${p.name}</span>
            <span class="tree-project-badge">${role}</span>
            <button class="btn-create-colony-tree-icon" onclick="event.stopPropagation(); app.showAddColonyForProject('${p.uuid}')" title="Add Colony to this Project">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>
          <div class="tree-colony-list">
            ${coloniesHtml || `<div class="tree-colony-empty">No colonies yet</div>`}
          </div>
        </div>
      `;
    }).join("");

    const isDashboardActive = this.currentView === 'dashboard' ? 'active' : '';
    const isProjectsActive = this.currentView === 'projects' ? 'active' : '';
    const isColoniesActive = this.currentView === 'colonies' ? 'active' : '';
    const isRemindersActive = this.currentView === 'reminders' ? 'active' : '';
    const isSpeciesActive = ['species', 'species-detail'].includes(this.currentView) ? 'active' : '';
    const isAiActive = this.currentView === 'ai-assistant' ? 'active' : '';
    const isMapActive = this.currentView === 'swarm-map' ? 'active' : '';
    const isNewsActive = this.currentView === 'news' ? 'active' : '';
    const isProfileActive = this.currentView === 'profile' ? 'active' : '';

    menuEl.innerHTML = `
      <a class="nav-item ${isDashboardActive}" data-view="dashboard" onclick="app.navigate('dashboard')">
        <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
        Dashboard
      </a>
      <a class="nav-item ${isProjectsActive}" data-view="projects" onclick="app.navigate('projects')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
        Manage Projects
      </a>
      <a class="nav-item ${isColoniesActive}" data-view="colonies" onclick="app.navigate('colonies')">
        <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
        Manage Colonies
      </a>
      
      <div class="sidebar-section">
        <div class="sidebar-section-header">
          <span class="sidebar-section-title">Projects & Colonies</span>
          <button class="btn-create-project-icon" onclick="app.navigate('create-project')" title="Create New Project">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>
        <div class="sidebar-tree">
          ${treeHtml || `<div class="tree-colony-empty" style="padding-left:12px;">No projects active</div>`}
        </div>
      </div>

      <a class="nav-item ${isRemindersActive}" data-view="reminders" onclick="app.navigate('reminders')">
        <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        Reminders
      </a>
      <a class="nav-item ${isSpeciesActive}" data-view="species" onclick="app.navigate('species')">
        <svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        Species Sheets
      </a>
      <a class="nav-item ${isAiActive}" data-view="ai-assistant" onclick="app.navigate('ai-assistant')">
        <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        AI Nest Assistant
      </a>
      <a class="nav-item ${isMapActive}" data-view="swarm-map" onclick="app.navigate('swarm-map')">
        <svg viewBox="0 0 24 24"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        Swarm Map
      </a>
      <a class="nav-item ${isNewsActive}" data-view="news" onclick="app.navigate('news')">
        <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        Articles & News
      </a>
      <a class="nav-item ${isProfileActive}" data-view="profile" onclick="app.navigate('profile')">
        <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        Settings & Integrations
      </a>
    `;
  }

  renderSidebarFooter() {
    const footerEl = document.getElementById("sidebar-footer");
    if (!footerEl) return;

    if (!this.currentUser) {
      footerEl.innerHTML = "";
      return;
    }

    footerEl.innerHTML = `
      <div class="user-profile-summary" onclick="app.navigate('profile')">
        <div class="user-avatar">${this.currentUser.username.slice(0,1).toUpperCase()}</div>
        <div class="user-name">${this.currentUser.username}</div>
      </div>
      <button class="btn btn-secondary" style="padding:6px 8px; border-radius: var(--radius-sm);" onclick="app.logout()" title="Sign Out">
        🚪
      </button>
    `;
  }

  // --- View Renderers ---
  
  // Dashboard
  renderDashboard() {
    // Show/hide New Colony button in dashboard header based on permission
    const dashNewColonyBtn = document.querySelector("#view-dashboard button.btn-primary");
    if (dashNewColonyBtn) {
      dashNewColonyBtn.style.display = this.hasPermission("write") ? "flex" : "none";
    }

    const projectColonies = this.colonies.filter(c => c.projectId === this.activeProjectId);
    const projectColoniesIds = new Set(projectColonies.map(c => c.id));

    // Render Stats
    const statsEl = document.getElementById("dash-stats");
    if (statsEl) {
      const activeColCount = projectColonies.filter(c => c.status !== "archived").length;
      const totalWorkers = projectColonies.reduce((sum, c) => sum + (parseInt(c.workers) || 0), 0);
      const totalQueens = projectColonies.reduce((sum, c) => sum + (parseInt(c.queens) || 0), 0);
      const activeReminders = this.reminders.filter(r => (r.status === "pending" || r.status === "overdue") && projectColoniesIds.has(r.colonyId)).length;

      statsEl.innerHTML = `
        <div class="stat-card clickable" onclick="app.navigate('detailed-table', { type: 'colonies' })" style="cursor: pointer;">
          <div class="stat-icon">🐜</div>
          <div class="stat-info">
            <span class="stat-value">${activeColCount}</span>
            <span class="stat-label">Colonies</span>
          </div>
        </div>
        <div class="stat-card clickable" onclick="app.navigate('detailed-table', { type: 'colonies' })" style="cursor: pointer;">
          <div class="stat-icon" style="color:var(--accent-warning); background-color: rgba(233,196,106,0.1);">👑</div>
          <div class="stat-info">
            <span class="stat-value">${totalQueens}</span>
            <span class="stat-label">Queens</span>
          </div>
        </div>
        <div class="stat-card clickable" onclick="app.navigate('detailed-table', { type: 'colonies' })" style="cursor: pointer;">
          <div class="stat-icon" style="color:var(--accent-success); background-color: rgba(107,144,128,0.1);">👥</div>
          <div class="stat-info">
            <span class="stat-value">${totalWorkers}</span>
            <span class="stat-label">Total Workers</span>
          </div>
        </div>
        <div class="stat-card clickable" onclick="app.navigate('detailed-table', { type: 'reminders' })" style="cursor: pointer;">
          <div class="stat-icon" style="color:var(--accent-danger); background-color: rgba(231,111,81,0.1);">🔔</div>
          <div class="stat-info">
            <span class="stat-value">${activeReminders}</span>
            <span class="stat-label">Active Tasks</span>
          </div>
        </div>
      `;
    }

    // Render Overdue Alerts Banner
    const alertsEl = document.getElementById("dashboard-alerts");
    if (alertsEl) {
      const overdueReminders = this.reminders.filter(r => r.status === "overdue" && projectColoniesIds.has(r.colonyId));
      if (overdueReminders.length > 0) {
        alertsEl.style.display = "block";
        alertsEl.className = "reminder-item badge-danger";
        alertsEl.style.background = "rgba(231, 111, 81, 0.1)";
        alertsEl.style.borderColor = "var(--accent-danger)";
        alertsEl.style.marginBottom = "20px";
        alertsEl.innerHTML = `
          <div style="display:flex; align-items:center; gap:10px; color: var(--accent-danger); font-size:13px; font-weight:600;">
            ⚠️ Attention: You have ${overdueReminders.length} overdue care reminder${overdueReminders.length > 1 ? 's' : ''} that need completion.
          </div>
          <button class="btn btn-danger" style="padding:6px 12px; font-size:11px;" onclick="app.navigate('detailed-table', { type: 'reminders' })">Resolve Now</button>
        `;
      } else {
        alertsEl.style.display = "none";
      }
    }

    // Render Urgent Reminders
    const remindersEl = document.getElementById("dash-reminders-list");
    if (remindersEl) {
      const activeTasks = this.reminders
        .filter(r => (r.status === "pending" || r.status === "overdue") && projectColoniesIds.has(r.colonyId))
        .sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 3);

      if (activeTasks.length === 0) {
        remindersEl.innerHTML = `<div style="padding: 20px; text-align:center; color:var(--text-muted); font-size:13px;">No tasks due. Good job!</div>`;
      } else {
        remindersEl.innerHTML = activeTasks.map(r => {
          const col = this.colonies.find(c => c.id === r.colonyId);
          const isOverdue = r.status === "overdue";
          const formattedDate = new Date(r.dueDate).toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
          
          const checkAction = this.hasPermission("write") ? `onclick="app.completeReminder('${r.id}')"` : "";
          const checkStyle = this.hasPermission("write") ? 'style="cursor: pointer;"' : 'style="cursor: not-allowed; border-color: var(--text-muted);"';
          const snoozeBtnHtml = this.hasPermission("write") ? `<button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="app.snoozeReminder('${r.id}')">Snooze</button>` : "";

          return `
            <div class="reminder-item">
              <div class="reminder-content">
                <div class="reminder-check" ${checkStyle} ${checkAction}></div>
                <div class="reminder-text-wrap" style="cursor: pointer;" onclick="app.navigate('detailed-table', { type: 'reminders', highlightId: '${r.id}' })">
                  <span class="reminder-title">${r.title}</span>
                  <span class="reminder-meta">
                    <span class="colony-tag">${col ? col.name : 'General'}</span> • 
                    <span style="${isOverdue ? 'color: var(--accent-danger); font-weight:600;' : ''}">${formattedDate}</span>
                    ${isOverdue ? '<span class="badge badge-danger" style="font-size:9px; padding:2px 4px;">Overdue</span>' : ''}
                  </span>
                </div>
              </div>
              ${snoozeBtnHtml}
            </div>
          `;
        }).join("");
      }
    }

    // Render Recent Activity/Observations
    const activityEl = document.getElementById("dash-activity-list");
    if (activityEl) {
      const recentEvents = [...this.events]
        .filter(e => projectColoniesIds.has(e.colonyId))
        .sort((a,b) => new Date(b.dateTime) - new Date(a.dateTime))
        .slice(0, 3);

      if (recentEvents.length === 0) {
        activityEl.innerHTML = `<div style="padding: 20px; text-align:center; color:var(--text-muted); font-size:13px;">No journal observations recorded yet.</div>`;
      } else {
        activityEl.innerHTML = recentEvents.map(e => {
          const col = this.colonies.find(c => c.id === e.colonyId);
          const formattedDate = new Date(e.dateTime).toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
          return `
            <div class="timeline-event">
              <div class="timeline-dot"></div>
              <div class="timeline-card" style="padding: 12px 16px; cursor: pointer;" onclick="app.navigate('detailed-table', { type: 'observations', highlightId: '${e.id}' })">
                <div class="timeline-header" style="margin-bottom:4px;">
                  <div class="timeline-title">
                    <span class="colony-tag">${col ? col.name : 'Unknown'}</span>
                    <span class="badge badge-info" style="font-size:9px; padding:2px 4px;">${e.type}</span>
                  </div>
                  <span class="timeline-date">${formattedDate}</span>
                </div>
                <div class="timeline-body" style="font-size: 12.5px;">${e.notes}</div>
              </div>
            </div>
          `;
        }).join("");
      }
    }

    // Render Swarm Widget
    const swarmEl = document.getElementById("dash-swarm-list");
    if (swarmEl) {
      const recentSights = [...this.sightings].slice(0, 2);
      if (recentSights.length === 0) {
        swarmEl.innerHTML = `<div style="padding: 10px; text-align:center; color:var(--text-muted); font-size:12px;">No sightings.</div>`;
      } else {
        swarmEl.innerHTML = recentSights.map(s => `
          <div style="font-size: 12.5px; border-bottom: 1px solid rgba(255,255,255,0.04); padding: 8px 0; display:flex; justify-content:space-between; cursor:pointer;" onclick="app.navigate('detailed-table', { type: 'sightings' })">
            <div>
              <strong style="color:var(--accent-primary); font-style:italic;">${s.species}</strong> in <strong>${s.location}</strong>
            </div>
            <span style="color:var(--text-muted); font-size:11px;">${s.date}</span>
          </div>
        `).join("");
      }
    }

    this.updateSensorWidgets();
  }

  renderDetailedTable() {
    const container = document.getElementById("detailed-table-container");
    if (!container) return;

    const titleEl = document.getElementById("detailed-table-title");
    const subtitleEl = document.getElementById("detailed-table-subtitle");

    const projectColonies = this.colonies.filter(c => c.projectId === this.activeProjectId);
    const projectColoniesIds = new Set(projectColonies.map(c => c.id));

    const type = this.detailedTableType || "colonies";

    if (type === "colonies") {
      titleEl.innerText = "Detailed Table: Colonies Overview";
      subtitleEl.innerText = `Detailed list of all colonies active under the current project. Click on any cell to navigate to that section.`;

      if (projectColonies.length === 0) {
        container.innerHTML = `<p style="padding: 20px; text-align:center; color: var(--text-muted);">No colonies active in this project.</p>`;
        return;
      }

      const tableRows = projectColonies.map(c => {
        // Find matching species
        const spec = this.speciesList.find(sp => sp.name.toLowerCase() === c.species.toLowerCase() || sp.commonName.toLowerCase() === c.species.toLowerCase());
        const speciesAction = spec 
          ? `onclick="app.navigate('species-detail', { id: '${spec.id}' })" style="cursor:pointer; text-decoration: underline; color: var(--accent-primary); font-style: italic;"`
          : `onclick="app.navigate('species')" style="cursor:pointer; text-decoration: underline; font-style: italic;"`;

        // Action links
        const overviewAction = `onclick="app.navigate('colony-detail', { id: '${c.id}', tabId: 'colony-tab-overview' })"`;
        const journalAction = `onclick="app.navigate('colony-detail', { id: '${c.id}', tabId: 'colony-tab-journal' })"`;
        const remindersAction = `onclick="app.navigate('colony-detail', { id: '${c.id}', tabId: 'colony-tab-reminders' })"`;
        const sensorAction = `onclick="app.navigate('colony-detail', { id: '${c.id}', tabId: 'colony-tab-sensors' })"`;
        const mapAction = `onclick="app.navigate('colony-detail', { id: '${c.id}', tabId: 'colony-tab-maps' })"`;

        const statusBadge = c.status === 'decline' ? 'badge-danger' : (c.status === 'hibernation' ? 'badge-warning' : (c.status === 'founding' ? 'badge-info' : 'badge-success'));

        return `
          <tr>
            <td ${overviewAction} style="cursor:pointer; font-weight:600; color:var(--accent-primary);">${c.name}</td>
            <td ${speciesAction}>${c.species}</td>
            <td ${overviewAction} style="cursor:pointer;"><span class="badge ${statusBadge}">${c.status}</span></td>
            <td ${overviewAction} style="cursor:pointer; text-align:center;">${c.queens}</td>
            <td ${overviewAction} style="cursor:pointer; text-align:center;">${c.workers}</td>
            <td ${overviewAction} style="cursor:pointer;">${new Date(c.founded).toLocaleDateString()}</td>
            <td ${overviewAction} style="cursor:pointer; max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${c.setup || 'None'}</td>
            <td style="display: flex; gap: 8px; justify-content: flex-start; align-items: center; border-bottom: none;">
              <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" ${overviewAction}>Overview</button>
              <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" ${journalAction}>Journal</button>
              <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" ${remindersAction}>Tasks</button>
              <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" ${sensorAction}>Sensors</button>
              <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" ${mapAction}>Maps</button>
            </td>
          </tr>
        `;
      }).join("");

      container.innerHTML = `
        <table class="collaborators-table" style="min-width: 900px;">
          <thead>
            <tr>
              <th>Colony Name</th>
              <th>Species</th>
              <th>Status</th>
              <th style="text-align:center;">Queens</th>
              <th style="text-align:center;">Workers</th>
              <th>Founded Date</th>
              <th>Setup Notes</th>
              <th>Deep Dive Tabs</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      `;
    } 
    else if (type === "reminders") {
      titleEl.innerText = "Detailed Table: Active Care Tasks";
      subtitleEl.innerText = `Detailed list of pending and overdue care reminders for this project's colonies. Click a cell to inspect.`;

      const projectReminders = this.reminders.filter(r => projectColoniesIds.has(r.colonyId));

      if (projectReminders.length === 0) {
        container.innerHTML = `<p style="padding: 20px; text-align:center; color: var(--text-muted);">No care tasks found.</p>`;
        return;
      }

      const tableRows = projectReminders.map(r => {
        const col = this.colonies.find(c => c.id === r.colonyId);
        const colAction = col 
          ? `onclick="app.navigate('colony-detail', { id: '${col.id}', tabId: 'colony-tab-overview' })"` 
          : "";
        
        const taskAction = col 
          ? `onclick="app.navigate('colony-detail', { id: '${col.id}', tabId: 'colony-tab-reminders' })"` 
          : "";

        const isOverdue = r.status === "overdue";
        const formattedDate = new Date(r.dueDate).toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

        return `
          <tr style="${this.highlightId === r.id ? 'background-color: rgba(212, 163, 115, 0.08); font-weight:600;' : ''}">
            <td ${taskAction} style="cursor:pointer; color:var(--accent-primary); font-weight: 500;">${r.title}</td>
            <td ${colAction} style="cursor:pointer; text-decoration: underline;">${col ? col.name : 'General'}</td>
            <td ${taskAction} style="cursor:pointer; ${isOverdue ? 'color: var(--accent-danger); font-weight:600;' : ''}">${formattedDate}</td>
            <td ${taskAction} style="cursor:pointer; text-transform: capitalize;">${r.repeat}</td>
            <td ${taskAction} style="cursor:pointer;">
              <span class="badge ${r.status === 'completed' ? 'badge-success' : (r.status === 'overdue' ? 'badge-danger' : 'badge-info')}">
                ${r.status}
              </span>
            </td>
            <td style="display: flex; gap: 8px;">
              ${r.status !== 'completed' ? `<button class="btn btn-primary" style="padding: 4px 8px; font-size: 11px;" onclick="app.completeReminder('${r.id}'); app.renderDetailedTable();">Complete</button>` : ''}
              ${r.status !== 'completed' ? `<button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="app.snoozeReminder('${r.id}'); app.renderDetailedTable();">Snooze</button>` : ''}
              <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px; color: var(--accent-danger);" onclick="app.deleteReminder('${r.id}'); app.renderDetailedTable();">Delete</button>
            </td>
          </tr>
        `;
      }).join("");

      container.innerHTML = `
        <table class="collaborators-table">
          <thead>
            <tr>
              <th>Task Title</th>
              <th>Target Colony</th>
              <th>Due Date</th>
              <th>Repeat Interval</th>
              <th>Status</th>
              <th>Quick Actions</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      `;
    } 
    else if (type === "observations") {
      titleEl.innerText = "Detailed Table: Journal Observations";
      subtitleEl.innerText = `Full history of logged observations, feedings, and growth measurements. Click a cell to explore.`;

      const projectEvents = this.events.filter(e => projectColoniesIds.has(e.colonyId));

      if (projectEvents.length === 0) {
        container.innerHTML = `<p style="padding: 20px; text-align:center; color: var(--text-muted);">No journal entries logged yet.</p>`;
        return;
      }

      // Sort newest first
      projectEvents.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

      const tableRows = projectEvents.map(e => {
        const col = this.colonies.find(c => c.id === e.colonyId);
        const colAction = col 
          ? `onclick="app.navigate('colony-detail', { id: '${col.id}', tabId: 'colony-tab-overview' })"` 
          : "";
        
        const journalAction = col 
          ? `onclick="app.navigate('colony-detail', { id: '${col.id}', tabId: 'colony-tab-journal' })"` 
          : "";

        const formattedDate = new Date(e.dateTime).toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

        return `
          <tr style="${this.highlightId === e.id ? 'background-color: rgba(212, 163, 115, 0.08); font-weight:600;' : ''}">
            <td ${journalAction} style="cursor:pointer; max-width: 300px; white-space: normal; line-height: 1.4;">${e.notes}</td>
            <td ${colAction} style="cursor:pointer; text-decoration: underline; font-weight:500;">${col ? col.name : 'Unknown'}</td>
            <td ${journalAction} style="cursor:pointer;"><span class="badge badge-info">${e.type}</span></td>
            <td ${journalAction} style="cursor:pointer;">${formattedDate}</td>
            <td ${journalAction} style="cursor:pointer; text-align:center;">${e.workers !== undefined ? e.workers : 'N/A'}</td>
            <td ${journalAction} style="cursor:pointer; text-transform:capitalize;">${e.broodState || 'N/A'}</td>
          </tr>
        `;
      }).join("");

      container.innerHTML = `
        <table class="collaborators-table">
          <thead>
            <tr>
              <th>Observation Details</th>
              <th>Colony</th>
              <th>Category</th>
              <th>Date & Time</th>
              <th style="text-align:center;">Workers Count</th>
              <th>Brood Stage</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      `;
    } 
    else if (type === "sensors") {
      titleEl.innerText = "Detailed Table: Formicarium Conditions";
      subtitleEl.innerText = `Live sensor parameters and environmental chambers mapped to your colonies. Click a cell to view history.`;

      const cache = window.sensorCache || {
        "sensor-temp-1": "24.5", "sensor-hum-1": "62.0",
        "sensor-temp-2": "21.8", "sensor-hum-2": "22.5"
      };

      // Mapped fake chambers for active colonies
      const col = projectColonies[0] || { name: "No Active Colony", id: "" };
      const colAction = col.id 
        ? `onclick="app.navigate('colony-detail', { id: '${col.id}', tabId: 'colony-tab-overview' })"` 
        : "";
      const sensorAction = col.id 
        ? `onclick="app.navigate('colony-detail', { id: '${col.id}', tabId: 'colony-tab-sensors' })"` 
        : "";

      container.innerHTML = `
        <table class="collaborators-table">
          <thead>
            <tr>
              <th>Sensor Location / Chamber</th>
              <th>Mapped Colony</th>
              <th>Temperature Reading</th>
              <th>Humidity Reading</th>
              <th>Target Range</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td ${sensorAction} style="cursor:pointer; color:var(--accent-primary); font-weight:600;">Nest Chamber A (Main Nest)</td>
              <td ${colAction} style="cursor:pointer; text-decoration:underline;">${col.name}</td>
              <td ${sensorAction} style="cursor:pointer; color:var(--accent-danger); font-weight:700;">${cache["sensor-temp-1"]}°C</td>
              <td ${sensorAction} style="cursor:pointer; color:var(--accent-info); font-weight:700;">${cache["sensor-hum-1"]}%</td>
              <td ${sensorAction} style="cursor:pointer;">22°C - 28°C / 50% - 70%</td>
              <td ${sensorAction} style="cursor:pointer;"><span class="badge badge-success">Optimal</span></td>
            </tr>
            <tr>
              <td ${sensorAction} style="cursor:pointer; color:var(--accent-primary); font-weight:600;">Dry Granary B (Seed Storage)</td>
              <td ${colAction} style="cursor:pointer; text-decoration:underline;">${col.name}</td>
              <td ${sensorAction} style="cursor:pointer; color:var(--accent-danger); font-weight:700;">${cache["sensor-temp-2"]}°C</td>
              <td ${sensorAction} style="cursor:pointer; color:var(--accent-info); font-weight:700;">${cache["sensor-hum-2"]}%</td>
              <td ${sensorAction} style="cursor:pointer;">20°C - 24°C / 10% - 30%</td>
              <td ${sensorAction} style="cursor:pointer;"><span class="badge badge-success">Optimal</span></td>
            </tr>
          </tbody>
        </table>
      `;
    } 
    else if (type === "sightings") {
      titleEl.innerText = "Detailed Table: Nuptial Swarm Reports";
      subtitleEl.innerText = `Community observed nuptial swarms and flight reports. Click a cell to view on map.`;

      if (this.sightings.length === 0) {
        container.innerHTML = `<p style="padding: 20px; text-align:center; color: var(--text-muted);">No swarm sightings recorded.</p>`;
        return;
      }

      const tableRows = this.sightings.map(s => {
        const mapAction = `onclick="app.navigate('swarm-map')"`;

        return `
          <tr ${mapAction} style="cursor:pointer;">
            <td style="color:var(--accent-primary); font-style:italic; font-weight:600;">${s.species}</td>
            <td style="font-weight:500;">${s.location}</td>
            <td>${s.date}</td>
            <td>${s.notes || 'No description provided'}</td>
            <td><span class="badge badge-info">Open Map →</span></td>
          </tr>
        `;
      }).join("");

      container.innerHTML = `
        <table class="collaborators-table">
          <thead>
            <tr>
              <th>Species</th>
              <th>Location</th>
              <th>Flight Date</th>
              <th>Details & Notes</th>
              <th>Interactive Map</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      `;
    }
  }

  // Colony List
  renderColonyList() {
    const listEl = document.getElementById("colony-list-container");
    if (!listEl) return;

    // Toggle New Colony button in header
    const headerBtn = document.querySelector("#view-colonies button.btn-primary");
    if (headerBtn) headerBtn.style.display = this.hasPermission("write") ? "flex" : "none";

    const activeColonies = this.colonies.filter(c => c.status !== "archived" && c.projectId === this.activeProjectId);

    if (activeColonies.length === 0) {
      let emptyBtnHtml = '';
      if (this.projects.length === 0) {
        emptyBtnHtml = `<button class="btn btn-primary" onclick="app.navigate('create-project')">Create First Project</button>`;
      } else if (this.hasPermission("write")) {
        emptyBtnHtml = `<button class="btn btn-primary" onclick="app.navigate('add-colony')">Add First Colony</button>`;
      } else {
        emptyBtnHtml = `<p style="color: var(--text-muted); font-size: 13.5px;">No colonies found in this project. Ask the project owner to add one.</p>`;
      }

      listEl.innerHTML = `
        <div style="grid-column: span 3; text-align: center; padding: 60px 20px; border: 1px dashed var(--border-color); border-radius: var(--radius-md);">
          <div style="font-size: 40px; margin-bottom: 16px;">🐜</div>
          <h3>No Colonies Managed Yet</h3>
          <p style="color:var(--text-secondary); margin: 8px 0 20px; font-size:14px;">Let's get started by logging your first ant colony setup.</p>
          ${emptyBtnHtml}
        </div>
      `;
      return;
    }

    listEl.innerHTML = activeColonies.map(c => {
      let statusBadge = "badge-success";
      if (c.status === "founding") statusBadge = "badge-info";
      if (c.status === "hibernation") statusBadge = "badge-warning";
      if (c.status === "decline") statusBadge = "badge-danger";

      return `
        <div class="card colony-card" onclick="app.navigate('colony-detail', {id: '${c.id}'})">
          <img class="colony-card-img" src="${c.photo || 'assets/queen_ant_eggs.jpg'}" alt="${c.name}">
          <div class="colony-card-body">
            <div>
              <div class="colony-card-header">
                <span class="colony-card-title">${c.name}</span>
                <span class="badge ${statusBadge}">${c.status}</span>
              </div>
              <div class="colony-card-species">${c.species}</div>
              <div class="colony-card-stats">
                <div class="colony-card-stat">
                  👑 <span>${c.queens} queen${c.queens > 1 ? 's' : ''}</span>
                </div>
                <div class="colony-card-stat">
                  👥 <span>${c.workers} workers</span>
                </div>
              </div>
            </div>
            <div class="colony-card-footer">
              <span>Founded ${new Date(c.founded).toLocaleDateString([], { month: "short", year: "numeric" })}</span>
              <span>Details →</span>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // Colony Details View
  renderColonyDetail() {
    const col = this.colonies.find(c => c.id === this.selectedColonyId);
    if (!col) {
      this.navigate("colonies");
      return;
    }

    // Dynamic Header buttons
    const actionsEl = document.getElementById("colony-detail-actions");
    if (actionsEl) {
      let actionsHtml = "";
      if (this.hasPermission("write")) {
        actionsHtml += `<button class="btn ${this.colonyDetailEditMode ? "btn-primary" : "btn-secondary"}" type="button" title="${this.colonyDetailEditMode ? "Close colony editor" : "Edit colony"}" aria-label="${this.colonyDetailEditMode ? "Close colony editor" : "Edit colony"}" onclick="app.toggleColonyDetailEditMode()" style="padding:6px 10px; min-width:38px;">✎</button>`;
      }
      if (this.hasPermission("delete_colony")) {
        actionsHtml += `<button class="btn btn-danger" style="background-color:rgba(231,111,81,0.15); color:var(--accent-danger); border:1px solid rgba(231,111,81,0.3);" onclick="app.archiveColony('${col.id}')">Archive Colony</button>`;
      }
      actionsEl.innerHTML = actionsHtml;
    }

    // Toggle observation button
    const obsBtn = document.querySelector("#colony-tab-journal button.btn-primary");
    if (obsBtn) obsBtn.style.display = this.hasPermission("write") ? "block" : "none";

    // Toggle reminder button
    const remBtn = document.querySelector("#colony-tab-reminders button.btn-primary");
    if (remBtn) remBtn.style.display = this.hasPermission("write") ? "block" : "none";

    // Toggle map buttons
    const mapAddBtn = document.querySelector("#colony-tab-maps button.btn-secondary");
    if (mapAddBtn) mapAddBtn.style.display = this.hasPermission("write") ? "block" : "none";
    const zoneAddBtn = document.querySelector("#colony-tab-maps button.btn-primary");
    if (zoneAddBtn) zoneAddBtn.style.display = this.hasPermission("write") ? "block" : "none";
    const galleryAddBtn = document.getElementById("colony-gallery-add-btn");
    if (galleryAddBtn) galleryAddBtn.style.display = this.hasPermission("write") ? "inline-flex" : "none";

    // Sidebar Info
    const sidebarEl = document.getElementById("colony-detail-sidebar");
    if (sidebarEl) {
      let statusBadge = "badge-success";
      if (col.status === "founding") statusBadge = "badge-info";
      if (col.status === "hibernation") statusBadge = "badge-warning";
      if (col.status === "decline") statusBadge = "badge-danger";

      sidebarEl.innerHTML = `
        <img class="sidebar-colony-img" src="${col.photo || 'assets/queen_ant_eggs.jpg'}" alt="${col.name}">
        <div>
          <h2 style="font-family: var(--font-heading); font-size:22px; font-weight:700; margin-bottom:4px;">${col.name}</h2>
          <span class="badge ${statusBadge}">${col.status}</span>
        </div>
        <div class="colony-info-list">
          <div class="colony-info-item">
            <span>Species</span>
            <span style="font-style:italic; font-weight:600; color:var(--accent-primary);">${col.species}</span>
          </div>
          <div class="colony-info-item">
            <span>Queens</span>
            <span>${col.queens}</span>
          </div>
          <div class="colony-info-item">
            <span>Workers</span>
            <span>${col.workers}</span>
          </div>
          <div class="colony-info-item">
            <span>Founded</span>
            <span>${new Date(col.founded).toLocaleDateString()}</span>
          </div>
        </div>
        <div id="colony-detail-sidebar-species-context" style="margin-top: 16px;"></div>
      `;
    }

    // Description & Notes Fields
    document.getElementById("colony-detail-desc").innerText = col.notes || "No notes logged for this colony.";
    document.getElementById("colony-detail-setup-notes").innerText = col.setup || "No setup notes recorded.";
    document.getElementById("colony-detail-diet").innerText = col.diet || "No dietary preferences recorded.";
    this.refreshColonyDetailSpeciesContext(col);
    this.renderColonyDetailEditor(col);

    // Render Journal events
    this.renderColonyJournal();

    // Render Reminders
    this.renderColonyReminders();

    // Render Maps
    this.renderColonyMaps();

    // Render Gallery
    this.ensureColonyDetailPhotoState(col);
    this.renderColonyGallery();

    // Render conditions
    this.updateSensorWidgets();
    this.renderColonySensorChart();

    // Set active tab in the tab bar
    const tabId = this.activeColonyTab || "colony-tab-overview";
    const tabBtns = document.querySelectorAll("#view-colony-detail .tab-bar .tab-btn");
    tabBtns.forEach(btn => {
      const onclickAttr = btn.getAttribute("onclick");
      if (onclickAttr && onclickAttr.includes(tabId)) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    const contents = document.querySelectorAll("#view-colony-detail .tab-content");
    contents.forEach(c => {
      if (c.id === tabId) {
        c.classList.add("active");
      } else {
        c.classList.remove("active");
      }
    });

    // Inject AI action bars into each tab
    const tabPromptMap = {
      "colony-tab-overview": "colony-overview-fill",
      "colony-tab-journal": "journal-entry-fill",
      "colony-tab-reminders": "reminder-planner",
      "colony-tab-maps": "nest-layout-advisor",
      "colony-tab-gallery": "colony-overview-fill",
      "colony-tab-sensors": "conditions-analysis",
      "colony-tab-ai": "care-plan"
    };
    for (const [tabElId, promptKey] of Object.entries(tabPromptMap)) {
      const tabEl = document.getElementById(tabElId);
      if (!tabEl) continue;
      // Remove any previously injected bar
      const prev = tabEl.querySelector(".ai-action-bar");
      if (prev) prev.remove();
      tabEl.insertAdjacentHTML("afterbegin", this.buildAiActionBar(promptKey));
    }

    this.renderColonyAiInsightsPanel();
  }

  renderColonyJournal() {
    const timelineEl = document.getElementById("colony-journal-timeline");
    if (!timelineEl) return;

    const colEvents = this.events.filter(e => e.colonyId === this.selectedColonyId);

    if (colEvents.length === 0) {
      timelineEl.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-muted);">
          No timeline events recorded yet. Click "+ New Observation" to log feeding, counts, or behaviors.
        </div>
      `;
      return;
    }

    // Sort chronologically (newest first)
    colEvents.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

    timelineEl.innerHTML = colEvents.map(e => {
      const formattedDate = new Date(e.dateTime).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
      let badgeClass = "badge-info";
      if (e.type === "feeding") badgeClass = "badge-success";
      if (e.type === "health") badgeClass = "badge-danger";
      if (e.type === "setup") badgeClass = "badge-warning";

      return `
        <div class="timeline-event">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <div class="timeline-header">
              <div class="timeline-title">
                <span class="badge ${badgeClass}">${e.type}</span>
                ${e.workers ? `<span style="font-size:12px; color:var(--text-secondary); margin-left:8px;">👥 ${e.workers} workers</span>` : ''}
                ${e.broodState ? `<span style="font-size:12px; color:var(--text-secondary); margin-left:8px;">🥚 ${e.broodState}</span>` : ''}
              </div>
              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <span class="timeline-date">${formattedDate}</span>
                ${this.hasPermission("write") ? `<button class="btn btn-secondary" style="padding:4px 8px; font-size:11px;" onclick="app.showEditEventModal('${e.id}')">Edit</button>` : ""}
              </div>
            </div>
            <div class="timeline-body">${e.notes}</div>
            ${e.photo ? `<img class="timeline-img" src="${e.photo}" alt="Event snap">` : ''}
          </div>
        </div>
      `;
    }).join("");
  }

  filterJournal() {
    const timelineEl = document.getElementById("colony-journal-timeline");
    if (!timelineEl) return;

    const filterType = document.getElementById("journal-filter-type").value;
    const query = document.getElementById("journal-search").value.toLowerCase();

    const colEvents = this.events.filter(e => {
      const matchesColony = e.colonyId === this.selectedColonyId;
      const matchesType = !filterType || e.type === filterType;
      const matchesQuery = !query || e.notes.toLowerCase().includes(query);
      return matchesColony && matchesType && matchesQuery;
    });

    if (colEvents.length === 0) {
      timelineEl.innerHTML = `<div style="text-align: center; padding: 40px; color: var(--text-muted);">No matching observations found.</div>`;
      return;
    }

    colEvents.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

    timelineEl.innerHTML = colEvents.map(e => {
      const formattedDate = new Date(e.dateTime).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
      let badgeClass = "badge-info";
      if (e.type === "feeding") badgeClass = "badge-success";
      if (e.type === "health") badgeClass = "badge-danger";
      if (e.type === "setup") badgeClass = "badge-warning";

      return `
        <div class="timeline-event">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <div class="timeline-header">
              <div class="timeline-title">
                <span class="badge ${badgeClass}">${e.type}</span>
                ${e.workers ? `<span style="font-size:12px; color:var(--text-secondary); margin-left:8px;">👥 ${e.workers} workers</span>` : ''}
                ${e.broodState ? `<span style="font-size:12px; color:var(--text-secondary); margin-left:8px;">🥚 ${e.broodState}</span>` : ''}
              </div>
              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <span class="timeline-date">${formattedDate}</span>
                ${this.hasPermission("write") ? `<button class="btn btn-secondary" style="padding:4px 8px; font-size:11px;" onclick="app.showEditEventModal('${e.id}')">Edit</button>` : ""}
              </div>
            </div>
            <div class="timeline-body">${e.notes}</div>
            ${e.photo ? `<img class="timeline-img" src="${e.photo}" alt="Event snap">` : ''}
          </div>
        </div>
      `;
    }).join("");
  }

  renderColonyReminders() {
    const listEl = document.getElementById("colony-reminders-list");
    if (!listEl) return;

    const colReminders = this.reminders.filter(r => r.colonyId === this.selectedColonyId);

    if (colReminders.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-muted);">
          No reminders for this colony. Click "+ New Reminder" to schedule feed dates or checkups.
        </div>
      `;
      return;
    }

    listEl.innerHTML = colReminders.map(r => {
      const isOverdue = r.status === "overdue";
      const isCompleted = r.status === "completed";
      const formattedDate = new Date(r.dueDate).toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
      
      const checkAction = this.hasPermission("write") 
        ? (isCompleted ? `onclick="app.toggleReminderComplete('${r.id}')"` : `onclick="app.completeReminder('${r.id}')"`)
        : "";
      const checkStyle = isCompleted ? 'style="background-color: var(--accent-success); border-color: var(--accent-success); cursor: pointer;"' : (this.hasPermission("write") ? 'style="cursor: pointer;"' : 'style="cursor: not-allowed; border-color: var(--text-muted);"');
      const checkContent = isCompleted ? "✓" : "";

      const snoozeBtnHtml = (!isCompleted && this.hasPermission("write")) 
        ? `<button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="app.snoozeReminder('${r.id}')">Snooze</button>` 
        : "";
      
      const deleteBtnHtml = this.hasPermission("delete_record")
        ? `<button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px; color: var(--accent-danger);" onclick="app.deleteReminder('${r.id}')">Delete</button>`
        : "";

      return `
        <div class="reminder-item" style="${isCompleted ? 'opacity: 0.6;' : ''}">
          <div class="reminder-content">
            <div class="reminder-check" ${checkStyle} ${checkAction}>${checkContent}</div>
            <div class="reminder-text-wrap">
              <span class="reminder-title" style="${isCompleted ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">${r.title}</span>
              <span class="reminder-meta">
                <span style="${isOverdue ? 'color: var(--accent-danger); font-weight:600;' : ''}">${formattedDate}</span>
                ${isOverdue ? '<span class="badge badge-danger" style="font-size:9px; padding:2px 4px;">Overdue</span>' : ''}
                ${r.repeat !== 'none' ? `• 🔄 ${r.repeat}` : ''}
              </span>
            </div>
          </div>
          <div style="display:flex; gap: 8px;">
            ${this.hasPermission("write") ? `<button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="app.showEditReminderModal('${r.id}')">Edit</button>` : ""}
            ${snoozeBtnHtml}
            ${deleteBtnHtml}
          </div>
        </div>
      `;
    }).join("");
  }

  renderColonyMaps() {
    const listEl = document.getElementById("colony-map-view-wrapper");
    if (!listEl) return;

    const colMaps = this.maps.filter(m => m.colonyId === this.selectedColonyId);

    if (colMaps.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-muted); border: 1px dashed var(--border-color); border-radius: var(--radius-md);">
          No maps defined for this nest. Click "+ Add Nest Map" to upload/select a layout.
        </div>
      `;
      return;
    }

    // Set active map to the first map if not selected
    if (!this.activeMapId || !colMaps.find(m => m.id === this.activeMapId)) {
      this.activeMapId = colMaps[0].id;
    }

    const currentMap = colMaps.find(m => m.id === this.activeMapId);
    const mapZones = this.zones.filter(z => z.mapId === this.activeMapId);

    listEl.innerHTML = `
      <div style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;">
        ${colMaps.map(m => `
          <button class="btn ${m.id === this.activeMapId ? 'btn-primary' : 'btn-secondary'}" style="padding: 6px 12px; font-size: 12px;" onclick="app.setActiveMap('${m.id}')">
            ${m.name}
          </button>
        `).join("")}
        ${this.hasPermission("write") && currentMap ? `<button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;" onclick="app.showEditMapModal('${currentMap.id}')">Edit Map</button>` : ""}
      </div>

      <div class="map-canvas-container">
        <img class="map-background" src="${currentMap.image}" alt="Nest Background">
        <div class="map-grid-overlay">
          ${mapZones.map(z => {
            const hasSensors = z.tempSensor || z.humSensor;
            const tempVal = hasSensors && window.sensorCache ? `${window.sensorCache[z.tempSensor]}°C` : '';
            return `
              <div class="map-zone" 
                   style="left: ${z.x}%; top: ${z.y}%; width: ${z.width}%; height: ${z.height}%;"
                   onclick="app.showZoneDetailModal('${z.id}')">
                <div style="text-align:center;">
                  <div>${z.name}</div>
                  ${tempVal ? `<div style="font-size:10px; font-weight:400; opacity:0.8; margin-top:2px;">🌡️ ${tempVal}</div>` : ''}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  setActiveMap(mapId) {
    this.activeMapId = mapId;
    this.renderColonyMaps();
  }

  renderColonySensorChart() {
    const container = document.getElementById("colony-sensor-chart-container");
    if (!container) return;

    // Generate points for last 24 hours (simulated)
    const pointsCount = 10;
    const width = 600;
    const height = 180;
    const padding = 20;

    // Temp points: fluctuate between 22 and 26
    // Humidity points: fluctuate between 45 and 58
    let tempPoints = [];
    let humPoints = [];

    for (let i = 0; i < pointsCount; i++) {
      const x = padding + (i * (width - 2 * padding)) / (pointsCount - 1);
      const tVal = 22.5 + Math.sin(i / 1.5) * 1.5 + (i % 2 === 0 ? 0.3 : -0.3);
      const hVal = 50.0 + Math.cos(i / 2) * 5 + (i % 2 === 0 ? -1.5 : 1.5);
      
      const ty = height - padding - ((tVal - 18) * (height - 2 * padding)) / 12; // Scale 18 to 30
      const hy = height - padding - ((hVal - 30) * (height - 2 * padding)) / 50; // Scale 30 to 80

      tempPoints.push({ x, y: ty, val: tVal.toFixed(1) });
      humPoints.push({ x, y: hy, val: hVal.toFixed(1) });
    }

    const tPath = tempPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(" ");
    const hPath = humPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(" ");

    container.innerHTML = `
      <svg class="chart-svg" viewBox="0 0 ${width} ${height}">
        <!-- Grid lines -->
        <line x1="${padding}" y1="${padding}" x2="${width - padding}" y2="${padding}" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
        <line x1="${padding}" y1="${height / 2}" x2="${width - padding}" y2="${height / 2}" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="rgba(255,255,255,0.05)" stroke-width="1" />

        <!-- Temp Line (Red) -->
        <path d="${tPath}" fill="none" stroke="var(--accent-danger)" stroke-width="2" />
        ${tempPoints.map(p => `<circle cx="${p.x}" cy="${p.y}" r="4" fill="var(--accent-danger)" />`).join("")}

        <!-- Humidity Line (Teal) -->
        <path d="${hPath}" fill="none" stroke="var(--accent-info)" stroke-width="2" />
        ${humPoints.map(p => `<circle cx="${p.x}" cy="${p.y}" r="4" fill="var(--accent-info)" />`).join("")}

        <!-- Labels -->
        <text x="${padding}" y="${height - 4}" fill="var(--text-muted)" font-size="10">24h ago</text>
        <text x="${width - padding}" y="${height - 4}" text-anchor="end" fill="var(--text-muted)" font-size="10">Now</text>
        <text x="30" y="24" fill="var(--accent-danger)" font-size="10" font-weight="600">🌡️ Temp (°C)</text>
        <text x="120" y="24" fill="var(--accent-info)" font-size="10" font-weight="600">💧 Humidity (%)</text>
      </svg>
    `;
  }

  // Reminders List Screen
  renderReminders() {
    const listEl = document.getElementById("reminders-list-container");
    if (!listEl) return;

    // Filter project reminders
    const projectColonies = this.colonies.filter(c => c.projectId === this.activeProjectId);
    const projectColoniesIds = new Set(projectColonies.map(c => c.id));
    const projectReminders = this.reminders.filter(r => projectColoniesIds.has(r.colonyId));

    let filtered = [];
    const now = new Date();

    if (this.activeReminderTab === "today") {
      filtered = projectReminders.filter(r => {
        if (r.status !== "pending") return false;
        const due = new Date(r.dueDate);
        return due.toDateString() === now.toDateString();
      });
    } else if (this.activeReminderTab === "upcoming") {
      filtered = projectReminders.filter(r => {
        if (r.status !== "pending") return false;
        const due = new Date(r.dueDate);
        return due > now && due.toDateString() !== now.toDateString();
      });
    } else if (this.activeReminderTab === "overdue") {
      filtered = projectReminders.filter(r => r.status === "overdue");
    } else if (this.activeReminderTab === "completed") {
      filtered = projectReminders.filter(r => r.status === "completed");
    }

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size:32px; margin-bottom: 12px;">🗓️</div>
          <p>No reminders found in this category.</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = filtered.map(r => {
      const col = this.colonies.find(c => c.id === r.colonyId);
      const isCompleted = r.status === "completed";
      const isOverdue = r.status === "overdue";
      const formattedDate = new Date(r.dueDate).toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

      const checkAction = this.hasPermission("write") 
        ? (isCompleted ? `onclick="app.toggleReminderComplete('${r.id}')"` : `onclick="app.completeReminder('${r.id}')"`)
        : "";
      const checkStyle = isCompleted ? 'style="background-color: var(--accent-success); border-color: var(--accent-success); cursor: pointer;"' : (this.hasPermission("write") ? 'style="cursor: pointer;"' : 'style="cursor: not-allowed; border-color: var(--text-muted);"');
      const checkContent = isCompleted ? "✓" : "";

      const snoozeBtnHtml = (!isCompleted && this.hasPermission("write")) 
        ? `<button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="app.snoozeReminder('${r.id}')">Snooze</button>` 
        : "";
      
      const deleteBtnHtml = this.hasPermission("delete_record")
        ? `<button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px; color: var(--accent-danger);" onclick="app.deleteReminder('${r.id}')">Delete</button>`
        : "";

      return `
        <div class="reminder-item" style="${isCompleted ? 'opacity: 0.6;' : ''}">
          <div class="reminder-content">
            <div class="reminder-check" ${checkStyle} ${checkAction}>${checkContent}</div>
            <div class="reminder-text-wrap">
              <span class="reminder-title" style="${isCompleted ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">${r.title}</span>
              <span class="reminder-meta">
                <span class="colony-tag">${col ? col.name : 'General Care'}</span> • 
                <span style="${isOverdue ? 'color: var(--accent-danger); font-weight:600;' : ''}">${formattedDate}</span>
                ${r.repeat !== 'none' ? `• 🔄 ${r.repeat}` : ''}
                ${isOverdue ? '<span class="badge badge-danger" style="font-size:9px; padding:2px 4px;">Overdue</span>' : ''}
              </span>
            </div>
          </div>
          <div style="display:flex; gap: 8px;">
            ${snoozeBtnHtml}
            ${deleteBtnHtml}
          </div>
        </div>
      `;
    }).join("");
  }

  switchReminderTab(event, tabName) {
    this.activeReminderTab = tabName;
    const tabs = event.target.parentElement.querySelectorAll(".tab-btn");
    tabs.forEach(t => t.classList.remove("active"));
    event.target.classList.add("active");
    this.renderReminders();
  }

  // Species Care Database
  renderSpeciesList() {
    const listEl = document.getElementById("species-list-container");
    const query = document.getElementById("species-search-input").value.toLowerCase();
    if (!listEl) return;

    const filtered = this.speciesList.filter(s => 
      s.name.toLowerCase().includes(query) || 
      (s.commonName || "").toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      listEl.innerHTML = `<div style="grid-column: span 3; text-align: center; padding: 40px; color: var(--text-muted);">No species care sheets match your search.</div>`;
      return;
    }

    listEl.innerHTML = filtered.map(s => `
      <div class="card" onclick="app.navigate('species-detail', {id: '${s.id}'})">
        <h3 class="card-title" style="font-style:italic;">${s.name}</h3>
        <p style="font-size: 13px; color: var(--accent-primary); margin-bottom: 12px; font-weight:500;">${s.commonName || s.vernacularName || "No common name cached"}</p>
        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; height: 60px; overflow:hidden; text-overflow:ellipsis;">
          ${s.notes || s.summary || "Taxonomy and occurrence context can be loaded dynamically from the live species catalog."}
        </p>
        <div style="border-top:1px solid var(--border-color); padding-top:12px; margin-top:12px; display:flex; justify-content:space-between; font-size:11px; color:var(--text-muted);">
          <span>Founding: ${(s.founding || "Context pending").split(" ")[0]}</span>
          <span>Read Care Sheet →</span>
        </div>
      </div>
    `).join("");
  }

  async renderSpeciesDetail() {
    const s = this.speciesList.find(item => item.id === this.selectedSpeciesId);
    const detailEl = document.getElementById("view-species-detail");
    if (!s || !detailEl) {
      this.navigate("species");
      return;
    }

    let liveData = null;
    try {
      if (this.isOnline()) {
        liveData = await this.resolveGbifSpeciesContext(s.name);
      }
    } catch (err) {
      console.warn(`Failed to refresh species detail for ${s.name}:`, err);
    }
    const speciesContext = this.buildSpeciesContext(s.name, liveData) || s;
    const tempRange = speciesContext.tempRange || "No cached husbandry temperature range";
    const humRange = speciesContext.humRange || "No cached husbandry humidity range";
    const founding = speciesContext.founding || "No curated founding guidance cached";
    const origin = speciesContext.origin || (speciesContext.topCountries && speciesContext.topCountries.length ? speciesContext.topCountries.join(", ") : "No cached origin summary");
    const diet = speciesContext.diet || "No curated diet guidance cached yet.";
    const growth = speciesContext.growth || `Public occurrence records cached: ${speciesContext.occurrenceCount || 0}`;
    const notes = speciesContext.notes || speciesContext.summary || "No extended notes cached for this species yet.";

    detailEl.innerHTML = `
      <div class="view-header" style="margin-bottom: 20px;">
        <button class="btn btn-secondary" onclick="app.navigate('species')">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="transform: rotate(180deg);"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          Back to List
        </button>
      </div>

      <div class="species-detail-grid">
        <div class="species-header-hero">
          <h1 class="species-title" style="font-style:italic;">${speciesContext.name}</h1>
          <p class="species-subtitle">${speciesContext.commonName || speciesContext.vernacularName || "No common name cached"}</p>
        </div>

        <div class="species-quick-stats">
          <div class="widget-panel">
            <h4 style="font-size:12px; color:var(--text-muted); text-transform:uppercase; margin-bottom:12px;">nest environment</h4>
            <div style="display:flex; flex-direction:column; gap:10px;">
              <div style="display:flex; justify-content:space-between; font-size:13px;">
                <span>Temperature</span>
                <strong style="color:var(--accent-danger);">${tempRange}</strong>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:13px;">
                <span>Humidity</span>
                <strong style="color:var(--accent-info);">${humRange}</strong>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:13px;">
                <span>Founding Type</span>
                <span>${founding.split(" ")[0]}</span>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:13px;">
                <span>Origin</span>
                <span>${origin}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="species-main-care">
          <div class="care-section">
            <div class="care-section-title">🐜 Founding behavior</div>
            <div class="care-section-content">${founding}</div>
          </div>
          <div class="care-section">
            <div class="care-section-title">🍖 Diet & Feeding checklist</div>
            <div class="care-section-content">${diet}</div>
          </div>
          <div class="care-section">
            <div class="care-section-title">⚡ Growth expectations</div>
            <div class="care-section-content">${growth}</div>
          </div>
          <div class="care-section">
            <div class="care-section-title">📝 Practical Care tips</div>
            <div class="care-section-content">${notes}</div>
          </div>
        </div>
      </div>
    `;
  }

  // Swarm Sighting Map
  renderSwarmMap() {
    const canvasEl = document.getElementById("swarm-map-canvas");
    const listEl = document.getElementById("swarm-sightings-list");
    if (!canvasEl || !listEl) return;

    // Clear previous pins
    canvasEl.innerHTML = `
      <div style="position: absolute; color: var(--text-muted); font-size: 10px; bottom: 8px; left: 8px;">
        Interactive Grid Map Simulation
      </div>
    `;

    // Render pins on map
    this.sightings.forEach(s => {
      const pin = document.createElement("div");
      pin.className = "map-zone";
      pin.style.left = `${s.x}%`;
      pin.style.top = `${s.y}%`;
      pin.style.width = "30px";
      pin.style.height = "30px";
      pin.style.borderRadius = "var(--radius-full)";
      pin.style.borderStyle = "solid";
      pin.style.backgroundColor = "rgba(212,163,115,0.4)";
      pin.style.zIndex = "10";
      pin.innerHTML = "🐜";
      pin.title = `${s.species} reported in ${s.location}`;
      pin.onclick = () => {
        alert(`Sighting Report:\nSpecies: ${s.species}\nLocation: ${s.location}\nDate: ${s.date}\nNotes: ${s.notes}`);
      };
      canvasEl.appendChild(pin);
    });

    // Render list sidebar
    if (this.sightings.length === 0) {
      listEl.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted);">No swarms reported.</div>`;
    } else {
      listEl.innerHTML = this.sightings.map(s => `
        <div style="background-color: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding:12px; margin-bottom:10px; font-size:12.5px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
            <strong style="font-style:italic; color:var(--accent-primary);">${s.species}</strong>
            <span style="color:var(--text-muted); font-size:11px;">${s.date}</span>
          </div>
          <div style="color:var(--text-secondary); font-weight:500;">📍 ${s.location}</div>
          <p style="color:var(--text-muted); margin-top:6px; font-size:11.5px; line-height:1.4;">${s.notes}</p>
        </div>
      `).join("");
    }
  }

  // News List
  renderNewsList() {
    const gridEl = document.getElementById("news-grid-container");
    if (!gridEl) return;

    gridEl.innerHTML = this.newsList.map(n => `
      <div class="card" style="cursor:default;">
        <span class="badge badge-info" style="font-size: 9px; align-self: flex-start; margin-bottom: 12px;">${n.category}</span>
        <h3 class="card-title">${n.title}</h3>
        <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px;">
          ${n.summary}
        </p>
        <div style="font-size: 13px; color: var(--text-muted); white-space: pre-line; line-height:1.6; border-top:1px solid var(--border-color); padding-top:16px;">
          ${n.content}
        </div>
        <div style="font-size: 11px; color: var(--text-muted); margin-top: 16px; text-align: right;">
          Published: ${n.date}
        </div>
      </div>
    `).join("");
  }

  // User Profile and Rules Settings
  renderProfile() {
    const u = this.currentUser;
    if (!u) return;

    document.getElementById("profile-username").value = u.username;
    document.getElementById("profile-email").value = u.email;
    document.getElementById("profile-newsletter").checked = u.newsletter;

    // Automation Rules list rendering
    const rulesListEl = document.getElementById("automation-rules-list");
    if (rulesListEl) {
      if (this.automationRules.length === 0) {
        rulesListEl.innerHTML = `<div style="text-align: center; font-size: 12px; color: var(--text-muted); padding: 12px;">No active automation rules.</div>`;
      } else {
        rulesListEl.innerHTML = this.automationRules.map(r => {
          const zone = this.zones.find(z => z.id === r.zoneId);
          let ruleDesc = "";
          if (r.trigger === "temp-low") ruleDesc = `If ${zone ? zone.name : 'Target'} Temp falls below ${r.threshold}`;
          if (r.trigger === "temp-high") ruleDesc = `If ${zone ? zone.name : 'Target'} Temp exceeds ${r.threshold}`;
          if (r.trigger === "hum-low") ruleDesc = `If ${zone ? zone.name : 'Target'} Humidity falls below ${r.threshold}`;
          if (r.trigger === "time-schedule") ruleDesc = `Daily timed light cycle ${r.threshold}`;

          return `
            <div style="background-color: var(--bg-primary); padding: 8px 12px; border-radius: var(--radius-sm); border:1px solid var(--border-color); margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center; font-size:12.5px;">
              <div>
                <div style="font-weight: 600;">${ruleDesc}</div>
                <div style="font-size: 11px; color: var(--text-muted); margin-top:2px;">↳ Run: ${r.action}</div>
              </div>
              <button class="btn btn-secondary" style="padding: 4px 6px; font-size:10px; color: var(--accent-danger);" onclick="app.deleteAutomationRule('${r.id}')">✕</button>
            </div>
          `;
        }).join("");
      }
    }

    // Connectors indicators
    const hasHA = this.currentUser.haConnected;
    const hasJeedom = this.currentUser.jeedomConnected;
    const hasDomoticz = this.currentUser.domoticzConnected;

    document.getElementById("ha-status-label").innerText = `Status: ${hasHA ? 'Connected ✅' : 'Disconnected ❌'}`;
    document.getElementById("jeedom-status-label").innerText = `Status: ${hasJeedom ? 'Connected ✅' : 'Disconnected ❌'}`;
    document.getElementById("domoticz-status-label").innerText = `Status: ${hasDomoticz ? 'Connected ✅' : 'Disconnected ❌'}`;
  }

  toggleConnector(connector) {
    if (connector === 'ha') this.currentUser.haConnected = !this.currentUser.haConnected;
    if (connector === 'jeedom') this.currentUser.jeedomConnected = !this.currentUser.jeedomConnected;
    if (connector === 'domoticz') this.currentUser.domoticzConnected = !this.currentUser.domoticzConnected;
    this.saveData();
    this.renderProfile();
  }

  // --- Smart Local AI Advice Generator ---
  generateColonyAIInsights() {
    const col = this.colonies.find(c => c.id === this.selectedColonyId);
    if (!col) return;

    const outEl = document.getElementById("colony-ai-insights-output");
    if (!outEl) return;

    outEl.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <span style="display:inline-block; font-size:24px; animation: spin 1.5s linear infinite;">🔄</span>
        <div style="margin-top: 12px; font-size: 13.5px; color: var(--text-secondary);">AI Nest Advisor is inspecting feeding timelines and environment parameters...</div>
      </div>
    `;

    // Perform analysis logic
    setTimeout(() => {
      const colEvents = this.events.filter(e => e.colonyId === col.id);
      const colReminders = this.reminders.filter(r => r.colonyId === col.id);
      
      const lastFeeding = colEvents.find(e => e.type === "feeding");
      let daysSinceFeed = 99;
      if (lastFeeding) {
        const feedDate = new Date(lastFeeding.dateTime);
        daysSinceFeed = Math.floor((new Date() - feedDate) / (1000 * 60 * 60 * 24));
      }

      const speciesData = this.speciesList.find(s => s.name === col.species);

      let rows = [];
      let overallStatus = "success";
      let summaryText = `Analysis of ${col.name} (${col.species}) shows stable growth conditions.`;

      // 1. Feeding Check
      if (daysSinceFeed > 5) {
        rows.push({
          category: "Feeding",
          status: "warning",
          insight: `No feeding events logged for the past ${daysSinceFeed} days.`,
          recommendation: "Schedule a feeding check. Harvester ants need a constant dry seed stock, while other garden ants require sugar feeds every 2-3 days."
        });
        overallStatus = "warning";
      } else {
        rows.push({
          category: "Feeding",
          status: "success",
          insight: `A feeding event was logged recently (${daysSinceFeed} day(s) ago).`,
          recommendation: "Maintain the current feeding cadence and keep logging observations."
        });
      }

      // 2. Reminder Completion Check
      const overdue = colReminders.filter(r => r.status === "overdue");
      if (overdue.length > 0) {
        rows.push({
          category: "Reminders",
          status: "warning",
          insight: `The colony has ${overdue.length} overdue care reminder task(s).`,
          recommendation: "Resolve pending reminders: " + overdue.map(o => o.title).join(", ") + "."
        });
        overallStatus = "warning";
      } else {
        rows.push({
          category: "Reminders",
          status: "success",
          insight: "No overdue care reminders were found.",
          recommendation: "Keep reminder completion rates high and continue reviewing the schedule."
        });
      }

      // 3. Environmental checks (specifically for Messor barbarus demo)
      if (col.id === "5b6e2d93-c46b-4e12-8d76-c56aef793b8e" && window.sensorCache) {
        const temp = parseFloat(window.sensorCache["sensor-temp-1"]);
        const hum = parseFloat(window.sensorCache["sensor-hum-1"]);
        
        if (temp < 22) {
          rows.push({
            category: "Temperature",
            status: "warning",
            insight: `Brood nest temperature is low (${temp}°C).`,
            recommendation: "Messor barbarus brood requires 22°C - 28°C for optimal development. Increase formicarium heat mat wattage."
          });
          overallStatus = "warning";
        } else {
          rows.push({
            category: "Temperature",
            status: "success",
            insight: `Nest temperature is stable at ${temp}°C.`,
            recommendation: "Continue monitoring the heat source and keep a warm brood zone."
          });
        }

        if (hum < 35) {
          rows.push({
            category: "Humidity",
            status: "danger",
            insight: `Nest humidity is critically low (${hum}%).`,
            recommendation: "Add water to the plaster/gypsum moisture reservoir immediately to prevent brood dehydration."
          });
          overallStatus = "danger";
        } else {
          rows.push({
            category: "Humidity",
            status: "success",
            insight: `Humidity is within a usable range at ${hum}%.`,
            recommendation: "Maintain the current hydration routine and watch for dry chambers."
          });
        }
      }

      if (rows.length === 0) {
        rows.push({
          category: "Overview",
          status: "info",
          insight: "All current parameters appear to be within expected bounds.",
          recommendation: "Maintain the current care regimen and monitor hydration levels."
        });
      }

      this.colonyAiInsightsState = {
        colonyId: col.id,
        colonyName: col.name,
        generatedAt: new Date().toISOString(),
        overallStatus,
        summary: summaryText,
        rows
      };
      this.renderColonyAiInsightsPanel();
    }, 1000);
  }

  // --- AI Chat Assistant (with live Gemini API option!) ---
  renderAIAssistant() {
    this.setupAiPaneResize();
    const keyStatusEl = document.getElementById("api-key-status");
    if (keyStatusEl) {
      const providerUrl = this.aiProviderUrl || "https://chatgpt.com";
      let providerLabel = providerUrl;
      try {
        providerLabel = new URL(providerUrl).hostname;
      } catch (err) {
        providerLabel = providerUrl;
      }
      keyStatusEl.innerHTML = `Current provider target: ${escapeHtml(providerLabel)}. Official provider sites may block iframe embedding; copy prompts and open the site in a normal tab if needed.`;
    }

    const rollup = document.getElementById("ai-prompt-rollup");
    if (rollup) {
      rollup.open = Boolean(this.aiPromptRollupOpen);
    }
    const providerRollup = document.getElementById("ai-provider-rollup");
    if (providerRollup) {
      providerRollup.open = Boolean(this.aiProviderRollupOpen);
    }
    const utilityRollup = document.getElementById("ai-utility-rollup");
    if (utilityRollup) {
      utilityRollup.open = Boolean(this.aiUtilityRollupOpen);
    }
    const hint = document.getElementById("ai-prompt-rollup-hint");
    if (hint) {
      hint.textContent = this.aiPromptRollupOpen ? "Collapse" : "Expand";
    }
    const providerHint = document.getElementById("ai-provider-rollup-hint");
    if (providerHint) {
      providerHint.textContent = this.aiProviderRollupOpen ? "Collapse" : "Expand";
    }
    const utilityHint = document.getElementById("ai-utility-rollup-hint");
    if (utilityHint) {
      utilityHint.textContent = this.aiUtilityRollupOpen ? "Collapse" : "Expand";
    }

    this.renderPreparedPromptList();
  }

  fillChatPrompt(promptKey) {
    this.copyPreparedPromptByKey(promptKey || "care-plan");
  }

  // --- AI Image Analysis Scanner ---
  changeScannerDemoImage() {
    const img = document.getElementById("scanner-img");
    if (!img) return;

    this.currentScannerPresetIndex = (this.currentScannerPresetIndex + 1) % this.scannerPresets.length;
    img.src = this.scannerPresets[this.currentScannerPresetIndex];

    // Hide previous results
    document.getElementById("box-queen").style.display = "none";
    document.getElementById("box-brood").style.display = "none";
    document.getElementById("scanner-results").style.display = "none";
  }

  runImageAnalysis() {
    const line = document.getElementById("scanner-line");
    const results = document.getElementById("scanner-results");
    if (!line || !results) return;

    // Trigger scanning line animation
    line.classList.add("scanning");
    results.style.display = "none";

    setTimeout(() => {
      line.classList.remove("scanning");
      
      const currentSrc = this.scannerPresets[this.currentScannerPresetIndex];
      let htmlContent = "";

      if (currentSrc.includes("queen_ant_eggs")) {
        // Show Queen & Brood boxes
        document.getElementById("box-queen").style.display = "flex";
        document.getElementById("box-brood").style.display = "flex";

        htmlContent = `
          <div style="background-color: var(--bg-tertiary); border:1px solid var(--border-color); padding: 12px; border-radius: var(--radius-sm); font-size:12.5px; line-height:1.5;">
            <div style="font-weight:600; color:var(--accent-success); margin-bottom:6px;">✓ Scan Complete</div>
            <div><strong>Species Guess:</strong> Lasius niger (94% confidence)</div>
            <div><strong>Workers Counted:</strong> 0 (Founding stage)</div>
            <div><strong>Brood Detected:</strong> Yes (Bundle of ~15-20 eggs)</div>
            <p style="color:var(--text-muted); margin-top:6px; font-size:11.5px;">Recommendations: Queen is in optimal founding state. Eggs are healthy. Avoid exposing nest to strong light.</p>
          </div>
        `;
      } else if (currentSrc.includes("nest_workers")) {
        htmlContent = `
          <div style="background-color: var(--bg-tertiary); border:1px solid var(--border-color); padding: 12px; border-radius: var(--radius-sm); font-size:12.5px; line-height:1.5;">
            <div style="font-weight:600; color:var(--accent-success); margin-bottom:6px;">✓ Scan Complete</div>
            <div><strong>Species Guess:</strong> Messor barbarus (88% confidence)</div>
            <div><strong>Workers Counted:</strong> ~25-30 visible in this chamber</div>
            <div><strong>Brood Detected:</strong> Yes (Multiple larvae clustered)</div>
            <p style="color:var(--text-muted); margin-top:6px; font-size:11.5px;">Recommendations: High density of worker activity around the larvae stack. Chamber plaster looks hydrated.</p>
          </div>
        `;
      } else {
        htmlContent = `
          <div style="background-color: var(--bg-tertiary); border:1px solid var(--border-color); padding: 12px; border-radius: var(--radius-sm); font-size:12.5px; line-height:1.5;">
            <div style="font-weight:600; color:var(--accent-success); margin-bottom:6px;">✓ Scan Complete</div>
            <div><strong>Activity:</strong> Feeding swarm (Sugar water droplets)</div>
            <div><strong>Workers Counted:</strong> 9 workers feeding</div>
            <p style="color:var(--text-muted); margin-top:6px; font-size:11.5px;">Recommendations: Outworld cleanup suggested after feed drops dry up to prevent mold bloom.</p>
          </div>
        `;
      }

      results.innerHTML = htmlContent;
      results.style.display = "block";

    }, 2000);
  }

  // --- Modals, Forms & Actions ---
  showModal(modalId) {
    if (modalId === "modal-add-sighting") {
      const filterInput = document.getElementById("sight-species-filter");
      if (filterInput) filterInput.value = "";
      this.renderSpeciesOptions("sighting");
    }
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("active");
  }

  populateColonyProjectSelect() {
    const select = document.getElementById("colony-project-select");
    if (!select) return;

    // Filter projects where current user has write permission
    const writeProjects = this.projects.filter(p => {
      if (p.owner === this.currentUser.uuid) return true;
      const member = p.members && p.members.find(m => m.userUuid === this.currentUser.uuid);
      return member && (member.role === "manager" || member.role === "contributor" || member.role === "owner");
    });

    const activeProj = this.getActiveProject();
    let hasSelected = false;
    
    select.innerHTML = writeProjects.map((p, index) => {
      let isSelected = false;
      if (activeProj && p.uuid === activeProj.uuid) {
        isSelected = true;
      }
      if (isSelected) hasSelected = true;
      return `<option value="${p.uuid}" ${isSelected ? 'selected' : ''}>${p.name}</option>`;
    }).join("");
    
    // If no project was marked as selected, select the first one by default
    if (!hasSelected && writeProjects.length > 0) {
      select.selectedIndex = 0;
    }
  }

  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
    if (modalId === "modal-add-colony") {
      this.editingColonyId = null;
    }
  }

  showAddEventModal() {
    this.editingEventId = null;
    const form = document.getElementById("add-event-form");
    if (form) form.reset();
    document.getElementById("event-colony-id").value = this.selectedColonyId;
    document.getElementById("event-date-input").value = new Date().toISOString().slice(0, 16);
    this.navigate('add-event');
  }

  showEditEventModal(eventId) {
    const item = this.events.find(entry => entry.id === eventId);
    if (!item) return;
    this.editingEventId = eventId;
    document.getElementById("event-colony-id").value = item.colonyId || "";
    document.getElementById("event-type-select").value = item.type || "observation";
    document.getElementById("event-date-input").value = item.dateTime || "";
    document.getElementById("event-workers-input").value = item.workers ?? "";
    document.getElementById("event-brood-select").value = item.broodState || "";
    document.getElementById("event-notes-input").value = item.notes || "";
    document.getElementById("event-photo-select").value = item.photo || "";
    this.navigate('add-event');
  }

  showAddColonyReminderModal() {
    this.editingReminderId = null;
    const form = document.getElementById("add-reminder-form");
    if (form) form.reset();
    document.getElementById("reminder-colony-id").value = this.selectedColonyId;
    document.getElementById("reminder-colony-select-group").style.display = "none";
    document.getElementById("reminder-date-input").value = new Date().toISOString().slice(0, 16);
    this.navigate('add-reminder');
  }

  showAddGeneralReminderModal() {
    this.editingReminderId = null;
    const form = document.getElementById("add-reminder-form");
    if (form) form.reset();
    document.getElementById("reminder-colony-id").value = "";
    const select = document.getElementById("reminder-colony-select");
    select.innerHTML = '<option value="">None (General Care)</option>' + 
      this.colonies.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
    document.getElementById("reminder-colony-select-group").style.display = "block";
    document.getElementById("reminder-date-input").value = new Date().toISOString().slice(0, 16);
    this.navigate('add-reminder');
  }

  showEditReminderModal(reminderId) {
    const item = this.reminders.find(entry => entry.id === reminderId);
    if (!item) return;
    this.editingReminderId = reminderId;
    document.getElementById("reminder-colony-id").value = item.colonyId || "";
    const select = document.getElementById("reminder-colony-select");
    if (select) {
      select.innerHTML = '<option value="">None (General Care)</option>' +
        this.colonies.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
      select.value = item.colonyId || "";
    }
    document.getElementById("reminder-colony-select-group").style.display = item.colonyId ? "none" : "block";
    document.getElementById("reminder-title-input").value = item.title || "";
    document.getElementById("reminder-date-input").value = item.dueDate || "";
    document.getElementById("reminder-repeat-select").value = item.repeat || "none";
    document.getElementById("reminder-notes-input").value = item.notes || "";
    this.navigate('add-reminder');
  }

  showAddMapModal() {
    this.editingMapId = null;
    const form = document.getElementById("add-map-form");
    if (form) form.reset();

    const presetSelect = document.getElementById("map-image-select");
    const preview = document.getElementById("map-image-preview");
    const previewState = document.getElementById("map-image-preview-state");
    if (presetSelect && preview) {
      preview.src = presetSelect.value;
    }
    if (previewState) {
      previewState.innerText = "Using selected preset preview.";
    }
    this.navigate('add-map');
  }

  showEditMapModal(mapId) {
    const item = this.maps.find(entry => entry.id === mapId);
    if (!item) return;
    this.editingMapId = mapId;
    document.getElementById("map-name-input").value = item.name || "";
    const presetSelect = document.getElementById("map-image-select");
    const preview = document.getElementById("map-image-preview");
    const previewState = document.getElementById("map-image-preview-state");
    const uploadInput = document.getElementById("map-image-upload");
    if (uploadInput) uploadInput.value = "";
    if (presetSelect) presetSelect.value = item.image || presetSelect.value;
    if (preview) preview.src = item.image || (presetSelect ? presetSelect.value : "");
    if (previewState) previewState.innerText = "Editing existing nest map.";
    this.navigate('add-map');
  }

  handleMapImageUploadChange(event) {
    const file = event.target.files && event.target.files[0];
    const preview = document.getElementById("map-image-preview");
    const previewState = document.getElementById("map-image-preview-state");
    if (!preview || !previewState) return;

    if (!file) {
      const presetSelect = document.getElementById("map-image-select");
      preview.src = presetSelect ? presetSelect.value : "";
      previewState.innerText = "Using selected preset preview.";
      return;
    }

    preview.src = URL.createObjectURL(file);
    previewState.innerText = `Using uploaded picture: ${file.name}`;
  }

  async readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error || new Error("Unable to read file."));
      reader.readAsDataURL(file);
    });
  }

  showAddZoneModal() {
    this.editingZoneId = null;
    const form = document.getElementById("add-zone-form");
    if (form) form.reset();
    this.navigate('add-zone');
  }

  showEditZoneModal(zoneId) {
    const item = this.zones.find(entry => entry.id === zoneId);
    if (!item) return;
    this.editingZoneId = zoneId;
    document.getElementById("zone-name-input").value = item.name || "";
    document.getElementById("zone-desc-input").value = item.desc || "";
    document.getElementById("zone-temp-sensor").value = item.tempSensor || "";
    document.getElementById("zone-hum-sensor").value = item.humSensor || "";
    document.getElementById("zone-x").value = item.x ?? 30;
    document.getElementById("zone-y").value = item.y ?? 40;
    document.getElementById("zone-width").value = item.width ?? 25;
    document.getElementById("zone-height").value = item.height ?? 20;
    this.activeMapId = item.mapId || this.activeMapId;
    this.navigate('add-zone');
  }

  showAddAutomationModal() {
    const zoneSelect = document.getElementById("auto-target-zone");
    const activeColZones = this.zones.filter(z => {
      const map = this.maps.find(m => m.id === z.mapId);
      return map && map.colonyId === this.selectedColonyId;
    });

    if (activeColZones.length === 0) {
      alert("Please define a mapped zone for this colony before creating automation rules.");
      return;
    }

    zoneSelect.innerHTML = activeColZones.map(z => `<option value="${z.id}">${z.name}</option>`).join("");
    this.navigate('add-automation');
  }

  showZoneDetailModal(zoneId) {
    const z = this.zones.find(item => item.id === zoneId);
    if (!z) return;

    const titleEl = document.getElementById("zd-title");
    const bodyEl = document.getElementById("zd-body");
    if (!titleEl || !bodyEl) return;

    titleEl.innerText = z.name;
    
    const cache = window.sensorCache || {};
    const tVal = z.tempSensor && cache[z.tempSensor] ? `${cache[z.tempSensor]}°C` : 'N/A';
    const hVal = z.humSensor && cache[z.humSensor] ? `${cache[z.humSensor]}%` : 'N/A';

    bodyEl.innerHTML = `
      <div style="font-size: 14px; line-height: 1.5; color: var(--text-secondary); margin-bottom: 16px;">
        ${z.desc || 'No description recorded.'}
      </div>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:16px;">
        <div style="background:var(--bg-primary); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border-color); text-align:center;">
          <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase;">temperature</div>
          <div style="font-size:22px; font-weight:700; color:var(--accent-danger); margin-top:4px;">${tVal}</div>
        </div>
        <div style="background:var(--bg-primary); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border-color); text-align:center;">
          <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase;">humidity</div>
          <div style="font-size:22px; font-weight:700; color:var(--accent-info); margin-top:4px;">${hVal}</div>
        </div>
      </div>
      <div style="border-top:1px solid var(--border-color); padding-top:12px;">
        <h4 style="font-size:13px; font-weight:600; margin-bottom:8px;">Zone Playlists & Camera Feed</h4>
        <div style="background-color:rgba(0,0,0,0.3); border-radius:var(--radius-sm); height:120px; display:flex; align-items:center; justify-content:center; color:var(--text-muted); font-size:12px;">
          📹 Live Camera Stream Offline
        </div>
      </div>
      ${this.hasPermission("write") ? `
        <div style="margin-top:16px; display:flex; justify-content:flex-end;">
          <button class="btn btn-secondary" type="button" onclick="app.showEditZoneModal('${z.id}')">Edit Zone</button>
        </div>
      ` : ""}
    `;

    this.navigate('zone-detail');
  }

  showEditColonyModal(colId) {
    const col = this.colonies.find(c => c.id === colId);
    if (!col) return;

    // Populate and select project
    this.populateColonyProjectSelect();
    const projSelect = document.getElementById("colony-project-select");
    if (projSelect) projSelect.value = col.projectId || "";

    // Fill form fields
    document.getElementById("colony-name-input").value = col.name;
    const speciesFilter = document.getElementById("colony-species-filter");
    if (speciesFilter) speciesFilter.value = col.species;
    this.renderSpeciesOptions("colony");
    document.getElementById("colony-species-select").value = col.species;
    document.getElementById("colony-queens-input").value = col.queens;
    document.getElementById("colony-workers-input").value = col.workers;
    document.getElementById("colony-date-input").value = col.founded;
    document.getElementById("colony-status-select").value = col.status;
    document.getElementById("colony-notes-input").value = col.notes;
    document.getElementById("colony-diet-input").value = col.diet;
    document.getElementById("colony-setup-input").value = col.setup;
    
    const isPublicCheck = document.getElementById("colony-is-public");
    const publicHtml = document.getElementById("colony-public-html");
    if (isPublicCheck) isPublicCheck.checked = Boolean(col.isPublic);
    if (publicHtml) publicHtml.innerHTML = col.publicPageHtml || "";
    
    this.colonyPhotoEntries = this.buildColonyPhotoList(col).map(photo => this.createStoredColonyPhotoEntry(photo));
    this.colonyPhotosBuffer = this.colonyPhotoEntries.filter(entry => entry.kind === "stored").map(entry => entry.src);
    this.colonySelectedPhotoIndex = this.colonyPhotoEntries.findIndex(entry => entry.src === col.photo);
    if (this.colonySelectedPhotoIndex === -1 && this.colonyPhotoEntries.length > 0) {
      this.colonySelectedPhotoIndex = 0;
    }
    
    const photoSelect = document.getElementById("colony-photo-select");
    const hiddenPhoto = document.getElementById("colony-selected-photo");
    const customPhotos = normalizePhotoList(col.customPhotos);
    if (photoSelect && !customPhotos.includes(col.photo)) {
      photoSelect.value = col.photo;
    }
    if (hiddenPhoto && customPhotos.includes(col.photo)) {
      hiddenPhoto.value = col.photo;
    }
    
    this.renderColonyPhotosPreview();

    // Temporarily track that we are editing
    this.editingColonyId = colId;
    this.navigate('add-colony');
    this.refreshColonySpeciesContext(col.species);
  }

  // Action methods
  archiveColony(colId) {
    if (!this.hasPermission("delete_colony")) {
      alert("You do not have permission to delete/archive colonies in this project.");
      return;
    }
    if (confirm("Are you sure you want to archive this colony? It will be hidden from the active list.")) {
      const col = this.colonies.find(c => c.id === colId);
      if (col) {
        col.status = "archived";
        this.saveData();
        this.navigate("colonies");
      }
    }
  }

  completeReminder(reminderId) {
    if (!this.hasPermission("write")) {
      alert("You do not have permission to modify data in this project.");
      return;
    }
    const rem = this.reminders.find(r => r.id === reminderId);
    if (rem) {
      rem.status = "completed";
      this.writeRecord("reminders", rem);
      
      // If it repeats, create the next occurrence
      if (rem.repeat !== "none") {
        const nextDue = new Date(rem.dueDate);
        if (rem.repeat === "daily") nextDue.setDate(nextDue.getDate() + 1);
        if (rem.repeat === "weekly") nextDue.setDate(nextDue.getDate() + 7);
        if (rem.repeat === "biweekly") nextDue.setDate(nextDue.getDate() + 14);
        if (rem.repeat === "monthly") nextDue.setMonth(nextDue.getMonth() + 1);

        const newRem = {
          id: generateUUID(),
          projectId: this.activeProjectId,
          colonyId: rem.colonyId,
          title: rem.title,
          dueDate: nextDue.toISOString().slice(0, 16),
          repeat: rem.repeat,
          notes: rem.notes,
          status: "pending"
        };
        this.reminders.push(newRem);
        this.writeRecord("reminders", newRem);
      }

      this.onViewRender(this.currentView);
    }
  }

  toggleReminderComplete(reminderId) {
    if (!this.hasPermission("write")) {
      alert("You do not have permission to modify data in this project.");
      return;
    }
    const rem = this.reminders.find(r => r.id === reminderId);
    if (rem) {
      rem.status = rem.status === "completed" ? "pending" : "completed";
      this.writeRecord("reminders", rem);
      this.onViewRender(this.currentView);
    }
  }

  snoozeReminder(reminderId) {
    if (!this.hasPermission("write")) {
      alert("You do not have permission to modify data in this project.");
      return;
    }
    const rem = this.reminders.find(r => r.id === reminderId);
    if (rem) {
      const now = new Date();
      // Add 24 hours
      const nextDue = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
      rem.dueDate = nextDue;
      rem.status = "pending";
      this.writeRecord("reminders", rem);
      this.onViewRender(this.currentView);
    }
  }

  deleteReminder(reminderId) {
    if (!this.hasPermission("delete_record")) {
      alert("You do not have permission to delete data in this project.");
      return;
    }
    const rem = this.reminders.find(r => r.id === reminderId);
    if (rem) {
      this.reminders = this.reminders.filter(r => r.id !== reminderId);
      this.deleteRecord("reminders", reminderId, rem);
    }
    this.onViewRender(this.currentView);
  }

  deleteAutomationRule(ruleId) {
    if (!this.hasPermission("delete_record")) {
      alert("You do not have permission to delete data in this project.");
      return;
    }
    const rule = this.automationRules.find(r => r.id === ruleId);
    if (rule) {
      this.automationRules = this.automationRules.filter(r => r.id !== ruleId);
      this.deleteRecord("rules", ruleId, rule);
    }
    this.renderProfile();
  }

  async saveGeminiKey() {
    const key = document.getElementById("gemini-key-input").value.trim();
    if (key) {
      this.apiKeys.gemini = key;
    } else {
      delete this.apiKeys.gemini;
    }
    this.saveData();
    if (!this.isFileMode()) {
      await this.apiRequest("/api/settings/gemini", {
        method: "POST",
        body: JSON.stringify({ geminiApiKey: key || "" })
      });
    } else if (this.workspaceDir) {
      this.writeWorkspaceFile(["app", "connectors"], "settings.md", { geminiApiKey: key || "" });
    }
    this.navigate('dashboard');
    this.renderAIAssistant();
  }

  switchTab(event, tabId) {
    const clickedTab = event.currentTarget || event.target.closest(".tab-btn");
    if (!clickedTab) return;

    const bar = clickedTab.parentElement;
    const tabBtns = bar.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => btn.classList.remove("active"));
    clickedTab.classList.add("active");

    const contentWrapper = bar.nextElementSibling || document.getElementById("colony-tab-overview").parentElement;
    const contents = contentWrapper.querySelectorAll(".tab-content");
    contents.forEach(c => c.classList.remove("active"));
    
    const activeContent = document.getElementById(tabId);
    if (activeContent) activeContent.classList.add("active");

    if (this.currentView === "colony-detail") {
      this.activeColonyTab = tabId;

      if (tabId === "colony-tab-maps") {
        this.renderColonyMaps();
      } else if (tabId === "colony-tab-gallery") {
        this.renderColonyGallery();
      } else if (tabId === "colony-tab-sensors") {
        this.updateSensorWidgets();
        this.renderColonySensorChart();
      } else if (tabId === "colony-tab-ai") {
        this.generateColonyAIInsights();
      }
    }

    if (activeContent) {
      requestAnimationFrame(() => {
        activeContent.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
      });
    }
  }

  logout() {
    this.currentUser = null;
    this.writeCache("antai-current-user-uuid-v1", null);
    this.saveData();
    this.renderSidebar();
    this.renderSidebarFooter();
    this.navigate("auth");
  }

  getSlugNameForRecord(collection, item) {
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

  getColonyIdForRecord(collection, item) {
    if (collection === "colonies") return item.uuid || item.id;
    if (item.colonyId) return item.colonyId;
    if (item.mapId) {
      const map = this.maps.find(m => m.id === item.mapId);
      if (map) return map.colonyId;
    }
    if (item.zoneId) {
      const zone = this.zones.find(z => z.id === item.zoneId);
      if (zone) {
        const map = this.maps.find(m => m.id === zone.mapId);
        if (map) return map.colonyId;
      }
    }
    return null;
  }

  getColonyIdForRecordId(collection, itemId) {
    if (collection === "colonies") return itemId;
    if (collection === "events") {
      const e = this.events.find(x => x.id === itemId);
      if (e) return e.colonyId;
    }
    if (collection === "reminders") {
      const r = this.reminders.find(x => x.id === itemId);
      if (r) return r.colonyId;
    }
    if (collection === "maps") {
      const m = this.maps.find(x => x.id === itemId);
      if (m) return m.colonyId;
    }
    if (collection === "zones") {
      const z = this.zones.find(x => x.id === itemId);
      if (z) {
        const m = this.maps.find(x => x.id === z.mapId);
        if (m) return m.colonyId;
      }
    }
    if (collection === "rules") {
      const r = this.automationRules.find(x => x.id === itemId);
      if (r) {
        const z = this.zones.find(x => x.id === r.zoneId);
        if (z) {
          const m = this.maps.find(x => x.id === z.mapId);
          if (m) return m.colonyId;
        }
      }
    }
    return null;
  }

  getProjectSlugForRecord(collection, item) {
    let pId = item.projectId;
    if (!pId) {
      if (collection === "colonies") {
        pId = item.projectId || this.activeProjectId;
      } else {
        const colonyId = this.getColonyIdForRecord(collection, item);
        const col = this.colonies.find(c => c.id === colonyId);
        if (col) {
          pId = col.projectId;
        }
      }
    }
    if (!pId) pId = this.activeProjectId;
    const project = this.projects.find(p => p.uuid === pId);
    if (project) {
      if (!project._slug) {
        project._slug = sanitizeSlug(project.name || "unnamed-project");
      }
      return project._slug;
    }
    return "default-project";
  }

  async writeRecord(collection, item) {
    this.saveData();
    if (!this.isFileMode()) {
      const savedItem = await this.apiRequest("/api/data/write", {
        method: "POST",
        body: JSON.stringify({ collection, item })
      });
      Object.assign(item, savedItem);
      return;
    }
    if (this.workspaceDir) {
      // 0. Support projects collection
      if (collection === "projects") {
        const slug = item._slug || sanitizeSlug(item.name || "unnamed-project");
        item._slug = slug;
        item._fileName = "project.md";
        await this.writeWorkspaceFile(["projects", slug], "project.md", item);
        return;
      }

      const projectSlug = this.getProjectSlugForRecord(collection, item);

      // 1. Resolve Colony Folder if colony and not set
      if (collection === "colonies" && !item._colonyFolder) {
        try {
          const baseSlug = this.getSlugNameForRecord("colonies", item);
          const projectsDir = await this.workspaceDir.getDirectoryHandle("projects", { create: true })
            .then(d => d.getDirectoryHandle(projectSlug, { create: true }));
          
          let name = baseSlug;
          let count = 0;
          while (true) {
            try {
              await projectsDir.getDirectoryHandle(name, { create: false });
              count++;
              name = `${baseSlug}-${count}`;
            } catch (e) {
              break;
            }
          }
          item._colonyFolder = name;
          item._fileName = "colony.md";
        } catch (e) {
          console.error("Error resolving colony folder:", e);
          item._colonyFolder = item.uuid || item.id;
          item._fileName = "colony.md";
        }
      }

      // 2. Resolve sub-record colony folder if needed
      let parentColonyFolder = "unknown-colony";
      if (collection !== "users" && collection !== "sightings" && collection !== "colonies") {
        const colonyId = this.getColonyIdForRecord(collection, item);
        const col = this.colonies.find(c => c.id === colonyId);
        if (col && col._colonyFolder) {
          parentColonyFolder = col._colonyFolder;
        } else if (colonyId) {
          parentColonyFolder = sanitizeSlug(colonyId);
        }
        item._colonyFolder = parentColonyFolder;
      }

      // 3. Resolve unique file name if not set
      if (!item._fileName) {
        try {
          const baseSlug = this.getSlugNameForRecord(collection, item);
          
          let targetDir = this.workspaceDir;
          let pathArray = [];
          if (collection === "users") {
            pathArray = ["app", "users"];
          } else if (collection === "sightings") {
            pathArray = ["app", "sightings"];
          } else {
            let subfolder = "others";
            if (collection === "events") subfolder = "events";
            else if (collection === "reminders") subfolder = "reminders";
            else if (collection === "maps") subfolder = "maps";
            else if (collection === "zones") subfolder = "zones";
            else if (collection === "rules") subfolder = "rules";
            pathArray = ["projects", projectSlug, parentColonyFolder, subfolder];
          }

          for (const segment of pathArray) {
            targetDir = await targetDir.getDirectoryHandle(segment, { create: true });
          }

          let name = `${baseSlug}.md`;
          let count = 0;
          while (true) {
            try {
              await targetDir.getFileHandle(name, { create: false });
              count++;
              name = `${baseSlug}-${count}.md`;
            } catch (e) {
              break;
            }
          }
          item._fileName = name;
        } catch (e) {
          console.error("Error resolving unique file name:", e);
          item._fileName = `${item.uuid || item.id}.md`;
        }
      }

      // 4. Determine final path and write
      let pathArray = [];
      let isMarkdown = true;
      if (collection === "users") {
        pathArray = ["app", "users"];
      } else if (collection === "sightings") {
        pathArray = ["app", "sightings"];
      } else if (collection === "colonies") {
        pathArray = ["projects", projectSlug, item._colonyFolder];
      } else {
        let subfolder = "others";
        if (collection === "events") subfolder = "events";
        else if (collection === "reminders") subfolder = "reminders";
        else if (collection === "maps") subfolder = "maps";
        else if (collection === "zones") subfolder = "zones";
        else if (collection === "rules") subfolder = "rules";
        pathArray = ["projects", projectSlug, item._colonyFolder, subfolder];
      }

      await this.writeWorkspaceFile(pathArray, item._fileName, item, isMarkdown);
    }
  }

  async deleteRecord(collection, itemId, record = null) {
    this.saveData();
    if (!this.isFileMode()) {
      await this.apiRequest("/api/data/delete", {
        method: "POST",
        body: JSON.stringify({ collection, itemId, record })
      });
      return;
    }
    if (this.workspaceDir) {
      if (collection === "projects") {
        const slug = record && record._slug ? record._slug : sanitizeSlug(itemId);
        await this.deleteWorkspaceFile(["projects", slug], "project.md");
        return;
      }

      let fileName = record && record._fileName ? record._fileName : `${itemId}.md`;
      let colonyFolder = record && record._colonyFolder ? record._colonyFolder : "unknown-colony";
      const projectSlug = this.getProjectSlugForRecord(collection, record || { id: itemId });

      let pathArray = [];
      if (collection === "users") {
        pathArray = ["app", "users"];
      } else if (collection === "sightings") {
        pathArray = ["app", "sightings"];
      } else if (collection === "colonies") {
        pathArray = ["projects", projectSlug, colonyFolder];
      } else {
        let subfolder = "others";
        if (collection === "events") subfolder = "events";
        else if (collection === "reminders") subfolder = "reminders";
        else if (collection === "maps") subfolder = "maps";
        else if (collection === "zones") subfolder = "zones";
        else if (collection === "rules") subfolder = "rules";
        pathArray = ["projects", projectSlug, colonyFolder, subfolder];
      }
      
      await this.deleteWorkspaceFile(pathArray, fileName);
    }
  }

  // --- Native File System Access API Integrations ---
  async selectWorkspaceDir() {
    try {
      const dirHandle = await window.showDirectoryPicker({
        mode: "readwrite"
      });
      this.workspaceDir = await this.normalizeWorkspaceDir(dirHandle);
      const writable = await this.verifyWorkspaceWriteAccess();
      if (!writable) {
        this.workspaceDir = null;
        alert("The selected data folder is not writable from this browser. Use a secure context and grant write permission, or use the fallback download.");
        return;
      }
      await this.syncWorkspaceFromLocalDir();
      const btn = document.getElementById("connect-workspace-btn");
      if (btn) btn.innerText = "✅ Connected to data/";
      alert("Local data folder connected successfully! Changes will now write directly to your Markdown files.");
      this.renderSidebar();
      this.onViewRender(this.currentView);
    } catch (err) {
      console.error("Directory selection failed:", err);
      alert("Failed to connect directory: " + err.message);
    }
  }

  async syncWorkspaceFromLocalDir() {
    if (!this.workspaceDir) return;
    const options = { mode: 'readwrite' };
    if ((await this.workspaceDir.queryPermission(options)) !== 'granted') {
      if ((await this.workspaceDir.requestPermission(options)) !== 'granted') {
        throw new Error('Permission to access folder was denied');
      }
    }

    try {
      // 1. Sync User Profile from app/users/
      this.users = [];
      try {
        const appDir = await this.workspaceDir.getDirectoryHandle("app", { create: true });
        const usersDir = await appDir.getDirectoryHandle("users", { create: true });
        for await (const entry of usersDir.values()) {
          if (entry.kind === 'file' && entry.name.endsWith('.md')) {
            const file = await entry.getFile();
            const text = await file.text();
            const parsed = parseMarkdownWithFrontMatter(text);
            const userProfile = { uuid: parsed.metadata.uuid, ...parsed.metadata };
            userProfile._fileName = entry.name;
            this.users.push(userProfile);
          }
        }
        try {
          const passwdHandle = await usersDir.getFileHandle("passwd", { create: false });
          const file = await passwdHandle.getFile();
          this.passwordStore = this.parsePasswdFile(await file.text());
        } catch (e) {
          this.passwordStore = {};
        }

        // Preserve the current authenticated user if it still exists on disk.
        if (this.currentUser) {
          const matched = this.users.find(u => u.uuid === this.currentUser.uuid || u.email === this.currentUser.email);
          if (matched) {
            this.currentUser = matched;
          } else {
            this.currentUser = null;
          }
        }
      } catch (e) {
        console.warn("Failed to load user profile from workspace:", e);
      }

      // 2. Sync API Keys / Connectors from app/connectors/settings.md
      try {
        const appDir = await this.workspaceDir.getDirectoryHandle("app", { create: true });
        try {
          const speciesHandle = await appDir.getFileHandle("species.json", { create: false });
          this.speciesList = JSON.parse(await (await speciesHandle.getFile()).text());
        } catch (e) {
          this.speciesList = [];
        }
        try {
          const newsHandle = await appDir.getFileHandle("news.json", { create: false });
          this.newsList = JSON.parse(await (await newsHandle.getFile()).text());
        } catch (e) {
          this.newsList = [];
        }
        const connectorsDir = await appDir.getDirectoryHandle("connectors", { create: true });
        const settingsHandle = await connectorsDir.getFileHandle("settings.md", { create: false });
        const file = await settingsHandle.getFile();
        const text = await file.text();
        const parsed = parseMarkdownWithFrontMatter(text);
        if (parsed.metadata.geminiApiKey) {
          this.apiKeys.gemini = parsed.metadata.geminiApiKey;
        }
      } catch (e) {
        console.warn("No connectors settings found in workspace");
      }

      // Helper to read all .md files in a folder and return parsed array
      const readFolderMD = async (dirHandle, colonyFolder = null) => {
        const items = [];
        try {
          for await (const entry of dirHandle.values()) {
            if (entry.kind === 'file' && entry.name.endsWith('.md')) {
              const file = await entry.getFile();
              const text = await file.text();
              const parsed = parseMarkdownWithFrontMatter(text);
              const dataItem = { ...parsed.metadata };
              if (parsed.content) {
                dataItem.notes = parsed.content;
                dataItem.desc = parsed.content;
              }
              dataItem._fileName = entry.name;
              if (colonyFolder) {
                dataItem._colonyFolder = colonyFolder;
              }
              items.push(dataItem);
            }
          }
        } catch (e) {
          // ignore
        }
        return items;
      };

      // 3. Sync Sightings from app/sightings/
      try {
        const appDir = await this.workspaceDir.getDirectoryHandle("app", { create: true });
        const sightingsDir = await appDir.getDirectoryHandle("sightings", { create: true });
        const sightingsList = await readFolderMD(sightingsDir);
        if (sightingsList.length > 0) {
          this.sightings = sightingsList.map(s => ({ id: s.uuid, ...s }));
        }
      } catch (e) {
        console.warn("Failed to read sightings in workspace:", e);
      }

      // 4. Scan Projects and Colonies
      const coloniesList = [];
      const eventsList = [];
      const remindersList = [];
      const mapsList = [];
      const zonesList = [];
      const rulesList = [];
      this.projects = [];

      try {
        const projectsDir = await this.workspaceDir.getDirectoryHandle("projects", { create: true });
        for await (const projEntry of projectsDir.values()) {
          if (projEntry.kind === 'directory') {
            const projSubdir = await projectsDir.getDirectoryHandle(projEntry.name);
            
            // Read or generate project.md
            let projectData = null;
            try {
              const projectFileHandle = await projSubdir.getFileHandle("project.md", { create: false });
              const file = await projectFileHandle.getFile();
              const text = await file.text();
              const parsed = parseMarkdownWithFrontMatter(text);
              projectData = { uuid: parsed.metadata.uuid, ...parsed.metadata };
            } catch (e) {
              // Generate project.md if it doesn't exist
              const projName = projEntry.name
                .split("-")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
              
              projectData = {
                uuid: "proj-" + generateUUID().slice(0, 8),
                name: projName === "Default Project" ? "Default Project" : projName,
                owner: this.currentUser ? this.currentUser.uuid : "a47f2081-3091-4d1e-8e6d-74d1a58140db",
                members: []
              };
              // Write project.md back
              await this.writeWorkspaceFile(["projects", projEntry.name], "project.md", projectData);
            }
            
            projectData._slug = projEntry.name;
            this.projects.push(projectData);

            for await (const colEntry of projSubdir.values()) {
              if (colEntry.kind === 'directory') {
                const colSubdir = await projSubdir.getDirectoryHandle(colEntry.name);
                const colFolder = colEntry.name;
                
                // Read colony.md
                try {
                  const colonyFileHandle = await colSubdir.getFileHandle("colony.md");
                  const file = await colonyFileHandle.getFile();
                  const text = await file.text();
                  const parsed = parseMarkdownWithFrontMatter(text);
                  const colonyData = { ...parsed.metadata, notes: parsed.content };
                  colonyData._fileName = "colony.md";
                  colonyData._colonyFolder = colFolder;
                  colonyData.projectId = colonyData.projectId || projectData.uuid;
                  coloniesList.push(colonyData);
                } catch (e) {
                  console.warn(`No colony.md in ${colEntry.name}`);
                }

                // Read subfolders
                const readSubfolderMD = async (subName) => {
                  try {
                    const subFolder = await colSubdir.getDirectoryHandle(subName, { create: false });
                    const list = await readFolderMD(subFolder, colFolder);
                    list.forEach(item => {
                      item.projectId = projectData.uuid;
                    });
                    return list;
                  } catch (e) {
                    return [];
                  }
                };

                eventsList.push(...(await readSubfolderMD("events")));
                remindersList.push(...(await readSubfolderMD("reminders")));
                mapsList.push(...(await readSubfolderMD("maps")));
                zonesList.push(...(await readSubfolderMD("zones")));
                rulesList.push(...(await readSubfolderMD("rules")));
              }
            }
          }
        }
      } catch (e) {
        console.warn("Error scanning projects directory:", e);
      }

      if (this.projects.length > 0) {
        if (!this.activeProjectId || !this.projects.some(p => p.uuid === this.activeProjectId)) {
          this.activeProjectId = this.projects[0].uuid;
        }
      }

      if (coloniesList.length > 0) {
        this.colonies = coloniesList.map(c => ({ id: c.uuid, ...c }));
        this.events = eventsList.map(e => ({ id: e.uuid, ...e }));
        this.reminders = remindersList.map(r => ({ id: r.uuid, ...r }));
        this.maps = mapsList.map(m => ({ id: m.uuid, ...m }));
        this.zones = zonesList.map(z => ({ id: z.uuid, ...z }));
        this.automationRules = rulesList.map(r => ({ id: r.uuid, ...r }));
      }

      this.saveData();
      this.updateWorkspaceStatusUI();
      await this.initializeSpeciesCatalog();
    } catch (err) {
      console.error("Syncing from folder failed:", err);
      throw err;
    }
  }

  async writeWorkspaceFile(pathArray, fileName, data, isMarkdown = true) {
    if (!this.workspaceDir) return false;
    try {
      let currentDir = this.workspaceDir;
      for (const segment of pathArray) {
        currentDir = await currentDir.getDirectoryHandle(segment, { create: true });
      }
      const fileHandle = await currentDir.getFileHandle(fileName, { create: true });
      const writable = await fileHandle.createWritable();
      
      let fileContent = "";
      if (isMarkdown) {
        const content = data.notes || data.desc || "";
        const metadata = { ...data };
        delete metadata.notes;
        delete metadata.desc;
        delete metadata._fileName;
        delete metadata._colonyFolder;
        fileContent = stringifyMarkdownWithFrontMatter(metadata, content);
      } else {
        fileContent = typeof data === "string" ? data : JSON.stringify(data, null, 2);
      }
      await writable.write(fileContent);
      await writable.close();
      return true;
    } catch (e) {
      console.error(`Error saving ${pathArray.join("/")}/${fileName} to workspace:`, e);
      return false;
    }
  }

  async deleteWorkspaceFile(pathArray, fileName) {
    if (!this.workspaceDir) return;
    try {
      let currentDir = this.workspaceDir;
      for (const segment of pathArray) {
        currentDir = await currentDir.getDirectoryHandle(segment, { create: false });
      }
      await currentDir.removeEntry(fileName);
    } catch (e) {
      console.error(`Error deleting ${pathArray.join("/")}/${fileName} from workspace:`, e);
    }
  }

  setupEventListeners() {
    // Hamburger menu toggle
    const toggleBtn = document.getElementById("menu-toggle-btn");
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        const sidebar = document.getElementById("sidebar");
        if (sidebar) sidebar.classList.toggle("active");
      };
    }

    // Auth Switch tabs
    const tabLogin = document.getElementById("auth-tab-login");
    const tabSignup = document.getElementById("auth-tab-signup");
    const formLogin = document.getElementById("login-form");
    const formSignup = document.getElementById("signup-form");

    if (tabLogin && tabSignup && formLogin && formSignup) {
      tabLogin.onclick = () => this.showAuthTab("login");
      tabSignup.onclick = () => this.showAuthTab("signup");
    }

    const colonySpeciesSelect = document.getElementById("colony-species-select");
    if (colonySpeciesSelect) {
      colonySpeciesSelect.onchange = () => {
        this.refreshColonySpeciesContext(colonySpeciesSelect.value);
      };
    }

    const sightSpeciesSelect = document.getElementById("sight-species");
    if (sightSpeciesSelect) {
      sightSpeciesSelect.onchange = () => {
        const filterInput = document.getElementById("sight-species-filter");
        if (filterInput && !filterInput.value.trim()) {
          filterInput.placeholder = `Search species by keyword... (${this.speciesList.length} loaded)`;
        }
      };
    }

    // Forms submissions
    if (formLogin) {
      formLogin.onsubmit = async (e) => {
        e.preventDefault();
        const loginId = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;
        try {
          if (!this.isFileMode()) {
            const user = await this.apiRequest("/api/auth/login", {
              method: "POST",
              body: JSON.stringify({ login: loginId, password })
            });
            this.currentUser = user;
            this.writeCache("antai-current-user-uuid-v1", user.uuid);
            const userIndex = this.users.findIndex(item => item.uuid === user.uuid);
            if (userIndex === -1) {
              this.users.push(user);
            } else {
              this.users[userIndex] = { ...this.users[userIndex], ...user };
            }
            this.renderSidebar();
            this.renderSidebarFooter();
            this.navigate("dashboard");
            return;
          }

          if (!this.workspaceDir) {
            await this.selectWorkspaceDir();
            if (!this.workspaceDir) return;
          }

          const normalizedLogin = loginId.toLowerCase();
          const matchedUser = this.users.find(user =>
            (user.email && user.email.toLowerCase() === normalizedLogin) ||
            (user.username && user.username.toLowerCase() === normalizedLogin)
          );
          if (!matchedUser) {
            alert("No user file exists for that email or username in data/app/users.");
            return;
          }
          const expectedHash = this.passwordStore[matchedUser.email];
          if (!expectedHash) {
            alert("No password entry exists for that account in data/app/users/passwd.");
            return;
          }
          const enteredHash = await this.hashPassword(password);
          if (enteredHash !== expectedHash) {
            alert("Invalid email, username, or password.");
            return;
          }
          this.currentUser = matchedUser;
          this.writeCache("antai-current-user-uuid-v1", matchedUser.uuid);
          this.renderSidebar();
          this.renderSidebarFooter();
          this.navigate("dashboard");
        } catch (err) {
          alert(err.message || "Login failed.");
        }
      };
    }

    if (formSignup) {
      formSignup.onsubmit = async (e) => {
        e.preventDefault();
        const username = document.getElementById("signup-username").value.trim();
        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value;
        const newsletter = document.getElementById("signup-newsletter").checked;
        try {
          if (!this.isFileMode()) {
            const user = await this.apiRequest("/api/auth/register", {
              method: "POST",
              body: JSON.stringify({ username, email, password, newsletter })
            });
            this.currentUser = user;
            this.writeCache("antai-current-user-uuid-v1", user.uuid);
            const existingIdx = this.users.findIndex(item => item.uuid === user.uuid || item.email === user.email);
            if (existingIdx === -1) {
              this.users.push(user);
            } else {
              this.users[existingIdx] = { ...this.users[existingIdx], ...user };
            }
            this.renderSidebar();
            this.renderSidebarFooter();
            this.navigate("dashboard");
            return;
          }

          if (!this.workspaceDir) {
            await this.selectWorkspaceDir();
            if (!this.workspaceDir) return;
          }

          if (this.users.some(user => user.email && user.email.toLowerCase() === email.toLowerCase())) {
            alert("A user with that email already exists.");
            return;
          }
          if (this.users.some(user => user.username && user.username.toLowerCase() === username.toLowerCase())) {
            alert("That username is already in use.");
            return;
          }

          const newUser = {
            uuid: generateUUID(),
            username: username || email.split("@")[0],
            email,
            newsletter,
            haConnected: false,
            jeedomConnected: false,
            domoticzConnected: false,
            _fileName: `${sanitizeSlug(username || email.split("@")[0])}.md`
          };
          this.passwordStore[email] = await this.hashPassword(password);
          const savedUser = await this.writeWorkspaceFile(["app", "users"], newUser._fileName, newUser);
          const savedPasswd = await this.persistPasswordStore();
          if (!savedUser || !savedPasswd) {
            delete this.passwordStore[email];
            alert("Failed to write the new account into data/app/users.");
            return;
          }
          this.users.push(newUser);
          this.currentUser = newUser;
          this.writeCache("antai-current-user-uuid-v1", newUser.uuid);
          this.renderSidebar();
          this.renderSidebarFooter();
          this.navigate("dashboard");
        } catch (err) {
          alert(err.message || "Registration failed.");
        }
      };
    }

    const guestBtn = document.getElementById("guest-login-btn");
    if (guestBtn) {
      guestBtn.onclick = async () => {
        if (this.isFileMode()) {
          if (!this.workspaceDir) {
            await this.selectWorkspaceDir();
            if (!this.workspaceDir) return;
          }
        } else {
          await this.seedDemoData();
        }
        this.currentUser = this.users[0] || null;
        this.renderSidebar();
        this.renderSidebarFooter();
        this.navigate("dashboard");
      };
    }

    // Dropdowns populated in populateSpeciesDropdowns() during init

    // Add Colony Form submit
    const addColonyForm = document.getElementById("add-colony-form");
    if (addColonyForm) {
      addColonyForm.onsubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById("colony-name-input").value;
        const species = document.getElementById("colony-species-select").value;
        const queens = document.getElementById("colony-queens-input").value;
        const workers = document.getElementById("colony-workers-input").value;
        const founded = document.getElementById("colony-date-input").value;
        const status = document.getElementById("colony-status-select").value;
        const notes = document.getElementById("colony-notes-input").value;
        const diet = document.getElementById("colony-diet-input").value;
        const setup = document.getElementById("colony-setup-input").value;
        const presetPhoto = document.getElementById("colony-photo-select").value;
        const photoEntries = Array.isArray(this.colonyPhotoEntries) ? [...this.colonyPhotoEntries] : [];
        const selectedPhotoEntry = photoEntries[this.colonySelectedPhotoIndex] || null;
        const storedPhotoPaths = dedupePhotoList(photoEntries.filter(entry => entry.kind === "stored").map(entry => entry.src));
        const pendingPhotoEntries = photoEntries.filter(entry => entry.kind === "pending" && entry.file);
        const photo = selectedPhotoEntry && selectedPhotoEntry.kind === "stored" ? selectedPhotoEntry.src : presetPhoto;
        const customPhotos = storedPhotoPaths;
        
        const isPublic = document.getElementById("colony-is-public")?.checked || false;
        const publicPageHtml = document.getElementById("colony-public-html")?.innerHTML || "";

        if (!this.hasPermission("write")) {
          alert("You do not have permission to modify data in this project.");
          return;
        }

        const projectId = document.getElementById("colony-project-select").value;

        let savedColony = null;
        if (this.editingColonyId) {
          // Edit mode
          const col = this.colonies.find(c => c.id === this.editingColonyId);
          if (col) {
            const oldProjectId = col.projectId;
            if (oldProjectId && oldProjectId !== projectId) {
              // Delete old colony file if workspace connected
              if (this.workspaceDir) {
                this.deleteRecord("colonies", col.id, col);
              }
              // Update sub-records' project ID and move files on disk
              this.events.filter(e => e.colonyId === col.id).forEach(e => {
                const oldRecord = { ...e };
                e.projectId = projectId;
                if (this.workspaceDir) {
                  this.deleteRecord("events", e.id, oldRecord);
                  this.writeRecord("events", e);
                }
              });
              
              this.reminders.filter(r => r.colonyId === col.id).forEach(r => {
                const oldRecord = { ...r };
                r.projectId = projectId;
                if (this.workspaceDir) {
                  this.deleteRecord("reminders", r.id, oldRecord);
                  this.writeRecord("reminders", r);
                }
              });

              this.maps.filter(m => m.colonyId === col.id).forEach(m => {
                const oldRecord = { ...m };
                m.projectId = projectId;
                if (this.workspaceDir) {
                  this.deleteRecord("maps", m.id, oldRecord);
                  this.writeRecord("maps", m);
                }
              });

              this.zones.filter(z => this.maps.some(m => m.id === z.mapId && m.colonyId === col.id)).forEach(z => {
                const oldRecord = { ...z };
                z.projectId = projectId;
                if (this.workspaceDir) {
                  this.deleteRecord("zones", z.id, oldRecord);
                  this.writeRecord("zones", z);
                }
              });

              this.automationRules.filter(r => this.zones.some(z => z.id === r.zoneId && this.maps.some(m => m.id === z.mapId && m.colonyId === col.id))).forEach(r => {
                const oldRecord = { ...r };
                r.projectId = projectId;
                if (this.workspaceDir) {
                  this.deleteRecord("rules", r.id, oldRecord);
                  this.writeRecord("rules", r);
                }
              });
            }
            col.projectId = projectId;
            col.name = name;
            col.species = species;
            col.queens = queens;
            col.workers = workers;
            col.founded = founded;
            col.status = status;
            col.notes = notes;
            col.diet = diet;
            col.setup = setup;
            col.photo = photo;
            col.customPhotos = customPhotos;
            col.galleryItems = customPhotos.map((path, index) => ({
              path,
              title: this.getPhotoDisplayName(path, index),
              description: ""
            }));
            col.isPublic = isPublic;
            col.publicPageHtml = publicPageHtml;
            savedColony = col;
          }
          this.editingColonyId = null;
        } else {
          // Add mode
          const newCol = {
            id: generateUUID(),
            uuid: generateUUID(),
            projectId: projectId,
            name, species, queens, workers, founded, status, notes, diet, setup, photo, customPhotos,
            galleryItems: customPhotos.map((path, index) => ({
              path,
              title: this.getPhotoDisplayName(path, index),
              description: ""
            })),
            isPublic, publicPageHtml
          };
          this.colonies.push(newCol);
          savedColony = newCol;
        }

        if (savedColony) {
          await this.writeRecord("colonies", savedColony);
          if (pendingPhotoEntries.length > 0) {
            const finalPhotoPaths = [];
            for (let i = 0; i < photoEntries.length; i++) {
              const entry = photoEntries[i];
              if (entry.kind === "stored") {
                finalPhotoPaths.push(entry.src);
              } else if (entry.kind === "pending" && entry.file) {
                const uploadedPath = await this.uploadColonyPhotoFile(savedColony, entry.file, i);
                finalPhotoPaths.push(uploadedPath);
                this.photoMetadataCache[uploadedPath] = this.buildPhotoMetadataFromFile(entry.file, entry.src);
              }
            }
            savedColony.customPhotos = dedupePhotoList(finalPhotoPaths);
            savedColony.galleryItems = finalPhotoPaths.map((path, index) => {
              const existingItem = savedColony.galleryItems && savedColony.galleryItems[index];
              return {
                path,
                title: existingItem && existingItem.title ? existingItem.title : this.getPhotoDisplayName(path, index),
                description: existingItem && existingItem.description ? existingItem.description : ""
              };
            });
            savedColony.photo = selectedPhotoEntry
              ? (finalPhotoPaths[this.colonySelectedPhotoIndex] || presetPhoto)
              : (savedColony.customPhotos[0] || presetPhoto);
            await this.writeRecord("colonies", savedColony);
          }
        }
        addColonyForm.reset();
        this.colonyPhotoEntries.forEach(entry => {
          if (entry.kind === "pending" && entry.src) {
            URL.revokeObjectURL(entry.src);
          }
        });
        this.colonyPhotoEntries = [];
        this.colonyPhotosBuffer = [];
        this.colonySelectedPhotoIndex = -1;
        this.renderColonyPhotosPreview();
        this.navigate('dashboard');
        this.renderSidebar();
        this.onViewRender(this.currentView);
      };
    }

    // Add Event Form submit
    const addEventForm = document.getElementById("add-event-form");
    if (addEventForm) {
      addEventForm.onsubmit = (e) => {
        e.preventDefault();
        if (!this.hasPermission("write")) {
          alert("You do not have permission to modify data in this project.");
          return;
        }
        const colonyId = document.getElementById("event-colony-id").value;
        const type = document.getElementById("event-type-select").value;
        const dateTime = document.getElementById("event-date-input").value;
        const workers = document.getElementById("event-workers-input").value;
        const broodState = document.getElementById("event-brood-select").value;
        const notes = document.getElementById("event-notes-input").value;
        const photo = document.getElementById("event-photo-select").value;

        let savedEvent = null;
        if (this.editingEventId) {
          const existing = this.events.find(item => item.id === this.editingEventId);
          if (existing) {
            existing.projectId = this.activeProjectId;
            existing.colonyId = colonyId;
            existing.type = type;
            existing.dateTime = dateTime;
            existing.notes = notes;
            if (workers) existing.workers = parseInt(workers);
            else delete existing.workers;
            if (broodState) existing.broodState = broodState;
            else delete existing.broodState;
            if (photo) existing.photo = photo;
            else delete existing.photo;
            savedEvent = existing;
          }
          this.editingEventId = null;
        } else {
          const newEvent = {
            id: generateUUID(),
            projectId: this.activeProjectId,
            colonyId, type, dateTime, notes
          };
          if (workers) newEvent.workers = parseInt(workers);
          if (broodState) newEvent.broodState = broodState;
          if (photo) newEvent.photo = photo;
          this.events.push(newEvent);
          savedEvent = newEvent;
        }

        if (savedEvent) {
          this.writeRecord("events", savedEvent);
        }

        // Update the worker count in the colony itself if updated in event
        if (workers) {
          const col = this.colonies.find(c => c.id === colonyId);
          if (col) {
            col.workers = parseInt(workers);
            this.writeRecord("colonies", col);
          }
        }

        this.navigate('dashboard');
        this.renderColonyDetail();
      };
    }

    // Add Reminder Form submit
    const addReminderForm = document.getElementById("add-reminder-form");
    if (addReminderForm) {
      addReminderForm.onsubmit = (e) => {
        e.preventDefault();
        if (!this.hasPermission("write")) {
          alert("You do not have permission to modify data in this project.");
          return;
        }
        const colonyId = document.getElementById("reminder-colony-id").value || document.getElementById("reminder-colony-select").value;
        const title = document.getElementById("reminder-title-input").value;
        const dueDate = document.getElementById("reminder-date-input").value;
        const repeat = document.getElementById("reminder-repeat-select").value;
        const notes = document.getElementById("reminder-notes-input").value;

        let savedReminder = null;
        if (this.editingReminderId) {
          const existing = this.reminders.find(item => item.id === this.editingReminderId);
          if (existing) {
            existing.projectId = this.activeProjectId;
            existing.colonyId = colonyId;
            existing.title = title;
            existing.dueDate = dueDate;
            existing.repeat = repeat;
            existing.notes = notes;
            savedReminder = existing;
          }
          this.editingReminderId = null;
        } else {
          const newReminder = {
            id: generateUUID(),
            projectId: this.activeProjectId,
            colonyId, title, dueDate, repeat, notes,
            status: "pending"
          };
          this.reminders.push(newReminder);
          savedReminder = newReminder;
        }

        if (savedReminder) {
          this.writeRecord("reminders", savedReminder);
        }
        this.navigate('dashboard');
        this.onViewRender(this.currentView);
      };
    }

    // Add Map Form submit
    const addMapForm = document.getElementById("add-map-form");
    if (addMapForm) {
      const presetSelect = document.getElementById("map-image-select");
      if (presetSelect) {
        presetSelect.onchange = () => {
          const uploadInput = document.getElementById("map-image-upload");
          const preview = document.getElementById("map-image-preview");
          const previewState = document.getElementById("map-image-preview-state");
          if (!preview || !previewState) return;
          if (uploadInput && uploadInput.files && uploadInput.files[0]) return;
          preview.src = presetSelect.value;
          previewState.innerText = "Using selected preset preview.";
        };
      }

      addMapForm.onsubmit = async (e) => {
        e.preventDefault();
        if (!this.hasPermission("write")) {
          alert("You do not have permission to modify data in this project.");
          return;
        }
        const name = document.getElementById("map-name-input").value;
        const imageSelect = document.getElementById("map-image-select");
        const imageUpload = document.getElementById("map-image-upload");
        let image = imageSelect ? imageSelect.value : "";

        const uploadedFile = imageUpload && imageUpload.files ? imageUpload.files[0] : null;
        if (uploadedFile) {
          if (!uploadedFile.type.startsWith("image/")) {
            alert("Please upload a valid image file for the nest map.");
            return;
          }
          if (uploadedFile.size > 10 * 1024 * 1024) {
            alert("Uploaded nest map pictures must be 10 MB or smaller.");
            return;
          }
          image = await this.readFileAsDataUrl(uploadedFile);
        }

        let savedMap = null;
        if (this.editingMapId) {
          const existing = this.maps.find(item => item.id === this.editingMapId);
          if (existing) {
            existing.projectId = this.activeProjectId;
            existing.colonyId = this.selectedColonyId;
            existing.name = name;
            existing.image = image;
            savedMap = existing;
          }
          this.editingMapId = null;
        } else {
          const newMap = {
            id: generateUUID(),
            projectId: this.activeProjectId,
            colonyId: this.selectedColonyId,
            name, image
          };
          this.maps.push(newMap);
          savedMap = newMap;
        }

        if (savedMap) {
          this.activeMapId = savedMap.id;
          this.writeRecord("maps", savedMap);
        }
        this.navigate('dashboard');
        this.renderColonyMaps();
      };
    }

    // Add Zone Form submit
    const addZoneForm = document.getElementById("add-zone-form");
    if (addZoneForm) {
      addZoneForm.onsubmit = (e) => {
        e.preventDefault();
        if (!this.hasPermission("write")) {
          alert("You do not have permission to modify data in this project.");
          return;
        }
        const name = document.getElementById("zone-name-input").value;
        const desc = document.getElementById("zone-desc-input").value;
        const tempSensor = document.getElementById("zone-temp-sensor").value;
        const humSensor = document.getElementById("zone-hum-sensor").value;
        const x = parseInt(document.getElementById("zone-x").value);
        const y = parseInt(document.getElementById("zone-y").value);
        const width = parseInt(document.getElementById("zone-width").value);
        const height = parseInt(document.getElementById("zone-height").value);

        if (!this.activeMapId) {
          alert("Define a layout map first before placing zones.");
          return;
        }

        let savedZone = null;
        if (this.editingZoneId) {
          const existing = this.zones.find(item => item.id === this.editingZoneId);
          if (existing) {
            existing.projectId = this.activeProjectId;
            existing.mapId = this.activeMapId;
            existing.name = name;
            existing.desc = desc;
            existing.tempSensor = tempSensor;
            existing.humSensor = humSensor;
            existing.x = x;
            existing.y = y;
            existing.width = width;
            existing.height = height;
            savedZone = existing;
          }
          this.editingZoneId = null;
        } else {
          const newZone = {
            id: generateUUID(),
            projectId: this.activeProjectId,
            mapId: this.activeMapId,
            name, desc, tempSensor, humSensor, x, y, width, height
          };
          this.zones.push(newZone);
          savedZone = newZone;
        }

        if (savedZone) {
          this.writeRecord("zones", savedZone);
        }
        this.navigate('dashboard');
        this.renderColonyMaps();
      };
    }

    // Add Automation Rule Form submit
    const addAutoForm = document.getElementById("add-automation-form");
    if (addAutoForm) {
      addAutoForm.onsubmit = (e) => {
        e.preventDefault();
        if (!this.hasPermission("write")) {
          alert("You do not have permission to modify data in this project.");
          return;
        }
        const trigger = document.getElementById("auto-trigger-select").value;
        const zoneId = document.getElementById("auto-target-zone").value;
        const threshold = document.getElementById("auto-threshold").value;
        const action = document.getElementById("auto-action-input").value;

        const newRule = {
          id: generateUUID(),
          projectId: this.activeProjectId,
          trigger, zoneId, threshold, action, active: true
        };

        this.automationRules.push(newRule);
        this.writeRecord("rules", newRule);
        this.navigate('dashboard');
        this.renderProfile();
      };
    }

    // Add Sighting Form submit
    const addSightingForm = document.getElementById("add-sighting-form");
    if (addSightingForm) {
      addSightingForm.onsubmit = (e) => {
        e.preventDefault();
        const species = document.getElementById("sight-species").value;
        const location = document.getElementById("sight-location").value;
        const x = parseInt(document.getElementById("sight-x").value);
        const y = parseInt(document.getElementById("sight-y").value);
        const notes = document.getElementById("sight-notes").value;

        const newSighting = {
          id: generateUUID(),
          species, location, x, y, notes,
          date: new Date().toISOString().slice(0, 10)
        };

        this.sightings.push(newSighting);
        this.writeRecord("sightings", newSighting);
        this.navigate('dashboard');
        this.renderSwarmMap();
      };
    }

    // Create Project Form submit
    const createProjectForm = document.getElementById("create-project-form");
    if (createProjectForm) {
      createProjectForm.onsubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById("project-name-input").value.trim();
        const isPublic = document.getElementById("project-is-public")?.checked || false;
        const publicPageHtml = document.getElementById("project-public-html")?.innerHTML || "";
        if (!name) return;

        const newProj = {
          uuid: "proj-" + generateUUID().slice(0, 8),
          name: name,
          owner: this.currentUser.uuid,
          members: [],
          isPublic: isPublic,
          publicPageHtml: publicPageHtml
        };
        newProj._slug = sanitizeSlug(name);
        
        // Ensure slug is unique
        let count = 0;
        let baseSlug = newProj._slug;
        while (this.projects.some(p => p._slug === newProj._slug)) {
          count++;
          newProj._slug = `${baseSlug}-${count}`;
        }

        this.projects.push(newProj);
        await this.writeRecord("projects", newProj);

        this.navigate('dashboard');
        document.getElementById("project-name-input").value = "";
        
        // Select the newly created project
        this.setActiveProject(newProj.uuid);
        alert(`Project "${name}" created successfully!`);
      };
    }

    // Profile Settings Form submit
    const profileForm = document.getElementById("profile-form");
    if (profileForm) {
      profileForm.onsubmit = async (e) => {
        e.preventDefault();
        const oldEmail = this.currentUser.email;
        this.currentUser.username = document.getElementById("profile-username").value;
        this.currentUser.email = document.getElementById("profile-email").value;
        this.currentUser.newsletter = document.getElementById("profile-newsletter").checked;

        this.saveData();
        if (!this.isFileMode()) {
          const updatedUser = await this.apiRequest("/api/profile", {
            method: "POST",
            body: JSON.stringify({ user: this.currentUser, oldEmail })
          });
          this.currentUser = updatedUser;
          const userIndex = this.users.findIndex(user => user.uuid === updatedUser.uuid);
          if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
          }
        } else if (this.workspaceDir) {
          if (!this.currentUser._fileName) {
            this.currentUser._fileName = `${sanitizeSlug(this.currentUser.username)}.md`;
          }
          await this.writeWorkspaceFile(["app", "users"], this.currentUser._fileName, this.currentUser);
          if (oldEmail !== this.currentUser.email && this.passwordStore[oldEmail]) {
            this.passwordStore[this.currentUser.email] = this.passwordStore[oldEmail];
            delete this.passwordStore[oldEmail];
            await this.persistPasswordStore();
          } else {
            await this.persistPasswordStore();
          }
        }
        this.renderSidebarFooter();
        alert("Settings updated successfully!");
      };
    }

  }

  renderPublicDirectory() {
    const container = document.getElementById("public-directory-container");
    if (!container) return;

    const publicProjects = this.projects.filter(p => p.isPublic);
    const publicColonies = this.colonies.filter(c => c.isPublic && c.status !== "archived");

    if (publicProjects.length === 0 && publicColonies.length === 0) {
      container.innerHTML = `<div style="padding: 24px; color: var(--text-muted); font-size: 14px;">No public pages available.</div>`;
      return;
    }

    let html = "";
    publicProjects.forEach(p => {
      html += `
        <div class="card colony-card" onclick="app.navigate('public-page', { highlightId: '${p.uuid}', type: 'project' })">
          <div class="card-content" style="padding:16px;">
            <div style="font-size: 10px; font-weight: bold; color: var(--text-secondary); margin-bottom: 4px; text-transform: uppercase;">Project</div>
            <div style="font-size: 16px; font-weight: 500;">${escapeHtml(p.name)}</div>
          </div>
        </div>
      `;
    });

    publicColonies.forEach(c => {
      html += `
        <div class="card colony-card" onclick="app.navigate('public-page', { highlightId: '${c.id}', type: 'colony' })">
          ${c.photo ? `<img src="${c.photo}" style="width:100%; height:120px; object-fit:cover; border-radius:6px 6px 0 0;">` : ""}
          <div class="card-content" style="padding:16px;">
            <div style="font-size: 10px; font-weight: bold; color: var(--text-secondary); margin-bottom: 4px; text-transform: uppercase;">Colony</div>
            <div style="font-size: 16px; font-weight: 500;">${escapeHtml(c.name)}</div>
            <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">${escapeHtml(c.species)}</div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  renderPublicPage(id, type) {
    const titleEl = document.getElementById("public-page-title");
    const subEl = document.getElementById("public-page-subtitle");
    const contentEl = document.getElementById("public-page-content");
    if (!titleEl || !contentEl) return;

    let title = "Not Found";
    let sub = "";
    let html = "The requested public page could not be found or is no longer public.";

    if (type === "project") {
      const p = this.projects.find(p => p.uuid === id && p.isPublic);
      if (p) {
        title = p.name;
        sub = "Public Project Page";
        html = p.publicPageHtml || "<p>No content provided for this project.</p>";
      }
    } else if (type === "colony") {
      const c = this.colonies.find(c => c.id === id && c.isPublic && c.status !== "archived");
      if (c) {
        title = c.name;
        sub = `Public Colony Page - ${c.species}`;
        html = c.publicPageHtml || "<p>No content provided for this colony.</p>";
      }
    }

    titleEl.textContent = title;
    subEl.textContent = sub;
    contentEl.innerHTML = html;
  }
}

// Instantiate and expose globally
var app = window.app = new AntaiApp();
window.app.init().catch(err => {
  console.error("Antai initialization failed:", err);
});
