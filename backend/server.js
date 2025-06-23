const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require('node:fs');
const { v4: uuidv4 } = require('uuid');
const fileUpload = require('express-fileupload');

const filePath = 'cards.json';
const imagePath = 'images'

if (!fs.existsSync(imagePath)){
    fs.mkdirSync(imagePath);
}

const app = express();

app.use(express.static(path.join(__dirname, './dist')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.get([/^\/card(.*)/, '/rules', '/about'], (req, res) => {
    res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

function getExistingData() {
  let existingData = {}
  try {
    existingData = JSON.parse(fs.readFileSync(filePath));
  } catch {
    console.log(`${filePath} does not exist.`);
  }

  return existingData;
}

function addNewCard(existingData, newData) {
  console.log('Adding new card!')

  // Generate new item id and store it.
  itemId = uuidv4();
  newData.id = itemId;
  updateCard(existingData, itemId, newData);

  return newData;
}

function updateCard(existingData, itemId, newData) {
  existingData[itemId] = newData;
  fs.writeFileSync(filePath, JSON.stringify(existingData));
}

function deleteCard(existingData, itemId) {
  delete existingData[itemId];
  fs.writeFileSync(filePath, JSON.stringify(existingData));
}

function getCardByName(existingData, cardName) {
  let cards = Object.values(existingData).filter(x => x.name.toLowerCase() == cardName.toLowerCase());
  return cards.length == 1 ? cards[0] : null;
}

function getCardById(existingData, cardId) {
  return existingData[cardId] || null;
}

function addCardImage(fileName) {
    let itemId = fileName.split('.')[0];
    let existingData = getExistingData();

    let card = getCardById(existingData, itemId);
    if (!card) return;

    card['imageUrl'] = fileName;
    updateCard(existingData, itemId, card);
    return card;
}

app.post('/api/cards', (req, res) => {
  let incomingData = req.body;
  console.log(`POST /api/cards ${JSON.stringify(incomingData)}`);

  let existingData = getExistingData();

  let card = getCardByName(existingData, incomingData.name);
  if (card !== null) {
    return res.send(card);
  }

  try {
    card = addNewCard(existingData, incomingData);
  } catch (err) {
    console.error('Error adding new card:', err);
    return res.status(400).send(err);
  }

  res.send(card);
});

app.get('/api/cards', (req, res) => {
  console.log(`GET /api/cards`);
  let existingData = getExistingData();

  res.send(existingData);
});

app.get('/api/cards/:id', (req, res) => {
  let itemId = req.params.id;
  console.log(`GET /api/cards/${itemId}`);
  let existingData = getExistingData();

  let card = getCardById(existingData, itemId);
  if (card == null) return res.status(404).send('No card found');

  res.send(card);
});

app.put('/api/cards/:id', (req, res) => {
  let itemId = req.params.id;
  let incomingData = req.body;
  console.log(`PUT /api/cards/${itemId} ${JSON.stringify(incomingData)}`);

  let existingData = getExistingData();

  let card = getCardById(existingData, itemId);
  if (card == null) return res.status(404).send('No card found');

  let newCard = Object.assign(card, incomingData);
  updateCard(existingData, itemId, newCard);
  res.send(newCard);
});

app.delete('/api/cards/:id', (req, res) => {
  let itemId = req.params.id;
  console.log(`DELETE /api/cards/${itemId}`);

  let existingData = getExistingData();

  let card = getCardById(existingData, itemId);
  if (card == null) return res.status(404).send('No card found');

  deleteCard(existingData, itemId);
  res.send({'result': 'success'});
});

app.post('/api/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let imageFile = req.files.imageFile;
  console.log(`POST /api/upload ${imageFile.name}`); 

  imageFile.mv(`${imagePath}/${imageFile.name}`, function(err) {
    if (err) return res.status(500).send(err);

    let card = addCardImage(imageFile.name);
    res.send(card);
  });
});

app.listen(3001, () => {
  console.log("Server is up on port", 3001);
});
