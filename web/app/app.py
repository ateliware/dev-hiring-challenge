from flask import Flask , render_template
from dynaconf import FlaskDynaconf

def create_app(test_mode=None):  
    app = Flask(__name__)
    param = {}
    if(test_mode):
        param['FORCE_ENV_FOR_DYNACONF'] = "testing"
    flask_dynaconf = FlaskDynaconf(app,**param)
    app.config.load_extensions()
    
    @app.errorhandler(404)
    def page_not_found(error):
        return render_template("page404.html"), 404

    @app.errorhandler(403)
    def access_forbidden(error):
        return render_template("page403.html"), 403

    @app.errorhandler(500)
    def internal_server_error(error):
        return render_template("page500.html"), 500

    return app

