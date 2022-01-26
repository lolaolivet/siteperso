import type { NextPage } from 'next'
import { GetStaticProps } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import prisma from '../lib/prisma';
import Post from '../components/Post';

type Post = {
  title: string;
  content: string;
  published: boolean;
}

type Feed = {
  feed: Post[];
}

const Home = ({ feed }: Feed) => {
    console.log(feed);
  return (
    <div className={styles.container}>
      <Head>
        <title>Blogiblog</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>


        <div className={styles.grid}>
          {feed.map((post: Post, index: number) => (
              <Post title={post.title} content={post.content} key={index}/>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () =>{
  const feed = await prisma.post.findMany({
    where: { published: true },
  })

  console.log('HERE', feed);

  return {
    props: { feed },
  }
}

export default Home
