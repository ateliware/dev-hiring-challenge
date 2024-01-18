import { mount } from '@vue/test-utils'
import { createStore } from "vuex";
import RepositoriesGit from '../RepositoriesGit.vue'

describe("Repositories-Git", () => {
    let mockedRepoFn
    let store

    beforeEach(() => {
        mockedRepoFn = jest.fn()
        store = createStore({
            state: {
                repositories: []
            },
            getters: {
                getRepositories: mockedRepoFn
            }
        })
    })
    
    test('Updated Repositories', () => {
        const wrapper = mount(RepositoriesGit, {
            global: { plugins: [store] }
        })

        
        expect(mockedRepoFn).toHaveBeenCalled()

    })

    test('Modal Open', () => {
        const wrapper = mount(RepositoriesGit, {
            propsData: {
                isVisibleModal: false
            },
            global: { plugins: [store] }
        })

        wrapper.vm.openModal([])
        expect(wrapper.vm.isVisibleModal).toBe(true)

    })

    test('Modal closed', () => {
        const wrapper = mount(RepositoriesGit, {
            propsData: {
                isVisibleModal: false
            },
            global: { plugins: [store] }
        })

        wrapper.vm.closeModal()
        expect(wrapper.vm.isVisibleModal).toBe(false)

    })
})