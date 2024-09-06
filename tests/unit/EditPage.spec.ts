import { shallowMount } from "@vue/test-utils";
import EditPage from "@/pages/EditPage.vue";
import { createTestingPinia } from "@pinia/testing";
import { useCharactersStore } from "@/stores/characters";
import { useRoute, useRouter } from "vue-router";
import OwnInput from "@/components/OwnInput.vue";
import OwnSelect from "@/components/OwnSelect.vue";

jest.mock("vue-router", () => ({
  useRoute: jest.fn(),
  useRouter: jest.fn(),
}));

describe("EditPage.vue", () => {
  let wrapper: any;
  let mockRouter: any;
  let mockRoute: any;

  beforeEach(() => {
    mockRouter = { push: jest.fn() };
    mockRoute = { params: {} };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useRoute as jest.Mock).mockReturnValue(mockRoute);

    wrapper = shallowMount(EditPage, {
      global: {
        plugins: [createTestingPinia()],
      },
      components: {
        OwnInput,
        OwnSelect,
      },
    });
  });

  it("update store after edited character", async () => {
    const charactersStore = useCharactersStore();

    mockRoute.params = { id: 1 };
    charactersStore.characters = [
      { id: 1, name: "Luke Skywalker", birth_year: "19BBY", starships: [] },
    ];

    wrapper = shallowMount(EditPage, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    wrapper.vm.editingCharacter.name = "Updated Character";

    await wrapper.find("button").trigger("click");

    expect(charactersStore.updateCharacter).toHaveBeenCalledWith(1, {
      id: 1,
      name: "Updated Character",
      birth_year: "19BBY",
      starships: [],
    });

    expect(mockRouter.push).toHaveBeenCalledWith({ name: "List" });
  });
});
