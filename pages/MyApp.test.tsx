import { render } from "@testing-library/react";

import MyApp from "./index.page";

describe("MyApp", () => {
  it("renderiza o app", async () => {
    const wrapper = render(<MyApp />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
