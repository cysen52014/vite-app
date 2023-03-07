const modules = import.meta.glob("@/views/**/*");
const M = {};
Object.keys(modules).forEach((key) => {
  const k = key.replace("../views", "@/views").replace('/index.vue', '');
  M[k] = modules[key];
});
export const _import = (path) => {
  return M[`@/views${path}`];
};
