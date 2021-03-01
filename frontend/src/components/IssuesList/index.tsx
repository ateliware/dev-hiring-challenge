import tw from 'twin.macro'
import Image from 'next/image'
import ChevronRight from '@material-ui/icons/ChevronRight';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import IIssue from '../../interfaces/Issue';

interface IssuesListProps {
  data: IIssue[];
}

const IssuesList: React.FC<IssuesListProps> = ({ data }) => {
  const { width } = useWindowDimensions();

  return (
    <>
      {data.map(issue => (
        <a target="_blank" rel="noopener noreferrer" key={issue.id} href={issue.html_url} tw="flex items-center p-5 mb-5 rounded bg-indigo-900 transform hover:translate-x-3 transition duration-200 hover:bg-indigo-400">
          {width > 768 && <Image tw="rounded-full" src={issue.user.avatar_url} width={50} height={50} layout="intrinsic" />}
          <div tw="flex flex-col ml-5 text-white">
            <span tw="text-sm">{issue.user.login}</span>
            <strong tw="text-base">{issue.title}</strong>
          </div>
          <ChevronRight tw="ml-auto text-white" />
        </a>
      ))}
    </>
  );
}

export default IssuesList;
