package com.github.integration.backend.adapter;

import com.github.integration.backend.common.EnumLanguages;
import com.github.integration.backend.common.entities.SearchResultDTO;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Component
public class GitHubAPIAdapter {

    @Getter(AccessLevel.PACKAGE)
    private final RestTemplate restTemplate;

    @Value("${adapter.service.url}")
    private String serviceURL;

    public GitHubAPIAdapter(@Lazy RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public SearchResultDTO listTop10ByLanguageAndSortByStars(EnumLanguages language) {
        log.info("[Adapter] Performing GET " + serviceURL + "/search/repositories?q=language:" + language.getName()
                + "&sort=stars&per_page=10");
        return restTemplate.getForObject(serviceURL + "/search/repositories?q=language:" + language.getName()
                + "&sort=stars&per_page=10", SearchResultDTO.class);
    }

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }
}
