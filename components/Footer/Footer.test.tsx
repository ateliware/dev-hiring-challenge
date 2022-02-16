import { render, screen } from "@testing-library/react";
import { Footer } from "./index";
import "./matchMedia.mock";

describe("Footer", () => {
  it("renderiza informação do autor", () => {
    render(<Footer />);
    const authorCopyRightText = screen.getByText(
      "Facundo Leites copyleft 2022"
    );
    expect(authorCopyRightText).toBeInTheDocument();
  });

  it("renderiza seletor de tema", () => {
    const { container } = render(<Footer />);
    const tema = screen.getByText("tema", { selector: "span" });
    const select = screen.getByTitle("tema");
    expect(select).toBeInTheDocument();
    expect(tema).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
