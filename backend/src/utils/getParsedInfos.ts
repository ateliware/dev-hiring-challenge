export default function parseInfo(paths: string[], stars: any[]): { uniquePaths: string[], stars: any[] } {
    let uniquePaths = []

    paths.forEach((path, index) => {
        if (index % 2 === 0) {
            const splitted = path.split('/')

            uniquePaths.push(splitted[1] + '/' + splitted[2])

        }
    })

    return {
        uniquePaths,
        stars: stars.filter((item, index) => index % 2 === 0)
    }
}