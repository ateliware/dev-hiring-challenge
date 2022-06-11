package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupFrontEndRoutes(router *gin.Engine, port ...string) {

	router.Use(cors.Default())

	setupApplicationRoutes(router)
	setupNotFoundEndPointMiddleware(router)
	setupPanicRecoveryMiddleware(router)

	if len(port) == 0 {
		port = []string{"80"}
	}

	err := router.Run(":" + port[0])
	if err != nil {
		panic(err)
	}
}

func setupApplicationRoutes(router *gin.Engine) {
	router.StaticFile("", "frontend/pages/index/index.html")
	router.StaticFile("index.html", "frontend/pages/index/index.html")
	router.StaticFile("index.css", "frontend/pages/index/index.css")
	router.StaticFile("index.js", "frontend/pages/index/index.js")
	router.StaticFile("404.html", "frontend/pages/404/404.html")
	router.StaticFile("404.css", "frontend/pages/404/404.css")
	router.StaticFile("500.html", "frontend/pages/500/500.html")
	router.StaticFile("500.css", "frontend/pages/500/500.css")
	router.StaticFile("favicon.ico", "frontend/assets/favicon.ico")
	router.StaticFile("icon.png", "frontend/assets/icon.png")
	router.StaticFile("apple-touch-icon.png", "frontend/assets/apple-touch-icon.png")
}

func setupNotFoundEndPointMiddleware(router *gin.Engine) {
	router.NoRoute(func(c *gin.Context) {
		c.Redirect(302, "./404.html")
	})
}

func setupPanicRecoveryMiddleware(router *gin.Engine) {
	router.Use(func(c *gin.Context) {
		defer func() {
			if r := recover(); r != nil {
				c.Redirect(302, "./500.html")
			}
		}()
		c.Next()
	})
}
