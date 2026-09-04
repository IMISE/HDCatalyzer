# HDCatalizer
A tool for user-friendly creation of dataset metadata conforming to the HealthDCAT-AP standard.

## Setup

1. Clone the repository
   
```sh
git clone https://github.com/IMISE/HDCatalyzer.git
```

2. Set environment variables

```env
VITE_DDA_PROXY_URL=http://localhost:8080/api
WEBAPP_PORT=1234 # (optional, default = 80)
```

### Production

#### docker compose

```sh
docker compose up -d
```

#### docker

```sh
docker build --build-arg VITE_DDA_PROXY_URL=http://localhost:8080/api -t hdcatalyzer .
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