## Multi-stage build: build Vite app with Node, serve static with nginx
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
COPY yarn.lock* ./
COPY . ./
RUN npm ci --production=false || npm install
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
