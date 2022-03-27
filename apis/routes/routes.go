package routes

import (
	"apis/controllers"
	"github.com/gin-gonic/gin"
)

func HandleRequests() {
	r := gin.Default()
	r.GET("/", controllers.Test)
	err := r.Run()
	if err != nil {
		panic("Error on start")
	}
}
