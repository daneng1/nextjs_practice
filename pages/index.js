import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb'


export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://danengel:*Oscar1229@nextjs.apbbd.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupCollection = db.collection('meetups');

  const meetups = await meetupCollection.find().toArray();
  
  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      }))
    },
    revalidate: 1
  };
}
export default function Home(props) {
  return (
    <MeetupList meetups={props.meetups} />
  )
}
