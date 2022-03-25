import EventMeeting from "./EventMeeting";
import { render } from "@testing-library/react";
import { mount } from "enzyme";
import JoinButton from "../components/JoinButton";
import React from "react";

describe("EventMeeting component", () => {
  const test = {
    title: "anEvent",
    description: "testanevent",
    id: 1,
    date: new Date("2022-01-25"),
    rating: 0,
    ratings: [],
  };

  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(
      <EventMeeting event={test} onClose={() => {}} onRateEvent={() => {}} />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("expects component to render without error", () => {
    render(
      <EventMeeting event={test} onClose={() => {}} onRateEvent={() => {}} />
    );
  });

  it("After clicking sendButton shows the comment", () => {
    const text = "hello";
    expect(wrapper.contains(text)).toBeFalsy();
    const input = wrapper.find("input");
    input.simulate("change", { target: { value: text } });
    const sendBtn = wrapper.find(".sendBtn");
    sendBtn.simulate("click");
    expect(wrapper.contains(text)).toBeTruthy();
  });
  it("render 1 member initially", () => {
    const actualText = wrapper.find(".going").text();
    const expectedText = "1 are going";
    expect(actualText).toBe(expectedText);
  });
  it("render 2 after clicking on join button once", () => {
    const joinButton = wrapper.find("JoinButton");
    joinButton.simulate("click");
    const actualText = wrapper.find(".going").text();
    const expectedText = "2 are going";
    expect(actualText).toBe(expectedText);
  });

  it("render 1 after clicking on join button twice", () => {
    const joinButton = wrapper.find("JoinButton");
    const expectedText = "2 are going";
    joinButton.simulate("click");
    joinButton.simulate("click");
    const actualText = wrapper.find(".going").text();
    expect(actualText).toBe(expectedText);
  });
  it("test if join btn works correctly", () => {
    let member = 1;
    let setMember = (value: number) => (member = value);
    const btn = mount(<JoinButton member={member} setMember={setMember} joined={true}/>);
    btn.simulate("click");
    expect(member).toBe(0);
  });

  it("show joined after clicking once on join button", () => {
    const btnWrapper = mount(<JoinButton member={1} setMember={() => {}} joined={true}/>);
    btnWrapper.simulate("click");

    const actualText = btnWrapper.find(".btnText").text();

    expect(actualText).toBe("Joined");
  });
  it("show join after clicking twice on join button", () => {
    const btnContainer = mount(<JoinButton member={2} setMember={() => {}} joined={true} />);
    btnContainer.simulate("click");
    btnContainer.simulate("click");
    const actualText = btnContainer.find("p").text();
    expect(actualText).toBe("Joined");
  });
});
