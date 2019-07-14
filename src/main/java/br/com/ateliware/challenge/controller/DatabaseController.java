package br.com.ateliware.challenge.controller;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import br.com.ateliware.challenge.service.GitHubRepositoryService;
import lombok.extern.java.Log;

@Controller
@Log
public class DatabaseController {

    private static final String DATABASE_PAGE    = "database";
    private static final String STATUS_ATTRIBUTE = "status";

    @Autowired
    private GitHubRepositoryService service;

    @GetMapping("/purge")
    public String purge(Model model) {

        log.info("Database");
        service.purgeRepos();
        model.addAttribute(STATUS_ATTRIBUTE, Arrays.asList("Database purged"));

        return DATABASE_PAGE;
    }

}
