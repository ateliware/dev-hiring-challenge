from typing import List, Optional

from pydantic import BaseModel


class ListRepositoriesRequest(BaseModel):
    language: str


class OwnerRepositories(BaseModel):
    login: str
    id: int
    node_id: str
    avatar_url: str
    gravatar_id: str
    url: str
    received_events_url: str
    type: str
    html_url: str
    followers_url: str
    following_url: str
    gists_url: str
    starred_url: str
    subscriptions_url: str
    organizations_url: str
    repos_url: str
    events_url: str
    site_admin: bool


class LicenseRepositories(BaseModel):
    key: str
    name: str
    url: str
    spdx_id: str
    node_id: str
    html_url: str


class ItemRepositories(BaseModel):
    id: int
    node_id: str
    name: str
    full_name: str
    owner: OwnerRepositories
    private: bool
    html_url: str
    description: str
    fork: bool
    url: str
    created_at: str
    updated_at: str
    pushed_at: str
    homepage: str
    size: int
    stargazers_count: int
    watchers_count: int
    language: str
    forks_count: int
    open_issues_count: int
    master_branch: str
    default_branch: str
    score: int
    archive_url: str
    assignees_url: str
    blobs_url: str
    branches_url: str
    collaborators_url: str
    comments_url: str
    commits_url: str
    compare_url: str
    contents_url: str
    contributors_url: str
    deployments_url: str
    downloads_url: str
    events_url: str
    forks_url: str
    git_commits_url: str
    git_refs_url: str
    git_tags_url: str
    git_url: str
    issue_comment_url: str
    issue_events_url: str
    issues_url: str
    keys_url: str
    labels_url: str
    languages_url: str
    merges_url: str
    milestones_url: str
    notifications_url: str
    pulls_url: str
    releases_url: str
    ssh_url: str
    stargazers_url: str
    statuses_url: str
    subscribers_url: str
    subscription_url: str
    tags_url: str
    teams_url: str
    language: Optional[str]
    trees_url: str
    clone_url: str
    mirror_url: str
    hooks_url: str
    svn_url: str
    forks: int
    open_issues: int
    watchers: int
    has_issues: bool
    has_projects: bool
    has_pages: bool
    has_wiki: bool
    has_downloads: bool
    archived: bool
    disabled: bool
    visibility: str
    license: LicenseRepositories


class ListRepositoriesResponse(BaseModel):
    total_count: int
    incomplete_results: bool
    items: List[ItemRepositories]
