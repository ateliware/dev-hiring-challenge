terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

variable "awsprops" {
    type = map
    default = {
    region = "us-east-1"
    vpc = "your vpc here"
    ami = "ami-0c1bea58988a989155"
    itype = "t2.micro"
    subnet = "subnet-81896c8e"
    publicip = true
    keyname = "your key here"
    secgroupname = "your group name here"
    ssh_public_key = "your public key here"
  }
}

variable "ssh_private_key_path" {
  default = "~/.ssh/id_rsa"
}

variable "ateliwareprops" {
  default = {
    db_host = "psql"
    db_user = "postgres"
    db_password = "changeme"
    db_name = "ateliware"

    main_app_container_name = "ateliware_app"
    main_app_secret = "+VTHtpcgdf06pVrnQaynoMRMzHjKxdFBUWtnpYHLr2m1SyjLkIXkAZrIgXOK4BZW" // <- change it
  }
}

provider "aws" {
  region = lookup(var.awsprops, "region")
}

resource "aws_key_pair" "ssh-key" {
key_name   = lookup(var.awsprops, "keyname")
public_key = lookup(var.awsprops, "ssh_public_key")
}

resource "aws_security_group" "ateliware-sg" {
  name = lookup(var.awsprops, "secgroupname")
  description = lookup(var.awsprops, "secgroupname")
  vpc_id = lookup(var.awsprops, "vpc")

  // To Allow SSH Transport
  // Be sure to have the aws-cli properly configured and authenticated
  // Forward port 80
  ingress {
    from_port = 80
    protocol = "tcp"
    to_port = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
     cidr_blocks      = [ "0.0.0.0/0", ]
     description      = ""
     from_port        = 22
     ipv6_cidr_blocks = []
     prefix_list_ids  = []
     protocol         = "tcp"
     security_groups  = []
     self             = false
     to_port          = 22
  }
  egress {
      cidr_blocks      = [ "0.0.0.0/0", ]
      description      = ""
      from_port        = 0
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "-1"
      security_groups  = []
      self             = false
      to_port          = 0
 }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_instance" "project-iac" {
  ami = lookup(var.awsprops, "ami")
  instance_type = lookup(var.awsprops, "itype")
  subnet_id = lookup(var.awsprops, "subnet") #FFXsubnet2
  associate_public_ip_address = lookup(var.awsprops, "publicip")
  key_name = lookup(var.awsprops, "keyname")


  vpc_security_group_ids = [
    aws_security_group.ateliware-sg.id
  ]

  tags = {
    Name ="SERVER01"
    Environment = "PROD"
    OS = "DEBIAN"
    Managed = "IAC"
  }

    connection {
			type        = "ssh"
			user        = "admin"
			host        = self.public_ip
			private_key = chomp(file(var.ssh_private_key_path))
		}
    # runs the project
		provisioner "remote-exec" {
			inline = [
        "sudo apt-get update -y",
        "sudo apt-get install git -y",
        "curl -fsSL https://get.docker.com | /bin/bash",
        "git clone https://github.com/hammsvietro/dev-hiring-challenge.git",
        "sudo curl -L \"https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)\" -o /usr/local/bin/docker-compose",
        "sudo chmod +x /usr/local/bin/docker-compose",
        "sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose",
        "cd dev-hiring-challenge",
        "docker-compose up -d"
			]
		}
  

  depends_on = [ aws_security_group.ateliware-sg ]
}


output "ec2instance" {
  value = aws_instance.project-iac.public_ip
}

