import { GetStaticProps } from "next"
import prisma from "../../lib/prisma"
import { Post, Posts } from "../posts/types"
import superjson from 'superjson';
import styles from '../../styles/Home.module.scss'
import PostShow from '../../components/PostShow'
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen'
import { useState } from "react";
import Header from "../../components/Header";
import { signIn, signOut, useSession } from "next-auth/react";
import Footer from "../../components/Footer";

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
                    <p className={styles.grid}>
                        <Link href="/admin/create">
                            <a className={styles.goBack}>
                                <span className={styles.writeArticle}>Write an article</span>
                                <FontAwesomeIcon icon={ faPen }/>
                            </a>
                        </Link>
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
                <Footer />
            </div>
        )
    }
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <p>Not signed in</p>
                <button className="btn btn-outline-warning" onClick={() => signIn()}>Sign in</button>
            </div>
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