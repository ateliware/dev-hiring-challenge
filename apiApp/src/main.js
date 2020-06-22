import api from './api'

class App{
    constructor(){
        this.repositories = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input');
        this.listEl = document.getElementById('repo-list');

        this.registerHandlers();
    }

    registerHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true){
        if (loading === true){
            let loading = document.createElement('span')
            loading.appendChild(document.createTextNode("Carregando"))
            loading.setAttribute('id', 'loading')

            this.formEl.appendChild(loading)
        }else {
            document.getElementById('loading').remove()
        }

    }

    async addRepository(event) {
        event.preventDefault();

        const repoInput = this.inputEl.value;

        if(repoInput.length === 0)
            return;

        this.setLoading();

        try{
            const response = await api.get(`search/repositories?q=${repoInput}`)

            for (var i = 0; i < 5; i++){
                const {full_name, description, html_url, language, owner: { avatar_url, login }} = response.data.items[i]

                this.repositories.push({
                    full_name,
                    description,
                    avatar_url,
                    html_url,
                    language,
                    login,    
                });

                console.log(response)
    
                this.inputEl.value = '';
    
                this.render()
            }

        }catch (err) {
            alert('Repositório inexistente!')
        }

        this.setLoading(false);
    }


    render() {
        this.listEl.innerHTML = ''

        this.repositories.forEach(repo => {
            let imageEl = document.createElement('img')
            imageEl.setAttribute('src', repo.avatar_url)

            let titleEl = document.createElement('strong')
            titleEl.appendChild(document.createTextNode(repo.login))

            let descriptionEl = document.createElement('p')
            descriptionEl.appendChild(document.createTextNode(repo.description))

            let linkEl = document.createElement('a')
            linkEl.setAttribute('target', '_blank')
            linkEl.setAttribute('href', repo.html_url)
            linkEl.appendChild(document.createTextNode('acessar'))

            let listItemEl = document.createElement('li')
            listItemEl.appendChild(imageEl)
            listItemEl.appendChild(titleEl)
            listItemEl.appendChild(descriptionEl)
            listItemEl.appendChild(linkEl)

            this.listEl.appendChild(listItemEl)
        })
    }
}

new App()