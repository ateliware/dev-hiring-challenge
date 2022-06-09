package router

import (
	"desafio_ateliware/backend/controllers"
	"desafio_ateliware/backend/models"
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

	// Tratando as requisições de EndPoints que não existem
	router.NoRoute(func(c *gin.Context) {
		c.JSON(400, models.Error{Error: "Recurso não encontrado"})
	})

	// Tratando as requisições que deram algum erro inesperado
	router.Use(func(c *gin.Context) {
		defer func() {
			if r := recover(); r != nil {
				c.JSON(500, models.Error{Error: "Ocorreu um erro interno ao tentar realizar a operação"})
			}
		}()
		c.Next()
	})

	// Inicializando o servidor na porta 8080
	go router.Run(":8080")
}
