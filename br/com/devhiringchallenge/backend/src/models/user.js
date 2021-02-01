class User {
  constructor(id, login, avatar_url, url) {
    this.id = id;
    this.login = login;
    this.avatar_url = avatar_url;
    this.url = url;
  }
}

module.exports = { User }