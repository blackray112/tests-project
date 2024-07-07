#!/bin/bash

echo "Running the migrations..."
docker-compose exec backend alembic upgrade head

echo "migration completed!"
