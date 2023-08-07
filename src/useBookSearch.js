import React, { useEffect, useState } from 'react'

const useBookSearch = (query, pageN) => {
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [products , setProducts] = useState([]);
    const loadData = async(query, pageN)=>{
        const url = `https://dummyjson.com/products/search?q=${query}&limit=10&skip=${pageN}`;
        const r = await fetch(url, {
            method: 'GET',
            headers : {
                'content-type' :'application/json'
            }
        });
        const d = await r.json();
        return d;
    }
    useEffect(()=>{
        setProducts([]);
    }, [query]);
    
    useEffect(()=>{
        if(query!== "") {
            setLoading(true);
            loadData(query, pageN).then((response)=>{
                console.log(response);
                setProducts(prevProducts=> {
                    return [...new Set([...prevProducts, ...response.products.map(t=>t.title)])];
                });
                setLoading(false);
                setHasMore(response.total > 0);
             });

        } else {
            setProducts([]);
        }

    }, [query, pageN])
  return {products, hasMore, loading}
}

export default useBookSearch