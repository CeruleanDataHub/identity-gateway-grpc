FROM --platform=$TARGETPLATFORM node:lts

ARG TARGETPLATFORM

WORKDIR /app/

COPY package*.json ./

COPY *.js ./

USER node

CMD ["node", "app.js"]
