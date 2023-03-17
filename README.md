# esrsp-gui

## Использование
На сервере нужно разместить два файла: `docker-compose.yml` и `.env`

`docker-compose.yml`:
```yaml
version: '3.6'

services:
  postgres:
    image: postgres:15.0
    restart: always
    environment:
      - POSTGRES_USER=${POSTGRES_USERNAME}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DATABASE}
    volumes:
      - pgdata_local:/var/lib/postgresql/data
    ports:
      - ${POSTGRES_PORT}:${POSTGRES_PORT}

  redis:
    image: docker.io/bitnami/redis:7.0
    restart: always
    environment:
      - ALLOW_EMPTY_PASSWORD=yes
      - REDIS_DISABLE_COMMANDS=FLUSHDB,FLUSHALL
    ports:
      - ${REDIS_PORT}:${REDIS_PORT}
    volumes:
      - redis_data_local:/bitnami/redis/data

  backend:
    image: qzerrty/esrsp-backend:version
    restart: always
    ports:
      - ${PORT}:${PORT}
    env_file:
      - .env
    depends_on:
      - postgres
      - redis

  frontend:
    image: qzerrty/esrsp-gui:version
    restart: always
    ports:
      - ${CLIENT_PORT}:${CLIENT_PORT}
    environment:
      - SERVER_PORT=${PORT}
    depends_on:
      - backend


volumes:
  pgdata_local:

  redis_data_local:
    driver: local
```
Нужно не забыть указать версии образов qzerrty/esrsp-backend и qzerrty/esrsp-gui

Заполнить все поля в `.env`:
```
POSTGRES_USERNAME=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
POSTGRES_PORT=

REDIS_PORT=

SESSION_SECRET=
SUPERUSER_USERNAME=
SUPERUSER_PASSWORD=

PORT=
CLIENT_PORT=

LOGS_PATH=./logs
```