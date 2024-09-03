import { defineStore } from "pinia";
import axios from "axios";

export const useCharactersStore = defineStore("characters", {
  state: () => ({
    characters: [] as any[], // Список персонажей
    starships: [] as any[], // Список истребителей
    nextId: 1,
  }),
  actions: {
    async loadStarships() {
      if (this.starships.length === 0) {
        try {
          const response = await axios.get("https://swapi.dev/api/starships/");
          this.starships = response.data.results;
        } catch (error) {
          console.error("Error fetching starships:", error);
        }
      }
    },
    setCharacters(characters: any[]) {
      this.characters = characters.map((char, index) => ({
        ...char,
        id: index + 1,
      }));
      this.nextId = characters.length + 1;
    },
    addCharacter(character: any) {
      character.id = this.nextId;
      this.characters.push(character);
      this.nextId++;
    },
    removeCharacter(id: number) {
      this.characters = this.characters.filter(
        (character) => character.id !== id
      );
      this.updateIds();
    },
    updateCharacter(id: number, updatedCharacter: any) {
      const index = this.characters.findIndex(
        (character) => character.id === id
      );
      if (index !== -1) {
        this.characters[index] = { ...updatedCharacter, id }; // Ensure id is preserved
      }
    },
    updateIds() {
      this.characters = this.characters.map((char, index) => ({
        ...char,
        id: index + 1,
      }));
      this.nextId = this.characters.length + 1;
    },
  },
  persist: true, // This should work if you use the correct persistence plugin
});
