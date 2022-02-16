import { fireEvent, render, screen } from "@testing-library/react";
import { AvailableThemes, ThemeSwitcher } from ".";
import "../Footer/matchMedia.mock";

describe("ThemeSwitcher", () => {
  const switcherId = "themeSwitcherTest";
  it("renderiza o seletor de temas", () => {
    const wrapper = render(<ThemeSwitcher switcherId={switcherId} />);
    const select = screen.getByTestId(
      "themeSwitcherSelect"
    ) as HTMLSelectElement;
    const label = screen.getByText("tema", { selector: "span" });
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("id", switcherId);
    expect(select).toHaveAttribute("aria-labelledby", switcherId);
    fireEvent.change(select, { target: { value: AvailableThemes.Light } });
    expect(select.value).toBe(AvailableThemes.Light);
    fireEvent.change(select, { target: { value: AvailableThemes.Dark } });
    expect(select.value).toBe(AvailableThemes.Dark);
    //TODO criar um teste para verificar que o atributo "theme" do elemento HTML mude quando o valor do select é mudado
    expect(wrapper.container).toMatchSnapshot();
  });
});
