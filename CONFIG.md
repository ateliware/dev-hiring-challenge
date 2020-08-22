# GitHub Search

## How to run ?

1. Clone the repository
2. Create a virtualenv with python 3.8.0 or newer
3. Active your virtualenv
4. Install the dependencies
5. Configure the instance with .env file
6. Run the tests

```shell
git clone https://github.com/felipefrizzo/challenge
cd challenge
pyenv install 3.8.0
pyenv virtualenv 3.8.0 challenge
pyenv local challenge
pip install -r requirements.txt
cp contrib/env-sample .env
python manage.py test
```
