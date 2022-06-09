package controllers

import (
	"desafio_ateliware/backend/models"

	"github.com/gin-gonic/gin"
)

func HealthCheck() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(200, models.HealthCheck{Status: "available"})
	}
}
