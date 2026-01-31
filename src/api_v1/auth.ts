import { api, unwrap, withoutAuth, tokenManager } from "./client";
import type { AuthTokens, User } from "./types";
import type { RequestConfig } from "./client";

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  displayName?: string;
}

export interface LoginPayload {
  emailOrUsername: string;
  password: string;
}

export interface LoginResult {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const register = (payload: RegisterPayload, config?: RequestConfig) => {
  return unwrap<LoginResult>(api.post("/auth/register", payload, withoutAuth(config)));
};

export const login = (payload: LoginPayload, config?: RequestConfig) => {
  return unwrap<LoginResult>(api.post("/auth/login", payload, withoutAuth(config)));
};

export const refresh = (refreshToken?: string, config?: RequestConfig) => {
  const token = refreshToken ?? tokenManager.getRefreshToken();
  return unwrap<AuthTokens>(
    api.post(
      "/auth/refresh",
      { refreshToken: token },
      withoutAuth(config)
    )
  );
};

export const me = (config?: RequestConfig) => {
  return unwrap<User>(api.get("/auth/me", undefined, config));
};

export const logout = (token?: string, config?: RequestConfig) => {
  const fallbackToken = tokenManager.getRefreshToken() ?? tokenManager.getAccessToken();
  return unwrap<void>(api.post("/auth/logout", { token: token ?? fallbackToken }, config));
};

export const authApi = {
  register,
  login,
  refresh,
  me,
  logout,
};
