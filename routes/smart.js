const express = require('express');
const router = express.Router();
const fhirClient = require('fhirclient');
// const Categories = require('../models/');


router.get("/launch",(req,res)=>{
    fhirClient(req, res).authorize({
        "client_id": "my_web_app",
        "scope": "patient/*.read"
    });
});


router.get("/",(req,res)=>{
    fhirClient(req, res).ready()
        .then(client => client.request("Patient"))
        .then(res.json)
        .catch(res.json);
});
