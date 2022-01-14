#!/bin/bash

sudo apt-get update -y
curl -fsSL https://get.docker.com | /bin/bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
curl -LJO https://raw.githubusercontent.com/hammsvietro/dev-hiring-challenge/master/docker-compose.yml
newgrp docker 
export db_user=${db_user}
export db_host=${db_host}
export db_password=${db_password}
export db_name=${db_name}
export main_app_container_name=${main_app_container_name}
export main_app_secret=${main_app_secret}
docker-compose up -d
