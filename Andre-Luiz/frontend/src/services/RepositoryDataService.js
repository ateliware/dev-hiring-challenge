import http from "../http-common";

class RepositoryDataService {
  getAll() {
    return http.get("/repositories");
  }

  get(id) {
    return http.get(`/repositories/${id}`);
  }

  create(data) {
    return http.post("/repositories", data);
  }

  update(id, data) {
    return http.put(`/repositories/${id}`, data);
  }

  delete(id) {
    return http.delete(`/repositories/${id}`);
  }

  deleteAll() {
    return http.delete(`/repositories`);
  }

  findByName(name) {
    return http.get(`/repositories?name=${name}`);
  }
}

export default new RepositoryDataService();