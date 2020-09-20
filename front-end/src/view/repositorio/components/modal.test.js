import Vuetify from "vuetify";
import { mount, createLocalVue } from "@vue/test-utils";
import modal from "./modal.vue";

const localVue = createLocalVue();

describe("Verificar comportamento da Modal", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("Botão click deve fechar modal", () => {
    const wrapper = mount(modal, {
      propsData: {
        repositorio: {
          nome:"",
          proprietario:"",
          descricao:"",
          url:"",
          linguagem:"",
          forks:"", 
          issues:"", 
          estrelas:"", 
          seguidores:""
        },
      },
      localVue,
      vuetify
    });

    const event = jest.fn();

    wrapper.setMethods({ fecharModal: event });

    const buscarLotes = wrapper.find("v-btn");

    wrapper.vm.$on("click", event);

    expect(event).toHaveBeenCalledTimes(0);

    buscarLotes.trigger("click");

    expect(event).toHaveBeenCalledTimes(1);
  });
});
