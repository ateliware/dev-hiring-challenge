import Head from 'next/head'
import tw from 'twin.macro'
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Lottie from 'react-lottie';
import Image from 'next/image'
import Chip from '@material-ui/core/Chip';
import Trending from '@material-ui/icons/TrendingUpOutlined';
import StarsIcon from '@material-ui/icons/StarsOutlined';

import animationData from '../assets/peekAnimation.json';
import useFeaturedRepositories from '../hooks/useFeaturedRepositories';
import useMostStarredRepos from '../hooks/useMostStarredRepos';
import ReposList from '../components/ReposList';
import ReposChips from '../components/ReposChips';
import { languages } from '../utils/languages';

const App = () => {
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [searchOption, setSearchOption] = useState<'featured' | 'stars'>('featured');
  const [interval, setInterval] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const { data: featuredResponse, isLoading: isLoadingFeaturedRepos } = useFeaturedRepositories(currentLanguage, interval, currentLanguage !== '' && searchOption === 'featured')
  const { data: starredResponse, isLoading: isLoadingStarredRepos } = useMostStarredRepos(currentLanguage, currentLanguage !== '' && searchOption === 'stars')

  const handleChange = (event: any, value: string) => {
    const language = value;

    if (languages.includes(language) && !selectedLanguages.includes(language)) {
      setCurrentLanguage(language);
      setSelectedLanguages(current => [...current, language])
    }
  }

  const handleDeleteChip = (lang: string) => {
    const index = selectedLanguages.findIndex(item => item === lang);

    if (index !== -1) {
      setSelectedLanguages(current => current.filter(item => item !== lang));
    }
  }

  const handleClickChip = (lang: string) => {
    setCurrentLanguage(lang);
  }

  return (
    <div css={[tw`flex flex-grow flex-col w-full h-full lg:items-center min-h-screen bg-black bg-opacity-95 px-10`]}>
      <Head>
        <title>Gitpeek</title>
      </Head>

      <div tw="lg:w-9/12">
        <a href="/">
          <h1 tw="text-white my-5 text-5xl mb-10">Git<b tw="text-red-400">peek</b></h1>
        </a>

        <div>
          <button onClick={() => setSearchOption('featured')} style={{ color: '#fff', alignItems: 'center', marginRight: 10, padding: 5, borderRadius: 5, borderWidth: 1, borderColor: searchOption === 'featured' ? '#fff' : '#000' }}>
            <Trending tw="mr-2" />
            <span>Trending</span>
          </button>

          <button onClick={() => setSearchOption('stars')} style={{ color: '#fff', alignItems: 'center', marginRight: 10, padding: 5, borderRadius: 5, borderWidth: 1, borderColor: searchOption === 'stars' ? '#fff' : '#000' }}>
            <StarsIcon tw="mr-2" />
            <span>Most starred</span>
          </button>
        </div>

        <Autocomplete
          id="autocomplete-input"
          options={languages}
          getOptionLabel={option => option}
          autoHighlight
          freeSolo
          blurOnSelect
          clearOnBlur
          clearOnEscape
          disabled={selectedLanguages.length > 4}
          style={{
            border: 0,
            borderRadius: 8,
            padding: 8,
          }}
          onChange={handleChange}
          renderInput={params => (
            <TextField
              {...params}
              label="Choose a language"
              margin="normal"
              variant="filled"
              style={{ backgroundColor: '#FFF', borderRadius: 8 }}
            />
          )}
          renderOption={(option, { inputValue }) => {
            const matches = match(option, inputValue);
            const parts = parse(option, matches);

            return (
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{ fontWeight: part.highlight ? 700 : 400 }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            );
          }}
        />

        {searchOption === 'featured' && (
          <div tw="flex flex-row w-full">
            <Chip
              color={interval === 'daily' ? 'primary' : 'default'}
              label="This day"
              onClick={() => setInterval('daily')}
              style={{ margin: 5 }}
            />
            <Chip
              color={interval === 'weekly' ? 'primary' : 'default'}
              label="This week"
              onClick={() => setInterval('weekly')}
              style={{ margin: 5 }}
            />
            <Chip
              color={interval === 'monthly' ? 'primary' : 'default'}
              label="This month"
              onClick={() => setInterval('monthly')}
              style={{ margin: 5 }}
            />
          </div>
        )}

        {selectedLanguages.length > 0 && <div tw="border-t border-gray-50 w-full my-5" />}

        <ReposChips languages={selectedLanguages} currentLanguage={currentLanguage} handleDelete={handleDeleteChip} handleClick={handleClickChip} />

        {searchOption === 'featured' ? (
          <>
            {isLoadingFeaturedRepos ? (
              <div tw="self-center">
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: animationData,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice'
                    }
                  }}
                  width={300}
                  height={300}
                />
              </div>
            ) : (
                <>
                  {featuredResponse && featuredResponse.data && featuredResponse.data.length > 0 && selectedLanguages.length > 0 ? (
                    <ReposList featuredData={featuredResponse.data} starredData={[]} mode={searchOption} />
                  ) : (
                      <>
                        {currentLanguage !== '' ? (
                          <span tw="text-white self-center justify-self-center font-semibold text-lg">No repos found :(</span>
                        ) : (
                            <div tw="flex justify-center">
                              <Image src="/peek.svg" width={300} height={300} layout="intrinsic" />
                            </div>
                          )}
                      </>
                    )}
                </>
              )}
          </>
        ) : (
            <>
              {isLoadingStarredRepos ? (
                <div tw="self-center">
                  <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: animationData,
                      rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice'
                      }
                    }}
                    width={300}
                    height={300}
                  />
                </div>
              ) : (
                  <>
                    {starredResponse && starredResponse.length > 0 && selectedLanguages.length > 0 ? (
                      <ReposList featuredData={[]} starredData={starredResponse} mode={searchOption} />
                    ) : (
                        <>
                          {currentLanguage !== '' ? (
                            <span tw="text-white self-center justify-self-center font-semibold text-lg">No repos found :(</span>
                          ) : (
                              <div tw="flex justify-center">
                                <Image src="/peek.svg" width={300} height={300} layout="intrinsic" />
                              </div>
                            )}
                        </>
                      )}
                  </>
                )}
            </>
          )}

      </div>
    </div>
  )
}

export default App
