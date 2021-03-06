import { useContext } from "react";
import styles from "./App.module.scss";
import { LoginBox } from "./components/LoginBox";
import { MessageList } from "./components/MessageList";
import { SendMessageForm } from "./components/SendMessageForm";
import { AuthContext } from "./context/auth";

export function App() {
  const { user } = useContext(AuthContext);

  return (
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : '' }`}>
      <MessageList />
      {/* se o usuario nao estiver nulo eu vou mostrar o sendMessageForm, se tiver, mostro o loginForm */}
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
}
