package controllers

import (
	"apis/database"
	"apis/models"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/parnurzeal/gorequest"
	"net/http"
)

func CreateRepositories(c *gin.Context) {
	var languages = [5]string{"go", "python", "javascript", "csharp", "c++"}

	for l := 0; l < len(languages); l++ {
		_, body, errs := gorequest.New().Get("https://api.github.com/search/repositories?q=language:" + languages[l] + "&per_page=10").End()
		if errs != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": "error when querying"})
		}

		var resp models.Resp
		var repo models.Repository
		err := json.Unmarshal([]byte(body), &resp)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": "error when querying"})
		}

		for i := 0; i < len(resp.Items); i++ {
			data := resp.Items[i]
			repo.ID = data.ID
			repo.FullName = data.FullName
			repo.Description = data.Description
			repo.Name = data.Name
			repo.OwnerLogin = data.Owner.Login
			repo.OwnerUrl = data.Owner.URL
			repo.HtmlUrl = data.HTMLURL
			repo.Private = data.Private
			repo.Language = data.Language
			database.DB.Create(&repo)
		}
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "message": "OK"})
}

func ListRepoLanguage(c *gin.Context) {
	var repositories []models.Repository
	database.DB.Find(&repositories)
	c.JSON(http.StatusOK, gin.H{"success": true, "data": repositories})
}
