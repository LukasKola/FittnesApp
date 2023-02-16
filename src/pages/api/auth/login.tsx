import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'

const secret = process.env.SECRET

export default async (req: any, res: any) => {
    const { email, password } = req.body
    const exp = new Date()
    // logic to verify user in DB
    try {
        const user = await prisma?.user.findUnique({
            where: {
                email: email
            }
        })
        if (user != null && user.password === password) {
            const token = sign(
                {
                    expiration: exp.setMinutes(exp.getMinutes() + 10),
                    email: email,
                },
                secret!
            )
            const serialized = serialize('makeUtrain', token, {
                httpOnly: true,
                maxAge: 360
            })
            res.setHeader('Set-Cookie', serialized)
            res.status(200).json({ message: 'Succes!' })

        } else {
            user === null ? res.status(400).json({ message: 'Wrong email' }) : res.status(400).json({ message: 'Incorrect password' })
        }
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' })
    }
}
