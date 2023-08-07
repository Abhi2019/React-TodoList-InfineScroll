import React, { useState } from 'react';
import './TodoList.css';
const ListItem = (list) => {
    const [isEdit , setIsEdit] = useState(false);
    const [number , setNumber] = useState(null);
    const [text , setText] = useState(null);
    const onEdit = (i, item)=> {
        setNumber(Number(i.target.value));
        setIsEdit(true);
        //list.OnEdit(i.target.value, item);
    }

    const onDelete = (i)=>{
        list.onDelete(i.target.value);
    }

   const onComplete = (i)=> {
        list.onComplete(i.target.id);
    }

    const OnSave =(i)=>{
        if(text) {
            setIsEdit(false);
            setText(null);
            list.onSave(i.target.value, text);
        } else {
            setIsEdit(false);
        }
    }
    
  const listItems = list.items.map((item, i)=>{
    return(
        <div className='itemList' key={i}>
            {isEdit && number ===i ? 
            <div>
                <input type='box'  className="editbox" value={text ||item.name} onChange={(e)=>setText(e.target.value, item.name)}>
                    </input> <button value={number} onClick={(i)=>OnSave(i)}>Save</button></div> :
            <div className='itemList'><li id={i} className={item.completed? 'itemCompleted' : 'item'} onClick={(i)=>onComplete(i)}>{item.name} </li>
            <button value={i} onClick={(i,item)=> onEdit(i, item)}>Edit</button>
            <button value={i} onClick={i=> onDelete(i)}>Delete</button></div>}
        </div>
    )
  })
  return (
        <div>
            {listItems}
        </div>
  )
}

export default ListItem