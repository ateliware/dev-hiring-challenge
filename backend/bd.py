import mysql.connector
import json

class MySql:
    def __init__(self):
        self.teste = 'oi'

    def connect_with_db(self):
        config = {
            'user': 'root',
            'password': 'root',
            'host': 'db',
            'port': '3306',
            'database': 'ateliware',
            'auth_plugin':'mysql_native_password'
        }

        cnx = mysql.connector.connect(**config)
        return cnx


    def insert_into_med(cnx, value, id):
        cursor = cnx.cursor()
        query = """INSERT INTO TESTESCRIPT (firstname, lastname, email) VALUES (%s, %s, %s)"""
        cursor.execute(query, (value[0], value[0], value[0]))
        cnx.commit()
        print(cursor.rowcount, "record inserted.")
        
        cursor.close()
        cnx.close()

    def insert_new_language(self, repositories):
        cnx = self.connect_with_db()
        cursor = cnx.cursor()
        query = """INSERT INTO REPOSITORIE (OWNER, URL, LANGUAGE, CREATED_AT, UPDATED_AT, STARGAZER, RELEASES) VALUES (%s, %s, %s, %s, %s, %s, %s)"""
        for repo in repositories:
            cursor.execute(
                query, 
                (repo['nameWithOwner'],
                 repo['sshUrl'], 
                 repo['primaryLanguage']['name'], 
                 repo['createdAt'][0:10], 
                 repo['updatedAt'][0:10], 
                 repo['stargazers']['totalCount'], 
                 repo['releases']['totalCount'],
                 )
            )
        cnx.commit()
        
        cursor.close()
        cnx.close()

    def select_language(self, language):
        cnx = self.connect_with_db()
        cursor = cnx.cursor()
        query = ("""SELECT * FROM REPOSITORIE WHERE LANGUAGE = %s""")
        cursor.execute(query, (language, ))
        row_headers=[x[0] for x in cursor.description]
        result = cursor.fetchall()
        json_data=[]

        for res in result:
            json_data.append(dict(zip(row_headers, res)))

        cursor.close()
        cnx.close()
        return json.dumps(json_data, indent=4, sort_keys=True, default=str)
        