import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export async function generateTokensObg() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/generate`
    );

    if (!response.ok) throw new Error('Erreur.');

    return true;
  } catch (err) {
    return null;
  }
}

export async function getUser() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/tokens`
    );

    if (!response.ok) throw new Error('Erreur.');

    const { accessTokenObg } = await response.json();

    return getUserFromToken(accessTokenObg);
  } catch (err) {
    return null;
  }
}

function getUserFromToken(token) {
  const { claims } = jwtDecode(token);

  return {
    id: claims.sub,
    pseudo: claims.pseudo,
  };
}
