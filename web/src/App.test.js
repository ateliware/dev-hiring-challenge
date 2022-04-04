import { render, screen } from '@testing-library/react';
import React from "react";

import App from './App';


describe("App Component",() =>{
  it("BtnCarregar", () => {
    render(<App/>);
    const linkElement = screen.getByText("Carregar");
    expect(linkElement).toHaveAttribute("class", "btn btn-primary")
  });

  it("NavItemGo", () => {
    render(<App/>);
    const linkElement = screen.getByText("Go");
    expect(linkElement).toHaveAttribute("id", "left-tabs-example-tab-go")
  });

  it("NavItemPython", () => {
    render(<App/>);
    const linkElement = screen.getByText("Python");
    expect(linkElement).toHaveAttribute("id", "left-tabs-example-tab-python")
  });

  it("NavItemGo", () => {
    render(<App/>);
    const linkElement = screen.getByText("Javascript");
    expect(linkElement).toHaveAttribute("id", "left-tabs-example-tab-javascript")
  });

  it("NavItemGo", () => {
    render(<App/>);
    const linkElement = screen.getByText("C#");
    expect(linkElement).toHaveAttribute("id", "left-tabs-example-tab-c#")
  });

  it("NavItemGo", () => {
    render(<App/>);
    const linkElement = screen.getByText("C");
    expect(linkElement).toHaveAttribute("id", "left-tabs-example-tab-c")
  });

});