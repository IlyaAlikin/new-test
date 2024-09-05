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

    expect(characterStore.starships).toHaveLength(mockStarships.length);
    expect(characterStore.starships).toEqual(mockStarships);
  });

  it("set characters and add it to each character in the store", () => {
    const mockCharacters = [
      { name: "Luke Skywalker", birth_year: "19BBY", starships: [] },
      { name: "Leia Organa", birth_year: "19BBY", starships: [] },
      { name: "Darth Vader", birth_year: "42BBY", starships: [] },
    ];

    (axios.get as jest.Mock).mockResolvedValue({
      data: { results: mockCharacters },
    });

    const characterStore = useCharactersStore();

    expect(characterStore.characters).toHaveLength(0);
    characterStore.setCharacters(mockCharacters);

    let counter = 1;

    characterStore.characters.forEach((element) => {
      expect(element.id).toBe(counter);
      counter++;
    });

    expect(characterStore.characters).toHaveLength(mockCharacters.length);
  });
});
