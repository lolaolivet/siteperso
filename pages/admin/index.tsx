import { GetStaticProps } from "next"
import prisma from "../../lib/prisma"
import { Post, Posts } from "../posts/types"
import superjson from 'superjson';
import styles from '../../styles/Home.module.scss'
import PostShow from '../../components/PostShow'
import Head from "next/head";
import Link from "next/link";
import GoBack from "../../components/GoBack";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen'
import { useState } from "react";

const ShowPosts = ({ posts }: Posts) => {

    const [feed, setFeed] = useState(posts)

    const deletePost = (data: string) => {
        const newFeed = feed.filter(post => post.id !== parseInt(data))
        
        setFeed(newFeed)
    }

    return (
        <div className={styles.container}>
            <Head>
            <title>Blogiblog</title>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Admin
                </h1>
                <div>
                    <GoBack path="/" />
                </div>
                <h3 className="mt-3">
                    <Link href="/create">Write an article </Link>
                    <FontAwesomeIcon icon={ faPen } />
                </h3>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Published</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {feed.map((post: Post, index: number) => (
                            <PostShow post={post} key={index} delete={deletePost}/>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const posts = await prisma.post.findMany();
    
    posts.map((post) => {
        // @ts-ignore
        post.createdAt = superjson.stringify(post.createdAt)
        return post;
    })

    return {
        props: { posts },
    }
}

export default ShowPosts