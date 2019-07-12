package br.com.ateliware.challenge.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.ateliware.challenge.domain.GitHubRepository;

@Repository
public interface GitHubRepositoryRepository extends CrudRepository<GitHubRepository, Long> {

}
