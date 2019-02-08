import React from "react";
import Turnstile from "./Turnstile";
import { shallow } from "enzyme";
import { MESSAGES } from "./models";

jest.useFakeTimers();

it("renders Turnstile properly", () => {
  const component = getComponent();

  expect(component).toMatchSnapshot();
});

it("should increase amount when user presses `Insert a coin` button", () => {
  const component = getComponent();

  const insertButton = component.find("button").at(0);
  insertButton.simulate("click");

  expect(component.find("p").at(1).text()).toEqual("Amount of coins inserted: $1");

  insertButton.simulate("click");
  expect(component.find("p").at(1).text()).toEqual("Amount of coins inserted: $2");
});

it("should display an error when user tried to insert a coin while passing", () => {
  const component = getComponent();
  expect(component.exists(".error")).toEqual(false);

  component.find("button").at(0).simulate("click");
  component.find("button").at(0).simulate("click");
  component.find("button").at(0).simulate("click");

  component.find("button").at(1).simulate("click");
  component.find("button").at(0).simulate("click");

  expect(component.find("button").at(0).prop("disabled")).toBe(true);
  expect(component.find("button").at(1).prop("disabled")).toBe(true);

  expect(component.exists(".error")).toEqual(true);
});

it("hides an error when `Fix` button is pressed", () => {
  const component = getComponent();
  expect(component.exists(".error")).toEqual(false);

  component.find("button").at(0).simulate("click");
  component.find("button").at(0).simulate("click");
  component.find("button").at(0).simulate("click");

  component.find("button").at(1).simulate("click");
  component.find("button").at(0).simulate("click");

  expect(component.exists(".error")).toEqual(true);
  component.find("button").at(2).simulate("click");
  expect(component.exists(".error")).toEqual(false);
});

it("shows message when user passes", () => {
  const component = getComponent();

  component.find("button").at(0).simulate("click");
  component.find("button").at(0).simulate("click");
  component.find("button").at(0).simulate("click");
  component.find("button").at(1).simulate("click");
  expect(component.find("p").at(0).text()).toEqual(MESSAGES.THANK_YOU);
});


const getComponent = () => {
  return shallow(<Turnstile />);
};
