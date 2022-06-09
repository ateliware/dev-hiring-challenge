package database

import (
	"os"
	"strconv"

	"github.com/eduardo-mior/gorm"
	_ "github.com/lib/pq" // Postgres Drive
)

type Config struct {
	User        *string
	Password    *string
	Database    *string
	Host        *string
	Application *string
}

// SetupDB é o método responsável por abrir a conexão com o banco de dados (usando o GORM V1)
func SetupDB() *gorm.DB {
	user := os.Getenv("DB_USER")
	pass := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	host := os.Getenv("DB_HOST")
	logMode, _ := strconv.ParseBool(os.Getenv("DB_LOG_MODE"))

	settings := "host=" + host + " user=" + user + " password=" + pass + " dbname=" + dbname + " sslmode=disable"

	db, err := gorm.Open("postgres", settings)
	if err != nil {
		panic(err)
	}

	err = db.DB().Ping()
	if err != nil {
		panic(err)
	}

	db.BlockGlobalUpdate(true)
	db.LogMode(logMode)

	return db
}
