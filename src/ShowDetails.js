import React, { useContext } from 'react'
import {userContext} from './userContext';

const ShowDetails = () => {
    const dark = useContext(userContext);
  return (
    <>
    <userContext.Consumer>
        The  conetext data is given here: {dark => { return <div>{dark}</div>}}
    </userContext.Consumer>
    </>
    
  )
}

export default ShowDetails