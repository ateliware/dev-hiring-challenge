#!/bin/bash
cd /home/ec2-user/ateliware-challenge
docker-compose build --no-cache
docker-compose up -d
