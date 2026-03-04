import { useEffect, useState } from "react"

export default function ManageDoctors(){

const [doctors,setDoctors] = useState([])
const [wards,setWards] = useState([])

const [name,setName] = useState("")
const [ward,setWard] = useState("")

const loadDoctors = async()=>{

const res = await fetch("http://localhost:8000/doctors")
const data = await res.json()

setDoctors(data)

}

const loadWards = async()=>{

const res = await fetch("http://localhost:8000/wards")
const data = await res.json()

setWards(data)

}

useEffect(()=>{

loadDoctors()
loadWards()

},[])



const addDoctor = async()=>{

if(!name || !ward) return

await fetch("http://localhost:8000/doctors/add",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:name,
ward:ward

})

})

setName("")
setWard("")

loadDoctors()

}



return(

<div>

<h1 className="pageTitle">Doctor Management</h1>


{/* ADD DOCTOR */}

<div className="card">

<h2>Add Doctor</h2>

<div className="formGrid">

<input
placeholder="Doctor Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<select
value={ward}
onChange={(e)=>setWard(e.target.value)}
>

<option value="">Select Ward</option>

{wards.map(w=>(
<option key={w.id} value={w.name}>
{w.name}
</option>
))}

</select>

</div>

<button
className="primaryBtn"
onClick={addDoctor}
>
Add Doctor
</button>

</div>


{/* DOCTOR TABLE */}

{/* DOCTOR TABLE */}

<div className="card">

<h2>Doctors</h2>

<table className="table">

<thead>

<tr>
<th>ID</th>
<th>Name</th>
<th>Ward</th>
<th>Active Patients</th>
</tr>

</thead>

<tbody>

{doctors.map(doc => (

<tr key={doc.id}>
<td>{doc.id}</td>
<td>{doc.name}</td>
<td>{doc.ward}</td>

<td>

<span className={`doctorLoad 
${doc.active_patients > 5 ? "highLoad" : ""}
${doc.active_patients > 2 && doc.active_patients <=5 ? "mediumLoad" : ""}
`}>

{doc.active_patients}

</span>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}