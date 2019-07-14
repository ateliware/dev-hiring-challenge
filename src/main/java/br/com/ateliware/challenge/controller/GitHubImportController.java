package br.com.ateliware.challenge.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import br.com.ateliware.challenge.domain.GitHubRepository;
import br.com.ateliware.challenge.dto.Query;
import br.com.ateliware.challenge.service.GitHubRepositoryService;
import br.com.ateliware.challenge.util.GitHubProcess;

@Controller
public class GitHubImportController {

    private static final String IMPORT_PAGE = "import";

    private static final String STATUS_ATTRIBUTE     = "status";
    private static final String IS_RUNNING_ATTRIBUTE = "isRunning";

    private GitHubProcess gitHubProcess = GitHubProcess.getInstance();

    @Autowired
    private GitHubRepositoryService service;

    @GetMapping("/import")
    public String getImport(Model model) {

        model.addAttribute(IS_RUNNING_ATTRIBUTE, gitHubProcess.isRunning());
        model.addAttribute("query", new Query("freeze"));
        return IMPORT_PAGE;
    }

    @GetMapping("/import/status")
    public String getStatus(Model model) {

        model.addAttribute(IS_RUNNING_ATTRIBUTE, gitHubProcess.isRunning());
        model.addAttribute(STATUS_ATTRIBUTE, gitHubProcess.getStatus());
        model.addAttribute("query", new Query("freeze"));
        return IMPORT_PAGE;
    }

    @PostMapping("/import")
    public ModelAndView start(@ModelAttribute Query query, Model model) {

        new Thread(() -> process(query.getString())).start();

        model.addAttribute(IS_RUNNING_ATTRIBUTE, gitHubProcess.isRunning());

        if (gitHubProcess.isRunning())
            model.addAttribute(STATUS_ATTRIBUTE, Arrays.asList("Import is already running"));
        else
            model.addAttribute(STATUS_ATTRIBUTE, Arrays.asList("Import started"));

        return new ModelAndView(IMPORT_PAGE);

    }

    private void process(String query) {

        gitHubProcess.setQuery(query);

        gitHubProcess.bulkImport();

        List<GitHubRepository> allRepos = gitHubProcess.getAllRepos();

        service.saveAll(allRepos);
    }

}
