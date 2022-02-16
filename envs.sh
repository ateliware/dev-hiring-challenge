echo 'gerando arquivos com as variaveis de ambiente'

cp .sample.production.env .env.production.local
cp .sample.test.env .env.test.local
cp .sample.development.env .env.development.local

echo 'arquivos de ambiente gerados com sucesso'