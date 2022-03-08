import axios from 'axios';

const http = axios.create({
    baseURL: 'https://api.github.com',
    headers: { 'Content-type': 'application/json' }
});

class GitHubService {
    search(filter) {
        return http.get(`/search/${filter}`);
    }
}

export default new GitHubService();