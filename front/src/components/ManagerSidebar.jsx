import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom"

export default function ManagerSidebar(){

const [collapsed,setCollapsed] = useState(false)

return(

<div className={`sidebar ${collapsed ? "collapsed":""}`}>

<div className="sidebarHeader">

<button
className="menuBtn"
onClick={()=>setCollapsed(!collapsed)}
>
☰
</button>

<div className="logo">
🏥
{!collapsed && <span>Hospital AI</span>}
</div>

</div>

<nav className="sidebarNav">

<NavLink to="/manager-dashboard">
📊 {!collapsed && "Dashboard"}
</NavLink>

<NavLink to="/triage">
🧠 {!collapsed && "AI Triage"}
</NavLink>

<NavLink to="/patients">
🩺 {!collapsed && "Patient Monitor"}
</NavLink>

<NavLink to="/ai-insights">
🤖 {!collapsed && "AI Insights"}
</NavLink>

<NavLink to="/">
🚪 {!collapsed && "Logout"}
</NavLink>

</nav>

</div>

)

}