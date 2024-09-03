OwnSelect.vue
<template>
  <div class="select-container">
    <div class="selected-item" @click="toggleDropdown">
      {{ selectedItemName }}
    </div>
    <div v-if="dropdownOpen" class="dropdown-list">
      <div
        v-for="option in options"
        :key="option.id"
        @click="selectOption(option.id)"
        class="dropdown-item"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array as () => { id: string; name: string }[],
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const dropdownOpen = ref(false);

const selectedItemName = computed(() => {
  const selectedOption = props.options.find(
    (option) => option.id === props.modelValue
  );
  return selectedOption ? selectedOption.name : "Select an option";
});

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectOption = (id: string) => {
  emit("update:modelValue", id);
  dropdownOpen.value = false;
};
</script>

<style scoped>
.select-container {
  position: relative;
  width: 100%;
}

.selected-item {
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.dropdown-list {
  position: absolute;
  width: 100%;
  border: 1px solid #ccc;
  background-color: #ccc;
  color: black;
  max-height: 150px;
  overflow-y: auto;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>
