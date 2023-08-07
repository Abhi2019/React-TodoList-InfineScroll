import logo from './logo.svg';
import './App.css';
import {reducer} from './Reducer';
import React, { useCallback, useReducer, useRef, useState,  } from 'react';
import useBookSearch from './useBookSearch';
import ShowDetails from './ShowDetails';
import {userContext} from './userContext';
import Carousel from './Carousel/Carousel';
import ReactVirtual from './React-Virtualize/ReactVirtual'
import TodoList from './TodoList/TodoList';

function App() {
  const [state, dispatch] = useReducer(reducer, {count: 0});
  const [query, setQuery] = useState("");
  const [skip, setSkip] = useState(10);
  const observer = useRef();
  const {products, hasMore, loading} = useBookSearch(query, skip);
  const lastProduct = useCallback((p)=>{
    console.log("P: ", p);
    if(loading) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries=> {
        if(entries[0].isIntersecting && hasMore) {
          console.log("visible");
          setSkip(prevN=> prevN+10);
        }
    });
    if(p) {
      observer.current.observe(p);
    }
  }, [loading, hasMore]);

  const handleSearch =(e)=>{
    setQuery(e.target.value);
    setSkip(10);
  }
  return (
   <>
   <div>
   {state.count} : <button onClick={()=> dispatch('I')}> + </button> 
       <button onClick={()=> dispatch('D')}> - </button> 
       <input type='text' onChange={handleSearch} value={query}></input>
       {products.map((p,index)=>{
         if(products.length === index+1) {
          return <div  ref= {lastProduct} style={{borderRadius: "2px", border: "1px solid grey", width:"400px", height:"55px", textAlign: "center",margin: "4px"}} key={p}> {p}</div>
         }
        return <div style={{borderRadius: "2px", border: "1px solid grey", width:"400px", height:"55px", textAlign: "center",margin: "4px"}} key={p}> {p}</div>
       })}
       <div>{loading && 'Loading'}</div>
       <TodoList></TodoList>
   </div>

       {/* <Carousel></Carousel> */}


       <div style={{"margin-top": "80px"}}>React Virtual</div>
       <ReactVirtual></ReactVirtual>
       {/* <userContext.Provider value="Red">
       <ShowDetails></ShowDetails>
       </userContext.Provider> */}
   </>
  );
}

export default App;
