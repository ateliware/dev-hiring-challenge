# Imports necessary tables and Github API class
from .models import TbLanguages, TbGitRepository
from github import Github
from datetime import datetime as dt
from os import environ
import pytz
# PyGitHub documentation: https://pygithub.readthedocs.io/en/latest/index.html


class GitAPI:

    def __init__(self, lang_list):
        """
        Initializes the class with local (self) variables
        Input:
            lang_list: list
                languages list input by user
        Outputs: class
            (Initialization)
        """
        # Temporarily disabled
        # self.token = environ['GITHUB_API_TOKEN']
        # self.git_api = Github(self.token)  # Init Object Github API with token

        self.git_api = Github()  # Init Object Github API
        self.tb_repo = TbGitRepository  # TbGitRepository object
        self.tb_lang = TbLanguages  # TbLanguages object
        # Creates a dictionary only with registered (allowed) languages
        self.dict_lang = {lang[0]: lang[1] for lang in self.tb_lang.objects.all().values_list()}
        self.allowed_lang = [val for val in self.dict_lang.values()]  # All allowed languages
        self.languages = [lang for lang in lang_list if lang in self.allowed_lang]  # Languages chosen by user

    def cad_or_up_repo(self):
        """
        This method finds five repositories (top three by language)
        """
        search_repos = list()  # Creates a list to store found objects from Github API
        for lang in self.languages:  # For each language in allowed languages list
            # Searches by repositories and sorts by number of stars to get most highlight ones
            repositories = self.git_api.search_repositories(lang, sort='stars')

            for repository in repositories:  # For each repository found by API

                # Creates a dictionary for repository main atributes except name
                dict_repo = {'id_fk_lang': self.tb_lang.objects.filter(language=lang).first(),
                             'repo_url': repository.html_url,
                             'repo_stars': repository.stargazers_count,
                             'repo_commits': repository.get_commits().totalCount,
                             'repo_watchers': repository.watchers_count,
                             'repo_branches': repository.get_branches().totalCount,
                             'repo_forks': repository.get_forks().totalCount,
                             'repo_issues': repository.open_issues_count,
                             'repo_up_at': pytz.utc.localize(repository.updated_at)}

                # Verifies if current repository is registered on database and update or create (keeps DB updated)
                obj, created = self.tb_repo.objects.update_or_create(repo_name=repository.name, defaults=dict_repo)

                if created:  # If it was created, otherwise it updates existent register
                    # appends dict_repo to search list
                    search_repos.append([obj.repo_name, self.dict_lang[obj.id_fk_lang_id], obj.repo_url, obj.repo_stars,
                                        obj.repo_commits, obj.repo_watchers, obj.repo_branches, obj.repo_forks,
                                        obj.repo_issues, dt.strftime(obj.repo_up_at, '%d/%m/%Y - %Hh%M')])
                    break  # Breaks the loop after finding a new repository by language

        # Returns all five new registered repositories main data
        return search_repos

    def get_all_repo(self):
        """
        A method that returns all registered repositories
        Input: None
        Output: list
            list containing all repositories and their metadata
        """
        return [[repo[2], self.dict_lang[repo[1]], repo[3], repo[4], repo[5], repo[6], repo[7], repo[8], repo[9],
                 dt.strftime(repo[10], '%d/%m/%Y - %Hh%M')] for repo in self.tb_repo.objects.all().values_list()]
