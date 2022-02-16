import { render } from "@testing-library/react";
import { RepositoryJsonData } from "../../../../services/github";
import { RepositoriesListItem } from "./index";

const MockRepositoryData = () => {
  return {
    created_at: "2018-10-07T19:32:59Z",
    description:
      "A predictable state management library that helps implement the BLoC design pattern",
    full_name: "felangel/bloc",
    html_url: "https://github.com/felangel/bloc",
    id: 151977818,
    language: "Dart",
    name: "bloc",
    node_id: "MDEwOlJlcG9zaXRvcnkxNTE5Nzc4MTg=",
    owner: {
      login: "felangel",
      id: 8855632,
      url: "https://api.github.com/users/felangel",
      avatar_url: "https://avatars.githubusercontent.com/u/8855632?v=4",
    },
    stargazers_count: 8538,
    topics: [
      "angulardart",
      "bloc",
      "concurrency",
      "dart",
      "dart-library",
      "dart-web",
      "dartlang",
      "flutter",
      "flutter-package",
      "library",
      "state-management",
    ],
    updated_at: "2022-02-14T16:37:28Z",
    url: "https://api.github.com/repos/felangel/bloc",
  } as RepositoryJsonData;
};

describe("RepositoriesListItem", () => {
  const thisRepoData = MockRepositoryData();

  it("container tem a classe main", () => {
    const wrapper = render(<RepositoriesListItem data={thisRepoData} />);
    const LiElement = wrapper.container.firstChild;
    expect(LiElement).toHaveClass("main");
  });

  it("item possui header com titulo", () => {
    const wrapper = render(<RepositoriesListItem data={thisRepoData} />);
    const header = wrapper.getByRole("heading", { name: thisRepoData.name });
    const anchorElement = header.parentElement;
    expect(anchorElement).toHaveAttribute("href", thisRepoData.html_url);
    expect(header).toBeInTheDocument();
  });

  it("item possui as seções com as informações", () => {
    const wrapper = render(<RepositoriesListItem data={thisRepoData} />);
    const stars = wrapper.getByText("Estrelas");
    const starValue = stars.nextElementSibling;
    expect(starValue).toHaveTextContent(String(thisRepoData.stargazers_count));
    expect(stars).toBeInTheDocument();

    const owner = wrapper.getByText("Proprietario");
    const ownerValues = wrapper.getByText(
      new RegExp(thisRepoData.owner.login, "gi")
    );
    const ownerImg = ownerValues.previousElementSibling;
    expect(ownerImg).toHaveAttribute("src", thisRepoData.owner.avatar_url);
    expect(ownerValues).toBeInTheDocument();
    expect(owner).toBeInTheDocument();

    const description = wrapper.getByText("Descrição");
    const descriptionValue = description.nextElementSibling;
    expect(descriptionValue).toHaveTextContent(
      String(thisRepoData.description)
    );
    expect(description).toBeInTheDocument();

    const topicos = wrapper.getByText("Tópicos");
    const topicosValue = topicos.nextElementSibling;
    expect(topicosValue).toHaveTextContent(
      String(thisRepoData.topics.join(", "))
    );
    expect(topicos).toBeInTheDocument();

    const language = wrapper.getByText("Linguagem");
    const languageValue = language.nextElementSibling;
    expect(languageValue).toHaveTextContent(String(thisRepoData.language));
    expect(language).toBeInTheDocument();

    expect(wrapper.container).toMatchSnapshot();
  });
});
