package main

import (
	"apis/database"
	"apis/routes"
)

func main() {
	database.Start()
	routes.HandleRequests()
}
