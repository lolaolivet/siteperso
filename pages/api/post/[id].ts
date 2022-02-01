import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { Post } from '../../posts/types'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const post: Post = req.body
    const  { id } = req.query
    // @ts-ignore
    const postId = parseInt(id)

    await prisma.post.update({
        where: {
            id: postId
        },
        data: post 

    })

    res.status(200).json({ message: 'Post was successfully created!' })
}

export default handler