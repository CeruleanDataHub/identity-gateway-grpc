FROM --platform=$TARGETPLATFORM node:lts-alpine

ARG TARGETPLATFORM

WORKDIR /app/

COPY package*.json ./

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install --production
    && apk del .gyp

COPY *.js ./

USER node

CMD ["node", "app.js"]
