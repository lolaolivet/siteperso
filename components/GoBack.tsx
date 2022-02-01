import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import Link from 'next/link'
import { NextPage } from 'next';
import styles from '../styles/Home.module.scss'

interface Props {
    path: string;
}

const GoBack: NextPage<Props> = (props) => {
    const path = props.path
    return (
        <Link href={path}>
            <a className={styles.goBack}>
                <FontAwesomeIcon icon={ faArrowLeft }/>
            </a>
        </Link>
    )
}

export default GoBack