import styles from '../styles/Home.module.scss'
import { NextPage } from 'next'
import { Post } from '../pages/posts/types'
import Link from 'next/link'

interface Props {
    post: Post
}

const Post: NextPage<Props> = (props) => {
    const article = props.post
    return (
        <Link href={`posts/${article.slug}`}>
            <div className={ styles.card }>
                <h2>{ article.title }</h2>
            </div>
        </Link>

    )
}

export default Post
