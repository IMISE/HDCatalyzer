FROM nginx:alpine3.24-slim AS builder

ARG VITE_DDA_PROXY_URL

WORKDIR /app

RUN apk add pnpm

COPY . .

RUN echo "VITE_DDA_PROXY_URL=$VITE_DDA_PROXY_URL" >> .env

RUN pnpm install
RUN pnpm run build-only

FROM nginx:alpine3.24

COPY --from=builder /app/dist/ /usr/share/nginx/html