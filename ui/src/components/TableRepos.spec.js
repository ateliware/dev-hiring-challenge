import { describe, expectTypeOf, it } from 'vitest'
import { render } from '@testing-library/vue'
import TableRepos from './TableRepos.vue'

describe('test table reposiories', () => {
    it('should return an empty table', () => {
        const { getByText, } = render(TableRepos)
        getByText("No selection")
    })

    it('should return a non empty table', () => {
        const { getByText } = render(TableRepos, {
            props: {
                repos: [{
                    "id": 1234,
                    "full_name": "test/test-repo",
                    "description": "Test description",
                    "url": "https://github.com/test/test-repo",
                    "license": "MIT License",
                    "homepage": null,
                    "stars": 12345
                }]
            }
        })
        getByText( "test/test-repo")
    })
})