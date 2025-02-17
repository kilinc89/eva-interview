interface AuthState {
    accessToken: string | null
    refreshToken: string | null
  }
  
  interface LoginPayload {
    email: string
    password: string
  }
  
interface LoginResponse {
    "ApiStatus": false,
    "ApiStatusCode": 404,
    "ApiStatusMessage": "",
    "Data": {
        "AccessToken": "string",
        "RefreshToken": "string",
        "ExpiresAt": "2025-02-17T10:00:00.000Z",
        "TokenType": "string"
    }
  }

  export type { AuthState, LoginPayload, LoginResponse }