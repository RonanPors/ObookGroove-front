import axios, { AxiosError } from 'axios';

/* --------------------------------------
----------------- SPOTIFY ---------------
----------------------------------------*/

export async function spotifyAuthorizationApi() {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/spotify/connect-user`,
      {
        withCredentials: true,
      }
    );

    console.log(data.uri);
    return data.uri;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.error.message);
    }
    throw new Error('Unknown Error');
  }
}

/* --------------------------------------
------------ SPOTIFY CALLBACK -----------
----------------------------------------*/

export async function getSpotifyTokenApi(code: string, state: string) {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/spotify/callback?code=${code}&state=${state}`,
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
