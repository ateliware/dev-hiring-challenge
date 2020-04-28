package com.grglucastr.githubapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RepoDTO {

    private Integer id;
    private String name;
    private String description;
    private String language;

    @JsonProperty("html_url")
    private String url;


}
