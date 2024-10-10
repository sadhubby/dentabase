// this file is essentially the api routes. 

// will be most used libraries
const express = require('express');
const Router = require('express');

// other libraries to be added based on necessity / user stories.

// mongoose models, add based on user stories

const Patient = require('../models/patient');
const Treatment = require('../models/treatment');


const router = Router();
router.use(express.json());


