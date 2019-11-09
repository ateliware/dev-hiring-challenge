package com.github.integration.backend.rest.entities;

import com.github.integration.backend.business.validator.ValidLanguage;
import lombok.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class ListRestRequest {

    @ValidLanguage(message = "Please provide a valid language value")
    private String language;

}