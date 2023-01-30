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
                    "license": {
                        "key": "mit",
                        "name": "MIT License",
                        "spdx_id": "MIT",
                        "url": "https://api.github.com/test/test-repo",
                        "node_id": "1234"
                    },
                    "homepage": null,
                    "stars": 12345
                }]
            }
        })
        getByText( "test/test-repo")
    })
})