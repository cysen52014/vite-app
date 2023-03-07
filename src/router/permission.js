import store from "@/store";
import { ElMessage } from "element-plus";
import { getToken } from "@/utils/auth"; // 验权

const whiteList = ["/login", "/404"]; // 不重定向白名单

const addRouters = (router, routers) => {
  routers.forEach(r => {
    router.addRoute(r)
  })
}

export const Permission = (router) => {
  router.beforeEach((to, from, next) => {
    if (getToken()) {
      // 判断是否有token
      if (to.path === "/login") {
        next({ path: "/" });
      } else {
        if (store.getters["user/roles"].length === 0) {
          // 判断当前用户是否已拉取完user_info信息
          store
            .dispatch("user/GetInfo")
            .then((res) => {
              // 拉取user_info
              var rowrouter = res.data;
              store
                .dispatch("permission/GenerateRoutes", { rowrouter })
                .then(() => {
                  // 生成可访问的路由表
                  console.log(
                    "store.getters.addRouters",
                    store.getters["permission/addRouters"]
                  );
                  addRouters(router, store.getters["permission/addRouters"])
                  next({ ...to });
                });
            })
            .catch(() => {
              store.dispatch("FedLogOut").then(() => {
                ElMessage.error("验证失败,请重新登录");
                next({ path: "/login" });
              });
            });
        } else {
          next();
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next();
      } else {
        next("/login"); // 否则全部重定向到登录页
      }
    }
  });

  router.afterEach(() => {});
};
