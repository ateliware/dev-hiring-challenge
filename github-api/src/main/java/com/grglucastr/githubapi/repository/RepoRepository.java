package com.grglucastr.githubapi.repository;

import com.grglucastr.githubapi.model.Repo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepoRepository  extends JpaRepository<Repo, Integer> {
}
