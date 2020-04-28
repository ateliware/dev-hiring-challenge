package com.grglucastr.githubapi.controller;

import com.grglucastr.githubapi.dto.RepoDTO;
import com.grglucastr.githubapi.model.Repo;
import com.grglucastr.githubapi.service.RepoService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/")
public class RepoController {

    private RepoService repoService;
    private ModelMapper mapper;

    @Autowired
    public RepoController(RepoService repoService, ModelMapper mapper) {
        this.repoService = repoService;
        this.mapper = mapper;
    }

    @GetMapping(value = "/repos")
    public ResponseEntity<List<Repo>> listAll(){
        List<Repo> repos = repoService.listAll();
        return ResponseEntity.ok(repos);
    }

    @PostMapping(value="/repos", consumes = {"application/json"})
    public ResponseEntity<Repo> postRepo(@Valid @RequestBody RepoDTO dto){
        Repo repo = repoService.save(mapper.map(dto, Repo.class));
        return ResponseEntity.status(HttpStatus.CREATED).body(repo);
    }

    @DeleteMapping(value = "/repos")
    public ResponseEntity deleteRepos(){
        repoService.deleteAll();
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
