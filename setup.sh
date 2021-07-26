#!/bin/bash
sudo amazon-linux-extras install docker -y
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
sudo service docker start
sudo usermod -a -G docker ec2-user
sudo chmod 666 /var/run/docker.sock
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
sudo service docker start
cd /home/ec2-user/ateliware-challenge
docker-compose up -d db
docker-compose build --no-cache
docker-compose run --rm -d flaskapp flask db upgrade
