import { Api } from "../axios-config";


interface Iauth {
  accessToken: string;
}

const auth = async (email: string, password: string ): Promise<Iauth | Error> => {
  try {
    const { data } = await Api.get('/auth', { data: { email, password as}});

    if (data) {
      return data;
    }

    return new Error('Erro no login.')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro no login.'
    )
  }
}

export const AuthService = {
  auth,

};