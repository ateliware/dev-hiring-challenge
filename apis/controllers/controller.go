package controllers

import (
	"apis/models"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/parnurzeal/gorequest"
	"net/http"
)

func Test(c *gin.Context) {
	_, body, errs := gorequest.New().Get("https://api.github.com/search/repositories?q=language:go").End()
	if errs != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": "error when querying"})
	}

	var resp models.Repositorie
	err := json.Unmarshal([]byte(body), &resp)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": "error when querying"})
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": resp})
}
