import "@testing-library/jest-dom/extend-expect";

const delayResponse = (
  data = {},
  timeout = 200,
  forceError = false,
  error = new Error("generic error")
) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (forceError) {
        reject(error);
      } else {
        resolve(data);
      }
    }, timeout);
  });

async function mockFetch(url, config) {
  switch (url) {
    case "/api/repositories/JavaScript/refresh/?q=":
      const refreshedRepos = delayResponse({
        error: false,
      });
      return { ok: true, status: 200, json: async () => refreshedRepos };
      break;
    case "/api/repositories/JavaScript/?q=":
      const repos = await delayResponse({
        error: false,
        repositories: [
          {
            id: 11730342,
            node_id: "MDEwOlJlcG9zaXRvcnkxMTczMDM0Mg==",
            name: "vue",
            full_name: "vuejs/vue",
            description:
              "🖖 Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.",
            url: "https://api.github.com/repos/vuejs/vue",
            html_url: "https://github.com/vuejs/vue",
            language: "JavaScript",
            created_at: "2013-07-29T03:24:51Z",
            updated_at: "2022-02-14T23:09:06Z",
            stargazers_count: 193036,
            topics: ["framework", "frontend", "javascript", "vue"],
            owner: {
              login: "vuejs",
              id: 6128107,
              url: "https://api.github.com/users/vuejs",
              avatar_url: "https://avatars.githubusercontent.com/u/6128107?v=4",
            },
          },
          {
            created_at: "2016-11-29T17:13:37Z",
            description: "Prettier is an opinionated code formatter.",
            full_name: "prettier/prettier",
            html_url: "https://github.com/prettier/prettier",
            id: 75104123,
            language: "JavaScript",
            name: "prettier",
            node_id: "MDEwOlJlcG9zaXRvcnk3NTEwNDEyMw==",
            owner: {
              login: "prettier",
              id: 25822731,
              url: "https://api.github.com/users/prettier",
              avatar_url:
                "https://avatars.githubusercontent.com/u/25822731?v=4",
            },
            stargazers_count: 41888,
            topics: [
              "angular",
              "ast",
              "css",
              "flow",
              "formatter",
              "graphql",
              "html",
              "javascript",
              "json",
              "jsx",
              "less",
              "markdown",
              "prettier",
              "printer",
              "scss",
              "typescript",
              "vue",
              "yaml",
            ],
            updated_at: "2022-02-14T17:52:22Z",
            url: "https://api.github.com/repos/prettier/prettier",
          },
        ],
        search: {
          language: "JavaScript",
          query: "",
          search_date: "2022-02-14T23:09:47.000Z",
          search_id: 5,
        },
      });
      return { ok: true, status: 200, json: async () => repos };
      break;
    case "https://api.github.com/search/repositories?q=ateliware+in:name,description+language:JavaScript&sort=stars&order=desc&per_page=12":
      const responseFromGithub = await delayResponse({
        ok: true,
        status: 200,
        json: async () => {
          return {
            total_count: 16,
            incomplete_results: false,
            items: [
              {
                id: 90151142,
                node_id: "MDEwOlJlcG9zaXRvcnk5MDE1MTE0Mg==",
                name: "uploader",
                full_name: "ateliware/uploader",
                private: false,
                owner: {
                  login: "ateliware",
                  id: 1742790,
                  node_id: "MDEyOk9yZ2FuaXphdGlvbjE3NDI3OTA=",
                  avatar_url:
                    "https://avatars.githubusercontent.com/u/1742790?v=4",
                  gravatar_id: "",
                  url: "https://api.github.com/users/ateliware",
                  html_url: "https://github.com/ateliware",
                  followers_url:
                    "https://api.github.com/users/ateliware/followers",
                  following_url:
                    "https://api.github.com/users/ateliware/following{/other_user}",
                  gists_url:
                    "https://api.github.com/users/ateliware/gists{/gist_id}",
                  starred_url:
                    "https://api.github.com/users/ateliware/starred{/owner}{/repo}",
                  subscriptions_url:
                    "https://api.github.com/users/ateliware/subscriptions",
                  organizations_url:
                    "https://api.github.com/users/ateliware/orgs",
                  repos_url: "https://api.github.com/users/ateliware/repos",
                  events_url:
                    "https://api.github.com/users/ateliware/events{/privacy}",
                  received_events_url:
                    "https://api.github.com/users/ateliware/received_events",
                  type: "Organization",
                  site_admin: false,
                },
                html_url: "https://github.com/ateliware/uploader",
                description: "The uploader service you desperately need!",
                fork: false,
                url: "https://api.github.com/repos/ateliware/uploader",
                forks_url:
                  "https://api.github.com/repos/ateliware/uploader/forks",
                keys_url:
                  "https://api.github.com/repos/ateliware/uploader/keys{/key_id}",
                collaborators_url:
                  "https://api.github.com/repos/ateliware/uploader/collaborators{/collaborator}",
                teams_url:
                  "https://api.github.com/repos/ateliware/uploader/teams",
                hooks_url:
                  "https://api.github.com/repos/ateliware/uploader/hooks",
                issue_events_url:
                  "https://api.github.com/repos/ateliware/uploader/issues/events{/number}",
                events_url:
                  "https://api.github.com/repos/ateliware/uploader/events",
                assignees_url:
                  "https://api.github.com/repos/ateliware/uploader/assignees{/user}",
                branches_url:
                  "https://api.github.com/repos/ateliware/uploader/branches{/branch}",
                tags_url:
                  "https://api.github.com/repos/ateliware/uploader/tags",
                blobs_url:
                  "https://api.github.com/repos/ateliware/uploader/git/blobs{/sha}",
                git_tags_url:
                  "https://api.github.com/repos/ateliware/uploader/git/tags{/sha}",
                git_refs_url:
                  "https://api.github.com/repos/ateliware/uploader/git/refs{/sha}",
                trees_url:
                  "https://api.github.com/repos/ateliware/uploader/git/trees{/sha}",
                statuses_url:
                  "https://api.github.com/repos/ateliware/uploader/statuses/{sha}",
                languages_url:
                  "https://api.github.com/repos/ateliware/uploader/languages",
                stargazers_url:
                  "https://api.github.com/repos/ateliware/uploader/stargazers",
                contributors_url:
                  "https://api.github.com/repos/ateliware/uploader/contributors",
                subscribers_url:
                  "https://api.github.com/repos/ateliware/uploader/subscribers",
                subscription_url:
                  "https://api.github.com/repos/ateliware/uploader/subscription",
                commits_url:
                  "https://api.github.com/repos/ateliware/uploader/commits{/sha}",
                git_commits_url:
                  "https://api.github.com/repos/ateliware/uploader/git/commits{/sha}",
                comments_url:
                  "https://api.github.com/repos/ateliware/uploader/comments{/number}",
                issue_comment_url:
                  "https://api.github.com/repos/ateliware/uploader/issues/comments{/number}",
                contents_url:
                  "https://api.github.com/repos/ateliware/uploader/contents/{+path}",
                compare_url:
                  "https://api.github.com/repos/ateliware/uploader/compare/{base}...{head}",
                merges_url:
                  "https://api.github.com/repos/ateliware/uploader/merges",
                archive_url:
                  "https://api.github.com/repos/ateliware/uploader/{archive_format}{/ref}",
                downloads_url:
                  "https://api.github.com/repos/ateliware/uploader/downloads",
                issues_url:
                  "https://api.github.com/repos/ateliware/uploader/issues{/number}",
                pulls_url:
                  "https://api.github.com/repos/ateliware/uploader/pulls{/number}",
                milestones_url:
                  "https://api.github.com/repos/ateliware/uploader/milestones{/number}",
                notifications_url:
                  "https://api.github.com/repos/ateliware/uploader/notifications{?since,all,participating}",
                labels_url:
                  "https://api.github.com/repos/ateliware/uploader/labels{/name}",
                releases_url:
                  "https://api.github.com/repos/ateliware/uploader/releases{/id}",
                deployments_url:
                  "https://api.github.com/repos/ateliware/uploader/deployments",
                created_at: "2017-05-03T13:18:53Z",
                updated_at: "2020-08-04T04:05:54Z",
                pushed_at: "2017-05-04T23:38:35Z",
                git_url: "git://github.com/ateliware/uploader.git",
                ssh_url: "git@github.com:ateliware/uploader.git",
                clone_url: "https://github.com/ateliware/uploader.git",
                svn_url: "https://github.com/ateliware/uploader",
                homepage: null,
                size: 19,
                stargazers_count: 4,
                watchers_count: 4,
                language: "JavaScript",
                has_issues: true,
                has_projects: true,
                has_downloads: true,
                has_wiki: true,
                has_pages: false,
                forks_count: 0,
                mirror_url: null,
                archived: false,
                disabled: false,
                open_issues_count: 1,
                license: {
                  key: "mit",
                  name: "MIT License",
                  spdx_id: "MIT",
                  url: "https://api.github.com/licenses/mit",
                  node_id: "MDc6TGljZW5zZTEz",
                },
                allow_forking: true,
                is_template: false,
                topics: ["gcs", "google-cloud-storage", "upload", "uploader"],
                visibility: "public",
                forks: 0,
                open_issues: 1,
                watchers: 4,
                default_branch: "master",
                score: 1.0,
              },
              {
                id: 215443679,
                node_id: "MDEwOlJlcG9zaXRvcnkyMTU0NDM2Nzk=",
                name: "ateliware-appjob",
                full_name: "desenv-marcelo-silva/ateliware-appjob",
                private: false,
                owner: {
                  login: "desenv-marcelo-silva",
                  id: 18222796,
                  node_id: "MDQ6VXNlcjE4MjIyNzk2",
                  avatar_url:
                    "https://avatars.githubusercontent.com/u/18222796?v=4",
                  gravatar_id: "",
                  url: "https://api.github.com/users/desenv-marcelo-silva",
                  html_url: "https://github.com/desenv-marcelo-silva",
                  followers_url:
                    "https://api.github.com/users/desenv-marcelo-silva/followers",
                  following_url:
                    "https://api.github.com/users/desenv-marcelo-silva/following{/other_user}",
                  gists_url:
                    "https://api.github.com/users/desenv-marcelo-silva/gists{/gist_id}",
                  starred_url:
                    "https://api.github.com/users/desenv-marcelo-silva/starred{/owner}{/repo}",
                  subscriptions_url:
                    "https://api.github.com/users/desenv-marcelo-silva/subscriptions",
                  organizations_url:
                    "https://api.github.com/users/desenv-marcelo-silva/orgs",
                  repos_url:
                    "https://api.github.com/users/desenv-marcelo-silva/repos",
                  events_url:
                    "https://api.github.com/users/desenv-marcelo-silva/events{/privacy}",
                  received_events_url:
                    "https://api.github.com/users/desenv-marcelo-silva/received_events",
                  type: "User",
                  site_admin: false,
                },
                html_url:
                  "https://github.com/desenv-marcelo-silva/ateliware-appjob",
                description: "Test to get a job position at Ateliwere",
                fork: false,
                url: "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob",
                forks_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/forks",
                keys_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/keys{/key_id}",
                collaborators_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/collaborators{/collaborator}",
                teams_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/teams",
                hooks_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/hooks",
                issue_events_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/issues/events{/number}",
                events_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/events",
                assignees_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/assignees{/user}",
                branches_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/branches{/branch}",
                tags_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/tags",
                blobs_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/git/blobs{/sha}",
                git_tags_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/git/tags{/sha}",
                git_refs_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/git/refs{/sha}",
                trees_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/git/trees{/sha}",
                statuses_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/statuses/{sha}",
                languages_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/languages",
                stargazers_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/stargazers",
                contributors_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/contributors",
                subscribers_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/subscribers",
                subscription_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/subscription",
                commits_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/commits{/sha}",
                git_commits_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/git/commits{/sha}",
                comments_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/comments{/number}",
                issue_comment_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/issues/comments{/number}",
                contents_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/contents/{+path}",
                compare_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/compare/{base}...{head}",
                merges_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/merges",
                archive_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/{archive_format}{/ref}",
                downloads_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/downloads",
                issues_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/issues{/number}",
                pulls_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/pulls{/number}",
                milestones_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/milestones{/number}",
                notifications_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/notifications{?since,all,participating}",
                labels_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/labels{/name}",
                releases_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/releases{/id}",
                deployments_url:
                  "https://api.github.com/repos/desenv-marcelo-silva/ateliware-appjob/deployments",
                created_at: "2019-10-16T02:56:06Z",
                updated_at: "2020-06-02T23:41:44Z",
                pushed_at: "2022-02-12T15:51:32Z",
                git_url:
                  "git://github.com/desenv-marcelo-silva/ateliware-appjob.git",
                ssh_url:
                  "git@github.com:desenv-marcelo-silva/ateliware-appjob.git",
                clone_url:
                  "https://github.com/desenv-marcelo-silva/ateliware-appjob.git",
                svn_url:
                  "https://github.com/desenv-marcelo-silva/ateliware-appjob",
                homepage: null,
                size: 1525,
                stargazers_count: 1,
                watchers_count: 1,
                language: "JavaScript",
                has_issues: true,
                has_projects: true,
                has_downloads: true,
                has_wiki: true,
                has_pages: false,
                forks_count: 0,
                mirror_url: null,
                archived: false,
                disabled: false,
                open_issues_count: 16,
                license: null,
                allow_forking: true,
                is_template: false,
                topics: [],
                visibility: "public",
                forks: 0,
                open_issues: 16,
                watchers: 1,
                default_branch: "master",
                score: 1.0,
              },
              {
                id: 193626079,
                node_id: "MDEwOlJlcG9zaXRvcnkxOTM2MjYwNzk=",
                name: "frontend-ateliware",
                full_name: "crashkill/frontend-ateliware",
                private: false,
                owner: {
                  login: "crashkill",
                  id: 1470583,
                  node_id: "MDQ6VXNlcjE0NzA1ODM=",
                  avatar_url:
                    "https://avatars.githubusercontent.com/u/1470583?v=4",
                  gravatar_id: "",
                  url: "https://api.github.com/users/crashkill",
                  html_url: "https://github.com/crashkill",
                  followers_url:
                    "https://api.github.com/users/crashkill/followers",
                  following_url:
                    "https://api.github.com/users/crashkill/following{/other_user}",
                  gists_url:
                    "https://api.github.com/users/crashkill/gists{/gist_id}",
                  starred_url:
                    "https://api.github.com/users/crashkill/starred{/owner}{/repo}",
                  subscriptions_url:
                    "https://api.github.com/users/crashkill/subscriptions",
                  organizations_url:
                    "https://api.github.com/users/crashkill/orgs",
                  repos_url: "https://api.github.com/users/crashkill/repos",
                  events_url:
                    "https://api.github.com/users/crashkill/events{/privacy}",
                  received_events_url:
                    "https://api.github.com/users/crashkill/received_events",
                  type: "User",
                  site_admin: false,
                },
                html_url: "https://github.com/crashkill/frontend-ateliware",
                description: null,
                fork: false,
                url: "https://api.github.com/repos/crashkill/frontend-ateliware",
                forks_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/forks",
                keys_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/keys{/key_id}",
                collaborators_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/collaborators{/collaborator}",
                teams_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/teams",
                hooks_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/hooks",
                issue_events_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/issues/events{/number}",
                events_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/events",
                assignees_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/assignees{/user}",
                branches_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/branches{/branch}",
                tags_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/tags",
                blobs_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/git/blobs{/sha}",
                git_tags_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/git/tags{/sha}",
                git_refs_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/git/refs{/sha}",
                trees_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/git/trees{/sha}",
                statuses_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/statuses/{sha}",
                languages_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/languages",
                stargazers_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/stargazers",
                contributors_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/contributors",
                subscribers_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/subscribers",
                subscription_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/subscription",
                commits_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/commits{/sha}",
                git_commits_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/git/commits{/sha}",
                comments_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/comments{/number}",
                issue_comment_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/issues/comments{/number}",
                contents_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/contents/{+path}",
                compare_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/compare/{base}...{head}",
                merges_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/merges",
                archive_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/{archive_format}{/ref}",
                downloads_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/downloads",
                issues_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/issues{/number}",
                pulls_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/pulls{/number}",
                milestones_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/milestones{/number}",
                notifications_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/notifications{?since,all,participating}",
                labels_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/labels{/name}",
                releases_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/releases{/id}",
                deployments_url:
                  "https://api.github.com/repos/crashkill/frontend-ateliware/deployments",
                created_at: "2019-06-25T03:12:38Z",
                updated_at: "2019-06-25T16:08:37Z",
                pushed_at: "2021-01-05T09:27:33Z",
                git_url: "git://github.com/crashkill/frontend-ateliware.git",
                ssh_url: "git@github.com:crashkill/frontend-ateliware.git",
                clone_url:
                  "https://github.com/crashkill/frontend-ateliware.git",
                svn_url: "https://github.com/crashkill/frontend-ateliware",
                homepage: null,
                size: 1316,
                stargazers_count: 1,
                watchers_count: 1,
                language: "JavaScript",
                has_issues: true,
                has_projects: true,
                has_downloads: true,
                has_wiki: true,
                has_pages: false,
                forks_count: 0,
                mirror_url: null,
                archived: false,
                disabled: false,
                open_issues_count: 1,
                license: null,
                allow_forking: true,
                is_template: false,
                topics: [],
                visibility: "public",
                forks: 0,
                open_issues: 1,
                watchers: 1,
                default_branch: "master",
                score: 1.0,
              },
            ],
          };
        },
      });
      return responseFromGithub;
      break;
    default:
      const response = await delayResponse({
        ok: false,
        status: 500,
        json: async () => {},
      });
      return response;
      break;
  }
}

global.fetch = jest.fn().mockImplementation(mockFetch);

/*global.fetch.mockClear();
delete global.fetch;*/
