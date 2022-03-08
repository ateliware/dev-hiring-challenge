import { render, screen } from '@testing-library/react';
import { rest } from "msw";
import { setupServer } from "msw/node";
import ReposList from './ReposList';

const mswRepos = [{
    "r_id": 1,
    "r_name": "test repo",
    "r_language": "test repo language",
    "r_description": "test repo description",
    "r_owner_login": "test repo owner login",
    "r_owner_avatar_url": "https://github.com/",
    "r_created_at": "2022-01-01T00:00:00.000Z",
    "r_updated_at": "2022-01-01T00:00:00.000Z",
    "r_stargazers_count": 12,
    "r_watchers_count": 10,
    "r_size": 1024,
    "r_forks_count": 10,
    "r_open_issues_count": 0,
    "r_html_url": "https://github.com/"
}];

const mswRepoResponse = rest.get('http://localhost:3001/repos', (req, res, ctx) => {
    return res(ctx.json(mswRepos));
});

const server = new setupServer(...[mswRepoResponse]);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('test repositories list', () => {

    test('creates repository details button', async () => {
        render(<ReposList />);
        const element = await screen.findByRole('button', { name: 'Details' });
        expect(element).toBeVisible();
    });

    test('creates repository star texts', async () => {
        render(<ReposList />);
        const element = await screen.findByText('12');
        expect(element).toBeVisible();
    });
});

