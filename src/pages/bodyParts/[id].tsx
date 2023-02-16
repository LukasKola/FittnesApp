
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { prisma } from '../../server/db';
import { api } from '../../utils/api';

export const getStaticPaths: GetStaticPaths = async () => {
    const bodyparts = await prisma.bodyPart.findMany({
        select: {
            id: true,
            name: true,
            exercises: true
        }
    })
    return {
        paths: bodyparts.map(bp => ({
            params: {
                id: bp.id as string
            }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (_context: any) => {
    const id = _context.params.id
    const excercises = await prisma.exercises.findMany({
        where: {
            id: id
        }
    })
    return {
        props: { excercises: excercises }
    }
}

type Excercise = [{
    name: string,
    id: string,
}]

const Excercises = ({ excercises }: { excercises: Excercise }) => {
    const [message, setMessage] = useState<String>()
    const router = useRouter();
    const urlQuery = (router.query.musle as string) || '';
    const addExcercise = api.fitness.addExcercise.useMutation()
    const newExceName = useRef<HTMLLabelElement>(null)
    const inputValue = newExceName.current?.childNodes[1] as HTMLInputElement

    const handleClickAddExce = () => {
        if (inputValue.value.length > 3) {
            addExcercise.mutate({
                id: excercises[0].id,
                excerciseName: inputValue.value
            })
        } else {
            setMessage('No input provided')
        }
    }

    return (
        <div className='p-2 m-1 border border-black w-6/6 h-screen flex flex-col bg-gray-100'>
            <h1 className='text-5xl text-center'>{urlQuery}</h1>
            <div>
                <h1 className=' text-2xl'>Excercises</h1>
                {excercises.map((exe, index) => {
                    return (
                        <>
                            <div className='border-2 border-black rounded-md shadow m-2 p-2 '>
                                <p key={exe.id}>{exe.name}</p>
                            </div>
                        </>
                    )
                })}
            </div>
            <label ref={newExceName} className='border-2 border-black p-2 rounded-md addexce ' > Add new excercise:
                <  input />
                <button onClick={handleClickAddExce} className='border border-black p-2 rounded-md'  >Add</button>
            </label>
            {message && <p>{message}</p>}
        </div>

    )
}

export default Excercises