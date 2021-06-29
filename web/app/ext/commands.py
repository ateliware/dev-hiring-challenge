import click
from .database import db


def create_db():
    """Creates database"""
    db.create_all()
    click.echo('Database started.')

def drop_db():
    """Droped database"""
    db.drop_all()
    click.echo('Droped started.')


def init_app(app):
    """ Run multiple commands """
    for command in [create_db]:
        app.cli.add_command(app.cli.command()(command))
