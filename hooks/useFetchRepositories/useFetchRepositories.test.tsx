import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { useFetchRepositories } from ".";

const TestComponent: React.FC<{ language: string; query: string }> = ({
  language,
  query = "",
}) => {
  //TODO test fetchData and refreshing
  const { data, loading, error } = useFetchRepositories(query, language);
  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : error ? (
        <p>error</p>
      ) : data ? (
        <ul>
          {data.repositories.map((thisRepo) => (
            <li key={`test-li-item-${thisRepo.id}`}>
              <h2>{thisRepo.name}</h2>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

describe("useFetchRepositories", () => {
  it("renderiza o grupo de repositorios", async () => {
    const wrapper = render(<TestComponent language="JavaScript" query="" />);
    //verificar se está mostrando o texto de carregando enquando se obtém os repositories
    await waitForElementToBeRemoved(() => wrapper.getByText("loading..."));
    //verificar se uma vez que a mensagem de carregando sai a lista de repositorios é renderizada
    expect(screen.getByRole("heading", { name: "vue" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "prettier" })
    ).toBeInTheDocument();
    //verificar se uma vez que a mensagem de atualizando sai a lista de repositorios é renderizada
    expect(wrapper.container).toMatchSnapshot();
  });

  it("mostra mensagem de erro quando tem problema com a API", async () => {
    const wrapperDois = render(
      <TestComponent language="TypeScript" query="erro" />
    );
    await waitForElementToBeRemoved(() =>
      wrapperDois.queryByText("loading...")
    );
    const alertMsg = wrapperDois.queryByText("error");
    expect(alertMsg).toBeInTheDocument();
    expect(wrapperDois.container).toMatchSnapshot();
  });
});
