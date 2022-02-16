import { render, screen } from "@testing-library/react";
import { RepositoryJsonData } from "../../../services/github";
import { RepositoriesList } from "./index";

const MockRepositoriesData = () => {
  return [
    {
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
    },
    {
      created_at: "2018-04-20T04:33:43Z",
      description:
        "A powerful Http client for Dart, which supports Interceptors, FormData, Request Cancellation, File Downloading, Timeout etc.",
      full_name: "flutterchina/dio",
      html_url: "https://github.com/flutterchina/dio",
      id: 130309267,
      language: "Dart",
      name: "dio",
      node_id: "MDEwOlJlcG9zaXRvcnkxMzAzMDkyNjc=",
      owner: {
        login: "flutterchina",
        id: 38549573,
        url: "https://api.github.com/users/flutterchina",
        avatar_url: "https://avatars.githubusercontent.com/u/38549573?v=4",
      },
      stargazers_count: 10397,
      topics: ["dart", "flutter"],
      updated_at: "2022-02-14T17:37:33Z",
      url: "https://api.github.com/repos/flutterchina/dio",
    },
  ] as RepositoryJsonData[];
};

describe("RepositoriesListItem", () => {
  const thisReposData = MockRepositoriesData();

  it("renderiza os elementos da lista", () => {
    const wrapper = render(<RepositoriesList data={thisReposData} />);

    const firstRepoHeading = screen.getByRole("heading", {
      name: thisReposData[0].name,
    });
    expect(firstRepoHeading).toBeInTheDocument();

    const secondRepoHeading = screen.getByRole("heading", {
      name: thisReposData[1].name,
    });
    expect(secondRepoHeading).toBeInTheDocument();

    expect(wrapper.container).toMatchSnapshot();
  });
});
