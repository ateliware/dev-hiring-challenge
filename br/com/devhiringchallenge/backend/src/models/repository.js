class Repository {
  constructor(id, name, full_name, url, stars, description, language, user_id) {
    this.id = id;
    this.name = name;
    this.full_name = full_name;
    this.url = url;
    this.stars = stars;
    this.description = description;
    this.language = language;
    this.user_id = user_id;
  }
}

module.exports = { Repository }