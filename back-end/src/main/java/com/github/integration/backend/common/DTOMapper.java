package com.github.integration.backend.common;

import com.github.integration.backend.common.entities.SearchResultDTO;
import com.github.integration.backend.persistence.entities.Repository;
import com.github.integration.backend.rest.entities.ListRestResponse;
import org.mapstruct.Mapper;

@Mapper
public interface DTOMapper {

    ListRestResponse searchResultToListRestResponse(SearchResultDTO searchResult);

    Repository restRepositoryToRepository(com.github.integration.backend.rest.entities.Repository repository);

}