import styles from '../styles/Home.module.scss'
import { NextPage } from 'next'
import { Article } from '../pages/posts/types'

interface Props {
    post: Article
}

const Post: NextPage<Props> = (props) => {
    const article = props.post
    return (
        <div className={ styles.card }>
            <h2>{ article.title }</h2>
            <p>{ article.content.slice(0,20) + '...' }</p>
        </div>
    )
}

export default Post
