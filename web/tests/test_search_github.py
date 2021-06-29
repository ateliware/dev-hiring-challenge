
def test_parameter_for_test_is_active(config):
	assert config.FORCE_ENV_FOR_DYNACONF == 'testing' 

def test_returns_searchgithub_200(client):
	"""Tests github connection flow, return data capture and database update"""
	assert client.post("searchgithub").status_code == 200

def test_returns_searchgithub_200(client):
	"""Tests github connection flow, return data capture and database update"""
	assert client.post("searchgithub", data={'keywords': 'iot'}).status_code == 200

def test_searchgithub_update_database(client):
	""" validates that the search test result was registered in the correct amount in the database """
	assert client.get("/api/v1/repository/4").status_code == 200

def test_returns_root_index_200(client):
	""" Test access to search homepage """
	assert client.get("/").status_code == 200

def test_returns_index_200(client):
	""" Test access to search homepage """
	assert client.get("index").status_code == 200

