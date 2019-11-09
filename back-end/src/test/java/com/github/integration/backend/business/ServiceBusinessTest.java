package com.github.integration.backend.business;

import com.github.integration.backend.adapter.GitHubAPIAdapter;
import com.github.integration.backend.common.EnumLanguages;
import com.github.integration.backend.common.ServiceException;
import com.github.integration.backend.common.entities.LicenseDTO;
import com.github.integration.backend.common.entities.OwnerDTO;
import com.github.integration.backend.common.entities.RepositoryDTO;
import com.github.integration.backend.common.entities.SearchResultDTO;
import com.github.integration.backend.persistence.ResponseRepository;
import com.github.integration.backend.rest.entities.ListRestRequest;
import com.github.integration.backend.rest.entities.ListRestResponse;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
public class ServiceBusinessTest {

    @InjectMocks
    private ServiceBusiness business;

    @Mock
    private GitHubAPIAdapter adapter;

    @Mock
    private ResponseRepository repository;

    private ListRestRequest request;

    private SearchResultDTO adapterResponse;

    private ListRestResponse restResponse;

    private TestSpec testSpec;

    @Before
    public void setupTestSpec() {
        testSpec = new TestSpec();
    }

    @Test
    public void test_listTop10ByLanguageAndSortByStars_shall_return_valid_response_and_persist_when_valid_adapter_response() throws ServiceException {
        testSpec.givenAValidRestRequest()
                .givenAValidAdapterResponse()
                .givenAdapterReturnValidResponse()
                .whenBusinessListTop10ByLanguageAndSortByStars()
                .thenRepositorySavesResponse()
                .thenAValidRestResponseIsReturned();
    }

    @Test(expected = ServiceException.class)
    public void test_listTop10ByLanguageAndSortByStars_shall_not_persist_and_throw_exception_when_invalid_response_() throws ServiceException {
        testSpec.givenAValidRestRequest()
                .givenAdapterReturnInvalidResponse()
                .whenBusinessListTop10ByLanguageAndSortByStars()
                .thenRepositoryDoesntSaveResponse();
    }

    private static ListRestRequest createAListRestRequest() {
        return ListRestRequest.builder().language(EnumLanguages.PHP.getName()).build();
    }

    private static SearchResultDTO createASearchResultDTO() {
        return SearchResultDTO.builder()
                .totalCount(3)
                .incompleteResults(true)
                .items(Arrays.asList(createARepositoryDTO(1L), createARepositoryDTO(2L), createARepositoryDTO(3L)))
                .build();
    }

    private static RepositoryDTO createARepositoryDTO(long id) {
        return RepositoryDTO.builder()
                .id(id)
                .nodeId("nodeId")
                .name("name")
                .fullName("fullName")
                .privateRepository(true)
                .owner(createAOwnerDTO(id))
                .htmlUrl("htmlUrl")
                .description("description")
                .fork(true)
                .url("url")
                .forksUrl("forksUrl")
                .keysUrl("keysUrl")
                .collaboratorsUrl("collaboratorsUrl")
                .teamsUrl("teamsUrl")
                .hooksUrl("hooksUrl")
                .issueEventsUrl("issueEventsUrl")
                .eventsUrl("eventsUrl")
                .assigneesUrl("assigneesUrl")
                .branchesUrl("branchesUrl")
                .tagsUrl("tagsUrl")
                .blobsUrl("blobsUrl")
                .gitTagsUrl("gitTagsUrl")
                .gitRefsUrl("gitRefsUrl")
                .treesUrl("treesUrl")
                .statusesUrl("statusesUrl")
                .languagesUrl("languagesUrl")
                .stargazersUrl("stargazersUrl")
                .contributorsUrl("contributorsUrl")
                .subscribersUrl("subscribersUrl")
                .subscriptionUrl("subscriptionUrl")
                .commitsUrl("commitsUrl")
                .gitCommitsUrl("gitCommitsUrl")
                .commentsUrl("commentsUrl")
                .issueCommentUrl("issueCommentUrl")
                .contentsUrl("contentsUrl")
                .compareUrl("compareUrl")
                .mergesUrl("mergesUrl")
                .archiveUrl("archiveUrl")
                .downloadsUrl("downloadsUrl")
                .issuesUrl("issuesUrl")
                .pullsUrl("pullsUrl")
                .milestonesUrl("milestonesUrl")
                .notificationsUrl("notificationsUrl")
                .labelsUrl("labelsUrl")
                .releasesUrl("releasesUrl")
                .deploymentsUrl("deploymentsUrl")
                .createdAt(new Date(System.currentTimeMillis()))
                .updatedAt(new Date(System.currentTimeMillis()))
                .pushedAt(new Date(System.currentTimeMillis()))
                .gitUrl("gitUrl")
                .sshUrl("sshUrl")
                .cloneUrl("cloneUrl")
                .svnUrl("svnUrl")
                .homepage("homepage")
                .size(2L)
                .stargazersCount(3)
                .watchersCount(4)
                .language("language")
                .hasIssues(true)
                .hasProjects(true)
                .hasDownloads(true)
                .hasWiki(true)
                .hasPages(true)
                .forksCount(5)
                .mirrorUrl("mirrorUrl")
                .archived(true)
                .disabled(true)
                .openIssuesCount(6)
                .license(createALicenseDTO(String.valueOf(id)))
                .forks(7)
                .openIssues(8)
                .watchers(9)
                .defaultBranch("defaultBranch")
                .score(10.1)
                .build();
    }

    private static LicenseDTO createALicenseDTO(String id) {
        return LicenseDTO.builder()
                .key("key")
                .name("name")
                .nodeId(id)
                .spdxId("spdxId")
                .url("url")
                .build();
    }

    private static OwnerDTO createAOwnerDTO(long id) {
        return OwnerDTO.builder()
                .login("login")
                .id(id)
                .nodeId("nodeId")
                .avatarUrl("avatarUrl")
                .gravatarId("gravatarId")
                .url("url")
                .htmlUrl("htmlUrl")
                .followersUrl("followersUrl")
                .followingUrl("followingUrl")
                .gistsUrl("gistsUrl")
                .starredUrl("starredUrl")
                .subscriptionsUrl("subscriptionsUrl")
                .organizationsUrl("organizationsUrl")
                .reposUrl("reposUrl")
                .eventsUrl("eventsUrl")
                .receivedEventsUrl("receivedEventsUrl")
                .type("type")
                .siteAdmin(true)
                .build();
    }

    private class TestSpec {

        TestSpec givenAValidRestRequest() {
            request = createAListRestRequest();
            return this;
        }

        TestSpec givenAValidAdapterResponse() {
            adapterResponse = createASearchResultDTO();
            return this;
        }

        TestSpec givenAdapterReturnValidResponse() {
            when(adapter.listTop10ByLanguageAndSortByStars(any(EnumLanguages.class))).thenReturn(adapterResponse);
            return this;
        }

        TestSpec givenAdapterReturnInvalidResponse() {
            when(adapter.listTop10ByLanguageAndSortByStars(any(EnumLanguages.class))).thenReturn(null);
            return this;
        }

        TestSpec whenBusinessListTop10ByLanguageAndSortByStars() throws ServiceException {
            restResponse = business.listTop10ByLanguageAndSortByStars(request);
            return this;
        }

        TestSpec thenRepositorySavesResponse() {
            verify(repository, times(3)).save(any());
            return this;
        }

        TestSpec thenRepositoryDoesntSaveResponse() {
            verify(repository, times(0)).save(any());
            return this;
        }

        TestSpec thenAValidRestResponseIsReturned() {
            assertThat(restResponse.toString()
                    .replaceAll("ListRestResponse", "SearchResult"))
                    .isEqualTo(adapterResponse.toString()
                            .replaceAll("DTO", ""));
            return this;
        }
    }
}