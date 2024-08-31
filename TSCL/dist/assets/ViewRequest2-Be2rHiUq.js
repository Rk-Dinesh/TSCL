import{c as R,a as V,r as c,C as W,p as G,u as H,j as e,m as O,o as Z,b as n,A as d,d as p,B as z}from"./index-B-0fny-6.js";import{V as J}from"./ViewAttachment-BI0hPLJi.js";const K=R().shape({assign_username:V().required(" required ")}),te=()=>{var A,$;const[s,k]=c.useState(null),[u,L]=c.useState(null),[y,F]=c.useState([]),[b,B]=c.useState([]),[j,T]=c.useState([]),[Q,x]=c.useState(!0),[X,h]=c.useState(null),w=W(),o=(A=w.state)==null?void 0:A.grievanceId,C=($=w.state)==null?void 0:$.deptName,l=sessionStorage.getItem("token"),[f,_]=c.useState(!1),[I,D]=c.useState(null),U=G(),{register:q,formState:{errors:S},handleSubmit:E,watch:Y}=H({resolver:Z(K),mode:"all"});c.useEffect(()=>{const a=async()=>{try{const t=await n.get(`${d}/new-grievance/getbyid?grievance_id=${o}`,{headers:{Authorization:`Bearer ${l}`}}),r=p(t.data.data);k(r);const v=await n.get(`${d}/new-grievance/filter?zone_name=${r.zone_name}&ward_name=${r.ward_name}&street_name=${r.street_name}&dept_name=${r.dept_name}&complaint=${r.complaint}`,{headers:{Authorization:`Bearer ${l}`}});T(p(v.data.data))}catch(t){h(t)}finally{x(!1)}},i=async()=>{try{const t=await n.get(`${d}/user/getbydept?dept_name=${C}`,{headers:{Authorization:`Bearer ${l}`}}),r=p(t.data.data);F(r)}catch(t){h(t)}finally{x(!1)}},m=async()=>{try{const t=await n.get(`${d}/new-grievance-attachment/getattachments?grievance_id=${o}`,{headers:{Authorization:`Bearer ${l}`}}),r=p(t.data.data);L(r)}catch(t){h(t)}finally{x(!1)}},N=async()=>{try{const t=await n.get(`${d}/grievance-log/getbyid?grievance_id=${o}`,{headers:{Authorization:`Bearer ${l}`}}),r=p(t.data.data);B(r)}catch(t){h(t)}finally{x(!1)}};a(),i(),m(),N()},[]);const M=()=>{_(!f),D(null)},P=async a=>{const i=event.target.querySelector("select"),m=i.options[i.selectedIndex],N=m.getAttribute("data-user-id"),t=m.getAttribute("data-user-phone"),r=m.getAttribute("data-user-name"),v={...a,assign_user:N,assign_userphone:t};try{const g=await n.post(`${d}/new-grievance/updateassign?grievance_id=${o}`,v,{headers:{Authorization:`Bearer ${l}`}});if(g.status===200){z.success("Work Assigned Successfully"),U("/requestview2");const ee=await n.post(`${d}/grievance-log/post`,{grievance_id:o,log_details:`Work Assigned to ${r}`,created_by_user:"admin"},{headers:{Authorization:`Bearer ${l}`}})}else console.error("Error in posting data",g),z.error("Failed to Upload")}catch(g){console.error("Error in posting data",g)}};return e.jsxs(c.Fragment,{children:[e.jsx("div",{className:"h-screen overflow-y-auto no-scrollbar",children:s&&s.grievance_id&&e.jsxs("div",{className:"md:mx-6 mx-2  my-5 font-lexend",children:[e.jsxs("p",{children:["Complaint Details #",s.grievance_id]}),e.jsxs("div",{className:"bg-white mt-2 pb-3",children:[e.jsx("p",{className:"px-5 py-2 text-lg",children:"Request By :"}),e.jsxs("div",{className:"md:grid md:grid-cols-12 grid grid-cols-12 items-center gap-6 mx-3 my-3",children:[e.jsxs("div",{className:"md:col-span-3 col-span-6 flex-col-2 px-5 pb-3",children:[e.jsx("p",{className:"capitalize",children:s.public_user_name}),e.jsxs("p",{children:["+91 ",s.phone]})," "]}),e.jsxs("div",{className:"md:col-span-3 col-span-6 ",children:[e.jsxs("div",{className:"flex gap-3 mb-2  items-center",children:[e.jsx("p",{children:"Status: "}),e.jsx("span",{className:"text-sm border border-gray-500 w-24 py-1 text-center rounded-full capitalize",children:s.status})]}),e.jsxs("div",{className:"flex gap-1 items-center",children:[e.jsx("p",{className:"-ml-2",children:"Priority : "}),e.jsx("span",{className:`border w-24 rounded-full text-center py-1.5 mx-2 text-sm font-normal capitalize text-white  ${s.priority==="High"?"bg-red-500":s.priority==="Medium"?"bg-green-500":s.priority==="Low"?"bg-sky-500":""}`,children:s.priority})]})]}),e.jsx("form",{onSubmit:E(P),children:e.jsxs("div",{className:" flex gap-4 items-center",children:[e.jsx("div",{className:"md:col-span-4 col-span-6",children:e.jsxs("select",{className:"col-span-2 block px-6 py-1.5 text-sm text-black border rounded-lg border-gray-500 outline-none capitalize",defaultValue:"",...q("assign_username"),children:[e.jsx("option",{value:s.assign_username?s.assign_username:"",hidden:!0,children:s.assign_username?s.assign_username:"Assign User"}),y&&y.map(a=>e.jsx("option",{value:a.user_name,"data-user-id":a.user_id,"data-user-phone":a.phone,"data-user-name":a.user_name,children:a.user_name},a.user_name))]})}),e.jsx("div",{className:"md:col-span-2 col-span-6",children:e.jsx("button",{className:"bg-primary px-4 py-1.5 text-sm text-white rounded-full",children:"Submit"})}),S.assign_username&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:S.assign_username.message})]})})]}),e.jsx("hr",{}),e.jsxs("div",{className:"grid grid-cols-12 gap-2 mx-3 my-4",children:[e.jsxs("div",{className:"md:col-span-6 col-span-12 border px-2 py-3 rounded",children:[e.jsx("p",{className:"pt-2 text-lg",children:"Grievance Details"}),e.jsx("hr",{className:"my-3"}),e.jsxs("div",{className:"flex flex-col gap-3 mx-2 text-base",children:[e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Origin "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",s.grievance_mode]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Complaint Type "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",s.complaint_type_title]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Department "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",s.dept_name]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Complaint "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",s.complaint]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Zone "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",s.zone_name]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Ward "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",s.ward_name]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Street "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",s.street_name]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Pincode "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",s.pincode]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Description: "}),e.jsx("p",{className:"col-start-1 col-span-4 mt-2 capitalize",children:s.complaint_details})]}),u&&u.length>0&&e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Attachment Files "}),e.jsx("div",{className:"col-start-1 col-span-4 mt-2 text-xs  ",children:u.map((a,i)=>e.jsx("button",{className:" mx-1 my-1 px-3 py-1.5 bg-gray-500 rounded-full text-white",onClick:()=>{_(!0),D(a.attachment)},children:`Attachment ${i+1}`},i))})]})]})]}),e.jsxs("div",{className:"md:col-span-6 col-span-12 border px-2 py-3 rounded ",children:[e.jsx("p",{className:"pt-2 text-lg ",children:"Similar Request"}),e.jsx("hr",{className:"my-3 w-full"}),e.jsx("div",{className:"overflow-auto no-scrollbar",children:e.jsxs("table",{className:"w-full bg-gray-200 rounded ",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"items-center mx-3 py-2 font-lexend whitespace-nowrap",children:"Date/Time"}),e.jsx("th",{className:"items-center mx-3 py-2 font-lexend whitespace-nowrap",children:"Complaint No"}),e.jsx("th",{className:"items-center mx-3 py-2 font-lexend whitespace-nowrap",children:"Status"})]})}),e.jsx("tbody",{className:"divide-y divide-gray-300",children:j&&j.length>0?j.map((a,i)=>e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("td",{className:"text-center mx-3 py-2.5 whitespace-nowrap",children:O(a.createdAt)}),e.jsx("td",{className:"text-center mx-3 py-2.5 whitespace-nowrap",children:a.grievance_id}),e.jsx("td",{className:"text-center mx-3 py-2.5 text-green-600 whitespace-nowrap capitalize",children:a.status})]},i)):e.jsx("tr",{children:e.jsx("td",{className:"text-center py-2.5",colSpan:"3",children:"No matching data found"})})})]})})]})]}),e.jsxs("div",{className:"mx-3 my-3 ",children:[e.jsx("p",{className:"mb-2 mx-1 text-lg",children:"Complaint History"}),e.jsx("div",{className:"bg-gray-100 py-3 h-[530px]",children:e.jsxs("div",{className:"mx-8 ",children:[e.jsxs("p",{className:"py-3 font-semibold",children:["Complaint No ",s.grievance_id]}),e.jsxs("div",{className:"h-[280px]  overflow-x-auto no-scrollbar mb-3",children:[b&&b.slice().reverse().map((a,i)=>e.jsxs("div",{children:[e.jsx("p",{className:"py-1",children:new Date(a.createdAt).toLocaleDateString()}),e.jsxs("div",{className:"grid grid-cols-3 divide-x-2 divide-black",children:[e.jsx("p",{children:new Date(a.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!0})}),e.jsx("p",{className:"pl-5 col-span-2",children:a.log_details})]}),e.jsx("br",{})]},i)),e.jsx("p",{className:"py-2",children:new Date(s.createdAt).toLocaleDateString()}),e.jsxs("div",{className:"grid grid-cols-3 divide-x-2 divide-black",children:[e.jsx("p",{children:new Date(s.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!0})}),e.jsxs("p",{className:"pl-5 col-span-2",children:[" ","Assigned To Particular Department"]})]}),e.jsx("br",{}),e.jsxs("div",{className:"grid grid-cols-3 divide-x-2 divide-black",children:[e.jsx("p",{children:new Date(s.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!0})}),e.jsxs("p",{className:"pl-5 col-span-2",children:["Ticket Raised- ",s.grievance_id]})]}),e.jsx("br",{}),e.jsxs("div",{className:"grid grid-cols-3 divide-x-2 divide-black",children:[e.jsx("p",{children:new Date(s.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!0})}),e.jsx("p",{className:"pl-5 col-span-2",children:"Logged In"})]})]}),e.jsx("p",{className:"mb-2",children:"Work StatusFlow :"}),e.jsxs("div",{className:"grid grid-cols-3 divide-x-2 divide-black",children:[e.jsxs("p",{children:[e.jsxs("span",{className:"block",children:[" ",new Date(s.updatedAt).toLocaleDateString()]}),new Date(s.updatedAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!0})]}),e.jsxs("div",{className:"col-span-2",children:[e.jsx("p",{className:"pl-5",children:"Status:"}),e.jsx("p",{className:"pl-5 text-gray-500",children:s.statusflow.split("/").join(" / ").replace(/(?: \/ ){5}/g,` / 
`)})]})]}),e.jsx("hr",{className:"my-3"}),e.jsxs("div",{className:"md:grid md:grid-cols-3 flex border-2 md:mx-20",children:[e.jsx("p",{className:"text-center px-3 py-1.5",children:"Status"}),e.jsx("p",{className:"text-center w-full bg-gray-800 md:col-span-2 text-white py-1.5",children:s.status})]})]})})]})]})]})}),f&&e.jsx(J,{toggleModal:M,attachmentFile:I})]})};export{te as default};