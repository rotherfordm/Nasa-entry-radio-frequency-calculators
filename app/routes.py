import logging
import json
import os
import math
import requests

from uuid import uuid4
from app import app, db

from config import Config

from flask import (Flask, flash, g, jsonify, redirect, render_template,
                   request, url_for)

from sqlalchemy import create_engine, desc, or_
from sqlalchemy.orm import sessionmaker
from werkzeug.exceptions import HTTPException
from werkzeug.urls import url_parse
from werkzeug.utils import secure_filename

engine = create_engine(Config.SQLALCHEMY_DATABASE_URI, echo=True)
Session = sessionmaker(bind=engine)


logging.basicConfig(level=logging.DEBUG)


@app.before_first_request
def create_database():
    db.create_all()
    db.session.commit()

@app.route("/")
@app.route("/index", methods=["GET"])
def index():
    return render_template('index.html', title='Home')

@app.route("/signal_range", methods=["GET", "POST"])
def signal_range():
    return render_template('signal_range.html', title='Signal Range Calculator')

@app.route("/distance_calculator", methods=["GET", "POST"])
def distance_calculator():
    return render_template('distance_calculator.html', title='Distance Calculator')

@app.route('/compute_signal_range', methods=["POST"])
def compute_signal_range():
    HTx = request.args.get('HTx')
    HRx = request.args.get('HRx')

    r = (math.sqrt(2) * float(HTx)) + (math.sqrt(2) * float(HRx))

    return {"r": r, 'unit': 'miles'}

@app.route('/compute_distance', methods=["POST"])
def compute_distance():

    X1 = float(request.args.get("X1"))
    Y1 = float(request.args.get("Y1"))
    X2 = float(request.args.get("X2"))
    Y2 = float(request.args.get("Y2"))

    
    r = (math.sqrt( ((X2 - X1)**2) + ((Y2 - Y1)**2) )) * 100

    return {"r": r, 'unit': ''}
    

@app.route('/weather_disturbance', methods=["GET", "POST"])
def weather_disturbance():
    r = requests.get(url="https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories/10")

    return render_template('weather_disturbance.html', title='Weather Disturbance/Outage Status', events=r.json()['events'])

@app.route("/demo_anim", methods=["GET"])
def demo_anim():
    return render_template('demo_anim.html', title='Demo Animations')


@app.route("/antenna_and_storm_locators", methods=["GET"])
def antenna_and_storm_locators():
    return render_template('antenna_and_storm_locators.html', title='Antenna and Storms Locator')


@app.route('/storm_data', methods=["GET"])
def storm_data():
    r = requests.get(url="https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories/10")

    return jsonify(r.json()['events'])

@app.route("/attenuation_water", methods=["GET"])
def attenuation_water():
    return render_template('attenuation_water.html', title='Attenuation of radio waves in water Calculator')


@app.route('/compute_attenuation_water', methods=["POST"])
def compute_attenuation_water():
    frequency = float(request.args.get("frequency"))
    conductivity = float(request.args.get("conductivity"))

    r =  0.0173 * (math.sqrt( frequency * conductivity )) * (1)

    return {"r": r, 'unit': 'dB/metre'}

    