import { useState } from "react"
import AdminSidebar from "../components/AdminSidebar"
import AdminRuleAgent from "./AdminRuleAgent"
import ManageWards from "./ManageWards"
import ManageDoctors from "./ManageDoctors"

export default function AdminDashboard(){

const [activeMenu,setActiveMenu] = useState("rules")


return(

<div className="appLayout">

{/* SIDEBAR */}

<AdminSidebar
activeMenu={activeMenu}
setActiveMenu={setActiveMenu}
/>

{/* MAIN AREA */}

<div className="mainArea">

<h1 className="pageTitle">Hospital Admin Control</h1>

{/* CONTENT SWITCH */}

{activeMenu === "rules" && (

<div className="card">
<AdminRuleAgent/>
</div>

)}

{activeMenu === "viewRules" && (

<div className="card">
<h2>Rules Table</h2>
<p>Rules will appear here</p>
</div>

)}

{activeMenu === "wards" && (
<ManageWards/>
)}

{activeMenu === "doctors" && (
<ManageDoctors/>
)}

</div>

</div>

)

}