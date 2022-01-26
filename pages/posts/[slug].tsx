import type { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next'
import prisma from '../../lib/prisma'
import superjson from 'superjson'
import {Feed} from "./types";
import { Article } from '../posts/types'

const Post = (article: Article) => {
    return(
        <div>{article.title}</div>
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // @ts-ignore
    const article = await prisma.post.findUnique({
        where: { slug: params.slug }
    })

    // @ts-ignore
    article.createdAt = superjson.stringify(article.createdAt)

    return {
        props:  article ,
    }
}

export default Post
