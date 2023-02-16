import { useEffect, useRef, useState } from "react"

const login = () => {
    const input = useRef<HTMLFormElement>(null)
    const [message, setMessage] = useState<String>()
    useEffect(() => {
        setMessage(message)
    }, [message])
    const handleSubmit = async(e : React.SyntheticEvent) => {
        e.preventDefault()
        if(input.current){
            const email = input.current.elements[0] as HTMLInputElement
            const password = input.current.elements[1] as HTMLInputElement

            const createToken = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
            })
            const mess = await createToken.json()
            setMessage(mess.message)
        }
    }

    return(
        <>
        <h1>Login here</h1>
            <form ref={input} onSubmit={handleSubmit} >
                <input name="email" type='email' placeholder="your email"/>
                <input name="password" type='password' placeholder="password" />
                <button type="submit" >Log in</button>
            </form>
            <p>{message}</p>
        </>
    )
}

export default login