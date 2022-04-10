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

export async function salvarRepositorysService(login, html_url) {
    
    let response
    response = await axios.post(login, html_url);
    return response.data
}
