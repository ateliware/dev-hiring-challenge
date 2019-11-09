package com.github.integration.backend.common.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class LicenseDTO {

    private String key;

    private String name;

    @JsonProperty("spdx_id")
    private String spdxId;

    private String url;

    @JsonProperty("node_id")
    private String nodeId;

}