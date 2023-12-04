// ** Auth Endpoints
export default {
  loginEndpoint: "https://admin.smartstartnow.com/api/login",
  registerEndpoint: "https://admin.smartstartnow.com/api/register",
  refreshEndpoint: "/jwt/refresh-token",
  logoutEndpoint: "/jwt/logout",

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: "Bearer",

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: "accessToken",
  storageRefreshTokenKeyName: "refreshToken"
}
