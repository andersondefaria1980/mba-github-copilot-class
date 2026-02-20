# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY src ./src

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src
COPY package*.json ./

EXPOSE 3001

USER node

CMD ["node", "src/server.js"]
