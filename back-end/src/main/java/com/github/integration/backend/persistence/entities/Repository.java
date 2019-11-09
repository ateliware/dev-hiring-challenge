package com.github.integration.backend.persistence.entities;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Getter
@Setter
@Entity
public class Repository {

    @Id
    private Long id;

    private String nodeId;

    private String name;

    private String fullName;

    private Boolean privateRepository;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Owner owner;

    private String htmlUrl;

    @Column(columnDefinition="text")
    private String description;

    private Boolean fork;

    private String url;

    private String forksUrl;

    private String keysUrl;

    private String collaboratorsUrl;

    private String teamsUrl;

    private String hooksUrl;

    private String issueEventsUrl;

    private String eventsUrl;

    private String assigneesUrl;

    private String branchesUrl;

    private String tagsUrl;

    private String blobsUrl;

    private String gitTagsUrl;

    private String gitRefsUrl;

    private String treesUrl;

    private String statusesUrl;

    private String languagesUrl;

    private String stargazersUrl;

    private String contributorsUrl;

    private String subscribersUrl;

    private String subscriptionUrl;

    private String commitsUrl;

    private String gitCommitsUrl;

    private String commentsUrl;

    private String issueCommentUrl;

    private String contentsUrl;

    private String compareUrl;

    private String mergesUrl;

    private String archiveUrl;

    private String downloadsUrl;

    private String issuesUrl;

    private String pullsUrl;

    private String milestonesUrl;

    private String notificationsUrl;

    private String labelsUrl;

    private String releasesUrl;

    private String deploymentsUrl;

    private Date createdAt;

    private Date updatedAt;

    private Date pushedAt;

    private String gitUrl;

    private String sshUrl;

    private String cloneUrl;

    private String svnUrl;

    private String homepage;

    private Long size;

    private Integer stargazersCount;

    private Integer watchersCount;

    private String language;

    private Boolean hasIssues;

    private Boolean hasProjects;

    private Boolean hasDownloads;

    private Boolean hasWiki;

    private Boolean hasPages;

    private Integer forksCount;

    private String mirrorUrl;

    private Boolean archived;

    private Boolean disabled;

    private Integer openIssuesCount;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private License license;

    private Integer forks;

    private Integer openIssues;

    private Integer watchers;

    private String defaultBranch;

    private Double score;

}