import { useState } from "react";
import Header from "../components/Header";
import { Event } from "../models/Event";
import EventMeeting from "./EventMeeting";
import { Rating } from "react-simple-star-rating";
import "./Home.css";

interface Props {
  events: Event[];
  updateEvent: (event: Event) => void;
}

function Home({ events, updateEvent }: Props) {
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(
    undefined
  );

  function checkIfPassed(event: Event) {
    console.log(event.date.getTime() < new Date().getTime())
    return event.date.getTime() < new Date().getTime()
  }

  const handleRating = (rating: number) => {
    if (selectedEvent) {
      let update = { ...selectedEvent };
      update.ratings.push(rating);
      update.rating = calculateAverage(update);
      setSelectedEvent(update);
      updateEvent(update);
    }
  };

  function calculateAverage(event: Event) {
    if (event.ratings.length === 0) {
      return 0;
    }
    let sum: number = 0;
    event.ratings.map((ratings) => (sum += ratings));
    return Math.round(sum / event.ratings.length);
  }

  if (selectedEvent) {
    return (
      <div id="event-container">
        <EventMeeting
          event={selectedEvent}
          onClose={() => setSelectedEvent(undefined)}
          onRateEvent={handleRating}
        />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div id="event-list">
        <div className="flex-wrapper">
          {events
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map((event) => (
              <button
                key={event.id}
                type="button"
                onClick={() => setSelectedEvent(event)}
                className="eventButton "
                id={`event-${event.title}`}
              >
                <h1 className="title">{event.title}</h1>
                <p>{event.date.toDateString()}</p>
                <p>
                  <Rating readonly ratingValue={event.rating} />
                </p>

                {checkIfPassed(event) ? (
                  <span style={{ color: "red" }} className="passed-event">
                    This event is passed
                  </span>
                ) : null}
              </button>
            ))}
        </div>
      </div>
    </>
  );
}

export default Home;
