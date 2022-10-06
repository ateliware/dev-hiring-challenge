package domain

import "desafio_ateliware/backend/models"

type IRepoitoryGitHub interface {
	BuscarRepositorios(linguagem string) ([]models.Repositorio, error)

	SalvarRepositorios([]models.Repositorio) error

	ExcluirRepositorios(linguagem string) error
}
