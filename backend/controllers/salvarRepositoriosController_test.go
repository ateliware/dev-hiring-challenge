package controllers

import (
	"bytes"
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

func TestSalvarRepositoriosSucesso(t *testing.T) {
	repositorios := []models.Repositorio{{Nome: "Teste", Linguagem: "java", Tamanho: 9000, Estrelas: 100, Forks: 20}}

	data, err := json.Marshal(repositorios)
	assert.Equal(t, nil, err)
	body := bytes.NewReader(data)

	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Request, _ = http.NewRequest("POST", "http://localhost/repositorios?linguagem=java", body)

	expectedResponseRepositorios := models.Success{Message: "Repositórios salvos com sucesso"}

	repositoryGitHub := new(mocks.IRepoitoryGitHub)
	repositoryGitHub.On("ExcluirRepositorios", "java").Return(nil)
	repositoryGitHub.On("SalvarRepositorios", repositorios).Return(nil)
	SalvarRepositorios(repositoryGitHub)(c)

	responseBody := models.Success{}
	err = json.NewDecoder(response.Body).Decode(&responseBody)
	assert.Equal(t, nil, err)

	assert.Equal(t, 200, response.Code)
	assert.Equal(t, expectedResponseRepositorios, responseBody)

}

func TestSalvarRepositoriosErroBodyNaoInformado(t *testing.T) {

	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Request, _ = http.NewRequest("POST", "http://localhost/repositorios", nil)

	expectedResponseError := models.Error{Error: "Ocorreu um erro interno ao tentar salvar os repositórios da linguagem"}

	SalvarRepositorios(nil)(c)

	responseBody := models.Error{}
	err := json.NewDecoder(response.Body).Decode(&responseBody)
	assert.Equal(t, nil, err)

	assert.Equal(t, 500, response.Code)
	assert.Equal(t, expectedResponseError, responseBody)

}

func TestSalvarRepositoriosErroNenhumRepositorioInformado(t *testing.T) {

	data, err := json.Marshal([]models.Repositorio{})
	assert.Equal(t, nil, err)
	body := bytes.NewReader(data)

	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Request, _ = http.NewRequest("POST", "http://localhost/repositorios", body)

	expectedResponseError := models.Error{Error: "Nenhum repositório para ser salvo"}

	SalvarRepositorios(nil)(c)

	responseBody := models.Error{}
	err = json.NewDecoder(response.Body).Decode(&responseBody)
	assert.Equal(t, nil, err)

	assert.Equal(t, 400, response.Code)
	assert.Equal(t, expectedResponseError, responseBody)

}

func TestSalvarRepositoriosErroInesperado(t *testing.T) {
	repositorios := []models.Repositorio{{Nome: "Teste", Linguagem: "java", Tamanho: 9000, Estrelas: 100, Forks: 20}}

	data, err := json.Marshal(repositorios)
	assert.Equal(t, nil, err)
	body := bytes.NewReader(data)

	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Request, _ = http.NewRequest("POST", "http://localhost/repositorios", body)

	errMsg := "Ocorreu um erro interno ao tentar salvar os repositórios da linguagem"
	err = errors.New(errMsg)
	expectedResponseError := models.Error{Error: errMsg}

	repositoryGitHub := new(mocks.IRepoitoryGitHub)
	repositoryGitHub.On("ExcluirRepositorios", "java").Return(nil)
	repositoryGitHub.On("SalvarRepositorios", repositorios).Return(err)
	SalvarRepositorios(repositoryGitHub)(c)

	responseBody := models.Error{}
	err = json.NewDecoder(response.Body).Decode(&responseBody)
	assert.Equal(t, nil, err)

	assert.Equal(t, 500, response.Code)
	assert.Equal(t, expectedResponseError, responseBody)
}
