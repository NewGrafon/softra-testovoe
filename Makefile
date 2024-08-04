# Makefile for migrations

name ?= bash

migration-generate:
	npm run build
	npm run migrations:generate src/migrations/${name}
	npm run build
	npm run migrations:run