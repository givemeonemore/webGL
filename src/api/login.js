import { POST } from "@/plugins/axios";

export function loginCheck(params) {
  return POST("user/login", "用户登录验证", params);
}
