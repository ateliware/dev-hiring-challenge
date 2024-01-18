echo 'Loading environment files for exemplary instantiation of project...'

cp .example.server.env server/.env
cp .example.client.env client/.env
cp .example.docker.env .env

echo 'Environment files loaded successfully.'