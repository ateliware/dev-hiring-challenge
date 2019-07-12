package br.com.ateliware.challenge;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.kohsuke.github.GHRepository;
import org.kohsuke.github.GHRepositorySearchBuilder;
import org.kohsuke.github.GHRepositorySearchBuilder.Sort;
import org.kohsuke.github.GitHub;

public class GithubUtil {

    public static void main(String[] args) throws IOException {

        String query = "oracle";
        GitHub github = GitHub.connectAnonymously();
        GHRepositorySearchBuilder search = github.searchRepositories();

        for (Language lang : Language.values()) {
            System.out.println("Search: " + query + "@" + lang);
            GHRepositorySearchBuilder repo = search.q(query).language(lang.name()).sort(Sort.STARS);
            List<GHRepository> repoList = repo.list().asList();
            System.out.println("Search size: " + repoList.size());
            List<GHRepository> top5Repo = repo.list().asList().stream().limit(5).collect(Collectors.toList());
            System.out.println("Top size: " + top5Repo.size());
            for (GHRepository r : top5Repo) {
                System.out.println(r.getFullName() + " " + r.getDescription() + " " + r.getLanguage());
            }
        }

    }
}
