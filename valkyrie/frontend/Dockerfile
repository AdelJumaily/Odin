## Multi-stage build: build Vite app with Node, serve static with nginx
FROM node:18-slim AS build
WORKDIR /app
COPY package.json package-lock.json* ./
COPY yarn.lock* ./
COPY . ./
# Use npm install inside the container to resolve any lockfile mismatches (keeps host lockfile unchanged)
RUN npm install --no-audit --no-fund
# Install global build tools and run the global vite binary to avoid local bin/symlink issues in the container
RUN npm install -g vite@5 terser@5 --no-audit --no-fund
RUN vite build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
