import { MongoClient } from "mongodb";

export default async function deleteHandler(req) {
    if (req.method === 'DELETE') {
        const data = req.body;
        const client = await MongoClient.connect('mongodb+srv://danengel:*Oscar1229@nextjs.apbbd.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();
        const meetupsCollections = db.collection('meetups');

        const result = await meetupsCollections.deleteOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'meetup deleted'});
    }
}