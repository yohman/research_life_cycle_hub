# app.py
# bring in flask
from flask import Flask, render_template,flash, redirect, request, url_for,jsonify

from playhouse.shortcuts import model_to_dict, dict_to_model
from playhouse.dataset import DataSet

# try:
#     from models import *
# except:
#     print('Warning: Missing config.py file, cannot access database.')

from models import *

# function for querying the data
def model_select(model):
    model_obj = model.select()
    json_obj = [model_to_dict(r) for r in model_obj]
    return json_obj

# function to get data in a list
def add_data(*args):
    for r in args:
        print(args.index(r))
        if args.index(r) == 0:
            data = model_select(r)
        else:
            data += model_select(r)
    return data

# define the application
app = Flask(__name__)

# set the default route
@app.route('/')
def index():
    return render_template('map.html')

def find_table(table):
    return table

# route for the API for individual data
@app.route('/api/<data>')
def the_api(data):
    if data == "all":
        the_data = add_data(Phase,Task,Institute,Person)
    elif data == "phase":
        the_data = add_data(Phase)
    elif data == "task":
        the_data = add_data(Task)
    elif data == "institute":
        the_data = add_data(Institute)
    elif data == "institute2task":
        the_data = add_data(InstituteTask)        
    elif data == "person":
        the_data = add_data(Person)
        
    # tables = db.get_tables()
    # # print(tables)
    # if data in tables:
    #     print('hello data')
    #     find_table(data)
    # for t in tables:
        # print(t._meta.db_table)
        # print(t)
    # print(Phase._meta.table)
    return jsonify(the_data)

# @app.route('/get_tasks')
# def task_api():
#     user_obj = Task.select()

#     data = [model_to_dict(r) for r in user_obj]
#     print(data)
#     return jsonify(data)


@app.teardown_request
def _db_close(exc):
    if not db.is_closed():
        db.close()

if __name__ == '__main__':
    app.run(debug=True)
