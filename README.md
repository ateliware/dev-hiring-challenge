# Instruções para Deployment Automático em Instância Amazon EC2


### Crie os IAM Roles necessários
***

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/26bulqgskw5bpu64r0kl.png)

Um para a instância **EC2**
  - _Trusted entity_: **AWS Service**
  - _Use Case_: **EC2**
  - _Policies_: **AmazonEC2RoleforAWSCodeDeploy**

  ![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/46kuzgo4qxpc639girdl.png)

  - Abra as configurações do _Role_ criado e edite a _Trust Relationship_ da forma abaixo:

  ![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/irtiqqgvv9uig7zxlist.png)

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Service": "ec2.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  }
  ```

Outro para o **CodeDeploy**
  - _Trusted entity_: **AWS Service**
  - _Use Case_: **EC2**
  - _Policies_: **AmazonEC2FullAccess**, **AWSCodeDeployFullAccess**, **AdministratorAccess**, **AWSCodeDeployRole**

  ![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y6l3k4yjo76yvbwu2ut1.png)

  - Abra as configurações do _Role_ criado e edite a _Trust Relationship_ da forma abaixo:
  
    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "Service": "codedeploy.amazonaws.com"
          },
          "Action": "sts:AssumeRole"
        }
      ]
    }
    ```

***
### Crie Instância EC2
***

Para testes, foi utilizada uma máquina **Amazon Linux 2 AMI (HVM), SSD Volume Type** com arquitetura **64-bit (x86)** do tipo **t2.micro**

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tsbfckiuolr4y1oj5ilt.png)

Para estabelecer a conexão entre a instância **EC2** e o CodeDeploy, selecione o primeiro _IAM Role_ criado para as configurações da máquina.

Na página de _Tags_, add a tag called **development**. The tag will require creating a _codeDeploy_ service.

Em _Configure Security Group_, por conveniência, configure o _Type_ para **All traffic** e _Source_ para **Anywhere** (Não recomendado para produção)

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/c66iy10uzgmv6dygz5cl.png)

Inicialize a instância e espere alguns minutos

***
### Instale o CodeDeploy Agent na Instância EC2
***

Quando a instância começar a ser executada, conecte-se a ela usando _User name_ padrão

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wd9853dwfnc7hldoy7n9.png)

Use os seguintes comandos para instalar o **codedeploy-agent**.

```shell
sudo yum update
```

```shell
sudo yum install -y ruby
```

```shell
sudo yum install wget
```

```shell
wget https://<bucket-name>.s3.<region-identifier>.amazonaws.com/latest/install
```
> Substitua **bucket-name** e **region-identifier** pelos [valores correspondentes à sua região](https://docs.aws.amazon.com/codedeploy/latest/userguide/resource-kit.html#resource-kit-bucket-names)

```shell
chmod +x ./install
```

```shell
sudo ./install auto
```

```shell
sudo service codedeploy-agent start 
```

***
### Configure Serviço CodeDeploy
***

Crie uma _Application_ de nome **Git_Application** com _Compute platform_ **EC2/On-premises**

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hciskx6rrwq0r4m3whw6.png)

Em seguida, cria um _Deployment Group_ com nome **development_group**. Para o _Service role_, utilize o _Role ARN_ do **CodeDeploy_Role** criado anteriormente

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gqw1plmd8tpjscukpr7d.png)

Escolha **In-place** para _Deployment type_. Selecione **Amazon Ec2 Instances** em _Environment configuration_ e adicione a _Tag key_ **development**

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/41sxab2cuhni6412y7f5.png)

Defina **OneAtATime** em _Deployment settings_ e desabilite **Enable load balancing**

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3xivhirkebhcrl9ne7kb.png)

Com o _Deployment Group_ criado, configure um _Deployment_ com _Revision Type_ **My application is stored in GitHub**, ative **Connect to GitHub** após preencher seu [GitHub token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) e forneça o nome de seu repositório (**AnCaPepe/dev-hiring-challenge** ou seu fork) em _Repository name_ e o _Commit ID_ da revisão a ser utilizada

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3s5f3cv3auw4magmt33c.png)

Selecione **Overwrite the content** em _Content options_ e termine a criação do _Deployment_

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qya9yce6v5zxb09c21um.png)
  
Aguarde o fim do processo e se houver alguma falha, verifique os logs da instância **EC2** em `/var/log/aws/codedeploy-agent/codedeploy-agent.log`.

***
### Configure GitHub Actions
***

Para realizar o deployment automático após mudanças em seu [fork](https://docs.github.com/en/github/getting-started-with-github/quickstart/fork-a-repo) do repositório, crie um [IAM user](https://docs.amazonaws.cn/en_us/IAM/latest/UserGuide/id_users_create.html#id_users_create_console) com _policy_ **AWSCodeDeployFullAccess** e gere uma [access key e secret access](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey) para o usuário

Defina as variáveis de ambiente do repositório **GitHub** com as informações de acesso e região

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zkmvr6y8pi9aqpdjlj6b.png)