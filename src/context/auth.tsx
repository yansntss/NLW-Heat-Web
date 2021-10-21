import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
  //tipo: tudo que o react aceita
  children: ReactNode;
};

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=c2ef8d87b60b2f4fd720`;

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>("authenticate", {
      code: githubCode,
    });

    const { token, user } = response.data;

    //salvando o token no storage do navegador
    localStorage.setItem("@dowhile:token", token);

    setUser(user);
  }

  function signOut(){
    setUser(null)
    localStorage.removeItem("@dowhile:token")
  }

  useEffect(() => {
    const token = localStorage.getItem("@dowhile:token");

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>("profile").then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    //pegando url da aplicação
    const url = window.location.href;
    //verificando se no texto da url tem o code
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      //o que vim antes do ' ?code= ' é minha url sem o code e o que vim depois, vai ser meu code
      const [urlWithoutCode, githubCode] = url.split("?code=");

      //tirando o code da url para nao ficar exposto
      window.history.pushState({}, "", urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
