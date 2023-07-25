import React, { useEffect, useState } from 'react'
// import Data from "../Data.json" 
import "../pagination.css"
import { debounce } from 'lodash'
const Pagination = () => {
    const [search, setSearch] = useState("")
    const [mydata, setMydata] = useState([])
    const recPerPage = 5
    const [currpage, setCurrPage] = useState(1)
    const [numbers, setNumbers] = useState([])
    const [lastIndex, setLastIndex] = useState(currpage * recPerPage)
    const [firstIndex, setFirstIndex] = useState(lastIndex - recPerPage)
    const [records, setRecords] = useState([])
    const [npage, setNpage] = useState(0)
    const handleSearch = (e) => {
        debounce(() => { setSearch(e.target.value) }, 2000)()
    }
    async function myApiData(skip, limit, search) {
        try {
            const fetchUrl = `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${search}`
            console.log(fetchUrl)
            const response = await fetch(fetchUrl);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        } catch (error) {
            console.error("Fetch error:", error);
            throw error; // Rethrow the error to be caught by the caller, if needed.
        }
    }
    useEffect(() => {
        myApiData((currpage * recPerPage) - recPerPage, recPerPage, search).then(data => {
            setMydata(data)
        })
    }, [currpage]);
    useEffect(() => {
        if (search.length > 3) {
            myApiData((currpage * recPerPage) - recPerPage, recPerPage, search).then(data => {
                setMydata(data)

            })
        }
        else if (search.length == 0) {
            myApiData((currpage * recPerPage) - recPerPage, recPerPage, search).then(data => {
                setMydata(data)
            })
        }
    }, [currpage, search]);
    useEffect(() => {
        setRecords(mydata.products)
        setNpage(Math.ceil(mydata.total / recPerPage))
        setLastIndex(currpage * recPerPage)
        setFirstIndex(lastIndex - recPerPage)
        if (npage > 0) {
            setNumbers([...Array(npage + 1).keys()].slice(1))
        }
    }, [mydata, currpage])
    return (
        <>
            <div className='container'>
                <h1 className='text-center'>My Data</h1>
                <div className='text-center  p-3'><input type="text" placeholder='Search here' onChange={handleSearch} /></div>

                {
                    records && records.map((e) => {
                        return <div key={e.id}>
                            <strong>ID : {e.id}</strong><br />
                            <strong>Title : {e.title}</strong><br />
                            <strong>Description: {e.description}</strong>
                            <hr />
                        </div>
                    })
                }
            </div>
            <nav className='container mypage'>
                <ul className='pagination '>
                    <li className='page-item'>
                        {currpage === 1 ? <a href="/" style={{ pointerEvents: 'none' }} className='page-link'
                            onClick={() => {
                                if (currpage !== firstIndex) {
                                    setCurrPage(currpage - 1)
                                }
                            }}>Prev</a> : <a href="#" className='page-link'
                                onClick={() => {
                                    if (currpage !== firstIndex) {
                                        setCurrPage(currpage - 1)
                                    }
                                }}>Prev</a>}
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
                        {currpage === npage ? <a href="/" style={{ pointerEvents: 'none' }} className='page-link'
                            onClick={() => {
                                if (currpage !== lastIndex) {
                                    setCurrPage(currpage)
                                }
                            }}>Next</a> : <a href="#" className='page-link'
                                onClick={() => {
                                    if (currpage !== lastIndex) {
                                        setCurrPage(currpage + 1)
                                    }
                                }}>Next</a>}
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Pagination
