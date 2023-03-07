import { constantRouterMap } from "@/router/constant";
import GetRoutes from "@/router/map";
import { _import } from "@/router/_import";

const Conf = {
  HAS_TOP_NAV: false,
};

const permission = {
  namespaced: true,
  state: {
    cachRouter: [],
    routers: constantRouterMap,
    asyncRouter: [],
    addRouters: [],
    currentRouter: [],
    currentRouterIndex: localStorage.getItem("topnav-active-key") || 0,
    sidebarActiveIndex: localStorage.getItem("sideber-active-key") || "1",
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.asyncRouter = Conf.HAS_TOP_NAV ? routers : [];
      state.currentRouter = Conf.HAS_TOP_NAV
        ? routers[state.currentRouterIndex].childrens
        : routers;
      const LayoutComp = [
        {
          path: "/",
          component: _import("/layout"),
          redirect: "/home",
          name: "主页",
          hidden: true,
          children: state.cachRouter,
        },
        {
          path: "/:pathMatch(.*)",
          redirect: "/404"
        },
      ];

      state.addRouters = LayoutComp;
      state.routers = constantRouterMap.concat(LayoutComp);
    },
    GET_SIDBAR_ROUTERS: (state, index) => {
      localStorage.setItem("topnav-active-key", index);
      state.currentRouterIndex = index;
      state.currentRouter = state.asyncRouter[index].childrens;
    },
    GET_SIDBAR_ACTIVE_INDEX: (state, index) => {
      localStorage.setItem("sideber-active-key", index);
      state.sidebarActiveIndex = index;
    },
  },
  getters: {
    addRouters(state) {
      return state.addRouters;
    },
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      if (data.rowrouter.length < 1) return;
      return new Promise((resolve) => {
        console.log(data, '--rowrouter--')
        const GR = GetRoutes(data.rowrouter);
        const accessedRouters = GR.tree;
        permission.state.cachRouter = GR.route;
        console.log("accessedRouters", accessedRouters);
        commit("SET_ROUTERS", accessedRouters);
        resolve();
      });
    },
    changeSidebarActiveIndex({ commit }, index) {
      commit("GET_SIDBAR_ACTIVE_INDEX", index);
    },
    changeSidebarRouter({ commit }, index) {
      if (Conf.HAS_TOP_NAV) {
        commit("GET_SIDBAR_ROUTERS", index);
      }
    },
  },
};

export default permission;
