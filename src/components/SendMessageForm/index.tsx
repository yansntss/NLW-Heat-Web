import { useContext } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import styles from './styles.module.scss';
import { AuthContext } from "../../context/auth";

export function SendMessageForm() {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton}>
        <VscSignOut size="32" />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16px" />
          {user?.login}
        </span>
      </header>

      <form className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea 
        name="message"
         id="message" 
         placeholder="Qual sua expectativa para o evento? "/>

         <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  );
}
