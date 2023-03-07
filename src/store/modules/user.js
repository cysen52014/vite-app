import { login, logout, getInfo } from "@/api/login.js";
import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
  namespaced: true,
  state: {
    token: getToken(),
    name: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).name
      : "",
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
    roles: [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
  },
  getters: {
    roles(state) {
      return state.roles;
    },
  },
  actions: {
    // 登录
    Login({ commit }, info) {
      // const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(info)
          .then((response) => {
            if (response.errCode === 0) {
              if (response.data.token) {
                setToken(response.data.token);
                commit("SET_TOKEN", response.data.token);
                commit("SET_NAME", response.data.user.username);
                commit("SET_USER", response.data.user);
                localStorage.setItem(
                  "user",
                  JSON.stringify(response.data.user)
                );
              }
            }
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (!state.token) return;
        const username = state.user.username || "";
        getInfo(state.user)
          .then((response) => {
            commit("SET_ROLES", [username]);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            removeToken();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }, cb) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        removeToken();
        resolve();
      });
    },
  },
};

export default user;
