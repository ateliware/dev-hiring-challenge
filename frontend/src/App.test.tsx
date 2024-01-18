import { render, screen } from "@testing-library/react";
import Home from "./pages/Home/Home";
import Card from "./components/Card/Card";

test("should render list repo", () => {
  render(<Home />);
  const todoElement = screen.getByTestId("list_repo");
  expect(todoElement).toBeInTheDocument();
});

test("should be a logo", () => {
  const { getByTestId } = render(<Home />);
  const logo = getByTestId("logo");
  expect(logo).toBeInTheDocument();
});

test("should be a avatar", () => {
  const { getByTestId } = render(<Card />);
  const myCard = getByTestId("avatar");
  expect(myCard).toBeInTheDocument();
});

test("should be a FORKS", () => {
  const { getByTestId } = render(<Card />);
  const myCard = getByTestId("forks");
  expect(myCard).toBeInTheDocument();
});

test("should be a STARS", () => {
  const { getByTestId } = render(<Card />);
  const myCard = getByTestId("stars");
  expect(myCard).toBeInTheDocument();
});
test("test", () => {
  expect(true).toBe(true);
});

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
