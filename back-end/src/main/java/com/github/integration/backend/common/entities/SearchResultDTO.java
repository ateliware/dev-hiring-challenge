package com.github.integration.backend.common.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class SearchResultDTO {

    @JsonProperty("total_count")
    private Integer totalCount;

    @JsonProperty("incomplete_results")
    private Boolean incompleteResults;

    private List<RepositoryDTO> items;

}