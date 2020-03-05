# Import from peewee
from peewee import *
from flask import session
from playhouse.postgres_ext import PostgresqlExtDatabase

import os
    
# load the config file
try:
    from config import Config
    print('not on heroku!')
    # d_b = Config.DATABASE
    # usr = Config.USERNAME
    # pwd = Config.SECRET_KEY
    # hst = Config.HOST
    # prt = Config.PORT
    DATABASE_URL = Config.DATABASE_URL
except:
    # d_b = os.environ['DATABASE']
    # usr = os.environ['USERNAME']
    # pwd = os.environ['SECRET_KEY']
    # hst = os.environ['HOST']
    # prt = os.environ['PORT']
    print('in heroku')
    # print(d_b)
    # print(usr)
    # print(pwd)
    # print(hst)
    # print(prt)

# import psycopg2
from flask_peewee.auth import Auth
from flask_peewee.db import Database
from playhouse.db_url import connect

db = connect(os.environ.get('DATABASE_URL') or Config.DATABASE_URL, sslmode='require')

# db = PostgresqlDatabase(database=d_b, user=usr, password=pwd, host=hst, port=prt)
# db.connect()
# tables = db.get_tables()


class Phase(Model):
    id = IntegerField()
    name = TextField()
    description = TextField()
    color = TextField()
    order = IntegerField()
    created_at = DateTimeField()

    class Meta:
        database = db
        db_table = 'phase'

class Task(Model):
    id = IntegerField()
    name = TextField()
    description = TextField()
    order = IntegerField()
    created_at = DateTimeField()
    phase_id = ForeignKeyField(Phase)

    class Meta:
        database = db
        db_table = 'task'

class Institute(Model):
    id = IntegerField()
    name = TextField()
    description = TextField()
    acronym = TextField()
    created_at = DateTimeField()
    url = TextField()
    color = TextField()
    class Meta:
        database = db
        db_table = 'institute'


class Person(Model):
    id = IntegerField()
    name = TextField()
    description = TextField()
    created_at = DateTimeField()
    contact_info = TextField()

    class Meta:
        database = db
        db_table = 'person'



class Tag(Model):
    id = IntegerField()
    name = TextField()
    description = TextField()
    created_at = DateTimeField()

    class Meta:
        database = db
        db_table = 'tag'


## Begin junction tables here ##

class InstituteTask(Model):
    id = IntegerField()
    institute_id = ForeignKeyField(Institute)
    task_id = ForeignKeyField(Task)

    class Meta:
        database = db
        db_table = 'institute_to_task'


class PersonInstitute(Model):
    institute_id = ForeignKeyField(Institute)
    person_id = ForeignKeyField(Person)

    class Meta:
        database = db
        db_table = 'person_to_institute'


class tag_to_person(Model):
    tag_id = ForeignKeyField(Tag)
    person_id = ForeignKeyField(Person)

    class Meta:
        database = db
        db_table = 'tag_to_person'


class TagTask(Model):
    task_id = ForeignKeyField(Task)
    tag_id = ForeignKeyField(Tag)

    class Meta:
        database = db
        db_table = 'tag_to_task'


