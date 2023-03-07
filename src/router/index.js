// import { createRouter, createWebHashHistory } from "vue-router";

// import * as NotFound from "@/views/404";

// export const constantRouterMap = [
//   {
//     path: "/login",
//     component: () => import("@/views/login"),
//     hidden: true,
//   },
//   {
//     path: "/404",
//     name: "404",
//     component: NotFound,
//     hidden: true,
//   },
// ];

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes: [
//     {
//       path: "/",
//       component: Home,
//     },
//   ],
// });

// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap,
// });

import { createRouter, createWebHashHistory } from "vue-router";
import { Permission } from "./permission";
import { constantRouterMap } from "./constant";

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap,
});
Permission(router); // 路由监控

export default router;
