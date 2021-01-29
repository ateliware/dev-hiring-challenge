class Repository {
  constructor(name, url, stars, description) {
    this.name = name;
    this.url = url;
    this.stars = stars;
    this.description = description;
  }
}

module.exports = { Repository }