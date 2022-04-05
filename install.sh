#!/bin/bash
sudo groupadd docker ; sudo usermod -aG docker $USER ; docker-compose up -d

python3 -m pip install --upgrade pip && python3 -m venv venv && . venv/bin/activate
python -m pip install psycopg2-binary && python -m pip install -r requirements.txt

# Build
mkdir -p db/postgresql/data/ && cd gittools/
python manage.py makemigrations && python manage.py migrate

clear
python3 - << EOF
s = """
+-------------------------------------------------------+
|                                                       |
|                                                       |
|                                                       |
|                                                       |
|                                                       |
|             Run the 'start-app' script                |
|                                                       |
|                    ./start-app                        |
|                                                       |
|    Go to 'http://127.0.0.1:8000' in your browser.     |
|                                                       |
|                                                       |
|                                                       |
|                                                       |
|                                                       |
+-------------------------------------------------------+
"""
print(s)
EOF
