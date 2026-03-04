import { useEffect, useState } from "react"
import ManagerSidebar from "../components/ManagerSidebar"

export default function PatientMonitor(){

const [patients,setPatients] = useState([])
const [search,setSearch] = useState("")
const [filter,setFilter] = useState("All")

useEffect(()=>{
fetch("http://localhost:8000/patients")
.then(res=>res.json())
.then(data=>setPatients(data))
},[])

const filteredPatients = patients.filter(p => {

const matchSearch =
p.name?.toLowerCase().includes(search.toLowerCase())

const matchSeverity =
filter === "All" || p.severity === filter

return matchSearch && matchSeverity
})

const updateStatus = async (id,status) => {

    await fetch(`http://localhost:8000/patients/${id}/status?status=${status}`,{
    method:"PUT"
    })
    
    fetch("http://localhost:8000/patients")
    .then(res=>res.json())
    .then(data=>setPatients(data))
    
    }

return(

<div className="appLayout">

<ManagerSidebar/>

<div className="mainArea">

<h1 className="pageTitle">Patient Monitor</h1>

<div className="card">

<h2 style={{marginBottom:"15px"}}>Live Patient Monitoring</h2>

{/* SEARCH + FILTER */}

<div className="tableControls">

<input
placeholder="Search patient..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<select
value={filter}
onChange={(e)=>setFilter(e.target.value)}
>
<option value="All">All</option>
<option value="Critical">Critical</option>
<option value="Moderate">Moderate</option>
<option value="Stable">Stable</option>
</select>

</div>

{/* PATIENT TABLE */}

<table className="table">

<thead>
<tr>
<th>Name</th>
<th>Severity</th>
<th>Status</th>
<th>Heart Rate</th>
<th>Oxygen</th>
<th>Temp</th>
<th>Ward</th>
<th>Doctor</th>
</tr>
</thead>

<tbody>

{filteredPatients.map((p,index)=>(

<tr key={index}>

<td>{p.name}</td>

<td>
<span className={`severity ${p.severity?.toLowerCase()}`}>
{p.severity}
</span>
</td>

<td>

<select
value={p.status}
onChange={(e)=>updateStatus(p.id,e.target.value)}
>

<option>Admitted</option>
<option>Under Treatment</option>
<option>Discharged</option>

</select>

</td>

<td>{p.heart_rate}</td>

<td>{p.oxygen_level}</td>

<td>{p.temperature}</td>

<td>{p.ward}</td>

<td>{p.doctor}</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

)

}