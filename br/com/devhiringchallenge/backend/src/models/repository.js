class Repository {
  constructor(name, full_name, url, stars, description, language) {
    this.name = name;
    this.full_name = full_name;
    this.url = url;
    this.stars = stars;
    this.description = description;
    this.language = language;
  }
}

module.exports = { Repository }