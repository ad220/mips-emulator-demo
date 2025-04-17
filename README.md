# MIPS Emulator Demo
A web interface for the MIPS emulator developped as a final project for an Esisar C-language course. It uses [FastAPI](https://fastapi.tiangolo.com/) for the backend and [Vite + React](https://vite.dev/) for the frontend.

## Install and deploy

1. Prepare your reverse-proxy for the API and the frontend. You can change the ports exposed by the containers in [docker-compose.yml](./docker-compose.yml). Below is an example for a reverse-proxy with caddy.
```Caddyfile
mips-emulator.arthurdavid.fr {
	reverse_proxy :1573
	
	handle_path /api/* {
		reverse_proxy :1574
	}
}
```
2. Rename `.env.sample` to `.env` and edit the file with your API url.

3. Build and run docker images
```bash
docker compose build && docker compose up -d
```