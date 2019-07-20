CREATE TABLE IF NOT EXISTS repos
(
    id                BIGINT       NOT NULL PRIMARY KEY,
    name              VARCHAR(255) NOT NULL,
    full_name         VARCHAR(255) NOT NULL,
    description       TEXT         NOT NULL,
    language          VARCHAR(255) NOT NULL,
    default_branch    VARCHAR(255) NOT NULL,
    private           BOOLEAN      NOT NULL,
    size              BIGINT       NOT NULL,
    html_url          VARCHAR(255) NOT NULL,
    stargazers_count  INT          NOT NULL,
    watchers_count    INT          NOT NULL,
    forks_count       INT          NOT NULL,
    open_issues_count INT          NOT NULL,
    created_at        VARCHAR(255) NOT NULL,
    updated_at        VARCHAR(255) NOT NULL
);
