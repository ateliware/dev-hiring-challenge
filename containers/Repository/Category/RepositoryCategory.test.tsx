import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { RepositoryCategory } from ".";

describe("RepositoryCategory", () => {
  it("renderiza o grupo de repositorios", async () => {
    const wrapper = render(
      <RepositoryCategory name="Javascript" language="JavaScript" query="" />
    );
    //verificar se está mostrando o texto de carregando enquando se obtém os repositories
    const loadingMsg = screen.getByText("carregando...");
    expect(loadingMsg).toBeInTheDocument();
    const categoryTitle = screen.getByRole("heading", { name: "Javascript" });
    expect(categoryTitle).toBeInTheDocument();
    await waitForElementToBeRemoved(loadingMsg);
    //verificar se uma vez que a mensagem de carregando sai a lista de repositorios é renderizada
    expect(screen.getByRole("heading", { name: "vue" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "prettier" })
    ).toBeInTheDocument();
    const refreshResults = screen.getByText(
      "Atualizar banco de dados desde a API de Github",
      { selector: "button" }
    );
    expect(refreshResults).toBeInTheDocument();
    //simular click em atualizar resultados desde a API de Github
    fireEvent.click(refreshResults);
    //verificar se existe a mensagem de "atualizando"
    const updatingMsg = screen.getByText("atualizando...", { selector: "div" });
    expect(updatingMsg).toBeInTheDocument();
    await waitForElementToBeRemoved(updatingMsg);
    //verificar se uma vez que a mensagem de atualizando sai a lista de repositorios é renderizada
    expect(screen.getByRole("heading", { name: "vue" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "prettier" })
    ).toBeInTheDocument();
    expect(wrapper.container).toMatchSnapshot();
  });
  it("mostra mensagem de erro quando tem problema com a API", async () => {
    const wrapper = render(
      <RepositoryCategory name="Typescript" language="TypeScript" query="" />
    );
    const loadingMsg = screen.getByText("carregando...");
    expect(loadingMsg).toBeInTheDocument();
    const categoryTitle = screen.getByRole("heading", { name: "Typescript" });
    expect(categoryTitle).toBeInTheDocument();
    await waitForElementToBeRemoved(loadingMsg);
    const alertMsg = screen.getByRole("alert");
    expect(alertMsg).toHaveTextContent(
      "Ops! aconteceu um erro consultando os repositórios."
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
