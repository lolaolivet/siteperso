import { signIn } from 'next-auth/react'
import styles from '../styles/Home.module.scss'

const Login = () => {
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <p>Not signed in</p>
                <button className="btn btn-outline-warning" onClick={() => signIn()}>Sign in</button>
            </div>
        </div>
    )
}

export default Login