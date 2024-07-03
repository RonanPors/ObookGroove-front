// typage des données d'inscription
export type UserData = {
  credentials: Credentials;
  pseudo: string;
  confirmPassword: string;
  phoneNumber?: string;
  cgu: boolean;
};

export type Credentials = {
  email: string;
  password: string;
};
