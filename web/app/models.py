from .ext.database import db
from sqlalchemy_serializer import SerializerMixin


class GithubRepositories(db.Model,SerializerMixin):
    __tablename__ = "github_repositories"
    id = db.Column(db.Integer, primary_key=True)
    session = db.Column(db.String(100), index=True)
    language = db.Column(db.String(100))
    language_img = db.Column(db.String(100))
    repository_id = db.Column(db.BigInteger)
    name = db.Column(db.String(250))
    full_name = db.Column(db.String(250))
    description = db.Column(db.String(250))
    size = db.Column(db.BigInteger)
    stargazers_count = db.Column(db.BigInteger)
    forks_count = db.Column(db.BigInteger)
    network_count = db.Column(db.BigInteger)
    url = db.Column(db.String(250))
    git_url = db.Column(db.String(250))
    clone_url = db.Column(db.String(250))
    downloads_url = db.Column(db.String(250))
    homepage = db.Column(db.String(250))
    organization_login = db.Column(db.String(250))
    organization_avatar_url = db.Column(db.String(250))
    organization_name = db.Column(db.String(250))
    organization_description = db.Column(db.String(250))
    parameters = db.Column(db.Text(65536))
    date = db.Column(db.DateTime())

    def __repr__(self):
        return '<github_repositories %r>' % self.full_name


class GithubHistorySearch(db.Model,SerializerMixin):
    __tablename__ = "github_historysearch"
    id = db.Column(db.Integer, primary_key=True)
    session = db.Column(db.String(100), index=True)
    keywords = db.Column(db.String(250))
    date = db.Column(db.DateTime())

    def __repr__(self):
        return '<github_historysearch %r>' % self.session

