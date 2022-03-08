import axios from 'axios';

const http = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:3001',
    headers: { 'Content-type': 'application/json' }
});

class RepoService {
    insert(data) {
        return http.post('/repos', data);
    }

    getAll() {
        return http.get('/repos');
    }

    deleteAll() {
        return http.delete('/repos');
    }
}

export default new RepoService();