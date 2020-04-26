package com.grglucastr.githubapi.service;


import com.grglucastr.githubapi.model.Repo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RepoServiceTests {

    @Mock
    private RepoService repoService;

    @BeforeEach
    public void setUp(){
        MockitoAnnotations.initMocks(this);
    }


    @Test
    public void testListAllRepos(){
        List<Repo> repos = Arrays.asList(new Repo(), new Repo(), new Repo(), new Repo());

        when(repoService.listAll()).thenReturn(repos);

        int reposFoundQty = 4;
        assertEquals(reposFoundQty, repoService.listAll().size());
    }

    @Test
    public void testSaveFavoriteRepos(){
        Repo repo = new Repo();
        repo.setId(1);

        Repo obj = new Repo();
        when(repoService.save(obj)).thenReturn(repo);

        Repo brandNewRepo = repoService.save(obj);

        int expectedId = 1;
        assertEquals(expectedId, brandNewRepo.getId());
    }
}
