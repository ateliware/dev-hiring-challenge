package com.github.integration.backend.rest;

import com.github.integration.backend.business.ServiceBusiness;
import com.github.integration.backend.rest.entities.ListRestRequest;
import com.github.integration.backend.rest.entities.ListRestResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
public class ServiceRest {

    private final ServiceBusiness business;

    public ServiceRest(ServiceBusiness business) {
        this.business = business;
    }

    @PostMapping(value = "/repositories", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ListRestResponse list(@Valid @RequestBody ListRestRequest listRestRequest) throws Exception {
        log.info("[Rest] /repositories: " + listRestRequest.toString());
        return business.listTop10ByLanguageAndSortByStars(listRestRequest);
    }

}
