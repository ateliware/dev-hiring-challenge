module.exports = app => {
    app.route('/repos/details/:id').get(app.api.repos.getById)

    app.route('/repos/:language').get(app.api.repos.getByLanguage)

    app.route('/repos')
        .post(app.api.repos.save)
        .get(app.api.repos.get)

    app.route('/repos/remove').delete(app.api.repos.remove)
}
