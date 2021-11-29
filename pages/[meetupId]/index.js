import { MongoClient, ObjectId } from "mongodb"; 
import MeetupDetail from '../../components/meetups/MeetupDetail';

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://danengel:*Oscar1229@nextjs.apbbd.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupCollection = db.collection('meetups');
  const meetups = await meetupCollection.find().toArray();
  console.log('These are the meetups', meetups);
  client.close();

  return {
      fallback: false,
      paths: meetups.map((meetup) => ({
          params: { meetupId: meetup._id.toString() },
        })),
  }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    console.log('meetupID', meetupId);

    const client = await MongoClient.connect(
        "mongodb+srv://danengel:*Oscar1229@nextjs.apbbd.mongodb.net/meetups?retryWrites=true&w=majority"
      );
      const db = client.db();
      const meetupCollection = db.collection("meetups");
      const selectedMeetup = await meetupCollection.findOne({ _id: ObjectId(meetupId),
    });
      client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            }
        }
    }
}

export default function MeetupDetails(props) {
  return (
  <MeetupDetail
    id={props.meetupData.id}
    image={props.meetupData.image}
    title={props.meetupData.title}
    address={props.meetupData.address}
    description={props.meetupData.description}
  />
)}
