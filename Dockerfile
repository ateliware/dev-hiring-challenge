FROM openjdk:8-jdk-alpine

ENV JAR_NAME dev-hiring-challenge-all.jar

RUN apk add --no-cache bash

COPY build/libs/$JAR_NAME $JAR_NAME

ADD wait-for-it.sh wait-for-it.sh

RUN chmod +x /wait-for-it.sh

ENTRYPOINT [ "/wait-for-it.sh", "mysql-dev-hiring-challenge:3306", "--" ]

CMD java -jar $JAR_NAME
