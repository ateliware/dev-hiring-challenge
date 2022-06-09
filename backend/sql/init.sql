CREATE TABLE repositorio (
    id serial NOT NULL PRIMARY KEY,
    linguagem text NOT NULL,
    nome text NOT NULL,
    descricao text,
    data_criacao timestamp NOT NULL,
    data_ultima_atualizacao timestamp NOT NULL,
    tamanho integer NOT NULL,
    estrelas integer NOT NULL,
    forks integer NOT NULL,
    issues_abertas integer NOT NULL,
    owner_nome text NOT NULL,
    owner_tipo text NOT NULL,
    owner_url text NOT NULL
)