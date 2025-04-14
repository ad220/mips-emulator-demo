FROM node:lts AS build

# Install dependencies
WORKDIR /app
COPY package* ./
RUN npm install

# Copy source files
COPY public ./public
COPY src ./src
COPY index.html vite.config.js .env ./

# Build production site
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html