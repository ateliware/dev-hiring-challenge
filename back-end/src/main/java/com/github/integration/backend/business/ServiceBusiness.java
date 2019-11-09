package com.github.integration.backend.business;

import com.github.integration.backend.adapter.GitHubAPIAdapter;
import com.github.integration.backend.common.DTOMapper;
import com.github.integration.backend.common.EnumLanguages;
import com.github.integration.backend.common.ServiceException;
import com.github.integration.backend.common.entities.SearchResultDTO;
import com.github.integration.backend.persistence.ResponseRepository;
import com.github.integration.backend.persistence.entities.Repository;
import com.github.integration.backend.rest.entities.ListRestRequest;
import com.github.integration.backend.rest.entities.ListRestResponse;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Slf4j
@Component
public class ServiceBusiness {

    private static final DTOMapper MAPPER_INSTANCE = Mappers.getMapper(DTOMapper.class);

    private final GitHubAPIAdapter adapter;

    private final ResponseRepository responseRepository;

    @Autowired
    public ServiceBusiness(GitHubAPIAdapter adapter, ResponseRepository responseRepository) {
        this.adapter = adapter;
        this.responseRepository = responseRepository;
    }

    public ListRestResponse listTop10ByLanguageAndSortByStars(ListRestRequest listRestRequest) throws ServiceException {
        SearchResultDTO searchResultDTO = adapter.listTop10ByLanguageAndSortByStars(Objects.requireNonNull(EnumLanguages.getByString(listRestRequest.getLanguage())));

        if (searchResultDTO != null) {
            ListRestResponse listRestResponse = MAPPER_INSTANCE.searchResultToListRestResponse(searchResultDTO);

            listRestResponse.getItems().forEach(
                    item -> {
                        Repository repository = MAPPER_INSTANCE.restRepositoryToRepository(item);
                        log.info("[Business] Persisting rest response: " + repository.toString());
                        responseRepository.save(repository);
                    }
            );

            return listRestResponse;
        } else {
            log.warn("[Business] Service failed, could not get a response from github api!");
            throw new ServiceException("Service failed!");
        }
    }
}