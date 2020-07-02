FROM --platform=$TARGETPLATFORM node:lts-slim

ARG TARGETPLATFORM

WORKDIR /app/

COPY package*.json ./

RUN npm install --production

COPY *.js ./

USER node

CMD ["node", "app.js"]
