class Repository {
  constructor(name, url, stars, description, language) {
    this.name = name;
    this.url = url;
    this.stars = stars;
    this.description = description;
    this.language = language;
  }
}

module.exports = { Repository }