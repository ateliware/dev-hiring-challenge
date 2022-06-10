package router

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

var router *gin.Engine

// Init router on init tests
func init() {
	router = gin.Default()

	// Used by panic-recovery test
	router.GET("/panic-recovery", func(c *gin.Context) {
		panic("teste")
	})

	go SetupFrontEndRoutes(router, "8085")
	time.Sleep(time.Second * 2)
}

func TestMiddlewareNotFound(t *testing.T) {

	request, err := http.NewRequest("GET", "http://localhost:8085/pagina-inexistente ", nil)
	assert.Equal(t, nil, err)

	response := httptest.NewRecorder()
	router.ServeHTTP(response, request)

	assert.Equal(t, 302, response.Code)
	assert.Equal(t, "/404.html", response.Header().Get("Location"))

}
