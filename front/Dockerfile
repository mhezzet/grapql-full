FROM node:latest as builder

WORKDIR /app

COPY package.json .
RUN yarn
RUN yarn add react@next react-dom@next
COPY . .
RUN npm run build


FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html