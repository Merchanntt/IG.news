import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

export const SignButton= () => {
  const isLogged = false;

  return isLogged ? (
      <button 
        type='button'
        className={styles.SignInButton}
        >
        <FaGithub color="#04d361"/>
        Merchanntt
        <FiX color="#737380" className={styles.CloseIcon}/>
      </button>
  ) : (
    <button 
      type='button'
      className={styles.SignInButton}
      >
      <FaGithub color="#eba417"/>
      Sign In with GitHub
    </button>
  );
}
