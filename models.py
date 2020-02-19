# Import from peewee
from peewee import *
from flask import session
from playhouse.postgres_ext import PostgresqlExtDatabase

# load the config file
from config import Config
from flask_peewee.auth import Auth
from flask_peewee.db import Database

# used for passwords
# from flask_bcrypt import generate_password_hash, check_password_hash

db = PostgresqlDatabase(database=Config.DATABASE, user=Config.USERNAME, password=Config.SECRET_KEY,
host=Config.HOST, port=Config.PORT)

db.connect()

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