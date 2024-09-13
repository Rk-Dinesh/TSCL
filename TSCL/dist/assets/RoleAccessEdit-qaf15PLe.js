import{E as P,u as R,r as u,j as e,b as w,A as y,d as I,B as h}from"./index-BtER-45x.js";const $=()=>{var j;const p=(j=P().state)==null?void 0:j.role_id,v=sessionStorage.getItem("token"),C=R(),[x,g]=u.useState(""),[i,o]=u.useState([]),[d,k]=u.useState([{name:"Dashboard",value:"dashboard",checked:!1},{name:"Organization",value:"organization",checked:!1},{name:"Department",value:"department",checked:!1},{name:"Zone",value:"zone",checked:!1},{name:"Ward",value:"ward",checked:!1},{name:"Street",value:"street",checked:!1},{name:"Complaint",value:"complaint",checked:!1},{name:"Complaint Type",value:"complainttype",checked:!1},{name:"Designation",value:"designation",checked:!1},{name:"Employee",value:"emp",checked:!1},{name:"AdminUser",value:"admin",checked:!1},{name:"PublicUser",value:"user",checked:!1},{name:"Status",value:"status",checked:!1},{name:"Setting",value:"setting",checked:!1},{name:"Escalation",title:!0},{name:"Escalation",value:"escalate",checked:!1},{name:"Escalation Commissioner",value:"escalation",checked:!1},{name:"Grievance",title:!0},{name:"SuperAdmin",value:"grievance",checked:!1},{name:"Commisioner",value:"requestview4",checked:!1},{name:"Department Admin",value:"requestview2",checked:!1},{name:"Engineer",value:"requestview3",checked:!1},{name:"Operator",value:"requestview1",checked:!1}]),[f,E]=u.useState({roleName:"",featurePermissions:""});u.useEffect(()=>{(async()=>{try{const s=await w.get(`${y}/role/getbyid?role_id=${p}`,{headers:{Authorization:`Bearer ${v}`}}),t=I(s.data.data);if(s.status===200){g(t.role_name),o(t.accessLevels||[]);const l=d.map(c=>({...c,checked:t.accessLevels.some(n=>n.feature===c.value)}));k(l)}else h.error("Failed to fetch role data")}catch(s){console.error("Error fetching role data",s),h.error("Error fetching role data")}})()},[p,v]);const A=a=>{g(a.target.value)},S=a=>{const s=[...d];s[a].checked=!s[a].checked,s[a].checked?o(t=>[...t,{feature:s[a].value,permissions:[]}]):o(t=>t.filter(l=>l.feature!==s[a].value)),k(s)},m=(a,s)=>{const t=[...i],l=t.findIndex(c=>c.feature===d[a].value);if(l!==-1){const c=t[l].permissions;c.includes(s)?t[l].permissions=c.filter(n=>n!==s):t[l].permissions.push(s),o(t)}},L=a=>{const s=[...i],t=s.findIndex(l=>l.feature===d[a].value);t!==-1&&(s[t].permissions=s[t].permissions.length===5?[]:["view","create","edit","delete","download"],o(s))},D=async a=>{a.preventDefault();let s=!0;const t={roleName:"",featurePermissions:""};if(x.trim()===""&&(t.roleName="Role name is required.",s=!1),i.forEach(n=>{n.permissions.length===0&&(t.featurePermissions="Please select at least one permission for each selected feature.",s=!1)}),E(t),!s)return;const l=[...i],c={role_name:x,accessLevels:l,status:"active",created_by_user:"admin"};try{(await w.post(`${y}/role/update?role_id=${p}`,c,{headers:{Authorization:`Bearer ${v}`}})).status===200?(h.success("Role updated successfully"),C("/setting")):h.error("Failed to update role")}catch(n){console.error("Error updating data",n),h.error("Error updating role")}};return e.jsx("div",{className:"md:mx-6 mx-1 my-3 font-lexend overflow-y-auto no-scrollbar bg-white rounded-lg",children:e.jsx("div",{className:"px-6 py-6 overflow-auto no-scrollbar",children:e.jsxs("form",{onSubmit:D,children:[e.jsxs("div",{className:"flex gap-6 text-base items-center ",children:[e.jsx("label",{children:"Role Name:"}),e.jsx("input",{type:"text",value:x,onChange:A,className:"w-80 text-start border rounded-lg ml-2 px-3 py-1 outline-none"})]}),f.roleName&&e.jsx("p",{className:"error mt-3 text-red-500",children:f.roleName}),e.jsxs("div",{className:"mb-2",children:[e.jsx("h3",{className:"mt-6 mb-3 text-base ",children:"Access Levels:"}),d.map((a,s)=>{var t,l,c,n,b,N;return a.title?e.jsxs("div",{className:" flex gap-2 items-center mb-4",children:[e.jsx("h3",{className:"text-base text-primary",children:a.name}),e.jsx("p",{className:"text-red-500 text-sm",children:"( Select one option from the list )"})]},s):e.jsxs("div",{className:"md:grid md:grid-cols-3 mb-3 text-base ",children:[e.jsxs("div",{className:"col-span-1 flex gap-3",children:[e.jsx("input",{type:"checkbox",checked:a.checked,onChange:()=>S(s)}),e.jsx("label",{children:a.name})]}),a.checked&&e.jsxs("div",{className:"flex gap-3",children:[e.jsxs("div",{className:"flex items-center gap-2 ",children:[e.jsx("label",{className:"mx-4 md:text-base text-sm ",children:"Permissions:"}),e.jsx("input",{type:"checkbox",value:"view",checked:((t=i.find(r=>r.feature===a.value))==null?void 0:t.permissions.includes("view"))||!1,onChange:()=>m(s,"view")}),e.jsx("label",{className:"text-sm",children:"View"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[e.jsx("input",{type:"checkbox",value:"create",checked:((l=i.find(r=>r.feature===a.value))==null?void 0:l.permissions.includes("create"))||!1,onChange:()=>m(s,"create")}),e.jsx("label",{children:"Create"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[e.jsx("input",{type:"checkbox",value:"edit",checked:((c=i.find(r=>r.feature===a.value))==null?void 0:c.permissions.includes("edit"))||!1,onChange:()=>m(s,"edit")}),e.jsx("label",{children:"Edit"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[e.jsx("input",{type:"checkbox",value:"delete",checked:((n=i.find(r=>r.feature===a.value))==null?void 0:n.permissions.includes("delete"))||!1,onChange:()=>m(s,"delete")}),e.jsx("label",{children:"Delete"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[e.jsx("input",{type:"checkbox",value:"download",checked:((b=i.find(r=>r.feature===a.value))==null?void 0:b.permissions.includes("download"))||!1,onChange:()=>m(s,"download")}),e.jsx("label",{children:"Download"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[e.jsx("input",{type:"checkbox",checked:((N=i.find(r=>r.feature===a.value))==null?void 0:N.permissions.length)===5,onChange:()=>L(s)}),e.jsx("label",{children:"All"})]})]})]},s)})]}),f.featurePermissions&&e.jsx("p",{className:"error text-red-500",children:f.featurePermissions}),e.jsx("div",{className:"flex justify-center",children:e.jsx("button",{type:"submit",className:"mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg",children:"Save Changes"})})]})})})};export{$ as default};
