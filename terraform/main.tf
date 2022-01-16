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

data "template_file" "init" {
  template = "${file("init.sh")}"

  vars = {
    db_user="${lookup(var.ateliwareprops, "db_user")}"
    db_host="${lookup(var.ateliwareprops, "db_host")}"
    db_password="${lookup(var.ateliwareprops, "db_password")}"
    db_name="${lookup(var.ateliwareprops, "db_name")}"
    main_app_container_name="${lookup(var.ateliwareprops, "main_app_container_name")}"
    main_app_secret="${lookup(var.ateliwareprops, "main_app_secret")}"
  }
}

resource "aws_instance" "project-iac" {
  ami = lookup(var.awsprops, "ami")
  instance_type = lookup(var.awsprops, "itype")
  subnet_id = lookup(var.awsprops, "subnet")
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

  user_data = "${data.template_file.init.rendered}"

  depends_on = [ aws_security_group.ateliware-sg ]
}


output "ec2instance" {
  value = aws_instance.project-iac.public_ip
}

