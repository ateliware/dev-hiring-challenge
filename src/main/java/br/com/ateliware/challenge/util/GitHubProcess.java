package br.com.ateliware.challenge.util;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.kohsuke.github.GHDirection;
import org.kohsuke.github.GHRepository;
import org.kohsuke.github.GHRepositorySearchBuilder;
import org.kohsuke.github.GHRepositorySearchBuilder.Sort;
import org.kohsuke.github.GitHub;
import org.springframework.stereotype.Component;

import br.com.ateliware.challenge.domain.GitHubRepository;
import br.com.ateliware.challenge.type.Language;
import lombok.extern.java.Log;

@Log
@Component
public class GitHubProcess {

    private static final long      SEARCH_INTERVAL        = 3000l;
    private static final int       SIZE_LIMIT_BY_LANGUAGE = 5;
    private List<String>           status                 = new ArrayList<>();
    private List<GitHubRepository> allRepos               = new ArrayList<>();
    private String                 query;
    private boolean                running;
    private DateTimeFormatter      formatter              = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private GitHubProcess() {
    }

    private static GitHubProcess instance = new GitHubProcess();

    public static GitHubProcess getInstance() {
        return instance;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public void bulkImport() {

        if (running)
            return;

        running = true;

        log("Starting GitHub import...");
        try {
            allRepos = new ArrayList<>();
            status = new ArrayList<>();
            GitHub github = GitHub.connectAnonymously();

            GHRepositorySearchBuilder search = github.searchRepositories();
            for (Language lang : Language.values()) {
                log("Searching: " + query + " for " + lang);
                GHRepositorySearchBuilder repo = search.q(query).language(lang.name()).sort(Sort.STARS)
                        .order(GHDirection.DESC);
                List<GHRepository> repoList = repo.list().asList();
                log("Search size: " + repoList.size());
                List<GHRepository> top5Repo = repoList.stream().limit(SIZE_LIMIT_BY_LANGUAGE)
                        .collect(Collectors.toList());
                log("Top size: " + top5Repo.size());
                for (GHRepository r : top5Repo) {
                    log(r.getFullName() + " " + r.getDescription() + " " + r.getLanguage());
                    allRepos.add(GitHubRepository.builder().language(lang).name(r.getName()).fullName(r.getFullName())
                            .description(r.getDescription()).id(r.getId()).homepage(r.getHtmlUrl().toString())
                            .forksCount(r.getForks()).stargazersCount(r.getStargazersCount())
                            .watchersCount(r.getWatchers()).size(r.getSize()).openIssuesCount(r.getOpenIssueCount())
                            .subscribersCount(r.getSubscribersCount()).pushedAt(r.getPushedAt())
                            .defaultBranch(r.getDefaultBranch()).build());
                }
                Thread.sleep(SEARCH_INTERVAL);
            }
            log("all repos size: " + allRepos.size());
            log("Done");
        } catch (IOException | InterruptedException e) {
            log.info("Error: " + e.getMessage());
        }

        running = false;

    }

    public boolean isRunning() {
        return this.running;
    }

    public List<String> getStatus() {
        return status;
    }

    public List<GitHubRepository> getAllRepos() {
        return allRepos;
    }

    private void log(String msg) {
        LocalDateTime now = LocalDateTime.now();
        String logMessage = "[" + now.format(formatter) + "] - " + msg;
        log.info(logMessage);
        status.add(logMessage);
    }
}
