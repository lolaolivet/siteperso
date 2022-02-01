import { Params } from "next/dist/server/router"
import prisma from "../../lib/prisma"
import { Post } from "../posts/types"
import superjson from 'superjson'
import styles from '../../styles/Home.module.scss'
import { useState } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import GoBack from "../../components/GoBack"
import Header from "../../components/Header"
import { signIn, signOut, useSession } from "next-auth/react"


const EditPost = (post: Post) => {
    const [title, setTitle] =  useState(post.title)
    const [content, setContent] = useState(post.content)
    const [slug, setSlug] = useState(post.slug)
    const [published, setPublished] = useState(post.published)
    const { data: session } = useSession()

    const onChangeTitle = (e: any) => {
        setTitle(e.target.value)
    }

    const onChangeContent = (e: any) => {
         setContent(e.target.value)
    }

    const onChangeSlug = (e: any) => {
        setSlug(e.target.value)
   }

   const onChangePublished = (e: any) => {
       setPublished(e.target.value)
   }

   const editPost = async (event: any) => {
    event.preventDefault()
    await fetch(`/api/post/${post.id}`, {
        body: JSON.stringify({
            title: event.target.title.value,
            content: event.target.content.value,
            slug: event.target.slug.value,
            published: event.target.published.checked,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT'
    })
}
    if(session) {
        return (
            <div className={styles.container}>
                <Header title="Edit" path="/admin" />
                <main className={styles.main}>
                    <form onSubmit={editPost}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input onChange={onChangeTitle} value={title} id="title" type="text" autoComplete="title" required className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Content</label>
                            <textarea onChange={onChangeContent} value={content} id="content" autoComplete="content" required className="form-control"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Slug</label>
                            <input onChange={onChangeSlug} value={slug} id="slug" type="text" autoComplete="slug" required className="form-control" />
                        </div>
                        <div className="mb-3 form-check">
                            <input onChange={onChangePublished} checked={published} id="published" name="published" type="checkbox" className="form-check-input"/>
                            <label htmlFor="published" className="form-check-label">Publish it ?</label>
                        </div>
                        <button className="btn btn-outline-primary" type="submit">Register</button>
                    </form>
                    <footer className={styles.footer}>
                        <button className="btn btn-outline-danger" onClick={() => signOut()}>Sign out</button>
                    </footer>
                </main>
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

export const getStaticPaths = async () => {
    const posts = await prisma.post.findMany()
    const paths = posts.map((post) => ({
        params: { id: post.id.toString() },
    }))

    return { paths, fallback: false }
}

export const getStaticProps = async ({ params }: Params) => {
    let postId = parseInt(params.id)
    // @ts-ignore
    const post = await prisma.post.findUnique({
        where: { id: postId }
    })

    // @ts-ignore
    post.createdAt = superjson.stringify(post.createdAt)

    return {
        props: post,
    }
}

export default EditPost
