// import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useContext } from 'react'
import Link from 'next/link'
// import AuthContext from '@/context/AuthContext'

export default function Header() {
  // const { user, logout } = useContext(AuthContext)

  return (
    <header className="bg-green-50">
      {/* <div className={styles.logo}>
        <Link href='/'>
          <a>DJ Events</a>
        </Link>
      </div> */}

      <nav>
        <ul className="p-4 flex">
          <li className="p-4">
            <Link href="/">
              <a>注文会計</a>
            </Link>
          </li>
          <li className="p-4">
            <Link href="/order">
              <a>注文履歴</a>
            </Link>
          </li>
          <li className="p-4">
            <Link href="/quantity">
              <a>販売商品</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
