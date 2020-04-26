package com.grglucastr.githubapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RepoDTO {

    private Integer id;
    private String name;
    private String description;
    private String language;
    private String url;


}
