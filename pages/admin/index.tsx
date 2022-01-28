import prisma from '../../lib/prisma'
import { useSession, signIn, signOut } from "next-auth/react"
import Head from "next/head"
import styles from '../../styles/Home.module.scss'
import { EventHandler, FormEvent, FormEventHandler, SyntheticEvent } from 'react'
import { Post } from '../posts/types'
import { takeCoverage } from 'v8'

export default function Component() {
    const { data: session } = useSession()
    if (session) {
        return (
            <div className={styles.container}>
                <Head>
                <title>Blogiblog</title>
                </Head>

                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Admin!
                    </h1>
                    <div className={styles.card}>
                        <form onSubmit={createPost}>
                            <label htmlFor="title">Title</label>
                            <input id="title" type="text" autoComplete="title" required />

                            <label htmlFor="content">Content</label>
                            <input id="content" type="textarea" autoComplete="content" required />

                            <label htmlFor="title">Slug</label>
                            <input id="slug" type="text" autoComplete="slug" required />

                            <label htmlFor="published">Publish it ?</label>
                            <input id="published" name="published" type="checkbox"/>
                            <button type="submit">Register</button>
                        </form>
                    </div>
                
                </main>

                <footer className={styles.footer}>
                    <button onClick={() => signOut()}>Sign out</button>
                </footer>
            </div>
        )
    }
    return (
            <div className={styles.container}>
                Not signed in <br />
                <button onClick={() => signIn()}>Sign in</button>
            </div>
    )
}


const createPost = async (event: any) => {
    event.preventDefault()
    await fetch('/api/post', {
        body: JSON.stringify({
            title: event.target.title.value,
            content: event.target.content.value,
            slug: event.target.content.value,
            published: event.target.published.checked,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
}
