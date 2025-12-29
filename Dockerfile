FROM node:alpine AS frontend-builder

# Define build arguments for environment variables
ARG VITE_API_BASE
ARG VITE_API_PORT
ARG VITE_IMAGE_URL

# Set environment variables during the build process
ENV VITE_API_BASE=$VITE_API_BASE
ENV VITE_API_PORT=$VITE_API_PORT
ENV VITE_IMAGE_URL=$VITE_IMAGE_URL

WORKDIR /app
COPY /frontend/package.json .
RUN npm install
COPY /frontend/. .
RUN npm run build

FROM node:alpine AS backend-builder
WORKDIR /app
COPY /backend/package.json .
RUN npm install
COPY /backend/. .

FROM node:alpine AS final

WORKDIR /app
COPY --from=frontend-builder /app/dist ./dist
COPY --from=backend-builder /app/. .

EXPOSE 3001
CMD ["node", "server.js"]
