import { shallowMount } from "@vue/test-utils";
import ListPage from "@/pages/ListPage.vue";
import { createTestingPinia } from "@pinia/testing";
import { useCharactersStore } from "@/stores/characters";
import axios from "axios";

jest.mock("axios");

describe("ListPage.vue", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(ListPage, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
  });

  it("show length of character list", async () => {
    const charactersStore = useCharactersStore();

    charactersStore.characters = [
      { id: 1, name: "Luke Skywalker", birth_year: "19BBY", starships: [] },
    ];

    await wrapper.vm.$nextTick();

    const characterCount = wrapper.find(".list-name");
    expect(characterCount.text()).toBe("Число персонажей: 1");
  });

  it("show message when list is empty", async () => {
    const charactersStore = useCharactersStore();

    charactersStore.characters = [];

    await wrapper.vm.$nextTick();

    const noDataMessage = wrapper.find("p");
    expect(noDataMessage.text()).toBe(
      "Нет данных для отображения. Попробуйте загрузить данные снова."
    );
  });
});
