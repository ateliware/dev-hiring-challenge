package database

import (
	"apis/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Start() {
	dns := "host=localhost user=root password=root dbname=root port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dns))
	if err != nil {
		panic("Error connecting to database")
	}
	db.AutoMigrate(&models.Repository{})
}
