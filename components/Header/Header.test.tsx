import { render, screen } from "@testing-library/react";
import { Header } from "./index";

describe("Header", () => {
  it("renderiza o titulo do aplicativo", () => {
    render(<Header />);
    const pageTitle = screen.getByRole("heading", {
      name: "Prova Ateliware",
    });
    expect(pageTitle).toBeInTheDocument();
  });
  it("renderiza email do autor", () => {
    const { container } = render(<Header />);
    const email = screen.getByText(new RegExp("HOLA@FACUNDOLEITES.COM", "gi"));
    expect(email).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
