package models

import "time"

type Repositorio struct {
	Nome                  string    `json:"nome"                    example:"LeetCodeAnimation"`
	Linguagem             string    `json:"linguagem"               example:"Java"`
	Descricao             string    `json:"descricao"               example:"Demonstrate all the questions on LeetCode in the form of animation."`
	DataCriacao           time.Time `json:"data_criacao"            example:"2018-12-06T08:01:22Z"`
	DataUltimaAtualizacao time.Time `json:"data_ultima_atualizacao" example:"2022-06-07T19:52:01Z"`
	Tamanho               int       `json:"tamanho"                 example:"509807"`
	Estrelas              int       `json:"estrelas"                example:"70436"`
	Forks                 int       `json:"forks"                   example:"13535"`
	IssuesAbertas         int       `json:"issues_abertas"          example:"13"`
	OwnerNome             string    `json:"owner_nome"              example:"MisterBooo"`
	OwnerTipo             string    `json:"owner_tipo"              example:"User"`
	OwnerURL              string    `json:"owner_url"               example:"https://github.com/MisterBooo"`
} // @name Repositorio
