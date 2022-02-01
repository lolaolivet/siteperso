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
import Header from "../../components/Header";
import { signIn, signOut, useSession } from "next-auth/react";

const ShowPosts = ({ posts }: Posts) => {
    const [feed, setFeed] = useState(posts)
    const { data: session } = useSession()

    const deletePost = (data: string) => {
        const newFeed = feed.filter(post => post.id !== parseInt(data))
        
        setFeed(newFeed)
    }

    if(session) {
        return (
            <div className={styles.container}>
                <Header title="Admin" path="/" />

                <main className={styles.main}>
                    <p className="mt-3">
                        <Link href="/admin/create">Write an article </Link>
                        <FontAwesomeIcon icon={ faPen } />
                    </p>

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
                <footer className={styles.footer}>
                    <button className="btn btn-outline-danger" onClick={() => signOut()}>Sign out</button>
                </footer>
            </div>
        )
    }
    return (
        <div className={styles.container}>
            Not signed in <br />
            <button className="btn btn-outline-warning" onClick={() => signIn()}>Sign in</button>
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