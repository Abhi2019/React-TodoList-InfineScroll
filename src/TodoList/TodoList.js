import React, { useState } from 'react'
import './TodoList.css';
import ListItem from './ListItem';

const TodoList = () => {
    const [list, SetTodoList] = useState([]);
    const [value, setValue] = useState("");
    const [isedit, setIsEdit] = useState(false);
    const onTodoList = ()=> {
        if(value) {
            let obj = {name : value, completed: false};
            let updateList = [...list,obj]
            SetTodoList(updateList);
            setValue("");
        }
       
    }
    const onDelete = (i)=>{
        let arr = list.filter((item, index) => {
            if(index!== Number(i)) {
                return item;
            }
        });
         SetTodoList(arr);
    }

    const onEdit = (i)=> {
        setIsEdit(true);
    }

    const onSave = (i, name)=>{
        let updatedArr = list.filter((item, index) => {
            if(index=== Number(i)) {
                 item["name"] = name;
                 return item;
            } else {
                return item;
            }
        });
        SetTodoList(updatedArr);
    }

    const onComplete = (i)=>{
        let updatedArr = list.filter((item, index) => {
            if(index=== Number(i)) {
                 item["completed"] = !item.completed;
                 return item;
            } else {
                return item;
            }
        });
        SetTodoList(updatedArr);
    }
  return (
    <>
        <div className='container'>
         <input placeholder='Write something'  value ={value} type='text' className='todoBox' onChange={(e)=> setValue(e.target.value)}></input>
         <button className='todoButton' onClick={onTodoList}>Add To Do</button>
         
          {list.length > 0 ? <ListItem items = {list} onDelete= {onDelete} OnEdit ={onEdit} isEdit= {isedit} onComplete ={onComplete} onSave = {onSave}></ListItem> : null }
        </div>
    </>
  )
}

export default TodoList