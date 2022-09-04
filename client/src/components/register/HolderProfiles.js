import { default as React } from "react";
import AllUsers from "./AllUsers";
export default function HolderProfiles() {
  
  return (
    <div>
<h1 className='display-4'>Utilisateurs</h1> <hr/>
<br/>
<div className='row'>
    <AllUsers></AllUsers>
</div>
    </div>
  );
}
