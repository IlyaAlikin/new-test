<template>
  <div class="wrapper">
    <main class="main" id="main">
      <div class="main__container">
        <RouterView />
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView, RouterLink } from "vue-router";
import axios from "axios";

const fetchData = async () => {
  try {
    const response = await axios.get("https://swapi.dev/api/");
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>
<style scoped></style>
