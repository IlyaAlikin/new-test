<template>
  <div>
    <h2 class="list-name">
      {{ isEdit ? "Редактировать персонажа" : "Создать персонажа" }}
    </h2>
    <div class="edit">
      <div>
        <OwnInput
          class="edit-input"
          label="Имя"
          v-model="editingCharacter.name"
        />
        <OwnInput
          class="edit-input"
          label="Год рождения"
          v-model="editingCharacter.birth_year"
        />
        <OwnSelect v-model="selectedStarshipId" :options="starshipOptions" />
        <div class="button__wrapper">
          <button @click="saveCharacter">
            {{ isEdit ? "Сохранить" : "Создать" }}
          </button>
          <button @click="cancelEditing">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCharactersStore } from "../stores/characters";
import OwnInput from "../components/OwnInput.vue";
import OwnSelect from "../components/OwnSelect.vue";
import { SimplifiedCharacter } from "../interfaces/character";

const route = useRoute();
const router = useRouter();
const charactersStore = useCharactersStore();

const isEdit = ref(false);
const editingCharacter = ref<SimplifiedCharacter>({
  id: Date.now(),
  name: "",
  birth_year: "",
  starships: [],
});

const selectedStarshipId = ref<string>("");

const starshipOptions = ref<{ id: string; name: string }[]>([]);

onMounted(() => {
  const id = route.params.id;
  if (id) {
    const character = charactersStore.characters.find(
      (c) => c.id === Number(id)
    );
    if (character) {
      editingCharacter.value = { ...character };
      isEdit.value = true;
      selectedStarshipId.value = character.starships[0] || "";
    }
  }
  loadStarshipOptions();
});

const loadStarshipOptions = () => {
  starshipOptions.value = charactersStore.starships.map((starship) => ({
    id: starship.url,
    name: starship.name,
  }));
};

const saveCharacter = () => {
  editingCharacter.value.starships = selectedStarshipId.value
    ? [selectedStarshipId.value]
    : [];
  if (isEdit.value) {
    charactersStore.updateCharacter(
      editingCharacter.value.id,
      editingCharacter.value
    );
  } else {
    charactersStore.addCharacter({
      ...editingCharacter.value,
      id: Date.now(),
    });
  }
  localStorage.setItem(
    "characters",
    JSON.stringify(charactersStore.characters)
  );
  router.push({ name: "List" });
};

const cancelEditing = () => {
  router.push({ name: "List" });
};
</script>

<style scoped>
.edit-input {
  margin-bottom: 10px;
  text-align: left;
}
.button__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 10px;
}
</style>
