package main

import (
	"github.com/stretchr/testify/assert"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	"apis/controllers"
	"github.com/gin-gonic/gin"
)

func CreateTestsRouters() *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	rotas := gin.Default()
	return rotas
}

func TestCreateRepositories(t *testing.T) {
	r := CreateTestsRouters()
	r.POST("/repositories", controllers.CreateRepositories)
	req, _ := http.NewRequest("POST", "/repositories", nil)
	response := httptest.NewRecorder()
	r.ServeHTTP(response, req)
	assert.Equal(t, http.StatusAccepted, response.Code)
	mockResponse := `{"message": "OK","success": true}`
	responseBody, _ := ioutil.ReadAll(response.Body)
	assert.Equal(t, mockResponse, string(responseBody))
}

func TestGetRepositories(t *testing.T) {
	r := CreateTestsRouters()
	r.GET("/repositories", controllers.CreateRepositories)
	req, _ := http.NewRequest("GET", "/repositories", nil)
	response := httptest.NewRecorder()
	r.ServeHTTP(response, req)
	assert.Equal(t, http.StatusAccepted, response.Code)
}
