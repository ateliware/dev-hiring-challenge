## Search Repo
Give the name and 5 preferred languages return main repositories on github



## Installation

- Install docker in you computer

- In the main folder open cmd and run:
	- $ docker-compose up --build 



- while docker is running open other cmd prompt go to main folder and run:
	- $ docker-compose exec web python TestAtaliware/manage.py migrate



- if want to access the djang admin create a super user with the command:
	- $ docker-compose exec web python TestAtaliware/manage.py createsuperuser