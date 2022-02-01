import { NextPage } from "next"
import Head from "next/head"
import styles from '../styles/Home.module.scss'
import GoBack from "./GoBack";

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
                    <GoBack path={path} />
                ): null} 
                <h1 className={styles.title}>
                    { title }
                </h1>
            </div>
        </div>
    )
}

export default Header