import logging
import json
import os
import math

from uuid import uuid4
from app import app, db

from app.forms import AddStudentTransactionForm, LoginForm, RegistrationForm, EditUserForm, PublicEditUserForm, LandingPageEditForm, AddFeedbackForm, EncodeSubjectForm
from app.models import StudentTransaction, User, WebsiteData, Feedback, Subject


from config import Config

from flask import (Flask, flash, g, jsonify, redirect, render_template,
                   request, url_for)
from flask_login import current_user, login_required, login_user, logout_user
from sqlalchemy import create_engine, desc, or_
from sqlalchemy.orm import sessionmaker
from werkzeug.exceptions import HTTPException
from werkzeug.urls import url_parse
from werkzeug.utils import secure_filename

engine = create_engine(Config.SQLALCHEMY_DATABASE_URI, echo=True)
Session = sessionmaker(bind=engine)


logging.basicConfig(level=logging.DEBUG)

@app.before_request
def before_request():
    g.user = current_user

@app.before_first_request
def create_database():
    db.create_all()
    db.session.commit()

@app.route("/")
@app.route("/index", methods=["GET"])
def index():
    return render_template('index.html', title='Home')

@app.route("/line_of_sight", methods=["GET", "POST"])
def line_of_sight():
    return render_template('line_of_sight.html', title='Line of Sight Calculator')

@app.route("/radio_horizon", methods=["GET", "POST"])
def radio_horizon():
    return render_template('radio_horizon.html', title='Radio Horizon Calculator')

@app.route('/compute_radio_horizon', methods=["POST"])
def compute_radio_horizon():
    HTx = request.args.get('HTx')
    HRx = request.args.get('HRx')

    #Sqrt2* height of antenna transmitter + Sqrt2* height of antenna receiver
    r = (math.sqrt(2) * float(HTx)) + (math.sqrt(2) * float(HRx))

    return {"r": r, 'unit': 'miles'}

@app.route('/compute_light_of_sight', methods=["POST"])
def compute_light_of_sight():

    X1 = float(request.args.get("X1"))
    Y1 = float(request.args.get("Y1"))
    X2 = float(request.args.get("X2"))
    Y2 = float(request.args.get("Y2"))

    
    r = (math.sqrt( ((X2 - X1)**2) + ((Y2 - Y1)**2) ))

    return {"r": r, 'unit': ''}
    

    
