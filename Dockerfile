#
# Build stage
#
FROM node:21-bullseye-slim AS builder

ARG WORKDIR

ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0

WORKDIR ${HOME}

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN ls -la ${HOME}
#
# Production stage
#
FROM nginx
ARG WORKDIR
ENV HOME=/${WORKDIR}
COPY --from=builder ${HOME}/.next /usr/share/nginx/html
COPY --from=builder ${HOME}/public /usr/share/nginx/html/public
COPY nginx.conf /etc/nginx/conf.d/default.conf