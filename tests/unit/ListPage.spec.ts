import { shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import ListPage from "@/pages/ListPage.vue";

describe("ListPage.vue", () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  it("renders props.msg when passed", () => {
    const msg = "Число персонажей: ";
    const amountOfCharacters = "0";
    const wrapper = shallowMount(ListPage, {
      global: {
        plugins: [createPinia()], // Use Pinia as a plugin
      },
    });
    expect(wrapper.text()).toMatch(msg + amountOfCharacters);
  });
});
