import { createRouter, createWebHistory } from "vue-router";
import ListPage from "../pages/ListPage.vue";
import EditPage from "../pages/EditPage.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "List",
      component: ListPage,
    },
    {
      path: "/edit/:id?",
      name: "Edit",
      component: EditPage,
      props: true,
    },
  ],
});

export default router;
