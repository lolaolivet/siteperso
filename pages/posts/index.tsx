import { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import prisma from '../../lib/prisma'
import PostCard from '../../components/PostCard'
import { Post, Feed } from './types'
import superjson from 'superjson'

const Posts = ({ feed }: Feed) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blogiblog</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my Blog!
        </h1>


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
