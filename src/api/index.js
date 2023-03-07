import request from "@/utils/request";

export function forum(params) {
  return request({
    url: "/forum",
    method: "get",
    params
  });
}

export function threads(params) {
  return request({
    url: "/threads",
    method: "get",
    params
  });
}