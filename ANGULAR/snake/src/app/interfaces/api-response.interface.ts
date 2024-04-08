export interface ICheckAuthTokenRequest {
  ['auth-token']: string
}

export interface ICheckAuthTokenResponse {
  success: boolean
}

export interface IGetScoresResponse {
  index?: number;
  name: string;
  score: number;
}

export interface IPostScoresRequest {
  name: string;
  game: "tetris";
  score: number;
  authToken?: string;
}


