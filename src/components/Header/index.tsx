import { SignButton } from './SignButton'

import style from './styles.module.scss'

export const Header = () => {
  return (
    <header className={style.HeaderContainer}>
      <div className={style.HeaderContent}>
        <img src="/images/logo.svg" alt="IG.News" />
        <nav>
          <a className={style.active}>Home</a>
          <a>Posts</a>
        </nav>

        <SignButton />
      </div>
    </header>
  )
}