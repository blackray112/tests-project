#!/bin/bash

wait_for_db() {
    POSTGRES_CONTAINER_ID=$(docker-compose ps -q db)

    if [ -z "$POSTGRES_CONTAINER_ID" ]; then
        echo "Error: Couldn't find Postgres container ID."
        exit 1
    fi

    until docker exec $POSTGRES_CONTAINER_ID psql -U user -d postgres -c '\q' 2>/tmp/error_msg; do
        cat /tmp/error_msg
        echo "Postgres is unavailable - sleeping"
        sleep 1
    done
    echo "Postgres is up - executing command"
}

echo "Starting the db container..."
docker compose up db -d 2>/tmp/error_msg || { cat /tmp/error_msg; echo "Error: Failed to start the db container."; exit 1; }

# Wait for DB to be ready
wait_for_db

echo "Dropping the test database..."
docker exec $POSTGRES_CONTAINER_ID psql -U user -d postgres -c "DROP DATABASE IF EXISTS mydatabase_test;" 2>/tmp/error_msg || { cat /tmp/error_msg; echo "Error: Failed to drop the test database."; exit 1; }

echo "Creating the test database..."
docker exec $POSTGRES_CONTAINER_ID psql -U user -d postgres -c "CREATE DATABASE mydatabase_test;" 2>/tmp/error_msg || { cat /tmp/error_msg; echo "Error: Failed to create the test database."; exit 1; }

echo "Running migrations and tests..."
docker compose run -e ENV=test --rm backend /bin/bash -c "alembic upgrade head > /dev/null && python -m pytest -s -x $*" 2>/tmp/error_msg || { cat /tmp/error_msg; echo "Error: Failed while running migrations or tests."; exit 1; }

echo "Tests passed!"
exit 0
