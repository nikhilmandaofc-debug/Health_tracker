import { useEffect, useState } from "react";

export default function Patients(){

const [patients,setPatients] = useState([])

useEffect(()=>{

fetch("http://localhost:8000/patients")
.then(res=>res.json())
.then(data=>setPatients(data))

},[])

return(

<div>

<h1 className="pageTitle">Patient Monitor</h1>

<div className="card">

<table className="table">

<thead>
<tr>
<th>Name</th>
<th>Age</th>
<th>Doctor</th>
<th>Ward</th>
<th>Severity</th>
</tr>
</thead>

<tbody>

{patients.map((p,i)=>(

<tr key={i}>

<td>{p.name}</td>
<td>{p.age}</td>
<td>{p.doctor}</td>
<td>{p.ward}</td>

<td>
<span className={`severity ${p.severity.toLowerCase()}`}>
{p.severity}
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