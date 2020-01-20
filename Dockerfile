FROM node:alpine
WORKDIR /app
COPY . .
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp
EXPOSE 3000/tcp
CMD ["npm", "run", "dev"]