// import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
   const router = useRouter()

  return (
    <header className="bg-green-50">
      {/* <div className={styles.logo}>
        <Link href='/'>
          <a>DJ Events</a>
        </Link>
      </div> */}

      <nav>
        <ul className="p-4 flex">
          <li className="p-4 border-2 border-green-300">
            <Link href="/">
              <a>買い物</a>
            </Link>
          </li>
          <li className="p-4" onClick={()=>router.push("/orderhistory")}>

              <a>履歴</a>

          </li>
          <li className="p-4">
            <Link href="/quantity">
              <a>商品</a>
            </Link>
          </li>
                <li className="p-4">
            <Link href="/quantity">
              <a>設定</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
