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

func TestBuscarRepositoriosSucesso(t *testing.T) {

	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Request, _ = http.NewRequest("GET", "http://localhost/repositorios?linguagem=java", nil)

	expectedResponseRepositorios := []models.Repositorio{{Nome: "Teste", Linguagem: "java", Tamanho: 9000, Estrelas: 100, Forks: 20}}

	repositoryGitHub := new(mocks.IRepoitoryGitHub)
	repositoryGitHub.On("BuscarRepositorios", "java").Return(expectedResponseRepositorios, nil)
	BuscarRepositorios(repositoryGitHub)(c)

	responseBody := []models.Repositorio{}
	err := json.NewDecoder(response.Body).Decode(&responseBody)
	assert.Equal(t, nil, err)

	assert.Equal(t, 200, response.Code)
	assert.Equal(t, expectedResponseRepositorios, responseBody)

}

func TestBuscarRepositoriosErroLinguagemNaoInformada(t *testing.T) {

	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Request, _ = http.NewRequest("GET", "http://localhost/repositorios?yyy=xxx", nil)

	expectedResponseError := models.Error{Error: "Você deve informar a linguagem de programação de que você quer buscar os repositórios"}

	BuscarRepositorios(nil)(c)

	responseBody := models.Error{}
	err := json.NewDecoder(response.Body).Decode(&responseBody)
	assert.Equal(t, nil, err)

	assert.Equal(t, 400, response.Code)
	assert.Equal(t, expectedResponseError, responseBody)

}

func TestBuscarRepositoriosErroInesperado(t *testing.T) {

	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Request, _ = http.NewRequest("GET", "http://localhost/repositorios?linguagem=java", nil)

	errMsg := "Ocorreu um erro interno ao tentar buscar os repositórios da linguagem"
	err := errors.New(errMsg)
	expectedResponseError := models.Error{Error: errMsg}

	repositoryGitHub := new(mocks.IRepoitoryGitHub)
	repositoryGitHub.On("BuscarRepositorios", "java").Return(nil, err)
	BuscarRepositorios(repositoryGitHub)(c)

	responseBody := models.Error{}
	err = json.NewDecoder(response.Body).Decode(&responseBody)
	assert.Equal(t, nil, err)

	assert.Equal(t, 500, response.Code)
	assert.Equal(t, expectedResponseError, responseBody)

}
