package com.github.integration.backend.rest.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class Owner {

    private String login;

    private Long id;

    private String nodeId;

    private String avatarUrl;

    private String gravatarId;

    private String url;

    private String htmlUrl;

    private String followersUrl;

    private String followingUrl;

    private String gistsUrl;

    private String starredUrl;

    private String subscriptionsUrl;

    private String organizationsUrl;

    private String reposUrl;

    private String eventsUrl;

    private String receivedEventsUrl;

    private String type;

    private Boolean siteAdmin;

}