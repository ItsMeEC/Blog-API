const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

const {DATABASE_URL} = require('../config');
const {BlogPost} = require('../models');
const {closeServer, runServer, app} = require('../server');
