import { render, screen } from "@testing-library/react";
import { Layout } from "./index";
import "../Footer/matchMedia.mock";

jest.mock("next/head", () => {
  const ReactDOMServer = require("react-dom/server");
  return {
    __esModule: true,
    default: ({
      children,
    }: {
      children: Array<React.ReactElement> | React.ReactElement | null;
    }) => {
      if (children) {
        global.document.head.insertAdjacentHTML(
          "afterbegin",
          ReactDOMServer.renderToString(children) || ""
        );
      }
      return null;
    },
  };
});

describe("Layout", () => {
  const layoutContentText = "Texto do conteúdo do layout";
  const layoutTitleName = "Pagina teste";
  it("renderiza o conteudo do aplicativo", () => {
    const { container } = render(
      <Layout title={layoutTitleName}>
        <h1>{layoutContentText}</h1>
      </Layout>
    );
    const pageTitle = screen.getByRole("heading", {
      name: layoutContentText,
    });
    expect(pageTitle).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  it("pagina tem o titulo correto", () => {
    expect(document.title).toBe(
      `${layoutTitleName} - Prova Ateliware / Facundo Leites`
    );
  });
});
