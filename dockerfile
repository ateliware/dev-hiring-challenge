FROM golang:1.18.2-alpine 

COPY . $GOPATH/src/desafio_ateliware

WORKDIR $GOPATH/src/desafio_ateliware

RUN go install

EXPOSE 8080 80

CMD [ "desafio_ateliware" ]
