import JoinButton from "../components/JoinButton";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { Event } from "../models/Event";
import "./EventMeeting.css";

interface Props {
  event: Event;
  onClose: () => void;
  onRateEvent: (rating: number) => void;
}

export default function EventMeeting({ event, onClose, onRateEvent }: Props) {
  const [member, setMember] = useState(1);
  const [value, setValue] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [rating, setRating] = useState(0);

  interface Comment {
    id: number;
    text: string;
  }

  function handleRating(rate: number) {
    setRating(rate);
    onRateEvent(rate);
  }

  function createComment() {
    let cloneComments: Comment[] = [
      ...comments,
      {
        id: comments.length + 1,
        text: value,
      },
    ];

    setComments(cloneComments);
  }

  return (
    <div className="event-meeting">
      <div className="join">
        <JoinButton member={member} setMember={setMember} />
        <span className="going">{member} are going</span>
      </div>
      <header>
        <h1>{event.title}</h1>
      </header>

      <main>
        <div className="starflex">
          <Rating onClick={handleRating} ratingValue={rating} />
          <div className="rating">Rating: {event.rating}</div>
        </div>

        <p className="description">{event.description}</p>
        <span>Leave a comment: </span>
        <input
          type="text"
          onChange={(event: any) => setValue(event.target.value)}
        />
        <button onClick={() => createComment()} className="sendBtn">
          Send
        </button>

        <div className="flex-wrapper">
          {comments.map((comment) => (
            <p key={comment.id} id={comment.text}>
              {comment.text}
            </p>
          ))}
        </div>
      </main>
      <footer>
        <button onClick={onClose} className="homeButton">
          Back
        </button>
      </footer>
    </div>
  );
}


