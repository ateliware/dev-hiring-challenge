import { mount } from '@vue/test-utils'
import InformationRepositorie from '../InformationRepositorie.vue'

describe("Information-Repositorie", () => {
    test('Modal Opened', () => {
        const wrapper = mount(InformationRepositorie, {
            props: {
                repositorie: {
                    nameWithOwner: "Pedro", 
                    createdAt:"2018-05-07T13:27:00Z", 
                    primaryLanguage: {name: 'Java'}, 
                    releases: { totalCount: 0 }, 
                    sshUrl: "", 
                    stargazers: { totalCount: 0 },
                    updatedAt: "2022-04-02T19:23:05Z"
                }
            }
        })
        
        expect(wrapper.html).toBeDefined()
    })
})