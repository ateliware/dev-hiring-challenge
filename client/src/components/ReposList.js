import React, { Fragment, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import RepoDetail from './RepoDetail';
import RepoService from '../services/RepoService';
import GitHubService from '../services/GitHubService';

import { formatDate } from '../utils/utils'

const languages = ['Python', 'JavaScript', 'Java', 'Kotlin', 'Rust'];

const ReposList = () => {

    const [repos, setRepos] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const insertRepo = async (repo) => {
        await RepoService.insert(repo)
            .catch(err => {
                console.error(err.message);
                toast.error('An error has occurred!', { autoClose: 6000 });
            });
    };

    const getAllRepos = async () => {
        await RepoService.getAll()
            .then(response => {
                setRepos(response.data);
            })
            .catch(err => {
                console.error(err.message);
                toast.error('An error has occurred!', { autoClose: 6000 });
            });
    };

    const deleteAllRepos = async () => {
        await RepoService.deleteAll()
            .then(response => {
                setRepos([]);
                toast.warning('All repositories have been deleted!', { autoClose: 2000 });
            })
            .catch(err => {
                console.error(err.message);
                toast.error('An error has occurred!', { autoClose: 6000 });
            });

    };

    const handleSearch = async () => {
        toast.info('Searching repositories...', { autoClose: 2000 });
        await handleDelete();

        for (const l of languages) {
            try {
                // The first of the first page (best match probably)
                const response = await GitHubService.search(`repositories?q=language:${l}&page=1&per_page=1`);
                let bestRepo = response.data.items[0];

                await insertRepo(bestRepo);
            } catch (err) {
                console.error(err.message);
                toast.error(err.response.data.message, { autoClose: 8000 });
                break;
            }
        };

        await getAllRepos();
        setButtonDisabled(false);
    };

    const handleDelete = async () => {
        setButtonDisabled(true);
        await deleteAllRepos();
    };

    useEffect(() => {
        getAllRepos();
        setButtonDisabled(false);
    }, []);

    return (
        <Fragment>
            <ToastContainer />
            <h4>Top Repositories ({languages.join(', ')})</h4>

            <Button variant="success" style={{ margin: 10 }} onClick={handleSearch} disabled={buttonDisabled}>Search repos</Button>
            <Button variant="danger" style={{ margin: 10 }} onClick={deleteAllRepos} disabled={buttonDisabled}>Delete repos</Button>

            <br></br>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Language</th>
                        <th>Name</th>
                        <th>Created</th>
                        <th>Stars</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {repos.map(repo => (
                        <tr key={repo.r_id}>
                            <th>{repo.r_language}</th>
                            <th>{repo.r_name}</th>
                            <th>{formatDate(repo.r_created_at)}</th>
                            <th>{repo.r_stargazers_count}</th>
                            <th><RepoDetail repo={repo} /></th>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Fragment>
    );
};

export default ReposList;