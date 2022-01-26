import styles from '../styles/Home.module.scss'
import { NextPage } from 'next'

interface Props {
    title: string;
    content: string;
}
const Post: NextPage<Props> = (props) => {

    return (
        <div className={ styles.card }>
            <h2>{ props.title }</h2>
            <p>{ props.content }</p>
        </div>
    )
}

export default Post
