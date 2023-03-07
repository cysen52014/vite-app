import { _import } from "./_import";
export const constantRouterMap = [
  {
    path: "/login",
    component: _import("/login"),
    hidden: true,
  },
  {
    path: "/404",
    name: "404",
    component: _import("/404"),
    hidden: true,
  },
];
