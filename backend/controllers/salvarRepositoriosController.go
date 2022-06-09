package controllers

import (
	"desafio_ateliware/backend/domain"
	"desafio_ateliware/backend/models"

	"github.com/gin-gonic/gin"
)

func SalvarRepositorios(repositoryGitHub domain.IRepoitoryGitHub) gin.HandlerFunc {
	return func(c *gin.Context) {

		var repositorios []models.Repositorio
		if err := c.ShouldBindJSON(&repositorios); err != nil {
			c.AbortWithStatusJSON(500, models.Error{Error: "Ocorreu um erro interno ao tentar salvar os repositórios da linguagem"})
			return
		}

		if len(repositorios) == 0 {
			c.AbortWithStatusJSON(400, models.Error{Error: "Ocorreu um erro interno ao tentar salvar os repositórios da linguagem"})
			return
		}

		err := repositoryGitHub.ExcluirRepositorios(repositorios[0].Linguagem)
		if err != nil {
			c.AbortWithStatusJSON(500, models.Error{Error: "Ocorreu um erro interno ao tentar salvar os repositórios da linguagem"})
			return
		}

		err = repositoryGitHub.SalvarRepositorios(repositorios)
		if err != nil {
			c.AbortWithStatusJSON(500, models.Error{Error: "Ocorreu um erro interno ao tentar salvar os repositórios da linguagem"})
			return
		}

		c.JSON(200, models.Success{Message: "Repositórios salvos com sucesso"})
	}
}
