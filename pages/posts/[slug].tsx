import type { NextPage } from 'next'
import prisma from '../../lib/prisma'
import superjson from 'superjson'
import { Post } from './types'
import { Params } from 'next/dist/server/router'


const Post  = (post: Post) => {
    return(
        <div>{post.title}</div>
    )
}

export const getStaticPaths = async () => {
    const posts = await prisma.post.findMany({
        where: { published: true },
    })

    const paths = posts.map((post) => ({
        params: { slug: post.slug },
    }))

    return { paths, fallback: false }

}

export const getStaticProps = async ({ params }: Params) => {
    // @ts-ignore
    const article = await prisma.post.findUnique({
        where: { slug: params.slug }
    })

    // @ts-ignore
    article.createdAt = superjson.stringify(article.createdAt)

    return {
        props: article,
    }
}

export default Post
