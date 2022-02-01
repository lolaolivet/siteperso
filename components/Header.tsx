import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link";
import styles from '../styles/Home.module.scss'

interface Props {
    title: string;
    path?: string;
}

const Header: NextPage<Props> = (props) => {
    const { title, path } = props

    return (
        <div>
            <Head>
                <title>Blogiblog</title>
            </Head>

            <div className={styles.main}>
                {path ? (
                    <Link href={path}>
                        <a className={styles.goBack}>
                            <FontAwesomeIcon icon={ faArrowLeft }/>
                        </a>
                    </Link>
                ): null} 
                <h1 className={styles.title}>
                    { title }
                </h1>
            </div>
        </div>
    )
}

export default Header