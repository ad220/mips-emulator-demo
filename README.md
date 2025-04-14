# MIPS Emulator Demo
A web interface for the MIPS emulator developped as a final project for an Esisar C-language course. It uses [FastAPI](https://fastapi.tiangolo.com/) for the backend and [Vite + React](https://vite.dev/) for the frontend.

## Install and deploy

1. Build docker images.
```bash
docker compose build
```
2. Reverse-proxy the API and frontend, you can edit the exposed ports in [docker-compose.yml](./docker-compose.yml) if needed. Below is an example for a reverse-proxy with caddy.
```Caddyfile
mips-emulator.arthurdavid.fr {
	reverse_proxy :1573
	
	handle_path /api/* {
		reverse_proxy :1574
	}
}
```

3. Run the app.
```bash
docker compose up -d
```