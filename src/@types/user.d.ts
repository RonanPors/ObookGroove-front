// typage des données d'inscription
export type UserData = {
  credentials: Credentials;
  pseudo: string;
  confirmPassword: string;
  // accessToken: string;
  // refreshToken: string;
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
  pseudo: string;
};

export type SigninResponse = {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  pseudo: string;
};

export declare module 'react-google-recaptcha';
