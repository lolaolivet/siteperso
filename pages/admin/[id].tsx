import { Params } from "next/dist/server/router"
import prisma from "../../lib/prisma"
import { Post } from "../posts/types"
import superjson from 'superjson'
import styles from '../../styles/Home.module.scss'
import React, { useState } from "react"
import Header from "../../components/Header"
import { signIn, useSession } from "next-auth/react"
import Footer from "../../components/Footer"
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";

interface ContentOptions {
    html: any;
    text: string;
}

const EditPost = (post: Post) => {
    const mdEditor = React.useRef(null);
    const [title, setTitle] =  useState(post.title)
    const [content, setContent] = useState(post.content)
    const [slug, setSlug] = useState(post.slug)
    const [published, setPublished] = useState(post.published)
    const { data: session } = useSession()

    const handleOnChangeTitle = (e: any) => {
        setTitle(e.target.value)
    }

    const handleOnChangeContent = ({ html, text }: ContentOptions)  => {
        const newValue = text.replace(/\d/g, "");
        console.log(newValue);
        setContent(newValue);
    };

    const handleOnChangeSlug = (e: any) => {
        setSlug(e.target.value)
   }

   const handleOnChangePublished = (e: any) => {
       setPublished(e.target.value)
   }

   const editPost = async (event: any) => {
        event.preventDefault()
        console.log(content)
        await fetch(`/api/post/${post.id}`, {
            body: JSON.stringify({
                title: title,
                content: content,
                slug: slug,
                published: published,
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
                    <div className={styles.form}>
                    <form onSubmit={editPost}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input onChange={handleOnChangeTitle} value={title} id="title" type="text" autoComplete="title" required className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <Editor
                                ref={mdEditor}
                                value={content}
                                style={{
                                height: "500px"
                                }}
                                onChange={handleOnChangeContent}
                                renderHTML={text => <ReactMarkdown>{text}</ReactMarkdown>}
                            />
                            {/* <label htmlFor="content" className="form-label">Content</label> */}
                            {/* <textarea onChange={handleOnChangeContent} value={content} id="content" autoComplete="content" required className="form-control"></textarea> */}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Slug</label>
                            <input onChange={handleOnChangeSlug} value={slug} id="slug" type="text" autoComplete="slug" required className="form-control" />
                        </div>
                        <div className="mb-3 form-check">
                            <input onChange={handleOnChangePublished} checked={published} id="published" name="published" type="checkbox" className="form-check-input"/>
                            <label htmlFor="published" className="form-check-label">Publish it ?</label>
                        </div>
                        <button className="btn btn-outline-primary" type="submit">Register</button>
                    </form>
                    </div>
                    
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
