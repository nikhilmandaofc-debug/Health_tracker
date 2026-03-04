import { useState } from "react"

export default function AdminSidebar({ activeMenu, setActiveMenu }) {

const [collapsed, setCollapsed] = useState(false)

return (

<div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

{/* HEADER */}

<div className="sidebarHeader">

<button
className="menuBtn"
onClick={() => setCollapsed(!collapsed)}
>
☰
</button>

<div className="logo">
🏥
{!collapsed && <span>Hospital Admin</span>}
</div>

</div>


{/* NAVIGATION */}

<nav className="sidebarNav">

<button
className={activeMenu === "rules" ? "activeLink" : ""}
onClick={() => setActiveMenu("rules")}
>
⚙️ {!collapsed && <span>AI Rule Agent</span>}
</button>

<button
className={activeMenu === "viewRules" ? "activeLink" : ""}
onClick={() => setActiveMenu("viewRules")}
>
📋 {!collapsed && <span>View Rules</span>}
</button>

<button
className={activeMenu === "wards" ? "activeLink" : ""}
onClick={() => setActiveMenu("wards")}
>
🏥 {!collapsed && <span>Manage Wards</span>}
</button>

<button
className={activeMenu === "doctors" ? "activeLink" : ""}
onClick={() => setActiveMenu("doctors")}
>
👨‍⚕️ {!collapsed && <span>Manage Doctors</span>}
</button>

<button
className="logout"
onClick={() => setActiveMenu("logout")}
>
🚪 {!collapsed && <span>Logout</span>}
</button>

</nav>

</div>

)
}