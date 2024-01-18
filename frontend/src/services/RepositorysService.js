import axios from 'axios'

const API_URL = 'http://localhost:3001'

export async function getRepositorysTodos(){
    const repoUrl = `${API_URL}/repo`

    const response = await axios.get(repoUrl)

    return response.data
}

export async function deleteRepositorysService(id) {
    
    const response = await axios.delete(`${API_URL}/repo/${id}`)
    return response.data
}

export async function salvarRepositorysService(name, description, language, html_url) {
   
    let response
    try {
        response = await axios.post(`${API_URL}/repo/`,{name, description, language, html_url});
        alert('repositório salvo com sucesso !')
    } catch (error) {
        alert('não é possivel salvar o respositório !')
    }
    
    return response.data
}
