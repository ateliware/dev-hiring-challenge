package repositories

import (
	"desafio_ateliware/backend/database"
	"desafio_ateliware/backend/models"
)

type RepositoryGitHub struct{}

func (RepositoryGitHub) SalvarRepositorios(repositorios []models.Repositorio) error {
	db := database.SetupDB()
	defer db.Close()

	db = db.Begin()

	for i := range repositorios {

		err := db.
			Table("repositorio").
			Create(&repositorios[i]).
			Error
		if err != nil {
			db.Rollback()
			return err
		}

	}

	if err := db.Commit().Error; err != nil {
		return err
	}

	return nil
}

func (RepositoryGitHub) ExcluirRepositorios(linguagem string) error {
	db := database.SetupDB()
	defer db.Close()

	err := db.
		Table("repositorio").
		Where("lower(linguagem) = lower(?)", linguagem).
		Delete(nil).
		Error

	return err
}

func (RepositoryGitHub) BuscarRepositorios(linguagem string) ([]models.Repositorio, error) {
	db := database.SetupDB()
	defer db.Close()

	var repositorios []models.Repositorio
	err := db.
		Table("repositorio").
		Where("lower(linguagem) = lower(?)", linguagem).
		Order("estrelas DESC").
		Find(&repositorios).
		Error

	return repositorios, err
}
