import { useEffect } from 'react';
import {VscGithubInverted} from 'react-icons/vsc'

import styles from "./styles.module.scss";

export function LoginBox() {

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=c2ef8d87b60b2f4fd720`


  useEffect(()=>{
    //pegando url da aplicação
    const url = window.location.href
    //verificando se no texto da url tem o code
    const hasGithubCode = url.includes('?code=')

    if(hasGithubCode) {
      //o que vim antes do ' ?code= ' é minha url sem o code e o que vim depois, vai ser meu code
      const [urlWithoutCode, githubCode] = url.split('?code=')

      //tirando o code da url para nao ficar exposto 
      window.history.pushState({}, '', urlWithoutCode)
      
    }
  },[])

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}> 
      <VscGithubInverted size="24px" />
      Entrar com gitHub
      </a>
    </div>
  );
}
