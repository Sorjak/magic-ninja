const path = require("path");
const ctrl = require('./controllers');

module.exports = function(app){

    app.get([/^(?!\/api).*/], async (req, res) => {
        res.sendFile(path.join(__dirname, './dist', 'index.html'));
    });

    app.post('/api/cards', async (req, res) => {
        const incomingData = req.body;
        console.log(`POST /api/cards ${JSON.stringify(incomingData)}`);

        const existingData = await ctrl.getCards();

        let card = ctrl.getCardByName(existingData, incomingData.name);
        if (card !== null) {
            return res.send(card);
        }

        try {
            card = await ctrl.addNewCard(incomingData);
            res.send(card);
        } catch (err) {
            console.error('Error adding new card:', err);
            return res.status(400).send(err);
        }
    });

    app.get('/api/cards', async (req, res) => {
        console.log(`GET /api/cards`);

        res.send(await ctrl.getCards());
    });

    app.get('/api/cards/:id', async (req, res) => {
        const itemId = req.params.id;
        console.log(`GET /api/cards/${itemId}`);

        const card = await ctrl.getCard(itemId);
        if (!card) return res.status(404).send('No card found');

        res.send(card);
    });

    app.put('/api/cards/:id', async (req, res) => {
        const itemId = req.params.id;
        const incomingData = req.body;
        console.log(`PUT /api/cards/${itemId} ${JSON.stringify(incomingData)}`);

        const card = await ctrl.getCard(itemId);
        if (!card) return res.status(404).send('No card found');

        const newCard = await ctrl.updateCard(itemId, incomingData);
        res.send(newCard);
    });

    app.delete('/api/cards/:id', async (req, res) => {
        const itemId = req.params.id;
        console.log(`DELETE /api/cards/${itemId}`);

        const card = await ctrl.getCard(itemId);
        if (!card) return res.status(404).send('No card found');

        await ctrl.deleteCard(itemId);
        res.send({'result': 'success'});
    });

    app.post('/api/upload', async (req, res) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const imageFile = req.files.imageFile;
        console.log(`POST /api/upload ${imageFile.name}`);

        await ctrl.uploadImage(imageFile);
        const updateCard = await ctrl.addCardImage(imageFile.name);
        res.send(updateCard);
    });

}