package database

import (
	"apis/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB
var err error

func Start() {
	dns := "host=postgres user=root password=root dbname=root port=5432 sslmode=disable"
	DB, err = gorm.Open(postgres.Open(dns))
	if err != nil {
		panic("Error connecting to database")
	}
	err := DB.AutoMigrate(&models.Repository{})
	if err != nil {
		panic("Error connecting to database ")
	}
}
