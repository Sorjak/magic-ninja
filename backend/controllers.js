
const { v4: uuidv4 } = require('uuid');
const { 
    S3Client, 
    GetObjectCommand, 
    ListObjectsV2Command,
    NoSuchKey,
    PutObjectCommand, 
    DeleteObjectCommand,
} = require('@aws-sdk/client-s3');

const img_bucket = process.env.S3_BUCKET_NAME
const dir_bucket = process.env.DIRECTORY_BUCKET_NAME

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

const getCards = async () => {
    const result = await s3.send(
        new ListObjectsV2Command({Bucket: dir_bucket})
    );
    const data = result.Contents;
    if (!data || !data.some(x => x)) return [];

    return await Promise.all(
        data.map(async (item) => {
            const itemId = item.Key.split('.')[0];
            return await getCard(itemId);
        })
    );
};

const getCard = async (itemId) => {
    try {
        const result = await s3.send(
            new GetObjectCommand({
                Bucket: dir_bucket, 
                Key: `${itemId}.json`
            })
        );
        console.log(`Fetched item with id ${itemId}`);
        return JSON.parse(await result.Body.transformToString());

    } catch (NoSuchKey) {
        console.error(`No key exists with id ${itemId}`);
    }

    return null;
};

const addNewCard = async (cardData) => {
    console.log('Adding new card!')

    // Generate new item id and store it.
    itemId = uuidv4();
    cardData.id = itemId;

    await s3.send(
        new PutObjectCommand({
            Bucket: dir_bucket,
            Key: `${itemId}.json`,
            Body: JSON.stringify(cardData)
        })
    );

    return cardData;
};

const updateCard = async (itemId, newData) => {
    const card = await getCard(itemId);
    const newCard = Object.assign(card, newData);

    await s3.send(
        new PutObjectCommand({
            Bucket: dir_bucket,
            Key: `${itemId}.json`,
            Body: JSON.stringify(newCard)
        })
    );

    return newCard;
};

const deleteCard = async (itemId) => {
    await s3.send(new DeleteObjectCommand({
        Bucket: dir_bucket,
        Key: `${itemId}.json`,
    }));
};

const getCardByName = (existingData, cardName) => {
    const cards = Object.values(existingData).filter(x => x.name.toLowerCase() == cardName.toLowerCase());
    return cards.length == 1 ? cards[0] : null;
};

const addCardImage = async (fileName) => {
    const itemId = fileName.split('.')[0];

    let card = await getCard(itemId);
    if (!card) return;

    card['imageUrl'] = fileName;
    return await updateCard(itemId, card);
};

const uploadImage = async (fileObj) => {
    const result = await s3.send(
        new PutObjectCommand({
            Bucket: img_bucket,
            Key: fileObj.name,
            Body: fileObj.data,
            ContentType: fileObj.mimetype
        })
    );
    
    if (result.$metadata.httpStatusCode !== 200) {
        throw Error('AWS returned bad status code');
    }
}

module.exports = {
    getCards,
    getCard,
    addNewCard,
    updateCard,
    deleteCard,
    getCardByName,
    addCardImage,
    uploadImage
};