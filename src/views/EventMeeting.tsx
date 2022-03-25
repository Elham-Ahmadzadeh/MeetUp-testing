import JoinButton from "../components/JoinButton";
import { useState, useEffect } from "react";
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
  const [join, setJoin] = useState(false);

  interface Comment {
    id: number;
    text: string;
  }

  useEffect(() => {
    const userJoined = localStorage.getItem("join" + event.id);
    const membrNumbers = localStorage.getItem("member" + event.id);
    const updatedMembers = membrNumbers === null ? 1 : parseInt(membrNumbers);
    const getComment = localStorage.getItem(event.id + "comment");
    const updatedComment = getComment === null ? [] : JSON.parse(getComment);
    const updateJoin = userJoined === null ? false : true;
    setMember(updatedMembers);
    setComments(updatedComment);
    setJoin(updateJoin);
  }, [event.id]);
  function handleRating(rate: number) {
    setRating(rate);
    onRateEvent(rate);
  }
  function onClickJoin(member: number) {
    const checkFalse = join ? false : true;
    setJoin(checkFalse);
    setMember(member);
    localStorage.setItem("join" + event.id, checkFalse.toString());
    localStorage.setItem("member" + event.id, member.toString());
  }

  function createComment() {
    let cloneComments: Comment[] = [
      ...comments,
      {
        id: comments.length + 1,
        text: value,
      },
    ];
    localStorage.setItem(event.id + "comment", JSON.stringify(cloneComments));
    setComments(cloneComments);
  }
  return (
    <div className="event-meeting">
      <div className="join">
        <JoinButton member={member} setMember={onClickJoin} joined={join} />
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
