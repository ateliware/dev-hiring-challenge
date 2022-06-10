package router

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestMiddlewareNotFound(t *testing.T) {

	router := gin.Default()
	setupNotFoundEndPointMiddleware(router)

	server := httptest.NewServer(router)
	defer server.Close()

	request, err := http.NewRequest("GET", "http://localhost/pagina-inexistente ", nil)
	assert.Equal(t, nil, err)

	response := httptest.NewRecorder()
	router.ServeHTTP(response, request)

	assert.Equal(t, 302, response.Code)
	assert.Equal(t, "/404.html", response.Header().Get("Location"))

}

func TestPanicRecovery(t *testing.T) {

	router := gin.Default()
	setupPanicRecoveryMiddleware(router)

	server := httptest.NewServer(router)
	defer server.Close()

	router.GET("/panic-recovery", func(c *gin.Context) {
		panic("teste")
	})

	request, err := http.NewRequest("GET", "http://localhost:8080/panic-recovery", nil)
	assert.Equal(t, nil, err)

	response := httptest.NewRecorder()
	router.ServeHTTP(response, request)

	assert.Equal(t, 302, response.Code)
	assert.Equal(t, "/500.html", response.Header().Get("Location"))

}
