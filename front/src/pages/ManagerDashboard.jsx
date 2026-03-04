import { useEffect, useState } from "react";
import ManagerSidebar from "../components/ManagerSidebar";
import { PieChart, Pie, Cell, Tooltip } from "recharts";




export default function ManagerDashboard(){

    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [doctor, setDoctor] = useState("")
    const [ward, setWard] = useState("")
    
    const [heartRate, setHeartRate] = useState("")
    const [oxygen, setOxygen] = useState("")
    const [temperature, setTemperature] = useState("")
    const [bp, setBp] = useState("")

const [patients,setPatients] = useState([])

const loadPatients = () => {
    fetch("http://localhost:8000/patients")
      .then(res => res.json())
      .then(data => setPatients(data))
  }

const [triageResult, setTriageResult] = useState(null)

const [form,setForm] = useState({
name:"",
age:"",
gender:"",
doctor:"",
ward:"",
heart_rate:"",
oxygen_level:"",
temperature:"",
blood_pressure:""
})

useEffect(()=>{
    loadPatients()
  },[])

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const runTriage = async () => {

    const res = await fetch("http://127.0.0.1:8000/triage",{
    method:"POST",
    headers:{
    "Content-Type":"application/json"
    },
    body:JSON.stringify({
    name:name,
    age:Number(age),
    gender:gender,
    doctor:doctor,
    ward:ward,
    heart_rate:Number(heartRate),
    oxygen_level:Number(oxygen),
    temperature:Number(temperature),
    blood_pressure:bp
    })
    })
    
    const data = await res.json()
    
    setTriageResult(data)
    
    loadPatients()

    setName("")
setAge("")
setGender("")
setDoctor("")
setWard("")
setHeartRate("")
setOxygen("")
setTemperature("")
setBp("")
    }

const critical = patients.filter(p=>p.severity==="Critical").length
const moderate = patients.filter(p=>p.severity==="Moderate").length
const stable = patients.filter(p=>p.severity==="Stable").length

const chartData=[
{ name:"Critical", value:critical },
{ name:"Moderate", value:moderate },
{ name:"Stable", value:stable }
]

const COLORS=["#ef4444","#f59e0b","#22c55e"]

return(

<div className="appLayout">

<ManagerSidebar/>

<div className="mainArea">

<h1 className="pageTitle">Hospital AI Command Center</h1>

{/* STAT CARDS */}

<div className="cardRow">

<div className="statCard">
<div className="statColor critical"></div>
<div>
<h3>Critical</h3>
<span>{critical}</span>
</div>
</div>

<div className="statCard">
<div className="statColor moderate"></div>
<div>
<h3>Moderate</h3>
<span>{moderate}</span>
</div>
</div>

<div className="statCard">
<div className="statColor stable"></div>
<div>
<h3>Stable</h3>
<span>{stable}</span>
</div>
</div>

</div>

{/* DASHBOARD GRID */}

<div className="dashboardGrid">

{/* PATIENT FORM */}

<div className="card">

<h2>Patient Intake</h2>

<div className="formGrid">

<input
placeholder="Patient Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Age"
value={age}
onChange={(e)=>setAge(e.target.value)}
/>

<input
placeholder="Gender"
value={gender}
onChange={(e)=>setGender(e.target.value)}
/>

<input
placeholder="Doctor"
value={doctor}
onChange={(e)=>setDoctor(e.target.value)}
/>

<input
placeholder="Ward"
value={ward}
onChange={(e)=>setWard(e.target.value)}
/>

</div>

<h3>Vitals</h3>

<div className="formGrid">

<input
placeholder="Heart Rate"
value={heartRate}
onChange={(e)=>setHeartRate(e.target.value)}
/>

<input
placeholder="Oxygen %"
value={oxygen}
onChange={(e)=>setOxygen(e.target.value)}
/>

<input
placeholder="Temperature"
value={temperature}
onChange={(e)=>setTemperature(e.target.value)}
/>

<input
placeholder="Blood Pressure"
value={bp}
onChange={(e)=>setBp(e.target.value)}
/>
</div>

<button className="primaryBtn" onClick={runTriage}>
  Run AI Triage
</button>

{triageResult && (
  <div className="triageResult">

    <h3>
      Classification:{" "}
      <span className={triageResult.severity.toLowerCase()}>
        {triageResult.severity}
      </span>
    </h3>

    <ul>
      {triageResult.reasons.map((r, i) => (
        <li key={i}>{r}</li>
      ))}
    </ul>

  </div>
)}
</div>

{/* CHART */}

<div className="card">

<h2>Severity Distribution</h2>

<PieChart width={350} height={300}>

<Pie
data={chartData}
dataKey="value"
cx="50%"
cy="50%"
outerRadius={110}
label
>

{chartData.map((entry,index)=>(
<Cell key={index} fill={COLORS[index]} />
))}

</Pie>

<Tooltip/>

</PieChart>

</div>

</div>

</div>

</div>

)

}