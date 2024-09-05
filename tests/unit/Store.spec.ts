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

  it("add character to the store", () => {
    const mockedCharacter = {
      name: "Luke Skywalker",
      birth_year: "19BBY",
      starships: [],
    };

    const characterStore = useCharactersStore();

    expect(characterStore.characters.length).toBe(0);

    characterStore.addCharacter(mockedCharacter);

    expect(
      characterStore.characters[characterStore.characters.length - 1].id
    ).toBe(characterStore.$state.nextId - 1);

    expect(characterStore.characters.length).toBe(1);
  });

  it("remove character from store and update Nextid", () => {
    const characterStore = useCharactersStore();

    const defaultCharacters = [
      { name: "Luke Skywalker", birth_year: "19BBY", starships: [] },
      { name: "Leia Organa", birth_year: "19BBY", starships: [] },
      { name: "Darth Vader", birth_year: "42BBY", starships: [] },
    ];

    characterStore.setCharacters(defaultCharacters);
    characterStore.removeCharacter(characterStore.characters[1].id);

    expect(characterStore.characters.length).toBe(defaultCharacters.length - 1);
    expect(characterStore.$state.nextId).toBe(
      characterStore.characters.length + 1
    );
  });
});
