package com.github.integration.backend.adapter;

import com.github.integration.backend.common.EnumLanguages;
import com.github.integration.backend.common.entities.SearchResultDTO;
import lombok.NoArgsConstructor;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
public class GitHubAPIAdapterTest {

    @InjectMocks
    private GitHubAPIAdapter adapter;

    @Mock
    private RestTemplate restTemplate;

    private SearchResultDTO expectedResponse;

    private SearchResultDTO searchResultDTO;

    private TestSpec testSpec;

    @Before
    public void setupTetSpec() {
        testSpec = new TestSpec();
    }

    @Test
    public void test_listTop10ByLanguageAndSortByStars_shall_return_valid_response() {
        testSpec.givenAValidRestTemplate()
                .givenAValidResponse()
                .givenRestTemplateReturnsAValidResponse()
                .whenAdapterListTop10ByLanguageAndSortByStars()
                .thenResponseIsValid();
    }

    @NoArgsConstructor
    private class TestSpec {

        TestSpec givenAValidRestTemplate() {
            restTemplate = adapter.getRestTemplate();
            return this;
        }

        TestSpec givenAValidResponse() {
            expectedResponse = SearchResultDTO.builder().totalCount(1).build();
            return this;
        }

        TestSpec givenRestTemplateReturnsAValidResponse() {
            when(restTemplate.getForObject(anyString(), any())).thenReturn(expectedResponse);
            return this;
        }

        TestSpec whenAdapterListTop10ByLanguageAndSortByStars() {
            searchResultDTO = adapter.listTop10ByLanguageAndSortByStars(EnumLanguages.C);
            return this;
        }

        TestSpec thenResponseIsValid() {
            assertThat(searchResultDTO).isEqualTo(expectedResponse);
            return this;
        }
    }
}