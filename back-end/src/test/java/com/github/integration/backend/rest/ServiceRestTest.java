package com.github.integration.backend.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.integration.backend.business.ServiceBusiness;
import com.github.integration.backend.common.ServiceException;
import com.github.integration.backend.rest.entities.ListRestRequest;
import com.github.integration.backend.rest.entities.ListRestResponse;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(ServiceRest.class)
public class ServiceRestTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private ServiceBusiness business;

    private TestSpec testSpec;

    private ListRestResponse response;

    private ListRestRequest request;

    private ResultActions resultActions;

    @Before
    public void setupTestSpec() {
        testSpec = new TestSpec();
    }

    @Test
    public void post_repositories_shall_return_list_of_repositories() throws Exception {
        testSpec.givenAValidRestRequest()
                .givenAValidBusinessResponse()
                .whenRestPost()
                .thenAValidResponseIsReturned();
    }

    @Test
    public void post_repositories_invalid_request_shall_return_error() throws Exception {
        testSpec.givenAnInvalidRestRequest()
                .givenAValidBusinessResponse()
                .whenRestPost()
                .thenAValidErrorResponseIsReturned();
    }

    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private class TestSpec {

        TestSpec givenAValidRestRequest() {
            request = ListRestRequest.builder().language("C").build();
            return this;
        }

        TestSpec givenAnInvalidRestRequest() {
            request = ListRestRequest.builder().language("CHX").build();
            return this;
        }

        TestSpec givenAValidBusinessResponse() throws ServiceException {
            response = new ListRestResponse();
            response.setIncompleteResults(true);

            when(business.listTop10ByLanguageAndSortByStars(ArgumentMatchers.any(ListRestRequest.class))).thenReturn(response);
            return this;
        }

        TestSpec whenRestPost() throws Exception {
            resultActions = mvc.perform(post("/repositories").characterEncoding("utf-8").content(asJsonString(request))
                    .contentType(APPLICATION_JSON));
            return this;
        }

        TestSpec thenAValidResponseIsReturned() throws Exception {
            resultActions.andExpect(status().isOk())
                    .andExpect(jsonPath("$.incompleteResults", is(true)));
            return this;
        }

        TestSpec thenAValidErrorResponseIsReturned() throws Exception {
            resultActions.andExpect(status().is4xxClientError())
                    .andExpect(jsonPath("$.timestamp", is(notNullValue())))
                    .andExpect(jsonPath("$.errors[0]", is("Please provide a valid language value")));
            return this;
        }
    }
}
