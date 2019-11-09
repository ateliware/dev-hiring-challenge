package com.github.integration.backend.rest.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class License {

    private String key;

    private String name;

    private String spdxId;

    private String url;

    private String nodeId;

}