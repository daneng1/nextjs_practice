import { useRouter } from 'next/router';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

export default function MeetupDetail({ id, title, address, image, description }) {
    const router = useRouter();

    function showDetailsHandler() {
        router.push(`/`)
    }

    const newLoc = address.split(' ').join('+');
    console.log(newLoc);
    
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <a className={classes.link} href={`https://google.com/maps/place/${newLoc}`} target='_blank'><address>{address}</address></a>
          <p>{description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Return to All</button>
        </div>
      </Card>
    </li>
  );
}