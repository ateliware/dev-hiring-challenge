package controllers

import (
	"desafio_ateliware/backend/models"

	"github.com/gin-gonic/gin"
)

// @Tags HealthCheck
// @Summary Testar a conectividade da API
// @Description Testa a conectividade da API.
// @Produce json
// @Success 200 {object} models.HealthCheck
// @Router /health-check [get]
func HealthCheck() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(200, models.HealthCheck{Status: "available"})
	}
}
