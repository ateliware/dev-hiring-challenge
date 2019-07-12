package br.com.ateliware.challenge.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import br.com.ateliware.challenge.domain.GitHubRepository;
import br.com.ateliware.challenge.service.GitHubRepositoryService;
import br.com.ateliware.challenge.util.GitHubUtil;
import lombok.extern.java.Log;

@Controller
@Log
public class HomeController {

	@Autowired
	private GitHubRepositoryService service;

	@GetMapping("/")
	public String home(Model model) {

		log.info("Home");
		List<GitHubRepository> allStoredRepos = null;
		try {
			List<GitHubRepository> allRepos = GitHubUtil.bulkImport("freeze");
			service.saveAll(allRepos);
			allStoredRepos = service.listRepositories();
			model.addAttribute("repos", allStoredRepos);
		} catch (IOException e) {
			log.info("Error!");
		}

		return "home";
	}
}
