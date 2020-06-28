# Task tracker

System construct on django rest framework and react. Allows to track any tasks, divided by projects, trackers, statuses and other params. Also allows leave comments and association between tasks.

# How to run on Linux

1. Clone or download the code
2. Extract code and install requirements to virtual environment via: `$ pip install -r requirements.txt`
3. Apply migrations to DB: `$ python3 manage.py migrate`
4. Fill the DB with the initial data. Apply all sql from fill_before.sql
5. To start API service run command: `$ python manage.py runserver`
6. Frontend starts from frontend directory: `$ npm start`
7. By default system will be available on http://127.0.0.1:3000

# Environment

Some of the project settings are taken from environment variables. To define them, create a .env file next to manage.py and write the data there in this format: VARIABLE=value.

2 variables are available:
DEBUG-debug mode. Set True to see debugging information in case of an error.
SECRET_KEY-the project's secret key

# Project Goals

The code is written for educational purposes
