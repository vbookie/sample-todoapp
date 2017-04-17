# TODO APP

Used Python 3.6.1, MongoDB 3.2.9, Angular 2

It's recommended to use Virtualenv

The following addresses/ports are used:
mongoDB: localhost:27017
API server: localhost:8000
SPA: localhost:3000

Install the python packages:
pip3 install -r requirements.txt

Run the API server:
gunicorn app

Run the SPA:
within webapp folder - npm start