class Repository {
  constructor(id, name, full_name, url, stars, description, language, user_id) {
    this.id = id;
    this.name = name;
    this.full_name = full_name;
    this.url = url;
    this.stars = stars;
    this.language = language;
    this.user_id = user_id;
    this.description = description == null || description.length < 10000 ? 
                       description :
                       description.substring(0, 10000);
  }
}

module.exports = { Repository }