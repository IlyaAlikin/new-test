<template>
  <h2 class="list-name">Число персонажей: {{ characters.length }}</h2>
  <div v-if="characters.length > 0">
    <div class="list">
      <div v-for="item in characters" class="card" :key="item.id">
        <div class="card__name card-field">
          <p>Имя:</p>
          <p>{{ item.name }}</p>
        </div>
        <div class="card__birth_year card-field">
          <p>Год рождения:</p>
          <p>{{ item.birth_year }}</p>
        </div>
        <div class="starship" v-if="item.starships.length >= 1">
          <div v-if="shipData[item.starships[0]]">
            <div>Название корабля: {{ shipData[item.starships[0]].name }}</div>
          </div>
        </div>
        <div class="card__actions">
          <button @click="editCharacter(item.id)">Изменить</button>
          <button class="delete-button" @click="removeCharacter(item.id)">
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Нет данных для отображения. Попробуйте загрузить данные снова.</p>
    <button @click="loadCharactersFromStore">Загрузить персонажей</button>
  </div>
  <div>
    <button class="add_button" @click="createCharacter">
      Добавить нового персонажа
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useCharactersStore } from "../stores/characters";
import { SimplifiedCharacter } from "../interfaces/character";
import axios from "axios";

const charactersStore = useCharactersStore();
const characters = ref<SimplifiedCharacter[]>([]);
const shipData = ref<{ [key: string]: any }>({});

const router = useRouter();

const loadCharactersFromStore = async () => {
  if (charactersStore.characters.length === 0) {
    // Если данных нет, загружаем их из API
    await charactersStore.loadStarships();
    const fetchedCharacters = await fetchCharactersFromApi();
    if (fetchedCharacters.length > 0) {
      charactersStore.setCharacters(fetchedCharacters);
    }
  }

  characters.value = charactersStore.characters;
  prepareStarshipData();
};

const fetchCharactersFromApi = async (): Promise<SimplifiedCharacter[]> => {
  try {
    const response = await axios.get("https://swapi.dev/api/people/");
    return response.data.results.map((character: any) => ({
      id: Date.now() + Math.random(),
      name: character.name,
      birth_year: character.birth_year,
      starships: character.starships,
    }));
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
};

const prepareStarshipData = () => {
  shipData.value = charactersStore.starships.reduce((acc, starship) => {
    acc[starship.url] = starship;
    return acc;
  }, {});
};

const editCharacter = (id: number) => {
  router.push({ name: "Edit", params: { id } });
};

const createCharacter = () => {
  router.push({ name: "Edit" });
};

const removeCharacter = (id: number) => {
  charactersStore.removeCharacter(id);
  loadCharactersFromStore();
};

onMounted(() => {
  loadCharactersFromStore();
});

watch(
  () => charactersStore.characters,
  () => {
    loadCharactersFromStore();
  }
);
</script>
