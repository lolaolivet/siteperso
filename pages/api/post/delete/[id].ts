import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const  { id } = req.query
    // @ts-ignore
    const postId = parseInt(id)

    const result = await prisma.post.delete({
        where: {
            id: postId
        },
    })

    res.status(200).json({ result })
}

export default handler