# Prompt 4 - Backend Dockerfile

Create /backend/Dockerfile multi-stage. FROM node:18-alpine AS build, WORKDIR /app, COPY package*.json ./, RUN npm ci --only=production, COPY src ./src. FROM node:18-alpine, WORKDIR /app, COPY --from=build /app/node_modules ./node_modules, COPY --from=build /app/src ./src, COPY package*.json ./, EXPOSE 3001, USER node, CMD ['node', 'src/server.js']. Create /backend/.dockerignore with node_modules, .env, npm-debug.log, .git, tests, coverage, *.md.
