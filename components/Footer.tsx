import { signOut } from 'next-auth/react'
import styles from '../styles/Home.module.scss'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <button className="btn btn-outline-secondary" onClick={() => signOut()}>Sign out</button>
        </footer>
    )
}

export default Footer