import sqlite3

con = sqlite3.connect('github_historico.db', check_same_thread=False)
cur = con.cursor()


def create_table():
    try:
        cur.execute('''CREATE TABLE historico_git
                       (name text, description text, html_url text, login text, language text, created_at text, watchers text, forks_count text)''')
    except:
        pass


def insert(name, description, html_url, login, language, created_at, watchers, forks_count):
    cur.execute(
        f"INSERT INTO historico_git VALUES ('{name}', '{description}', '{html_url}', '{login}', '{language}', '{created_at}', '{watchers}', '{forks_count}')")
    con.commit()


def select():
    return [linha for linha in cur.execute(f'SELECT * FROM historico_git')]


def select_where(language):
    return [linha for linha in cur.execute(f"SELECT * FROM historico_git where language == '{language}'")]


def delete():
    cur.execute("Delete FROM historico_git")


def delete_where(languague):
    cur.execute(f"Delete FROM historico_git where language == '{languague}'")


def update_where(colum, value):
    cur.execute(f"UPDATE FROM historico_git where {colum} == '{value}'")
