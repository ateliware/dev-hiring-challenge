import { render, screen } from "@testing-library/react";
import ReposChips from "../components/ReposChips";

describe("ReposChips component", () => {
  const fakeHandleClick = jest.fn();
  const fakeHandleDelete = jest.fn();
  const languages = ['javascript', 'typescript'];

  it("should be able to render the given languages", () => {
    render(<ReposChips currentLanguage="javascript" languages={languages} handleClick={fakeHandleClick} handleDelete={fakeHandleDelete} />);

    expect(
      screen.getByText('javascript')
    ).toBeInTheDocument();

    expect(
      screen.getByText('typescript')
    ).toBeInTheDocument();
  });
});
