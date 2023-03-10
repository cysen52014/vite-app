
import request from "@/utils/request";
import routermap from "./routermap";

export function login(data) {
  return request({
    url: "/users/login",
    method: "post",
    data,
  });
}

export function getInfo() {
  // const params = {
  //   identifier: "advSystem"
  // };
  // return request({
  //   proxy: "uaa",
  //   url: "/resource/getMenuForToken",
  //   params,
  //   method: "get"
  // });
  return new Promise((resolve, reject) => {
    resolve({
      code: "0",
      data: routermap,
      msg: "success",
    });
  });
}

export function logout() {
  return new Promise((resolve, reject) => {
    resolve({
      code: "0000",
      data: null,
      msg: "success",
    });
  });
}
