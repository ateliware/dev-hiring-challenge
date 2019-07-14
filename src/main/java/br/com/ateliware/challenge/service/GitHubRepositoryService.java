package br.com.ateliware.challenge.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.ateliware.challenge.domain.GitHubRepository;
import br.com.ateliware.challenge.repository.GitHubRepositoryRepository;

@Service
public class GitHubRepositoryService {

    @Autowired
    private GitHubRepositoryRepository repository;

    public void saveAll(List<GitHubRepository> repositories) {
        repository.saveAll(repositories);
    }

    public List<GitHubRepository> listRepositories() {
        return (List<GitHubRepository>) repository.findAll();
    }

    public Optional<GitHubRepository> findById(Long id) {
        return repository.findById(id);
    }

    public void purgeRepos() {
        repository.deleteAll();
    }

}
