import Link from "next/link"

const TrainingPlan = () => {
    return (
        <div className="p-2 m-2">
            <h1 className="text-center m-1 text-2xl underline">Welcome to MakeUtrain</h1> 
            <p className="p-2 m-2">some text</p>
            <Link className="border border-black bg-green text-2xl rounded-md p-2 text-center bg-white maketraining" href='/bodyParts'>Make new training plan</Link>       

        </div>
    )
}

export default TrainingPlan