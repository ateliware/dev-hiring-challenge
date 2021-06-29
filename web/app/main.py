# to run in the gunicorn container
from .app import create_app 
app = create_app()
