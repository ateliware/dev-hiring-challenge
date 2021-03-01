import { render, screen } from "@testing-library/react";
import ReposList from "../components/ReposList";

import IRepository from '../interfaces/FeaturedRepository';

describe("ReposList component", () => {
  const repos: IRepository[] = [{
    repo: 'first/repo',
    stargazers: "20"
  }, {
    repo: 'second/repo',
    stargazers: "30"
  }]

  it("should be able to render the infos of the given repositories", () => {
    render(<ReposList featuredData={repos} starredData={[]} mode="featured"  />);

    expect(
      screen.getByText('first/repo')
    ).toBeInTheDocument();

    expect(
      screen.getByText('20')
    ).toBeInTheDocument();

    expect(
      screen.getByText('second/repo')
    ).toBeInTheDocument();

    expect(
      screen.getByText('30')
    ).toBeInTheDocument();
  });

  it("should link to the repo infos when one is clicked/pressed", () => {
    render(<ReposList featuredData={repos} starredData={[]} mode="featured"  />);

    expect(screen.getByText('first/repo').closest('a')).toHaveAttribute('href', '/RepoInfo/first_repo')
  })
});
