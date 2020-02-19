# app.py
# bring in flask
from flask import Flask, render_template,flash, redirect, request, url_for,jsonify
from models import *


# define the application
app = Flask(__name__)

# set the default route
@app.route('/')
def index():
    group = Institute.select()
    print(group)
    for i in group:
        print(i.name)
    hello = str(group)
    return hello



    
@app.teardown_request
def _db_close(exc):
    if not db.is_closed():
        db.close()

if __name__ == '__main__':
    app.run(debug=True)
