<template>
  <div>
    <label :for="label">{{ label }}</label>
    <input
      class="edit-input"
      :id="label"
      v-model="localValue"
      @input="updateValue"
      :type="type"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
});

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const localValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue;
  }
);

const updateValue = () => {
  emit("update:modelValue", localValue.value);
};
</script>

<style scoped>
/* Добавьте свои стили */
label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}
</style>
