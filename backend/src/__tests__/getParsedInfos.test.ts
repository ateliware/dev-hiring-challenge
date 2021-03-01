import getParsedInfos from '../utils/getParsedInfos';

describe('getParsedInfos function', () => {
    const paths = [
        '/termux/termux-app/stargazers',
        '/termux/termux-app/network/members.termux-app',
        '/mercyblitz/geekbang-lessons/stargazers',
        '/mercyblitz/geekbang-lessons/network/members.geekbang-lessons',
        '/NationalSecurityAgency/ghidra/stargazers',
        '/NationalSecurityAgency/ghidra/network/members.ghidra',
        '/signalapp/Signal-Android/stargazers',
        '/signalapp/Signal-Android/network/members.Signal-Android',
        '/TeamNewPipe/NewPipe/stargazers',
        '/TeamNewPipe/NewPipe/network/members.NewPipe',
    ]

    const stars = [
        '7,283', '1,094', '445', '937', '25,008',
        '3,373', '19,950', '4,705', '12,782', '1,684'
    ]

    it('should return the paths and stars from the raw data parsed with cheerio', () => {
        const expectedPaths = [
            'termux/termux-app',
            'mercyblitz/geekbang-lessons',
            'NationalSecurityAgency/ghidra',
            'signalapp/Signal-Android',
            'TeamNewPipe/NewPipe'
        ]
        const expectedStars = [
            '7,283', '445', '25,008',
            '19,950', '12,782'
        ]

        expect(getParsedInfos(paths, stars)).toStrictEqual({ uniquePaths: expectedPaths, stars: expectedStars })
    })
})