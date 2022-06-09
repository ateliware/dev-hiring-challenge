package main

import (
	backendrouter "desafio_ateliware/backend/routes"
	frontendrouter "desafio_ateliware/frontend/routes"
	"os"
	"time"

	"github.com/getsentry/sentry-go"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	loadEnviromentVariables()

	initSentry()

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

func initSentry() {
	sentry.Init(sentry.ClientOptions{
		Dsn:              os.Getenv("SENTRY_DSN"),
		AttachStacktrace: true,
	})
	defer sentry.Flush(2 * time.Second)
}

func loadEnviromentVariables() {
	godotenv.Load()
}
