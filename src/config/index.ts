import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import appConfig from './config';
import routes from '../routes';

// Configure express and middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

// Declare the static folder
const dir = "public";
const subDir = "public/uploads";

// Creating the directory if it doesn't exist
if(!fs.existsSync(dir)){ 
  fs.mkdirSync(dir); 
  fs.mkdirSync(subDir);
}

// Listen on port
app.listen(appConfig.port, () => {
  console.log(`Server is listening on port ${appConfig.port}`);
});


module.exports = app;
