import { useEffect, useState } from "react"

export default function ManageWards(){

const [wards,setWards] = useState([])
const [wardName,setWardName] = useState("")

const loadWards = async()=>{

const res = await fetch("http://localhost:8000/wards")
const data = await res.json()

setWards(data)

}

useEffect(()=>{
loadWards()
},[])


const addWard = async()=>{

if(!wardName.trim()) return

await fetch("http://localhost:8000/wards",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name:wardName
})

})

setWardName("")
loadWards()

}


return(

<div>

<h1 className="pageTitle">Ward Management</h1>

{/* ADD WARD */}

<div className="card">

<h2>Add Ward</h2>

<div className="formGrid">

<input
placeholder="Ward Name (ICU, ER, Ward A)"
value={wardName}
onChange={(e)=>setWardName(e.target.value)}
/>

</div>

<button
className="primaryBtn"
onClick={addWard}
>
Add Ward
</button>

</div>


{/* WARD TABLE */}

<div className="card">

<h2>Existing Wards</h2>

<table className="table">

<thead>

<tr>
<th>ID</th>
<th>Ward Name</th>
</tr>

</thead>

<tbody>

{wards.map(ward=>(
<tr key={ward.id}>
<td>{ward.id}</td>
<td>{ward.name}</td>
</tr>
))}

</tbody>

</table>

</div>

</div>

)

}