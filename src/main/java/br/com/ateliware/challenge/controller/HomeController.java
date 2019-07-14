package br.com.ateliware.challenge.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

import br.com.ateliware.challenge.domain.GitHubRepository;
import br.com.ateliware.challenge.service.GitHubRepositoryService;
import lombok.extern.java.Log;

@Controller
@Log
public class HomeController {

    private static final String VIEW_PAGE = "view";
    private static final String HOME_PAGE = "home";

    @Autowired
    private GitHubRepositoryService service;

    @GetMapping("/")
    public String home(Model model) {

        log.info("Home");
        List<GitHubRepository> repos = service.listRepositories();
        model.addAttribute("repos", repos);
        model.addAttribute("size", repos.size());

        return HOME_PAGE;
    }

    @GetMapping("/repository/{id}")
    public ModelAndView view(@PathVariable("id") Long id) {

        Optional<GitHubRepository> repository = service.findById(id);

        if (repository.isPresent())
            return new ModelAndView(VIEW_PAGE, "repository", repository.get());

        return new ModelAndView(VIEW_PAGE);
    }

}
