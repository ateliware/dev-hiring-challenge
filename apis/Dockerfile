FROM golang:latest

WORKDIR /app

COPY go.mod .

COPY go.sum .

RUN go mod download

COPY . .

RUN go build

RUN find . -name "*.go" -type f -delete

EXPOSE 8080

CMD ["./apis"]
