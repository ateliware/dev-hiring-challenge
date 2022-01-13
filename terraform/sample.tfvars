awsprops = {
  region = "us-east-1"
  vpc = "vpc-5234832d"
  ami = "ami-0c1bea58988a989155" // debian buster for na-east-1
  itype = "t2.micro" // AWS FREE TIER
  subnet = "subnet here"
  publicip = true
  keyname = "myseckey"
  ssh_public_key = "your ~/.ssh/id_rsa.pub content here"
  secgroupname = "your-security-group"
}

ateliwareprops = {
  db_host = "psql"
  db_user = "postgres"
  db_password = "changeme"
  db_name = "ateliware"

  main_app_container_name = "ateliware_app"
  main_app_secret = "+VTHtpcgdf06pVrnQaynoMRMzHjKxdFBUWtnpYHLr2m1SyjLkIXkAZrIgXOK4BZW" // <- change it
}
