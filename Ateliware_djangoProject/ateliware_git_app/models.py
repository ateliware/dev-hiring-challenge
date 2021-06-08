from django.db import models


class TbLanguages(models.Model):
    """
    This class table stores all five languages selected for challenge:
    ['CSS', 'HTML', 'JavaScript', 'Python', 'Flutter']
    Instead storing multiple times each language as char on TbGitRepository.
    """
    language = models.CharField(max_length=25)


class TbGitRepository(models.Model):
    """
    Such class table will store most important data about each git repository found:
    id_fk_lang: Language id from TbLanguage, on delete does not delete lang ref.
    repo_name: Git API attr = name ** MUST BE UNIQUE
    repo_url: Git API attr = url
    repo_stars: Git API attr = stargazers_count
    repo_commits: Git API attr = get_commits().totalCount
    repo_watchers: Git API attr = watchers_count
    repo_branches: Git API attr = get_branches().totalCount
    repo_forks: Git API attr = forks_count
    repo_issues: Git API attr = open_issues_count
    repo_up_at: Git API attr = updated_at
    """
    id_fk_lang = models.ForeignKey(TbLanguages, on_delete=models.PROTECT)
    repo_name = models.CharField(max_length=100, unique=True)
    repo_url = models.CharField(max_length=250)
    repo_stars = models.IntegerField(null=False)
    repo_commits = models.IntegerField(null=False)
    repo_watchers = models.IntegerField(null=False)
    repo_branches = models.IntegerField(null=False)
    repo_forks = models.IntegerField(null=False)
    repo_issues = models.IntegerField(null=False)
    repo_up_at = models.DateTimeField(null=False)
