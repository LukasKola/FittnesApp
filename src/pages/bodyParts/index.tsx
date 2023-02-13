
import Link from "next/link"
import { api } from "../../utils/api"




const addExcercise = () => {
    const getAllBodyParts = api.fitness.getBodyParts.useQuery()
    const mouseOverMessage = 'click to show excercises'

    console.log(getAllBodyParts);


    return (
        <div className="p-2 m-2">
            <h1 className="text-2xl">Choose muscle group</h1>
            {getAllBodyParts.data?.map((BP) => (
                <>
                    <Link
                        title="Click to show excercises"
                        className="p-2 bg-pink-50 border border-black block w-1/12 rounded-md muslces group"
                        href={`/bodyParts/${BP.id}/?musle=${BP.name}`}
                        key={BP.id}
                        id={BP.id}
                    >
                        {BP.name}
                    </Link>
                </>

            ))}


        </div>
    )
}

export default addExcercise