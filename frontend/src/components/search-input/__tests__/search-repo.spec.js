import { mount } from '@vue/test-utils'
import { createStore } from "vuex";
import SearchRepositories from '../SearchRepositories.vue'

describe("Search-Repositories", () => {
    let mockedRepoFn
    let store

    beforeEach(() => {
        mockedRepoFn = jest.fn()
        store = createStore({
            state: {
                repositories: []
            },
            actions: {
                saveRepositories: mockedRepoFn
            }
        })
    })
    
    test('Search Repositories', async () => {
        const wrapper = mount(SearchRepositories, {
            global: { plugins: [store] }
        })
        
        wrapper.vm.language = 'Java'
        await wrapper.vm.saveRepositories()
        expect(mockedRepoFn).toHaveBeenCalled()
    })
})