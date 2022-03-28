import { useSession, signIn, signOut } from "next-auth/react"
import styles from '../../styles/Home.module.scss'
import Header from "../../components/Header"
import Footer from "../../components/Footer"

const CreatePost = () =>  {
    const { data: session } = useSession()

    if (session) {
        return (
            <div className={styles.container}>
                <Header title="New article!" path="/admin" />

                <main className={styles.main}>
                    <div className={styles.form}>
                        <form onSubmit={createPost}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input id="title" type="text" autoComplete="title" required className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">Content</label>
                                <textarea id="content" autoComplete="content" required className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Slug</label>
                                <input id="slug" type="text" autoComplete="slug" required className="form-control" />
                            </div>
                            <div className="mb-3 form-check">
                                <input id="published" name="published" type="checkbox" className="form-check-input"/>
                                <label htmlFor="published" className="form-check-label">Publish it ?</label>
                            </div>
                            <button className="btn btn-outline-success" type="submit">Register</button>
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


const createPost = async (event: any) => {
    event.preventDefault()
    await fetch(`${process.env.API_URL}/api/post`, {
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
