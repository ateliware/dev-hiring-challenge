awsprops = {
  region = "regiao-aws-aqui"
  vpc = "id-de-sua-vpc-aqui"
  ami = "ami-aqui" // debian buster for na-east-1
  itype = "t2.micro" // AWS FREE TIER
  subnet = "id-da-subnet-aqui"
  publicip = true
  keyname = "minha chave de seguranca"
  ssh_public_key = "conteudo de ~/.ssh/id_rsa.pub aqui"
  secgroupname = "nome-do-seu-grupo-de-seguranca"
}

// configuração da aplicação - ALTERE TODOS OS VALORES
ateliwareprops = {
  db_host = "psql"
  db_user = "change-user"
  db_password = "change-password"
  db_name = "ateliware-prod"

  main_app_container_name = "ateliware_app"

  // troque
  main_app_secret = "+VTHtpcgdf06pVrnQaynoMRMzHjKxdFBUWtnpYHLr2m1SyjLkIXkAZrIgXOK4BZW"
}
