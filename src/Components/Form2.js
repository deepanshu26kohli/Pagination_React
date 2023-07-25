import React, { useEffect, useState } from 'react'
import ShareData from '../MyHooks/ShareData'

const Form2 = () => {
    const {  data } = ShareData()
     const newdata = data.slice(data.length-1,data.length)
     const [x,setX]=useState({name:"",password:""})
     if(newdata.length)
     {
        setX({name:newdata[0].name,password:newdata[0].password})
     }
    useEffect(()=>{
        console.log("Form2",data)
        
        console.log("NewData",newdata)
    },[])

    return (
        <div className='container'>
            <h1>Form2 Component</h1>
            

                   
                    <form>
                
                        <div className="mb-3">
                            <label className="form-label">Enter Name</label>
                            <input type="text" value={x.name}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input value={x.password} type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                   
                
            
            {/* {
                data.map((e)=>{
                    return <div key = {e.id}>
                          <p>{e.name}</p>
                          <p>{e.password}</p>
                    </div>
                })
            } */}
        </div>
    )
}

export default Form2
