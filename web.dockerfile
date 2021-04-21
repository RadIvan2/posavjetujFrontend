FROM node:14.1-alpine AS builder

RUN mkdir /app

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN $(npm bin)/ng build --prod --build-optimizer


FROM nginx:1.17-alpine
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/posavjetuj-app /usr/share/nginx/htmls