//import express from 'express';
const express = require('express');

//import .env
//require("dotenv").config()
//const { API_TOKEN, PORT } = process.env 
const {API_TOKEN,PORT} = require('./config.json')

//import createClient from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
//import {createClient} from '@supabase/supabase-js'
const supabaseClient = require('@supabase/supabase-js');

//import morgan from 'morgan';
const morgan = require('morgan');

//import bodyParser from "body-parser";
const bodyParser = require('body-parser');

//import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

const app = express();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const supabase = supabaseClient.createClient('https://gqhdrybfqogqemfhtzbq.supabase.co',API_TOKEN)


app.get('/contatos', async (req, res) => {
    const {data, error} = await supabase
        .from('contatos')
        .select()
    res.send(data);
    console.log(`lists all products${data}`);
});

app.get('/contatos/:id', async (req, res) => {
    console.log("id = " + req.params.id);
    const {data, error} = await supabase
        .from('contatos')
        .select()
        .eq('id', req.params.id)
    res.send(data);

    console.log("retorno "+ data);
});

app.post('/contatos', async (req, res) => {
    const {error} = await supabase
        .from('contatos')
        .insert({
            nome: req.body.nome,
            numero: req.body.numero,
            endereco: req.body.endereco,
        })
    if (error) {
        res.send(error);
    }
    res.send("created!!");
    console.log("retorno "+ req.body.nome);
    console.log("retorno "+ req.body.numero);
    console.log("retorno "+ req.body.endereco);

});

app.put('/contatos/:id', async (req, res) => {
    const {error} = await supabase
        .from('contatos')
        .update({
            nome: req.body.nome,
            numero: req.body.numero,
            endereco: req.body.endereco,
        })
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("updated!!");
});

app.delete('/contatos/:id', async (req, res) => {
    console.log("delete: " + req.params.id);
    const {error} = await supabase
        .from('contatos')
        .delete()
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("deleted!!")
    console.log("delete: " + req.params.id);

});

app.get('/', (req, res) => {
    res.send("Supabase online!");
});

app.get('*', (req, res) => {
    res.send("Funcionando!");
});

app.listen(PORT, () => {
    console.log(`> Ready on http://localhost:3000`);
});