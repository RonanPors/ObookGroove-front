import { jwtDecode } from 'jwt-decode';
import axios, { AxiosError } from 'axios';
import { Credentials, SigninResponse, SignupResponse } from '../@types/user';

/* --------------------------------------
---------------- SIGNUP --------------
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
      // console.log(err.response.data.error.message);
      throw new Error(err.response?.data.error.message);
    }
    throw new Error('Unknown Error');
  }
}

/* --------------------------------------
--------- CONFIRM SIGN UP --------------
----------------------------------------*/
export type ConfirmSignupArgs = {
  userId: string;
  confirmToken: string;
};
export async function confirmSignUpApi(args: ConfirmSignupArgs) {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/confirm-signup/${args.userId}/${args.confirmToken}`
    );

    console.log(data);
    return data;
  } catch (err) {
    return null;
  }
}

/* --------------------------------------
---------------- SIGN IN -----------------
----------------------------------------*/

export async function signinApi(body: Credentials) {
  try {
    const { data } = await axios.post<SigninResponse>(
      `${import.meta.env.VITE_API_URL}/auth/signin`,
      body
    );
    console.log(data);
    return data;
  } catch (err) {
    return null;
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
  } catch (err) {
    return null;
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
  } catch (err) {
    return null;
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
  } catch (err) {
    return null;
  }
}

/* --------------------------------------
---------------- GET TOKEN --------------
----------------------------------------*/
function getUserFromToken(token: string) {
  const { sub } = jwtDecode(token);

  return { id: sub };
}

export async function getUser() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/tokens`
    );

    if (!(response.status === 200)) throw new Error('Erreur.');

    const { accessTokenObg, pseudo } = await response.data;

    return { ...getUserFromToken(accessTokenObg), pseudo };
  } catch (err) {
    return null;
  }
}
