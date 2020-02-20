# UCLA Research Life Cycle

## Setup

### Install Python
make sure you have Python installed:
https://www.python.org/downloads/

### Clone the repo
`git clone https://github.com/IDREsandbox/research_life_cycle_hub.git`

Change directory into the project folder:

`cd research_life_cycle_hub`

### Install project requirements with pip
`pip install -r requirements.txt`

### Request Access to the database
We'll provide you with the credentials for running the project if you need to connect to our database in a `config.py` file.

## Using the Project

### Run the application
`python app.py`

### Access the API*
*Note: The API only works if you have the config.py file*
#### get all data:
`localhost:5000/api/all`
#### get phases:
`localhost:5000/api/phase`
#### get tasks:
`localhost:5000/api/task`
#### get insitutes:
`localhost:5000/api/institute`
#### get people:
`localhost:5000/api/people`
