package router

import (
	"desafio_ateliware/backend/controllers"
	"desafio_ateliware/backend/docs"
	"desafio_ateliware/backend/models"
	"desafio_ateliware/backend/repositories"
	"desafio_ateliware/backend/util"
	"fmt"
	"runtime/debug"

	swaggerFiles "github.com/swaggo/files"
	swaggerGin "github.com/swaggo/gin-swagger"

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

	// Declarando a rota de healthcheck para testar a conectividade da API
	router.GET("/ping", controllers.HealthCheck())

	// Tratando as requisições de EndPoints que não existem
	router.NoRoute(func(c *gin.Context) {
		c.JSON(400, models.Error{Error: "Recurso não encontrado"})
	})

	// Tratando as requisições que deram algum erro inesperado
	router.Use(func(c *gin.Context) {
		defer func() {
			if r := recover(); r != nil {

				debug.PrintStack()

				c.JSON(500, models.Error{Error: "Ocorreu um erro interno ao tentar realizar a operação"})

				err := fmt.Errorf("%v", r)
				util.GravarErroNoSentry(err, c)

			}
		}()
		c.Next()
	})

	setupSwaggerDocumentationRoutes(router)

	// Inicializando o servidor na porta 8080
	go router.Run(":8080")
}

func setupSwaggerDocumentationRoutes(router *gin.Engine) {

	docs.SwaggerInfo.Title = "Desafio Ateliware"
	docs.SwaggerInfo.Description = "Documentação da API de gerenciamento de repositórios do GitHub"
	docs.SwaggerInfo.Version = "1.0.0"
	docs.SwaggerInfo.Schemes = []string{"http", "https"}

	swagger := router.Group("/docs")
	swagger.GET("/*any", swaggerGin.WrapHandler(swaggerFiles.Handler))

}
