# Etapa 1: Build de Angular
FROM node:20.10-alpine3.19 AS build
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli
RUN npm install
RUN ng build --configuration production --aot

# Etapa 2: Servir con Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/inspir-art/ .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]