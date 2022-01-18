import Home from "./Home";
import { render } from "@testing-library/react";
import { mount } from "enzyme";

describe("Home component", () => {
  it("expects Home to render withour any error", () => {
    render(<Home events={[]} updateEvent={() => {}} />);
  });
  it("render events", () => {
    const events = [
      {
        title: "event-digitalise",
        description: "testevent1",
        id: 1,
        date: new Date("2021-01-18"),
        rating: 0,
        ratings: [],
      },
      {
        title: "event-digitalise",
        description: "testevent2",
        id: 2,
        date: new Date("2022-08-13"),
        rating: 0,
        ratings: [],
      },
    ];
    const wrapper = mount(<Home events={[]} updateEvent={(event) => {}} />);
    const eventsWrapper = mount(
      <Home events={events} updateEvent={() => {}} />
    );
    expect(wrapper.find(".eventButton")).toHaveLength(0);
    expect(eventsWrapper.find(".eventButton")).toHaveLength(2);
  });
  it("render event component after clicking on it", () => {
    const events = [
      {
        title: "event-digitalise",
        description: "testevent2",
        id: 2,
        date: new Date("2022-01-10"),
        rating: 0,
        ratings: [],
      },
    ];

    const wrapper = mount(<Home events={events} updateEvent={() => {}} />);

    const eventList = wrapper.find("#event-list");
    const eventViewBefore = wrapper.find("#event-meeting");
    const button = wrapper.find("button").at(0);
    button.simulate("click");
    const eventViewAfter = wrapper.find("#event-meeting");

    expect(eventList.exists()).toEqual(true);
    expect(eventViewBefore.exists()).toEqual(false);
    expect(eventViewAfter.exists()).toEqual(false);
  });
  it("check if the events are in order", () => {
    const events = [
      {
        title: "digitalise",
        description: "art event",
        id: 2,
        date: new Date("2022-01-18"),
        rating: 0,
        ratings: [],
      },
      {
        title: "book",
        description: "book event",
        id: 1,
        date: new Date("2022-01-10"),
        rating: 0,
        ratings: [],
      },

      {
        title: "communicate",
        description: "communicate event",
        id: 3,
        date: new Date("2022-01-09"),
        rating: 0,
        ratings: [],
      },
    ];
    const wrapper = mount(<Home events={events} updateEvent={() => {}} />);

    const firstBtn = wrapper.find("button").at(0);
    const secondBtn = wrapper.find("button").at(1);
    const thirdBtn = wrapper.find("button").at(2);

    expect(firstBtn.prop("id")).toBe("event-communicate");
    expect(secondBtn.prop("id")).toBe("event-book");
    expect(thirdBtn.prop("id")).toBe("event-digitalise");
  });
  it("Shows if the date of an event is passed", () => {
    const events = [
      {
        title: "digitalise",
        description: "testevent1",
        id: 1,
        date: new Date("2022-01-01"),
        rating: 0,
        ratings: [],
      },
      {
        title: "book",
        description: "testevent2",
        id: 2,
        date: new Date("2022-08-07"),
        rating: 0,
        ratings: [],
      },
    ];

    const wrapper = mount(<Home events={events} updateEvent={() => {}} />);

    const button2 = wrapper.find("#event-digitalise > .passed-event");
    const button1 = wrapper.find("#event-book > .passed-event");

    expect(button2.exists()).toEqual(true);
    expect(button1.exists()).toEqual(false);
  });
});
