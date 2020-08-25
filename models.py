# Import from peewee
import peewee 
from flask import session
from playhouse.postgres_ext import PostgresqlExtDatabase

import os
    
# load the config file
try:
    from config import Config
    print('not on heroku!')
    DATABASE_URL = Config.DATABASE_URL
    if Config.HEROKU == 'FALSE':
        sslvalue='disable'
    else:
        sslvalue='require'
except:
    print('in heroku')
    sslvalue='require'

# import psycopg2
from flask_peewee.auth import Auth
from flask_peewee.db import Database
from playhouse.db_url import connect
from flask_admin.contrib.peewee import ModelView

db = connect(os.environ.get('DATABASE_URL') or Config.DATABASE_URL, sslmode=sslvalue)

# db = PostgresqlDatabase(database=d_b, user=usr, password=pwd, host=hst, port=prt)
# db.connect()



class Phase(peewee.Model):
    id = peewee.AutoField(primary_key=True)
    name = peewee.TextField()
    description = peewee.TextField()
    color = peewee.TextField()
    order = peewee.IntegerField()
    created_at = peewee.DateTimeField()

    class Meta:
        database = db
        db_table = 'phase'

class Task(peewee.Model):
    id = peewee.AutoField(primary_key=True)
    name = peewee.TextField()
    description = peewee.TextField()
    order = peewee.IntegerField()
    created_at = peewee.DateTimeField()
    phase_id = peewee.ForeignKeyField(Phase)

    class Meta:
        database = db
        db_table = 'task'


class Institute(peewee.Model):
    id = peewee.AutoField(primary_key=True)
    name = peewee.TextField()
    description = peewee.TextField()
    acronym = peewee.TextField()
    created_at = peewee.DateTimeField()
    url = peewee.TextField()
    color = peewee.TextField()
    class Meta:
        database = db
        db_table = 'institute'


class Person(peewee.Model):
    id = peewee.AutoField(primary_key=True)
    first_name = peewee.TextField()
    last_name = peewee.TextField()
    name = peewee.TextField()
    description = peewee.TextField()
    created_at = peewee.DateTimeField()
    contact_info = peewee.TextField()

    class Meta:
        database = db
        db_table = 'person'

class UserView(ModelView):
     form_excluded_columns = ('name','created_at')

class Tag(peewee.Model):
    id = peewee.AutoField(primary_key=True)
    name = peewee.TextField()
    description = peewee.TextField()
    created_at = peewee.DateTimeField()

    class Meta:
        database = db
        db_table = 'tag'


## Begin junction tables here ##

class InstituteTask(peewee.Model):
    id = peewee.IntegerField()
    institute_id = peewee.ForeignKeyField(Institute)
    task_id = peewee.ForeignKeyField(Task)

    class Meta:
        database = db
        db_table = 'institute_to_task'

class PersonInstitute(peewee.Model):
    institute_id = peewee.ForeignKeyField(Institute)
    person_id = peewee.ForeignKeyField(Person)

    class Meta:
        database = db
        db_table = 'person_to_institute'


class TagPerson(peewee.Model):
    tag_id = peewee.ForeignKeyField(Tag)
    person_id = peewee.ForeignKeyField(Person)

    class Meta:
        database = db
        db_table = 'tag_to_person'


class TagTask(peewee.Model):
    task_id = peewee.ForeignKeyField(Task)
    tag_id = peewee.ForeignKeyField(Tag)

    class Meta:
        database = db
        db_table = 'tag_to_task'


# VIEWS

class TaskView(peewee.Model):
    id = peewee.AutoField(primary_key=True)
    name = peewee.TextField()
    description = peewee.TextField()
    order = peewee.IntegerField()
    created_at = peewee.DateTimeField()
    phase_id = peewee.IntegerField()

    class Meta:
        database = db
        db_table = 'task'
        
class InstituteTaskView(peewee.Model):
    id = peewee.IntegerField()
    institute_id = peewee.IntegerField()
    task_id = peewee.IntegerField()

    class Meta:
        database = db
        db_table = 'institute_to_task'

