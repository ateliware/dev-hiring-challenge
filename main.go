package main

import (
	backendrouter "desafio_ateliware/backend/routes"
	frontendrouter "desafio_ateliware/frontend/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	router := initRouter()
	enableCORS(router)

	backendrouter.SetupBackEndRoutes(router)
	frontendrouter.SetupFrontEndRoutes(router)

}

func initRouter() *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	return router
}

func enableCORS(router *gin.Engine) {
	router.Use(cors.Default())
}
