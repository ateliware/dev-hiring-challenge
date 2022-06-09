package main

import (
	backendrouter "desafio_ateliware/backend/routes"
	frontendrouter "desafio_ateliware/frontend/routes"

	"github.com/gin-gonic/gin"
)

func main() {

	backendRouter := initRouter()
	backendrouter.SetupBackEndRoutes(backendRouter)

	frontEndRouter := initRouter()
	frontendrouter.SetupFrontEndRoutes(frontEndRouter)

}

func initRouter() *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	return router
}
