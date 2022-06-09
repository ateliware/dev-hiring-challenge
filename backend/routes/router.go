package router

import (
	"desafio_ateliware/backend/controllers"
	"desafio_ateliware/backend/repositories"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupBackEndRoutes(router *gin.Engine) {

	// Habilitando o CORS
	router.Use(cors.Default())

	// Declarando as rotas da aplicação
	githubRepository := repositories.RepositoryGitHub{}
	router.GET("/repositorios", controllers.BuscarRepositorios(githubRepository))
	router.POST("/repositorios", controllers.SalvarRepositorios(githubRepository))
	router.DELETE("/repositorios", controllers.ExcluirRepositorios(githubRepository))

	// Inicializando o servidor na porta 8080
	go router.Run(":8080")
}
