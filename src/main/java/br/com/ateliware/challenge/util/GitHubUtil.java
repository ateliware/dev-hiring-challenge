package br.com.ateliware.challenge.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.kohsuke.github.GHDirection;
import org.kohsuke.github.GHRepository;
import org.kohsuke.github.GHRepositorySearchBuilder;
import org.kohsuke.github.GHRepositorySearchBuilder.Sort;
import org.kohsuke.github.GitHub;

import br.com.ateliware.challenge.domain.GitHubRepository;
import br.com.ateliware.challenge.type.Language;
import lombok.extern.java.Log;

@Log
public class GitHubUtil {

	public static List<GitHubRepository> bulkImport(String query) throws IOException {

		GitHub github = GitHub.connectAnonymously();
//		GitHub github = GitHub.connect("boaglio",null,"");
		GHRepositorySearchBuilder search = github.searchRepositories();
		List<GitHubRepository> allRepos = new ArrayList<>();
		for (Language lang : Language.values()) {
			log.info("Search: " + query + "@" + lang);
			GHRepositorySearchBuilder repo = search.q(query).language(lang.name()).sort(Sort.STARS)
					.order(GHDirection.DESC);
			List<GHRepository> repoList = repo.list().asList();
			log.info("Search size: " + repoList.size());
			List<GHRepository> top5Repo = repoList.stream().limit(5).collect(Collectors.toList());
			log.info("Top size: " + top5Repo.size());
			for (GHRepository r : top5Repo) {
				log.info(r.getFullName() + " " + r.getDescription() + " " + r.getLanguage());
				allRepos.add(GitHubRepository.builder().language(lang).full_name(r.getFullName())
						.description(r.getDescription()).build());
			}
		}
		log.info("all repos size: " + allRepos.size());
		return allRepos;

	}
}
