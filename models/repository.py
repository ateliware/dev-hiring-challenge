from app import db

class Repository( db.Model ):
    __tablename__ = "Repositories"
    lang = db.Column( db.String, primary_key=True )
    name = db.Column( db.String )
    description = db.Column( db.String )
    link = db.Column( db.String )
    stars = db.Column( db.Integer )
    
    def __init__( self, lang, name, description, link, stars ):
        self.lang = lang
        self.name = name
        self.description = description
        self.link = link
        self.stars = stars