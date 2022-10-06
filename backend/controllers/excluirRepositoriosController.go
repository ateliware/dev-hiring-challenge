package controllers

import (
	"desafio_ateliware/backend/domain"
	"desafio_ateliware/backend/models"
	"desafio_ateliware/backend/util"

	"github.com/gin-gonic/gin"
)

// @Tags GitHub
// @Summary Excluir todos os repositórios de uma linguagem
// @Description Exclui todos os repositórios de uma linguagem de programação.
// @Produce json
// @Param linguagem query string true "Linguagem"
// @Success 200 {object} models.Success
// @Failure 400,500 {object} models.Error
// @Router /repositorios [delete]
func ExcluirRepositorios(repositoryGitHub domain.IRepoitoryGitHub) gin.HandlerFunc {
	return func(c *gin.Context) {

		linguagem := c.Query("linguagem")
		if linguagem == "" {
			c.AbortWithStatusJSON(400, models.Error{Error: "Você deve informar a linguagem de programação de que você quer excluir os repositórios"})
			return
		}

		err := repositoryGitHub.ExcluirRepositorios(linguagem)
		if err != nil {
			util.GravarErroNoSentry(err, c)
			c.AbortWithStatusJSON(500, models.Error{Error: "Ocorreu um erro interno ao tentar excluir os repositórios da linguagem"})
			return
		}

		c.JSON(200, models.Success{Message: "Repositórios excluídos com sucesso"})
	}
}
