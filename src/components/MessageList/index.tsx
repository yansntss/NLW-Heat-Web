import { api } from "../../services/api";
import { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import logoImg from "../../assets/logo.svg";

//sobre state, executa a função passada no primeiro parametro, sempre que o valor da variavel do segundo parametro mudar
//primeiro param: função --- segundo param: array com as variaveis
//quando eu quero que ela execute apenas uma vez, eu deixo o array vazio

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

export function MessageList() {
                                  //useState é uma lista de mensagem
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    //api é uma lista de mensagem
    api.get<Message[]>("messages/last3").then((response) => {
      setMessages(response.data)
    });
  }, []);
  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />
      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar esse evento, com certeza vai ser o melhor
            de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/yansntss.png" alt="yansntss" />
            </div>
            <span>yansntss</span>
          </div>
        </li>

        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar esse evento, com certeza vai ser o melhor
            de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/yansntss.png" alt="yansntss" />
            </div>
            <span>yansntss</span>
          </div>
        </li>

        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar esse evento, com certeza vai ser o melhor
            de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/yansntss.png" alt="yansntss" />
            </div>
            <span>yansntss</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
