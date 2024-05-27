import React from 'react'
import{useSelector}from'react-redux';
function UserName() {
  const username=useSelector((state)=>state.user.username);
  if( !username){
    return null;
  }
  return (
    <div className=' hidden font-semibold text-sm md:block uppercase'>{username}</div>
  )
}

export default UserName