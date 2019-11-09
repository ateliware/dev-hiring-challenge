package com.github.integration.backend.persistence.entities;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class License {

    private String key;

    private String name;

    private String spdxId;

    private String url;

    @Id
    private String nodeId;

}