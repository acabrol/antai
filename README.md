# Antai

Antai is a local-first antkeeping companion app. The repository contains a small Node server, a browser client, and a repository-backed datastore under `data/`.

## Quick Start

1. Run `make up` or `docker compose up --build`.
2. Open `http://127.0.0.1:3000`.
3. Register a user or start from the guest flow.

## Repository Layout

- `src/`: backend server code.
- `public/`: browser application, styles, and static assets.
- `data/`: writable application datastore and prompt files.
- `docs/`: product, architecture, roadmap, and specification documents.
- `Dockerfile`, `docker-compose.yml`, `Makefile`: local operations and deployment entry points.

## Commands

- `make help`: show available commands.
- `make check`: syntax-check the client and server entry points.
- `make run`: run the Node server directly.
- `make up`: start the app in Docker Compose.
- `make deploy`: build and run detached.
- `make down`: stop the stack.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Design](docs/DESIGN.md)
- [Requirements](docs/REQUIREMENTS.md)
- [Specifications](docs/SPECIFICATIONS.md)
- [User Stories](docs/USER_STORIES.md)
- [Roadmap](docs/ROADMAP.md)
- [Tasks](docs/TASKS.md)

## Privacy

Application data stays in `data/`. External calls happen only when optional AI integrations are configured.
