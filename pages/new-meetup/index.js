import router from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from 'next/router';

export default function NewMeetupPage() {
    const router = useRouter();

    async function addMeetupHandler(meetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers: {
                'Content-Type':'application/json'
            }
        });
        const data = await response.json();
        // console.log('data', data);

        router.replace('/');
    } 
    return <NewMeetupForm onAddMeetup={addMeetupHandler}/>
}