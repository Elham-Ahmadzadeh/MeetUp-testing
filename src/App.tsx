import { useState } from "react";

import "./App.css";
import Home from "./views/Home";
import { Event } from "./models/Event";

function App() {
  const [events, setEvents] = useState<Event[]>([
    {
      title: "book",
      description:
        "Group of people who like to get together and discuss novels available in English",
      id: 1,
      date: new Date("2022-01-10"),
      rating: 0,
      ratings: [],
    },
    {
      title: "communicate",
      description:
        "We want to meet new people and share our interests this is so perfect to begin with",
      id: 2,
      date: new Date("2022-10-22"),
      rating: 0,
      ratings: [],
    },
    {
      title: "digitalise",
      description:
        "We are an entropreneur, digital nomad, freelancer, expat or just work orcwant to work in IT & tech",
      id: 4,
      date: new Date("2022-01-08"),
      rating: 0,
      ratings: [],
    },
    {
      title: "game",
      description:
        "This group shows the Game Jams and events happening in and around the city",
      id: 3,
      date: new Date("2022-10-30"),
      rating: 0,
      ratings: [],
    },
  ]);

  function updateEvent(event: Event) {
    let updated = events.filter((e) => e.id !== event.id);
    updated.push(event);
    setEvents(updated);
  }

  return (
    <div className="App">
      <Home events={events} updateEvent={updateEvent} />
    </div>
  );
}

export default App;
