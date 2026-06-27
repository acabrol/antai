SHELL := /bin/bash

APP_NAME := antai
HOST ?= 127.0.0.1
PORT ?= 3100
APP_PORT ?= 3100
COMPOSE := docker compose
COMPOSE_FILE := docker-compose.yml
SERVICE := antai
NODE := node

.PHONY: help build up down restart logs ps config check run deploy stop destroy clean

help:
	@printf "Antai commands:\n"
	@printf "  make build    Build the Docker image\n"
	@printf "  make up       Start the app in Docker Compose\n"
	@printf "  make down     Stop the Compose stack\n"
	@printf "  make restart  Restart the Compose stack\n"
	@printf "  make logs     Follow application logs\n"
	@printf "  make ps       Show container status\n"
	@printf "  make config   Render effective Docker Compose config\n"
	@printf "  make check    Validate app.js, server.js, and compose config\n"
	@printf "  make run      Run the local Node server without Docker\n"
	@printf "  make deploy   Build and start the stack in detached mode\n"
	@printf "  make stop     Stop running containers without removing them\n"
	@printf "  make destroy  Remove the Compose stack and orphan containers\n"
	@printf "  make clean    Alias for destroy\n"

build:
	APP_PORT=$(APP_PORT) $(COMPOSE) -f $(COMPOSE_FILE) build

up:
	APP_PORT=$(APP_PORT) $(COMPOSE) -f $(COMPOSE_FILE) up --build

down:
	APP_PORT=$(APP_PORT) $(COMPOSE) -f $(COMPOSE_FILE) down

restart:
	APP_PORT=$(APP_PORT) $(COMPOSE) -f $(COMPOSE_FILE) down
	APP_PORT=$(APP_PORT) $(COMPOSE) -f $(COMPOSE_FILE) up --build

logs:
	APP_PORT=$(APP_PORT) $(COMPOSE) -f $(COMPOSE_FILE) logs -f $(SERVICE)

ps:
	APP_PORT=$(APP_PORT) $(COMPOSE) -f $(COMPOSE_FILE) ps

config:
	APP_PORT=$(APP_PORT) $(COMPOSE) -f $(COMPOSE_FILE) config

check:
	$(NODE) --check public/app.js
	$(NODE) --check src/server.js
	APP_PORT=$(APP_PORT) $(COMPOSE) -f $(COMPOSE_FILE) config >/dev/null

run:
	HOST=$(HOST) PORT=$(PORT) $(NODE) src/server.js

deploy:
	APP_PORT=$(APP_PORT) $(COMPOSE) -f $(COMPOSE_FILE) up -d --build

stop:
	APP_PORT=$(APP_PORT) $(COMPOSE) -f $(COMPOSE_FILE) stop

destroy:
	APP_PORT=$(APP_PORT) $(COMPOSE) -f $(COMPOSE_FILE) down --remove-orphans

clean: destroy
