FROM node:20.19-alpine AS build
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli
RUN npm install
RUN ng build --configuration production --aot

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/inspir-art/ .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]