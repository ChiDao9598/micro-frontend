import { createApp, h } from "vue";
import singleSpaVue from "single-spa-vue";
import App from "./App.vue";
import "./index.css";

// Exports Single-SPA lifecycle functions: bootstrap, mount, unmount
const lifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App);
    },
  },
  handleInstance(app) {
    // Use this to install plugins, e.g. app.use(router) or app.use(pinia)
  },
  appOptions: {
    el: "#single-spa-application",
    render() {
      return h(App);
    },
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
