import React, { useEffect, useState } from 'react'
// import Data from "../Data.json" 
import "../pagination.css"
const Pagination = () => {

    const [mydata, setMydata] = useState([])
    let recPerPage = 5
    const [currpage, setCurrPage] = React.useState(1)
    const [numbers, setNumbers] = useState([])

    let lastIndex = currpage * recPerPage
    let firstIndex = lastIndex - recPerPage

    const [records, setRecords] = useState([])

    let npage = 0;



    function myData(skip = 0, limit = 10) {
        try {
            fetch(`https://dummyjson.com/posts?skip=${skip}&limit=${limit}`)
                .then(response => {
                    // Check if the response status is OK (200)
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    // Parse the response data as JSON and return it as a promise
                    return response.json();
                })
                .then(data => {
                    // You can now work with the data
                    setMydata(data);

                })
                .catch(error => {
                    // Handle any errors that occurred during the fetch
                    console.error("Fetch error:", error);
                });
        }
        catch (err) {
            console.log("error", err)
        }
    }

    useEffect(() => {
        myData(0, recPerPage)
    }, [])
    useEffect(() => {
        // console.log("mydata total", mydata.total)
        // console.log("posts", mydata.posts)
        // console.log("Records ", records)
        setRecords(mydata.posts)
         npage = Math.ceil(mydata.total / recPerPage)
        // console.log("npage", npage)
        
        lastIndex = currpage * recPerPage
        firstIndex = lastIndex - recPerPage
        if (npage > 0)
            setNumbers([...Array(npage + 1).keys()].slice(1))


    }, [mydata])

    useEffect(() => {
        myData((currpage*recPerPage)-recPerPage, recPerPage)
    }, [currpage])


    // const npage = Math.ceil(Data.length/recPerPage)
    // const numbers = [...Array(npage+1).keys()].slice(1)
    // console.log(...Array(npage+1).keys())
    // var numbers = [];  
    // for(let i = 0; i<npage ; i++){
    //     numbers[i] = i+1
    // }
    // console.log(numbers)
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
                        {currpage === 1 ? "" : <a href="#" className='page-link'
                            onClick={prePage}>Prev</a>}
                        <a href="#" className='page-link'
                            onClick={prePage}>Prev</a>
                    </li>
                    {
                        numbers.map((n, i) =>
                        (

                            <li className={`page-item ${currpage === n ? "active" : ""}`} key={i}>
                                <a href="#" className='page-link'
                                    onClick={() => { changeCPage(n) }}>{n}</a>
                            </li>

                        ))

                    }

                    <li className='page-item'>
                        {currpage === npage ? "" : <a href="#" className='page-link'
                            onClick={()=>{nextPage(); setCurrPage({currpage} + 1)}}>Next</a>}

                    </li>
                </ul>
            </nav>
        </>
    )
    function prePage() {
        if (currpage !== firstIndex) {
            setCurrPage(currpage - 1)
        }
    }
    function changeCPage(id) {
        setCurrPage(id)
        myData((id*recPerPage)-recPerPage, recPerPage)
    }
    function nextPage() {
        if (currpage !== lastIndex) {
            setCurrPage(currpage + 1)
            
          
        }
    }
}

export default Pagination
