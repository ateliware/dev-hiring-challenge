import React from 'react';
import axios from 'axios';
import tw from 'twin.macro'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import StarsIcon from '@material-ui/icons/StarsOutlined';

import IRepository from '../../interfaces/Repository';
import IIssue from '../../interfaces/Issue';
import IssuesList from '../../components/IssuesList';

interface RepoInfoProps {
  data: IRepository;
  issues: IIssue[];
}

const RepoInfo: React.FC<RepoInfoProps> = ({ data, issues }) => {
  return (
    <div css={[tw`flex flex-grow flex-col w-full h-full lg:items-center min-h-screen bg-black bg-opacity-95 px-10`]}>
      <div tw="lg:w-9/12 pt-5">
        <a href="/">
          <h1 tw="text-white my-5 text-5xl">Git<b tw="text-red-400">peek</b></h1>
        </a>

        <div tw="flex flex-col md:flex-row items-center">
          <Image tw="rounded-full" src={data.owner.avatar_url} width={120} height={120} layout="fixed" />
          <div tw="flex flex-col mt-4 md:mt-0 md:ml-4 items-center md:items-start">
            <span tw="text-white text-xl mb-1">{data.name}</span>
            <h1 tw="flex text-white text-xl font-semibold mb-4">{data.description}</h1>
            <div tw="flex items-center">
              <StarsIcon tw="text-white mr-1" />
              <span tw="text-white mr-4">{data.stargazers_count}</span>

              <Image src="/fork.svg" width={20} height={20} layout="fixed" />
              <span tw="text-white ml-1 mr-4">{data.forks}</span>

              <Image src="/issue.svg" width={20} height={20} layout="fixed" />
              <span tw="text-white ml-1 mr-4">{data.open_issues}</span>

              <Image src="/watcher.svg" width={20} height={20} layout="fixed" />
              <span tw="text-white ml-1 mr-4">{data.watchers}</span>
            </div>
          </div>
        </div>

        <div tw="border-t border-gray-50 w-full my-5" />

        <h1 tw="text-white text-3xl mb-5">Latest issues</h1>

        <IssuesList data={issues} />
      </div>
    </div>
  );
}

export default RepoInfo;

export const getServerSideProps: GetServerSideProps<RepoInfoProps> = async (context) => {
  const queries = context.query;
  const name = typeof queries.name === 'string' ? queries.name : ''
  const repo_api_url = `https://api.github.com/repos/${name.replace('_', '/')}`;
  const repo_issues_url = `${repo_api_url}/issues`;

  const response = await axios.get<IRepository>(repo_api_url)

  const issuesResponse = await axios.get(repo_issues_url);

  return {
    props: {
      data: response.data,
      issues: issuesResponse.data,
    }
  }
}
