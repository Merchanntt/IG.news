import { ActiveLink } from '../ActiveLinks';
import { SignButton } from './SignButton';

import style from './styles.module.scss'

export const Header = () => {
  return (
    <header className={style.HeaderContainer}>
      <div className={style.HeaderContent}>
        <img src="/images/logo.svg" alt="IG.News" />
        <nav>
          <ActiveLink activeClassName={style.active} href='/'>
            <a >Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={style.active} href='/posts' prefetch>
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignButton />
      </div>
    </header>
  )
}