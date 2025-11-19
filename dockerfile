# ---------- 1. Build Stage ----------
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your project
COPY . .

# Build your React app
RUN npm run build

# ---------- 2. Production Stage ----------
FROM nginx:alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy build files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html
# (If using CRA instead of Vite, replace /dist with /build)

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]