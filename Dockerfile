#
# Build stage
#
FROM node:21-bullseye-slim AS builder

ARG WORKDIR

ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0 \
    PORT=10000

WORKDIR ${HOME}

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN ls -la ${HOME}
#
# Production stage
#
# FROM nginx
# ARG WORKDIR
# ENV HOME=/${WORKDIR}
# COPY --from=builder ${HOME}/.next /usr/share/nginx/html
# COPY --from=builder ${HOME}/public /usr/share/nginx/html/public

# Runtime stage
FROM node:21-bullseye-slim

ARG WORKDIR
ENV HOME=/${WORKDIR} \
    NODE_ENV=production \
    PORT=10000

WORKDIR ${HOME}

COPY --from=builder ${HOME}/package*.json ./
COPY --from=builder ${HOME}/.next ./.next
COPY --from=builder ${HOME}/public ./public
COPY --from=builder ${HOME}/node_modules ./node_modules

EXPOSE ${PORT}

CMD ["npm", "start"]