import { createStore } from "vuex";
import app from "./modules/app.js";
import user from "./modules/user.js";
import permission from "./modules/permission.js";

const store = createStore({
  modules: {
    app,
    user,
    permission
  },
});

export default store;
