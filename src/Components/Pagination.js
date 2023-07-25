import React, { useEffect, useState  } from 'react'
// import Data from "../Data.json" 
import "../pagination.css"
const Pagination = () => {
    const [mydata, setMydata] = useState([])
    const recPerPage = 5
    const [currpage, setCurrPage] = useState(1)
    const [numbers, setNumbers] = useState([])
    const [lastIndex,setLastIndex] =  useState(currpage * recPerPage)
    const [firstIndex,setFirstIndex] = useState(lastIndex - recPerPage)
    const [records, setRecords] = useState([])
    const [npage,setNpage] = useState(0)
    function myApiData(skip , limit) {
        try {
            fetch(`https://dummyjson.com/posts?skip=${skip}&limit=${limit}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    setMydata(data);
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                });
        }
        catch (err) {
            console.log("error", err)
        }
    }
    useEffect(() => {
        myApiData((currpage * recPerPage) - recPerPage, recPerPage);
      }, [currpage]);
    useEffect(() => {
        setRecords(mydata.posts)
        setNpage(Math.ceil(mydata.total / recPerPage))
        setLastIndex(currpage * recPerPage)
        setFirstIndex(lastIndex - recPerPage)
        if (npage > 0){
            setNumbers([...Array(npage + 1).keys()].slice(1))
        }
    }, [mydata,currpage])
 return (
        <>
            <div className='container'>
                <h1 className='text-center'>My Data</h1>
                {
                    records && records.map((e) => {
                        return <div key={e.id}>
                            <strong>ID : {e.id}</strong><br />
                            <strong>Title : {e.title}</strong><br />
                            <strong>Body : {e.body}</strong>
                            <hr />
                        </div>
                    })
                }
            </div>
            <nav className='container mypage'>
                <ul className='pagination '>
                    <li className='page-item'>
                        {currpage === 1 ? <a href="/" className='page-link'
                            onClick={()=>{ if (currpage !== firstIndex) {
                                setCurrPage(currpage - 1)
                            } }}>Prev</a>  : <a href="#" className='page-link'
                            onClick={()=>{ if (currpage !== firstIndex) {
                                setCurrPage(currpage - 1)
                            } }}>Prev</a>}
                    </li>
                    {
                        numbers.map((n, i) =>
                        (
                            <li className={`page-item ${currpage === n ? "active" : ""}`} key={i}>
                                <a href="#" className='page-link'
                                    onClick={() => { setCurrPage(n) }}>{n}</a>
                            </li>
                        ))
                    }
                    <li className='page-item'>
                        {currpage === npage ? <a href="/" className='page-link'
                            onClick={() => { if (currpage !== lastIndex) {
                                setCurrPage(currpage + 1)
                            } }}>Next</a> : <a href="#" className='page-link'
                            onClick={() => { if (currpage !== lastIndex) {
                                setCurrPage(currpage + 1)
                            } }}>Next</a>}
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Pagination
