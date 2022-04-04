package routes

import (
	"apis/controllers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"
)

func HandleRequests() {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{http.MethodGet, http.MethodPost},
		AllowHeaders:     []string{"Content-Type", "X-XSRF-TOKEN", "Accept", "Origin", "X-Requested-With", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))
	r.POST("/repositories", controllers.CreateRepositories)
	r.GET("/repositories", controllers.ListRepoLanguage)
	err := r.Run()
	if err != nil {
		panic("Error on start")
	}
}
