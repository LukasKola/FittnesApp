import { NextApiRequest, NextApiResponse } from "next";
import { prisma }from '../../server/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const part = req.query.part || ''
    try {
        if (part.length > 0) {
            const muslegroup = await prisma.bodyPart.findFirst({
                where: {
                    name: part as string
                }
            })
            if(muslegroup != null){
                return res.status(200).json({ muslceGroup: muslegroup })
            } else return res.status(400).json({ message: 'this muscle group does not exist'})
        } else {
            const bodyParts = await prisma.bodyPart.findMany()
            return res.status(200).json({ bodyParts: bodyParts })
        }
    } catch (e) {
        return res.status(500).json({ Error: 'Internal Server Error' })
    }
}