import React, { useEffect, useState } from 'react'
import ShareData from '../MyHooks/ShareData'

const Form1 = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [allEntry, setAllEntry] = useState([])
    const {setData   } = ShareData()
    function submitForm(e) {
        e.preventDefault()
        let newEntry = { name: name, password: password }
        setAllEntry([...allEntry, newEntry])
        setName("")
        setPassword("")
        setData([...allEntry, newEntry])
    }
    return (
        <div className='container w-25'>
            <h1>Form1 Component</h1>
            <form action='submit' onSubmit={submitForm}>
                <div className="mb-3">
                    <label  className="form-label">Enter Name</label>
                    <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Form1
