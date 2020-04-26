package com.grglucastr.githubapi.service;

import com.grglucastr.githubapi.model.Repo;
import com.grglucastr.githubapi.repository.RepoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RepoService {

    @Autowired
    private RepoRepository repository;

    public List<Repo> listAll() {
        return repository.findAll();
    }

    public Repo save(Repo repo) {
        return repository.save(repo);
    }
}
