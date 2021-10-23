import { api } from "../../services/api";
import { useEffect, useState } from "react";
import io from "socket.io-client";

import logoImg from "../../assets/logo.svg";

import styles from "./styles.module.scss";
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

const messagesQueue: Message[] = [];

const socket = io("http://localhost:4000");

socket.on("new_message", (newMessage: Message) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  //useState é uma lista de mensagem
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prevState) =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
        ); //remover valor falso
        messagesQueue.shift()
      }

    }, 3000);
  }, []);

  useEffect(() => {
    //api é uma lista de mensagem
    api.get<Message[]>("messages/last3").then((response) => {
      setMessages(response.data);
    });
  }, []);
  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />
      <ul className={styles.messageList}>
        {messages.map((message) => {
          return (
            <li key={message.id} className={styles.message}>
              <p className={styles.messageContent}>{message.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
