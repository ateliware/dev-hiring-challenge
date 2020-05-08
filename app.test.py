# here there's unit and integrations tests

import unittest
from unittest import mock
import os
import json
import requests
from app import app, db, github

TEST_DB = 'github_repositories.db'

class BasicTestCase(unittest.TestCase):
    def setUp(self):
        """Set up a blank temp database before each test"""
        basedir = os.path.abspath(os.path.dirname(__file__))
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
            os.path.join(basedir, TEST_DB)
        self.array = '{"repositories":[{"repo_id":1,"name":"freeCodeCamp"},{"repo_id":2,"name":"node"}]}'
        self.app = app.test_client()
        db.drop_all()
        db.create_all()

    def tearDown(self):
        """Destroy blank temp database after each test"""
        db.drop_all()

    def test_integration_with_github(self):
        """Test github GraphQL API integration"""
        repos = github.repos(first=2,language='javascript')
        self.assertEqual(len(repos.edges),2)
        
    def test_index(self):    
        response = self.app.get('/', content_type='html/text')
        self.assertEqual(response.status_code,200)
        self.assertIn(b'Listing top repositories',response.data)

    def test_index_returns_not_empty(self):
        """Ensure response json"""
        response = self.app.get('/',content_type='html/text')
        self.assertIn(b'card-body',response.data)

    def test_save_to_database_and_list(self):
        data = json.loads(self.array)
        expected = data['repositories']

        github.save(data)

        repositories = github.list_repos()

        self.assertIsNotNone(repositories)
        self.assertEqual(len(repositories),len(expected))
        self.assertCountEqual(repositories,expected) # assert lists

    def test_save_to_database(self):
        response = self.app.post('/add',json='{}')
        res = json.loads(response.data)
        self.assertEqual(response.status_code,200)
        self.assertEqual(res['status'],0)

        response = self.app.post('/add',json=self.array)
        res = json.loads(response.data)
        self.assertEqual(res['status'],1)
        expected = json.loads(self.array)['repositories']
        self.assertCountEqual(github.list_repos(),expected)

if __name__ == '__main__':
    unittest.main()
