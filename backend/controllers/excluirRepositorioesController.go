package controllers

import (
	"desafio_ateliware/backend/domain"
	"desafio_ateliware/backend/models"

	"github.com/gin-gonic/gin"
)

func ExcluirRepositorios(repositoryGitHub domain.IRepoitoryGitHub) gin.HandlerFunc {
	return func(c *gin.Context) {

		linguagem := c.Query("linguagem")
		if linguagem == "" {
			c.AbortWithStatusJSON(400, models.Error{Error: "Você deve informar a linguagem de programação de que você quer excluir os repositórios"})
			return
		}

		err := repositoryGitHub.ExcluirRepositorios(linguagem)
		if err != nil {
			c.AbortWithStatusJSON(500, models.Error{Error: "Ocorreu um erro interno ao tentar excluir os repositórios da linguagem"})
			return
		}

		c.JSON(200, models.Success{Message: "Repositórios excluídos com sucesso"})
	}
}
