import { signIn, signOut, useSession } from 'next-auth/react'
import styles from '../styles/Home.module.scss'

const Footer = () => {
const { data: session } = useSession()
    if (session) {
        return (
            <footer className={styles.footer}>
                <button className="btn btn-outline-secondary" onClick={() => signOut()}>Sign out</button>
            </footer>
        )
    }

    return (
        <footer className={styles.footer}>
            <button className="btn btn-outline-secondary" onClick={() => signIn()}>Sign out</button>
        </footer>
    )
    
}

export default Footer