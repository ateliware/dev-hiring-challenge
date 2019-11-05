import psycopg2
import psycopg2.extras
import json
from configparser import ConfigParser


class PostgreSQL:
    @staticmethod
    def config(filename='database.ini', section='postgresql'):
        parser = ConfigParser()
        parser.read(filename)
        db = {}
        if parser.has_section(section):
            params = parser.items(section)
            for param in params:
                db[param[0]] = param[1]
        else:
            raise Exception('Section {0} not found in the {1} file'.format(section, filename))

        return db

    @staticmethod
    def connect():
        """ Connect to the PostgreSQL database server """
        connection = None
        try:
            params = PostgreSQL.config()
            print('Connecting to the PostgreSQL database...')
            connection = psycopg2.connect(**params)
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        return connection

    @staticmethod
    def version():
        connection = PostgreSQL.connect()
        cursor = connection.cursor()
        print('PostgreSQL database version:')
        cursor.execute('SELECT version()')
        db_version = cursor.fetchone()
        print(db_version)
        cursor.close()


# base = PostgreSQL.connect()
# cursor = base.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
# cursor.execute("SELECT id, author, name, avatar, url, description, language, stars, forks " +
#                " FROM public.repository")
# data = json.dumps(cursor.fetchall())
# print(type(data))
# print(data)
# cursor.close()
# dt = {
#     "author": "test5",
#     "name": "test5",
#     "avatar": "test5",
#     "url": "test5",
#     "description": "test5",
#     "language": "test5",
#     "stars": 5,
#     "forks": 5
# }
# cursor = base.cursor()
# query = 'INSERT INTO public.repository(author, name, avatar, url, description, language, stars, forks) ' +\
#         "VALUES('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', {6}, {7});"\
#             .format(dt["author"], dt["name"],  dt["avatar"], dt[ "url"], dt["description"], dt["language"],
#                     dt["stars"], dt["forks"])
# cursor.execute(query)
# base.commit()
# cursor.close()
# base.close()