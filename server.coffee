express = require 'express'
bodyParser = require 'body-parser'
_ = require 'lodash'
data = require './data.coffee'

app = express()
app.use bodyParser.json()

# middleware that will add the Access-Control-Allow-Origin header to everything
app.use (req, res, next) ->
  res.set 'Access-Control-Allow-Origin', '*'
  next()

# set these headers on all of the OPTIONS preflight responses
app.options '*', (req, res) ->
  res.set 'Access-Control-Allow-Headers', 'accept, content-type'
  res.set 'Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH'
  res.send()

# ---------------------------------------------------------------------

app.get '/formats', (req, res) ->
  res.send data.formats

# ---------------------------------------------------------------------

app.get '/albums', (req, res) ->
  res.send data.albums

app.get '/albums/:albumId', (req, res) ->
  res.send _.find data.albums, id: parseInt req.params.albumId

app.put '/albums/:albumId', (req, res) ->
  data.albums[_.findIndex data.albums, id: parseInt req.params.albumId] = req.body
  res.sendStatus 204

# ---------------------------------------------------------------------

# Get all
app.get '/users', (req, res) ->
  res.send data.users

# Get one
app.get '/users/:userId', (req, res) ->
  res.send _.find data.users, id: parseInt req.params.userId

# Update
app.put '/users/:userId', (req, res) ->
  data.users[_.findIndex data.users, id: parseInt req.params.userId] = req.body
  res.sendStatus 204

# New
app.post '/users', (req, res) ->
  # new objects need IDs
  req.body.id = Date.now()
  # add to the collection
  data.users.push req.body
  res.status(201).send req.body

# Delete
app.delete '/users/:userId', (req, res) ->
  _.remove data.users, id: parseInt req.params.userId
  res.sendStatus 204

app.listen 8081
