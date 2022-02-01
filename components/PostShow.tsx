import { NextPage } from "next"
import Link from "next/link"
import { Post } from "../pages/posts/types"

interface Props {
    post: Post;
    delete: (datas: string) => void
}


const PostShow: NextPage<Props> = (props) => {
    const deletePost = async (id: string) => {

        const datas = await fetch(`api/post/delete/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
    
        props.delete(id);
    }
    return (
        <tr>
            <th scope="row">
                {props.post.id}
            </th>
            <td>
                {props.post.title}
            </td>
            <td>
                {props.post.published}
            </td>
            <td>
                <Link href={`admin/${props.post.id.toString()}`}>
                    <button type="button" className="btn btn-outline-info mx-1">Edit</button>
                </Link>
                <button onClick={ () => deletePost(props.post.id.toString())} type="button" className="btn btn-outline-warning mx-1">Delete</button>
            </td>
        </tr>
    )
}

export default PostShow