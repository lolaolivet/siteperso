import { useSession, signIn, signOut } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import styles from '../../styles/Home.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import GoBack from "../../components/GoBack"

const CreatePost = () =>  {
    const { data: session } = useSession()

    if (session) {
        return (
            <div className={styles.container}>
                <Head>
                <title>Blogiblog</title>
                </Head>

                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Write an article!
                    </h1>
                    <GoBack path="/admin" />
                    
                    <div className="mt-5">
                        <form onSubmit={createPost}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input id="title" type="text" autoComplete="title" required className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">Content</label>
                                <input id="content" type="textarea" autoComplete="content" required className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Slug</label>
                                <input id="slug" type="text" autoComplete="slug" required className="form-control" />
                            </div>
                            <div className="mb-3 form-check">
                                <input id="published" name="published" type="checkbox" className="form-check-input"/>
                                <label htmlFor="published" className="form-check-label">Publish it ?</label>
                            </div>
                            <button className="btn btn-outline-primary" type="submit">Register</button>
                        </form>
                    </div>
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

export default CreatePost
