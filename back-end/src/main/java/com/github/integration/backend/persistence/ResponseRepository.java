package com.github.integration.backend.persistence;

import com.github.integration.backend.persistence.entities.Repository;
import org.springframework.data.repository.CrudRepository;

public interface ResponseRepository extends CrudRepository<Repository, Long> {
}
