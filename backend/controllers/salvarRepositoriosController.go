package controllers

import (
	"desafio_ateliware/backend/domain"
	"desafio_ateliware/backend/models"
	"desafio_ateliware/backend/util"

	"github.com/gin-gonic/gin"
)

// @Tags GitHub
// @Summary Salvar uma lista de repositórios de uma linguagem
// @Description Salva uma lista de repositórios de uma linguagem de programação, sobreescrevendo os já existentes.
// @Produce json
// @Accept json
// @Param Request body []models.Repositorio true "Request body"
// @Success 200 {object} models.Success
// @Failure 400,500 {object} models.Error
// @Router /repositorios [post]
func SalvarRepositorios(repositoryGitHub domain.IRepoitoryGitHub) gin.HandlerFunc {
	return func(c *gin.Context) {

		var repositorios []models.Repositorio
		if err := c.ShouldBindJSON(&repositorios); err != nil {
			util.GravarErroNoSentry(err, c)
			c.AbortWithStatusJSON(500, models.Error{Error: "Ocorreu um erro interno ao tentar salvar os repositórios da linguagem"})
			return
		}

		if len(repositorios) == 0 {
			c.AbortWithStatusJSON(400, models.Error{Error: "Nenhum repositório para ser salvo"})
			return
		}

		err := repositoryGitHub.ExcluirRepositorios(repositorios[0].Linguagem)
		if err != nil {
			util.GravarErroNoSentry(err, c)
			c.AbortWithStatusJSON(500, models.Error{Error: "Ocorreu um erro interno ao tentar salvar os repositórios da linguagem"})
			return
		}

		err = repositoryGitHub.SalvarRepositorios(repositorios)
		if err != nil {
			util.GravarErroNoSentry(err, c)
			c.AbortWithStatusJSON(500, models.Error{Error: "Ocorreu um erro interno ao tentar salvar os repositórios da linguagem"})
			return
		}

		c.JSON(200, models.Success{Message: "Repositórios salvos com sucesso"})
	}
}
