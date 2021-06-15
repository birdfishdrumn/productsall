import Link from 'next/link'
import styles from 'styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className="my-8 h-40 bg-gray-100">
      <div className="m-8 p-8 text-center">
        <p>Copyright &copy; 注文 2021</p>
        <p>
          <Link href="/about">About This Project</Link>
        </p>
      </div>
    </footer>
  )
}
