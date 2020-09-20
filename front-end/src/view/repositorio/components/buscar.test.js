import Vuetify from "vuetify";
import { mount, createLocalVue } from "@vue/test-utils";
import buscar from "./buscar.vue";

const localVue = createLocalVue();

describe("Verificar da tela de busca de repositórios", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("Botão click deve efetuar a busca", () => {
    const wrapper = mount(buscar, {
      localVue,
      vuetify
    });

    const event = jest.fn();

    wrapper.setMethods({ buscar: event });

    const buscarLotes = wrapper.find("v-btn");

    wrapper.vm.$on("click", event);

    expect(event).toHaveBeenCalledTimes(0);

    buscarLotes.trigger("click");

    expect(event).toHaveBeenCalledTimes(1);
  });
});
