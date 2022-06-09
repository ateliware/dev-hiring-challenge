package router

import (
	"desafio_ateliware/backend/controllers"
	"desafio_ateliware/backend/repositories"

	"github.com/gin-gonic/gin"
)

func SetupBackEndRoutes(router *gin.Engine) {

	// Grupo de rotas do servidor FrontEnd
	backEndRouter := router.Group("")

	githubRepository := repositories.RepositoryGitHub{}
	backEndRouter.GET("/repositorios", controllers.BuscarRepositorios(githubRepository))
	backEndRouter.POST("/repositorios", controllers.SalvarRepositorios(githubRepository))
	backEndRouter.DELETE("/repositorios", controllers.ExcluirRepositorios(githubRepository))

	// Inicializando o servidor na porta 8080
	go router.Run(":8080")
}
