import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { Post } from '../../../types'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const data: Post = req.body

    await prisma.post.create({
        data: {
            title: data.title,
            slug: data.slug,
            content: data.content,
            published: data.published,
        }
    })

    res.status(200).json({ message: 'Post was successfully created!' })
}

export default handler
