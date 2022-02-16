import { fireEvent, render } from "@testing-library/react";

import RepositioresPage from "./index.page";

describe("RepositoriesPage", () => {
  it("renderiza o grupo de repositorios", async () => {
    const valueToSearch = "ateliware";
    const wrapper = render(<RepositioresPage />);
    expect(wrapper.getByRole("heading", { name: "Repositórios" }));
    const inputSearch = wrapper.getByPlaceholderText("pesquisa");
    expect(inputSearch).toBeInTheDocument();
    const submitFormButton = wrapper.getByText("pesquisar", {
      selector: "button",
    });
    fireEvent.change(inputSearch, { target: { value: valueToSearch } });
    fireEvent.click(submitFormButton);

    //verificar que o termo que está sendo pesquisado seja exibido na tela
    const searchingTermContainer = wrapper.getByTestId("searchTerm");
    const searchingTerm = wrapper.getByText(valueToSearch, {
      selector: "strong",
    });
    expect(searchingTermContainer).toBeInTheDocument();
    expect(searchingTerm).toBeInTheDocument();
    expect(searchingTermContainer).toContainElement(searchingTerm);

    //verificar que as categorias de repositorios sejam renderizados
    expect(wrapper.getByRole("heading", { name: "PHP" })).toBeInTheDocument();
    expect(
      wrapper.getByRole("heading", { name: "Typescript" })
    ).toBeInTheDocument();
    expect(
      wrapper.getByRole("heading", { name: "Javascript" })
    ).toBeInTheDocument();
    expect(wrapper.getByRole("heading", { name: "Java" })).toBeInTheDocument();
    expect(wrapper.getByRole("heading", { name: "Dart" })).toBeInTheDocument();
    expect(wrapper.container).toMatchSnapshot();
  });
});
