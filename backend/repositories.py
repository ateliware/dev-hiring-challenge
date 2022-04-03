import requests

class Repository:
    def __init__(self):
        self.token = "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"
        self.path = "https://api.github.com/graphql"

    def __get_query(self, language, after):
        query = f"""
            {{
                search(first:100, {after}, query:"stars:>100  language:{language} ", type:REPOSITORY){{
				pageInfo{{
					startCursor
					hasNextPage
					endCursor
				}}
				nodes{{
					... on Repository {{
						nameWithOwner
                        sshUrl
                        createdAt
                        updatedAt
                        primaryLanguage {{
                            name
                        }}
                        stargazers {{
                            totalCount
                        }}
                        releases {{
                            totalCount
                        }}
					}}
				}}
			    }}
            }}
            """
        return query

    def get_repositories(self, language):
        headers = headers = {'Authorization': f'Bearer {self.token}'}
        after = 'after: null'
        res = []
        for i in range(1):
            query = self.__get_query(language, after)
            result = requests.post(self.path, json={'query': query}, headers=headers)
            if result.status_code == 200:    
                data = result.json()['data']['search']
                after = f"""after: "{ data['pageInfo']['endCursor'] }" """
                repositories = list(map(lambda x: x, data['nodes']))
                res = res + repositories
        return res