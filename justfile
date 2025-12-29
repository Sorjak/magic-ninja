build:
    docker compose -f docker-compose.yml build

build-no-cache:
    docker compose -f docker-compose.yml build --no-cache

start:
    docker compose -f docker-compose.yml up -d

stop:
    docker compose -f docker-compose.yml down

start-dev:
    export VITE_API_BASE='http://localhost' && \
    export VITE_API_PORT=8080 && \
    export VITE_IMAGE_URL='https://magic-ninja.s3.us-east-1.amazonaws.com' && \
    npm run dev --prefix ./frontend