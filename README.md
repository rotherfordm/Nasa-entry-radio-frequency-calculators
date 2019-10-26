# Techno PH Website and Calculators
Thanks for checking out our project.
\
\
Visit our team website [Techno PH](https://technoph.site/).
\
\
A website made with [Flask](https://github.com/pallets/flask) and [Python](https://github.com/python).\
Contains the calculators and sample simulators.

## 1. Installation

Install [Python Github](https://github.com/python) or [Python Website](https://www.python.org/)

Install [virtualenv](https://pypi.org/project/virtualenv/)

```
pip virtualenv
```

Make virtual environment
```
virtualenv venv
```

Enter virtual environment

```
#Windows
venv\Scripts\activate


#Linux
source venv/bin/activate
```

Install packages
```
pip install -r requirements.txt
```


## 2. Running on local server
```
set FLASK_APP=application.py
set FLASK_ENV=development
set FLASK_DEBUG=true 
flask run
```

## 3. Applicable NASA Data Resources

- ### [NASA Shuttle Radar Topography Mission (NASA SRTM v3)](https://doi.org/10.5067/MEaSUREs/SRTM/SRTMGL1.003)
  The purpose of the SRTM was to generate a digital elevation model (DEM) of 80% of the Earth's 
  surface using radar interferometry.  
  
  Using [NASA's World View](worldview.earthdata.nasa.gov),
  we manually retrieved the topographical elevation data of a location by matching the latitude and 
  longitude.
  It has indicator such as the white color that indicates the highest elevations, then brown, yellow and 
  greens indicate low elevations.

  We use the elevation data for determining the height of the antenna location with reference to above sea 
  level (ASL) distance.

  
- ### [Global Geostationary Weather Satellite Images (GOES)](https://www.nasa.gov/content/goes)
  GOES' geostationary status (in which the satellite is always in the same position with respect to the 
  rotating Earth) allows it to hover over one position on the Earth's surface and provide constant vigil 
  for the atmospheric "triggers" for severe weather conditions such as tornadoes, flash floods, hail storms 
  and hurricanes.
  
  We manually retrieve High-level atmospheric water vapor, winds, rainfall data in GOES([Link](https://weather.msfc.nasa.gov/)). Weather conditions 
  can affect the maximum power transfer among antenna sites. 



- ### [Earth Observatory Natural Event Tracker (EONET)](https://eonet.sci.gsfc.nasa.gov/)
  EONET is a repository of metadata about natural events. EONET is accessible via web services.

  We use the [EONET API](https://eonet.sci.gsfc.nasa.gov/api/v2.1/) in the calculators to retrieve data 
 about storms. The determining the path of storms is critical in the operation of WISH. Disturbances in 
 between and among the antenna sites may affect the maximum power transfer of antennas.



- ### [Goddard radio-frequency explorer Radio frequency Interference real time Display system (GRID)](https://catalog.data.gov/dataset/goddard-radio-frequency-explorer-radio-frequency-interference-real-time-display-system/resource/f25edeac-2b93-4dc8-9c23-6edd44b827c2)
  Any radio frequencies that are in exact value with the assigned frequency of operation will pose as a noise to WISH. Also, determining the harmonic frequencies will aid the communications designer to better his/her network.

## 4. Other Data Resources

- ### National Centers For Environmental Information (NOAA)
  We have used [Visible Earth Nasa](https://visibleearth.nasa.gov/images/73963/bathymetry) and [Bathmetry](https://maps.ngdc.noaa.gov/viewers/bathymetry/) to determine undersea land surface and water depth.
  \
  \
  The Philippines is an island archipelago surrounded by salt water, differing heights in topography which 
  may result to line-of-sight propagation, degree vegetation and natural structures, and etc. 
  \
  \
  These elements are factors which can affect signal transmission and reception.
  Water in its pure form is considered as an insulator. In its natural state, water contains dissolved 
  salts and other matter which makes it a partial conductor. The higher the conductivity, the greater the 
  attenuation of radio signals which pass through it (Pieraccini, et al, 2009).
   
  [Visible Earth Nasa](https://visibleearth.nasa.gov/images/73963/bathymetry)\
  [NASA - NOAA weather satellite](https://www.nasa.gov/press-release/nasa-successfully-launches-noaa-advanced-geostationary-weather-satellite)\
  [NASA - NOAA](https://www.nasa.gov/subject/3649/noaa/)
  [Bathmetry](https://maps.ngdc.noaa.gov/viewers/bathymetry/)

- ### Central Pacific Hurricane Center - National Hurricane Center (NHC and CPHC)
  We would use the these [data](https://www.nhc.noaa.gov/) to check and manually verify hurricanes and storms. The determining the path of storms is critical in the operation of WISH. Disturbances in 
 between and among the antenna sites may affect the maximum power transfer of antennas.


