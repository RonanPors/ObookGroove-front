import { jwtDecode } from 'jwt-decode';
import axios, { AxiosError } from 'axios';
import { Credentials, SigninResponse, SignupResponse } from '../@types/user';

/* --------------------------------------
---------------- SIGN UP --------------
----------------------------------------*/
export async function signupApi(body: {
  email: string;
  password: string;
  confirmPassword: string;
  pseudo: string;
}) {
  try {
    const { data } = await axios.post<SignupResponse>(
      `${import.meta.env.VITE_API_URL}/auth/signup`,
      body
    );
    console.log(data); // { ok : true }
    return data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.error.message);
    }
    throw new Error('Unknown Error');
  }
}

/* --------------------------------------
--------- CONFIRM SIGN UP --------------
----------------------------------------*/

/* fonction pour récupérer l'id dans le token 
(utilisé dans confirm signup et signin) */
function getUserFromToken(token: string): { id: number | null } {
  const { sub } = jwtDecode(token);
  if (sub) {
    // on transforme l'id string en number
    return { id: parseInt(sub, 10) };
  }
  // sinon on renvoie un id null
  return { id: null };
}

export type ConfirmSignupArgs = {
  userId: string;
  confirmToken: string;
};
export async function confirmSignUpApi(args: ConfirmSignupArgs) {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/confirm-signup/${args.userId}/${args.confirmToken}`,
      {
        withCredentials: true,
      }
    );

    console.log(data);
    // on fusionne les 2 objets data et l'id dans l'accessToken :
    return { ...data, ...getUserFromToken(data.accessToken) };
    // return data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.error.message);
    }
    throw new Error('Unknown Error');
  }
}

/* --------------------------------------
---------------- SIGN IN -----------------
----------------------------------------*/

export async function signinApi(body: Credentials) {
  try {
    const { data } = await axios.post<SigninResponse>(
      `${import.meta.env.VITE_API_URL}/auth/signin`,
      body,
      {
        withCredentials: true,
      }
    );
    console.log(data);
    // on fusionne les 2 objets data et l'id dans l'accessToken :
    return { ...data, ...getUserFromToken(data.accessToken) };
    // return data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.error.message);
    }
    throw new Error('Unknown Error');
  }
}

/* --------------------------------------
------------ RESET PASSWORD -------------
----------------------------------------*/

export async function resetPasswordApi(body: { email: string }) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/reset-password`,
      body
    );
    console.log(data);
    return data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.error.message);
    }
    throw new Error('Unknown Error');
  }
}

/* --------------------------------------
---------------- LOGOUT -----------------
----------------------------------------*/

export async function logoutApi() {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/logout`,
      {
        withCredentials: true,
      }
    );
    console.log(data);
    return data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.error.message);
    }
    throw new Error('Unknown Error');
  }
}

/* --------------------------------------
------------ LOGOUT SPOTIFY -------------
----------------------------------------*/

export async function logoutSpotifyApi() {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/spotify/logout`,
      {
        withCredentials: true,
      }
    );
    console.log(data);
    return data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.error.message);
    }
    throw new Error('Unknown Error');
  }
}

/* -------------------------------------
------------- NEW PASSWORD -------------
----------------------------------------*/

export type NewPasswordArgs = {
  userId: string;
  resetToken: string;
};

export async function newPasswordApi(
  body: { password: string; confirmPassword: string },
  args: NewPasswordArgs
) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/reset-password/${args.userId}/${args.resetToken}`,
      body
    );

    console.log(data);
    return data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.error.message);
    }
    throw new Error('Unknown Error');
  }
}
/* --------------------------------------
----------- GENERATE TOKEN --------------
----------------------------------------*/
export async function generateTokensObg() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/generate`
    );

    if (response.status !== 200) throw new Error(response.statusText);

    return response;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.error.message);
    }
    throw new Error('Unknown Error');
  }
}

/* --------------------------------------
------ GET USER BY ID FROM TOKEN---------
----------------------------------------*/
// function getUserFromToken(token: string) {
//   const { sub } = jwtDecode(token);

//   return { id: sub };
// }

export async function getUser() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/tokens`,
      {
        withCredentials: true,
      }
    );

    if (!(response.status === 200)) throw new Error('Erreur.');

    const { accessTokenObg } = await response.data;

    return { ...getUserFromToken(accessTokenObg) };
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.error.message);
    }
    throw new Error('Unknown Error');
  }
}
