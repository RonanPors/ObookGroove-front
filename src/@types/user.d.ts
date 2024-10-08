// typage des données d'inscription
export type UserData = {
  credentials: Credentials;
  pseudo: string;
  confirmPassword: string;
  id: number | null;
};

export type Credentials = {
  email: string;
  password: string;
};

// retour de la requête sur la route auth/signup
export type SignupResponse = {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  // pseudo: string;
  id: number;
};

export type SigninResponse = {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  // pseudo: string;
  id: number;
};

export declare module 'react-google-recaptcha';
