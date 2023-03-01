import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import Loader from './Loader';
const Main=()=>{
    const [search,setSearch]=useState("");
    const [bookData,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const searchBook=(evt)=>{
        
        if(evt.target.value)
        {
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyCXPp84XPz7CRfpJ_AfhnAGt9mmtg3X1eI&maxResults=40`)
            .then(res=>{setData(res.data.items);
             setLoading(false)})
            .catch(err=>console.log(err))

        }
    }
    const popular=()=>{
       axios.get(`https://www.googleapis.com/books/v1/volumes?q=coding&orderBy=newest&key=AIzaSyCXPp84XPz7CRfpJ_AfhnAGt9mmtg3X1eI&maxResults=40`)
        .then(res=>{setData(res.data.items);
            setLoading(false)})
           .catch(err=>console.log(err))
    }
    useEffect(()=>{
        popular();
    },[])
    return(
        <>
        <div className="header">
            <div className="row1">
                <h1>There is no friend  <br/> as loyal as books</h1>
            </div>
            <div className="row2">
              <h2>Search For Your Books</h2>
              <div className="search">
              <input type="text" placeholder="Enter Your Book Name"
              value={search} onChange={e=>setSearch(e.target.value)} 
              onKeyPress={searchBook}/>
              <button><i class="fa-solid fa-magnifying-glass"></i></button>
              </div>
              <img src="./images/bg2.png" alt="libaryimage" />
            </div>
        </div>
        { loading ? <Loader/> : 
            <div className="container">
                           
                 <Card book={bookData}/>
              
            </div>
         }   
        </>
    )
}
export default Main;