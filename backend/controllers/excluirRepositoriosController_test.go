package controllers

import (
	"desafio_ateliware/backend/models"
	"desafio_ateliware/backend/repositories/mocks"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestExcluirRepositoriosSucesso(t *testing.T) {

	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Request, _ = http.NewRequest("DELETE", "http://localhost/repositorios?linguagem=java", nil)

	expectedResponseRepositorios := models.Success{Message: "Repositórios excluídos com sucesso"}

	repositoryGitHub := new(mocks.IRepoitoryGitHub)
	repositoryGitHub.On("ExcluirRepositorios", "java").Return(nil)
	ExcluirRepositorios(repositoryGitHub)(c)

	responseBody := models.Success{}
	err := json.NewDecoder(response.Body).Decode(&responseBody)
	assert.Equal(t, nil, err)

	assert.Equal(t, 200, response.Code)
	assert.Equal(t, expectedResponseRepositorios, responseBody)

}

func TestExcluirRepositoriosErroLinguagemNaoInformada(t *testing.T) {

	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Request, _ = http.NewRequest("DELETE", "http://localhost/repositorios?yyy=xxx", nil)

	expectedResponseError := models.Error{Error: "Você deve informar a linguagem de programação de que você quer excluir os repositórios"}

	ExcluirRepositorios(nil)(c)

	responseBody := models.Error{}
	err := json.NewDecoder(response.Body).Decode(&responseBody)
	assert.Equal(t, nil, err)

	assert.Equal(t, 400, response.Code)
	assert.Equal(t, expectedResponseError, responseBody)

}

func TestExcluirRepositoriosErroInesperado(t *testing.T) {

	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Request, _ = http.NewRequest("DELETE", "http://localhost/repositorios?linguagem=java", nil)

	errMsg := "Ocorreu um erro interno ao tentar excluir os repositórios da linguagem"
	err := errors.New(errMsg)
	expectedResponseError := models.Error{Error: errMsg}

	repositoryGitHub := new(mocks.IRepoitoryGitHub)
	repositoryGitHub.On("ExcluirRepositorios", "java").Return(err)
	ExcluirRepositorios(repositoryGitHub)(c)

	responseBody := models.Error{}
	err = json.NewDecoder(response.Body).Decode(&responseBody)
	assert.Equal(t, nil, err)

	assert.Equal(t, 500, response.Code)
	assert.Equal(t, expectedResponseError, responseBody)

}
