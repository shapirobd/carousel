// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import Card from "./Card";

it("should render Carousel component", () => {
	render(<Carousel />);
});
it("should render Card component", () => {
	render(<Card />);
});

it("matches snapshot", () => {
	const { asFragment } = render(<Carousel />);
	expect(asFragment()).toMatchSnapshot();
});
it("matches snapshot", () => {
	const { asFragment } = render(<Card />);
	expect(asFragment()).toMatchSnapshot();
});
it("should go to previous image when clicking left arrow", () => {
	const { getByTestId, debug, getByText } = render(<Carousel />);
	const nextBtn = getByTestId("right-arrow");

	const counter = getByText("Image 1 of 3.");
	fireEvent.click(nextBtn);
	expect(counter).toHaveTextContent("2 of 3");

	const prevBtn = getByTestId("left-arrow");
	fireEvent.click(prevBtn);
	expect(counter).toHaveTextContent("1 of 3");
});

it("should not show left arrow on first image", () => {
	const { queryByTestId } = render(<Carousel />);
	const prevBtn = queryByTestId("left-arrow");
	expect(prevBtn).toBe(null);
});

it("should not show right arrow on last image", () => {
	const { queryByTestId } = render(<Carousel />);
	const nextBtn = queryByTestId("right-arrow");
	fireEvent.click(nextBtn);
	fireEvent.click(nextBtn);
	const missingNextBtn = queryByTestId("right-arrow");
	expect(missingNextBtn).toBe(null);
});
