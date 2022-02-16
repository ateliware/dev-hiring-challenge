import { render } from "@testing-library/react";
import { UserInfoSection } from ".";

describe("UserInfoSection", () => {
  it("renderiza a seção de informação do autor", () => {
    const wrapper = render(<UserInfoSection />);
    const textElement = wrapper.getByText("hola@facundoleites.com");
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveAttribute(
      "href",
      "mailto:hola@facundoleites.com"
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
