const fs = require('node:fs');
const path = require("path");

const cors = require("cors");
const dotenv = require('dotenv');
const express = require("express");
const fileUpload = require('express-fileupload');

dotenv.config({path: '.env'});

const app = express();

app.use(express.static(path.join(__dirname, './dist')));

app.use(cors({origin: '*'}));
app.use(express.json());
app.use(fileUpload());

require('./routes')(app);

app.listen(process.env.SERVER_PORT, async () => {
  console.log("Server is up on port: ", process.env.SERVER_PORT);
  console.log("Using: ", process.env.VITE_API_BASE);
  console.log("Using: ", process.env.VITE_API_PORT);
  console.log("Using: ", process.env.S3_BUCKET_NAME);
  console.log("Using: ", process.env.DIRECTORY_BUCKET_NAME);
});
