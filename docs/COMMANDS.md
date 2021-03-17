# Activate virtualenv

	`source venv/bin/activate`

# Start/Up docker

	`docker-compose up`

# Stop/Down docker
	
	`docker-compose down`

# Docker up and build

	`docker compose up --build`

# Docker up, leaving the terminal free

	`docker-compose up -d`

# Docker migrate
	`docker-compose up -d`
	
	`docker-compose exec web python manage.py migrate`

# See docker logs

	`docker-compose logs`
