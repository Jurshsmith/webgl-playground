import { createApp, h } from "vue";

import routes from "./routes";

const SimpleRouterApp = {
  data: () => ({
    currentRoute: window.location.pathname,
  }),

  computed: {
    ViewComponent() {
      const matchingPage = routes[this.currentRoute] || "Index";

      if (!routes[this.currentRoute]) {
        window.history.pushState({}, "Home", "/");
      }
      return require(`./pages/${matchingPage}.vue`).default;
    },
  },

  render() {
    return h(this.ViewComponent);
  },

  created() {
    window.addEventListener("popstate", () => {
      this.currentRoute = window.location.pathname;
    });
  },
};

createApp(SimpleRouterApp).mount("#app");
