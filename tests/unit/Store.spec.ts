import { setActivePinia, createPinia } from "pinia";
import { useCharactersStore } from "@/stores/characters";
import axios from "axios";

jest.mock("axios");

describe("Characters Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("loads starships and updates the store", async () => {
    const mockStarships = [{ name: "X-wing" }, { name: "TIE Fighter" }];

    (axios.get as jest.Mock).mockResolvedValue({
      data: { results: mockStarships },
    });

    const characterStore = useCharactersStore();

    expect(characterStore.starships).toHaveLength(0);

    await characterStore.loadStarships();

    expect(characterStore.starships).toHaveLength(2);
    expect(characterStore.starships).toEqual(mockStarships);
  });
});
