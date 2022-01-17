class Repo(object):
    def __init__(self, data) -> None:
        self.language = data.language
        self.full_name = data.full_name
        self.html_url = data.html_url
        self.stargazers_count = data.stargazers_count
        self.description = data.description
