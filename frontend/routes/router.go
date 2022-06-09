package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupFrontEndRoutes(router *gin.Engine) {

	// Habilitando o CORS
	router.Use(cors.Default())

	// Declarando as páginas e arquivos da aplicação
	router.StaticFile("", "frontend/pages/index/index.html")
	router.StaticFile("index.html", "frontend/pages/index/index.html")
	router.StaticFile("index.css", "frontend/pages/index/index.css")
	router.StaticFile("index.js", "frontend/pages/index/index.js")
	router.StaticFile("404.html", "frontend/pages/404/404.html")
	router.StaticFile("404.css", "frontend/pages/404/404.css")
	router.StaticFile("500.html", "frontend/pages/500/500.html")
	router.StaticFile("500.css", "frontend/pages/500/500.css")

	// Tratando as requisições de páginas que não existem
	router.NoRoute(func(c *gin.Context) {
		c.Redirect(302, "./404.html")
	})

	// Tratando as requisições que deram algum erro inesperado
	router.Use(func(c *gin.Context) {
		defer func() {
			if r := recover(); r != nil {
				c.Redirect(302, "./500.html")
			}
		}()
		c.Next()
	})

	// Inicializando o servidor na porta padrão 80
	router.Run(":80")
}
