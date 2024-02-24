# Stage 1: Build the Angular app
FROM node:21-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM node:21-alpine
COPY --from=build /app/dist/langfella /app
WORKDIR /app
EXPOSE 4000
CMD ["node", "server/server.mjs"]
