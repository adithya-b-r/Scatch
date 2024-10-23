const express = require('express');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const app = express();