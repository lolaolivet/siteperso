import { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import prisma from '../../lib/prisma'
import PostCard from '../../components/PostCard'
import { Post, Feed } from './types'
import superjson from 'superjson'
import Header from '../../components/Header'

const Posts = ({ feed }: Feed) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header title="Welcome to my blog!" />
        <div className={styles.grid}>
          {feed.map((post: Post, index: number) => (
              <PostCard post={post} key={index}/>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
    const feed = await prisma.post.findMany({
        where: { published: true },
    })

    feed.map((post) => {
        // @ts-ignore
        post.createdAt = superjson.stringify(post.createdAt)
        return post;
    })

    return {
        props: { feed },
    }
}

export default Posts
