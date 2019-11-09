package com.github.integration.backend.persistence;

import com.github.integration.backend.persistence.entities.License;
import com.github.integration.backend.persistence.entities.Owner;
import com.github.integration.backend.persistence.entities.Repository;
import lombok.NoArgsConstructor;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class ResponseRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ResponseRepository responseRepository;

    private Repository repository1;

    private Repository repository2;

    private Repository repositoryFound;

    private Iterable<Repository> repositoriesFound;

    private TestSpec testSpec;

    @Before
    public void setupTestSpec() {
        testSpec = new TestSpec();
    }

    @Test
    public void test_findById_shall_return_expected_repository() {
        testSpec.givenAValidRepository()
                .givenAPersistedEntry()
                .whenRepositoryFindById()
                .thenARepositoryIsFound();
    }

    @Test
    public void test_findAll_shall_return_expected_list_of_repositories() {
        testSpec.givenValidRepositories()
                .givenPersistedEntries()
                .whenRepositoryFindAll()
                .thenAllRepositoriesAreListed();
    }

    @Test
    public void test_save_shall_save_repository() {
        testSpec.givenAValidRepository()
                .whenRepositorySave()
                .thenARepositoryIsSaved();
    }

    private static Repository createARepository(long id) {
        return Repository.builder()
                .id(id)
                .nodeId("nodeId")
                .name("name")
                .fullName("fullName")
                .privateRepository(true)
                .owner(createAOwner(id))
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
                .license(createALicense(String.valueOf(id)))
                .forks(7)
                .openIssues(8)
                .watchers(9)
                .defaultBranch("defaultBranch")
                .score(10.1)
                .build();
    }

    private static License createALicense(String id) {
        return License.builder()
                .key("key")
                .name("name")
                .nodeId(id)
                .spdxId("spdxId")
                .url("url")
                .build();
    }

    private static Owner createAOwner(long id) {
        return Owner.builder()
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

    @NoArgsConstructor
    class TestSpec {

        TestSpec givenAValidRepository() {
            repository1 = createARepository(1L);
            return this;
        }

        TestSpec givenValidRepositories() {
            repository1 = createARepository(1L);
            repository2 = createARepository(2L);
            return this;
        }

        TestSpec givenAPersistedEntry() {
            entityManager.persist(repository1);
            return this;
        }

        TestSpec givenPersistedEntries() {
            entityManager.persist(repository1);
            entityManager.persist(repository2);
            return this;
        }

        TestSpec whenRepositoryFindById() {
            repositoryFound = responseRepository.findById(1L).orElse(null);
            return this;
        }

        TestSpec whenRepositoryFindAll() {
            repositoriesFound = responseRepository.findAll();
            return this;
        }

        TestSpec whenRepositorySave() {
            responseRepository.save(repository1);
            return this;
        }

        TestSpec thenARepositoryIsFound() {
            assertThat(repositoryFound.toString()).isEqualTo(repository1.toString());
            return this;
        }

        TestSpec thenAllRepositoriesAreListed() {
            assertThat(repositoriesFound).size().isEqualTo(2);
            return this;
        }

        TestSpec thenARepositoryIsSaved() {
            Repository repositoryFound = responseRepository.findById(1L).orElse(null);

            assertThat(repositoryFound).isNotNull();

            assertThat(repositoryFound.getId()).isEqualTo(repository1.getId());

            return this;
        }

    }
}