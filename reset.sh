#!/bin/bash

set -e #exit on first error

echo "Dropping the database..."
docker-compose exec db psql -U user -d postgres -c "DROP DATABASE mydatabase WITH (FORCE)"

echo "Creating the database..."
docker-compose exec db psql -U user -d postgres -c "CREATE DATABASE mydatabase"

echo "Running the migrations..."
docker-compose exec backend alembic upgrade head

echo "Loading the data..."
docker-compose exec backend python -m dataloader

echo "Database reset completed!"
