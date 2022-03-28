package routes

import (
	"apis/controllers"
	"github.com/gin-gonic/gin"
)

func HandleRequests() {
	r := gin.Default()
	r.GET("/", controllers.Test)
	r.GET("/repositories", controllers.Test2)
	err := r.Run()
	if err != nil {
		panic("Error on start")
	}
}
