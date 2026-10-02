# HDCatalyzer
A tool for user-friendly creation of dataset metadata conforming to the HealthDCAT-AP standard.

This is the repository of the frontend. The backend code can be found in the [HDCatalyzer-proxy](https://github.com/mstelbrink/hdcatalyzer-proxy) repository.

## Setup

1. Clone the repository
   
```sh
git clone https://github.com/IMISE/HDCatalyzer.git
```

2. Set the environment variables by running `cp .env.template .env` or manually by setting the following values:

```env
VITE_DDA_PROXY_URL=http://localhost:8080
WEBAPP_PORT=1234 # (optional, default = 80)
```

### Production

#### docker compose

```sh
docker compose up -d
```

#### docker

```sh
docker build --build-arg VITE_DDA_PROXY_URL=http://localhost:8080 -t hdcatalyzer .
```

```sh
docker run -p 1234:80 --name HDCatalyzer hdcatalyzer
```

### Development

```sh
pnpm install
```

```sh
pnpm run dev
```
