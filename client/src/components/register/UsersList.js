import React from 'react'

export default function UsersList(props) {
  return (
    <div className='container'>
        <ul className='list-group'>
            {
                props.listOfUsers.map((u)=>{
                    return <li className='list-group-item' key={u._id}>{u.email} | {u.role} </li>
                })
            }
        </ul>
    </div>
  )
}
