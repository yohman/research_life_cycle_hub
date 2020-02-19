# app.py
# bring in flask
from flask import Flask, render_template,flash, redirect, request, url_for,jsonify
from models import *
from playhouse.shortcuts import model_to_dict, dict_to_model

# define the application
app = Flask(__name__)

# set the default route
@app.route('/')
def index():
    group = Phase.select()
    print(group)
    for i in group:
        print(i.name)
    hello = str(group)
    return hello

@app.route('/get_phases')
def phase_api():
    user_obj = Phases.select()
    # for data in user_obj:
    #     user_dict = model_to_dict(data, recurse=False)
    data = [model_to_dict(r) for r in user_obj]
    print(data)
    return jsonify(data)

@app.route('/get_tasks')
def task_api():
    user_obj = Task.select()

    data = [model_to_dict(r) for r in user_obj]
    print(data)
    return jsonify(data)


@app.teardown_request
def _db_close(exc):
    if not db.is_closed():
        db.close()

if __name__ == '__main__':
    app.run(debug=True)
