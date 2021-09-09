class Repositorie:
    def __init__(self, data) -> None:
        self.name = data.name
        self.language = data.language
        self.description = data.description
        self.clone_url = data.clone_url

def GetRepositoriesListFromGitHub(data):    
    items = []
    for i in data.items:
        items.append(Repositorie(i))
    return items