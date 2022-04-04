# Desafio técnico 

O desafio foi desenvolvido com:

- Front: React, React-Bootstrap
- Back: Gin/golang
- Test: React Testing e Assert
- Db: PostgreSQL

Para iniciar a aplicação, execute o seguinte comando na pasta raiz do projeto:

```
docker-compose up --build
```
Quando o processo de build terminar, acesse http://localhost e clique no botão "Carregar".

Caso queira rodar os testes ou iniciar o container individualmente, basta entra na pasta "web" ou "apis" e então pode rodar esses comandos:

Container:
```
docker-compose up --build
```
Teste api:
```
go test
```
Teste web:
```
npm teste
```
