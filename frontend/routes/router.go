package router

import (
	"github.com/gin-gonic/gin"
)

func SetupFrontEndRoutes(router *gin.Engine) {

	// Grupo de rotas do servidor FrontEnd
	frontEndRouter := router.Group("")

	// Declarando as páginas e arquivos da aplicação
	frontEndRouter.StaticFile("", "frontend/pages/index/index.html")
	frontEndRouter.StaticFile("index.html", "frontend/pages/index/index.html")
	frontEndRouter.StaticFile("index.css", "frontend/pages/index/index.css")
	frontEndRouter.StaticFile("index.js", "frontend/pages/index/index.js")
	frontEndRouter.StaticFile("404.html", "frontend/pages/404/404.html")
	frontEndRouter.StaticFile("404.css", "frontend/pages/404/404.css")
	frontEndRouter.StaticFile("500.html", "frontend/pages/500/500.html")
	frontEndRouter.StaticFile("500.css", "frontend/pages/500/500.css")

	// Inicializando o servidor na porta padrão 80
	router.Run(":80")
}
