from collections import Counter

class PreferedLanguage:
    def __init__(self, count, value):
       self.count = count
       self.value = value

def GetPreferedLanguages(howMuch, searchs):
    preferedLanguages = []
    languagesSearchs = []
    for search in searchs:
        languagesSearchs.extend(search.languages.split(" "))
    duplicate_dict = Counter(languagesSearchs)
    for i in range(howMuch):
        if len(duplicate_dict) > i:
            preferedLanguages.append(PreferedLanguage(duplicate_dict[list(duplicate_dict)[i]], list(duplicate_dict)[i]))

    
    sortedByCount = sorted(preferedLanguages, key=lambda x: x.count, reverse=True)   
    return sortedByCount
