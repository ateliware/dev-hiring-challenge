import { cleanup, render, screen } from "@testing-library/react";
import { Alert, AlertPropsVariants } from "./index";
describe("Alert", () => {
  it("renderiza com a variante erro", () => {
    const AlertMsg = "Mensagem de alerta de teste de erro";
    render(<Alert variant={AlertPropsVariants.error}>{AlertMsg}</Alert>);
    const successAlert = screen.getByRole("alert");
    expect(successAlert).toHaveClass("main");
    expect(successAlert).toHaveClass("error");
    const successAlertMainElement = screen.getByText(AlertMsg);
    expect(successAlertMainElement).toBeInTheDocument();
  });
  it("renderiza um com a variante sucesso", () => {
    const AlertMsg = "Mensagem de alerta de teste de sucessso";
    render(<Alert variant={AlertPropsVariants.success}>{AlertMsg}</Alert>);
    const successAlert = screen.getByRole("alert");
    expect(successAlert).toHaveClass("main");
    expect(successAlert).toHaveClass("success");
    const successAlertMainElement = screen.getByText(AlertMsg);
    expect(successAlertMainElement).toBeInTheDocument();
  });
  it("renderiza com ações", () => {
    const AlertMsg = "Mensagem de alerta de teste de sucessso e ações";
    const alertElement = render(
      <Alert
        variant={AlertPropsVariants.success}
        actions={[
          <a href="/cancelar" key="alert-test-cancelar">
            cancelar
          </a>,
          <a key="alert-test-ok" href="/ok">
            okay
          </a>,
        ]}
      >
        {AlertMsg}
      </Alert>
    );
    const successAlert = screen.getByRole("alert");
    expect(successAlert).toHaveClass("main");
    expect(successAlert).toHaveClass("success");
    const successAlertMainElement = screen.getByText(AlertMsg);
    expect(successAlertMainElement).toBeInTheDocument();

    const affirmativeOption = screen.getByText("okay").closest("a");
    expect(affirmativeOption).toBeInTheDocument();
    expect(affirmativeOption).toHaveAttribute("href", "/ok");

    const NegativeOption = screen.getByText("cancelar").closest("a");
    expect(NegativeOption).toBeInTheDocument();
    expect(NegativeOption).toHaveAttribute("href", "/cancelar");

    expect(alertElement.container).toMatchSnapshot();
  });
});
cleanup();
