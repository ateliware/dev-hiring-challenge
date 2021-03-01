import Chip from '@material-ui/core/Chip';
import tw from 'twin.macro'

interface ReposChipsProps {
  languages: string[];
  currentLanguage: string;
  handleDelete(language: string): void;
  handleClick(language: string): void;
}

const ReposChips: React.FC<ReposChipsProps> = ({ languages, handleDelete, handleClick, currentLanguage }) => {
  return (
    <div tw="mb-5">
      {languages.map(language => (
        <Chip
          key={language}
          color={language === currentLanguage ? 'primary' : 'default'}
          label={language}
          onDelete={() => handleDelete(language)}
          onClick={() => handleClick(language)}
          style={{ margin: 5 }}
        />
      ))}
    </div>
  );
}

export default ReposChips;
