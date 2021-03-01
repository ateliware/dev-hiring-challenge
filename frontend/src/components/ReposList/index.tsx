import tw from 'twin.macro'
import Image from 'next/image'
import StarsIcon from '@material-ui/icons/StarsOutlined';
import ChevronRight from '@material-ui/icons/ChevronRight';

import IFeaturedRepository from '../../interfaces/FeaturedRepository';
import IRepository from '../../interfaces/Repository';

interface ReposListProps {
  featuredData: IFeaturedRepository[];
  starredData: IRepository[];
  mode: 'featured' | 'stars';
}

const ReposList: React.FC<ReposListProps> = ({ featuredData, starredData, mode }) => {
  return (
    <ul>
      {mode === 'featured' ? (
        <>
        {featuredData.map(item => (
          <li key={item.repo}>
            <a target="_blank" rel="noopener noreferrer" href={`/RepoInfo/${item.repo.replace('/', '_')}`} tw="flex items-center justify-between p-5 mb-5 rounded bg-indigo-900 transform hover:translate-x-3 transition duration-200 hover:bg-indigo-400">
              <div tw="flex flex-col">
                <span tw="flex flex-auto text-white text-lg">{item.repo}</span>
                <div tw="flex items-center mt-2">
                  <StarsIcon tw="text-white mr-1" />
                  <span tw="text-white">{item.stargazers}</span>
                </div>
              </div>
              <ChevronRight tw="text-white invisible md:visible" />
            </a>
          </li>
        ))}
        </>
      ) : (
        <>
        {starredData.map(item => (
          <li key={item.id}>
            <a target="_blank" rel="noopener noreferrer" href={`/RepoInfo/${item.owner.login}_${item.name}`} tw="flex items-center justify-between p-5 mb-5 rounded bg-indigo-900 transform hover:translate-x-3 transition duration-200 hover:bg-indigo-400">
              <div tw="flex flex-col">
                <span tw="flex flex-auto text-white text-lg">{`${item.owner.login}/${item.name}`}</span>
                <div tw="flex items-center mt-2">
                  <StarsIcon tw="text-white mr-1" />
                  <span tw="text-white">{item.stargazers_count}</span>
                </div>
              </div>
              <ChevronRight tw="text-white invisible md:visible" />
            </a>
          </li>
        ))}
        </>
      )}
    </ul>
  );
}

export default ReposList;
