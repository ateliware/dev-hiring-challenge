package com.github.integration.backend.rest.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@ToString
@Getter
@Setter
public class ListRestResponse {

    private Integer totalCount;

    private Boolean incompleteResults;

    private List<Repository> items;

}