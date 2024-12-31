import{r as c,C as J,u as U,b as n,A as d,d as m,j as e,H as Z,J as K,B as v}from"./index-Cb3AN3R3.js";import{V as Q}from"./ViewAttachment-DwyE4-Tj.js";import{S as X}from"./SimilarReq-CmxM2ozc.js";import{G as Y}from"./GrievanceDetailsModal-Ce37D8zL.js";const re=()=>{const[a,k]=c.useState(null),[g,C]=c.useState(null),[j,R]=c.useState(null),[I,y]=c.useState(null),[p,F]=c.useState([]),[L,x]=c.useState(!0),[f,h]=c.useState(null),M=J(),i=new URLSearchParams(M.search).get("grievanceId"),l=localStorage.getItem("token"),[w,u]=c.useState(!1),[B,b]=c.useState(!1),[G,N]=c.useState(null),[_,T]=c.useState([]);U();const[q,O]=c.useState(null),[P,D]=c.useState(!1);c.useEffect(()=>{const s=async()=>{try{const r=await n.get(`${d}/new-grievance-attachment/getattachments?grievance_id=${i}`,{headers:{Authorization:`Bearer ${l}`}}),o=m(r.data.data);C(o)}catch(r){h(r)}finally{x(!1)}},t=async()=>{try{const r=await n.get(`${d}/grievance-worksheet-attachment/getattachments?grievance_id=${i}`,{headers:{Authorization:`Bearer ${l}`}}),o=m(r.data.data);R(o)}catch(r){h(r)}finally{x(!1)}};A(),s(),S(),t()},[]);const S=async()=>{try{const s=await n.get(`${d}/grievance-log/getbyid?grievance_id=${i}`,{headers:{Authorization:`Bearer ${l}`}}),t=m(s.data.data);T(t)}catch(s){h(s)}finally{x(!1)}},A=async()=>{try{const s=await n.get(`${d}/new-grievance/getbyid?grievance_id=${i}`,{headers:{Authorization:`Bearer ${l}`}}),t=m(s.data.data);k(t);const r=await n.get(`${d}/new-grievance/filter?zone_name=${t.zone_name}&ward_name=${t.ward_name}&street_name=${t.street_name}&dept_name=${t.dept_name}&complaint=${t.complaint}`,{headers:{Authorization:`Bearer ${l}`}}),z=m(r.data.data).filter(W=>W.grievance_id!==i);F(z)}catch(s){h(s)}finally{x(!1)}},E=async()=>{try{(await n.post(`${d}/new-grievance/reopen?grievance_id=${i}`,{},{headers:{Authorization:`Bearer ${l}`}})).status===200?(v.success("Ticket Re-Opened Successfully"),await n.post(`${d}/grievance-log/post`,{grievance_id:i,log_details:`Ticket No ${i} is Re-Opened by ${localStorage.getItem("name")}`,created_by_user:localStorage.getItem("name")},{headers:{Authorization:`Bearer ${l}`}}),A(),S()):v.error("Failed ")}catch(s){console.error("Error sending message:",s),v.error("An error occurred while sending the message.")}};if(L)return e.jsx("p",{children:"Loading..."});if(f)return e.jsxs("p",{children:["Error: ",f.message]});if(!a)return e.jsx("p",{children:"No data found"});const H=()=>{u(!w),N(null)},V=()=>{b(!b)},$=s=>{O(s),D(!0)};return e.jsxs(c.Fragment,{children:[e.jsx("div",{className:"h-screen overflow-y-auto no-scrollbar",children:e.jsxs("div",{className:"md:mx-6 mx-2  my-5 font-lexend",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsxs("p",{children:["Complaint Details #",a.grievance_id]}),a.status==="closed"&&(()=>{const s=new Date(a.createdAt);return(new Date-s)/(1e3*60*60*24)<=7?e.jsx("button",{className:"bg-green-600 px-3 py-1.5 rounded-md shadow-md text-white text-sm",onClick:()=>{window.confirm("Are you sure you want to Re-open the ticket?")&&E()},children:"Re-open Ticket"}):null})()]}),e.jsxs("div",{className:"bg-white mt-2 pb-3",children:[e.jsx("p",{className:"px-5 py-2 text-lg",children:"Request By :"}),e.jsxs("div",{className:"flex justify-between gap-3 mx-3 my-3 items-center flex-wrap",children:[e.jsxs("div",{className:"col-span-4 px-5 pb-3",children:[e.jsx("p",{className:"capitalize",children:a.public_user_name}),e.jsxs("p",{children:["+91 ",a.phone]})," "]}),e.jsxs("div",{className:"flex flex-row gap-2 items-center flex-wrap",children:[e.jsxs("div",{className:"flex  gap-3  items-center",children:[e.jsx("p",{children:"Status: "}),e.jsx("span",{className:"text-sm border border-gray-500 w-24 text-center py-1.5 rounded-full capitalize",children:a.status})]}),e.jsxs("div",{className:"flex gap-3 items-center ",children:[e.jsx("p",{className:"",children:"Priority: "}),e.jsx("span",{className:`border w-28 rounded-full text-center py-1.5 mx-2 text-sm font-normal capitalize text-white  ${a.priority==="High"?"bg-red-500":a.priority==="Medium"?"bg-sky-500":a.priority==="Low"?"bg-green-500":""}`,children:a.priority})]})]}),a.assign_username?e.jsx("div",{className:"flex flex-col mx-3",children:e.jsxs("div",{className:"flex   gap-3 items-center",children:[e.jsx("p",{children:"Assigned to "}),e.jsx("span",{className:"text-sm border border-gray-500 px-3 text-center py-1.5 rounded-full capitalize whitespace-nowrap",children:a.assign_username})]})}):""]}),e.jsx("hr",{}),e.jsxs("div",{className:"grid grid-cols-12 gap-2 mx-3 my-4",children:[e.jsxs("div",{className:"md:col-span-6 col-span-12 border px-2 py-3 rounded",children:[e.jsx("p",{className:"pt-2 text-lg",children:"Grievance Details"}),e.jsx("hr",{className:"my-3"}),e.jsxs("div",{className:"flex flex-col gap-3 mx-2 text-base",children:[e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Origin "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",a.grievance_mode]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Complaint Type "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",a.complaint_type_title]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Department "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",a.dept_name]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Complaint "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",a.complaint]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Zone "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",a.zone_name]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Ward "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",a.ward_name]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Street "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",a.street_name]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Pincode "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",a.pincode]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Complaint Address: "}),e.jsx("p",{className:"col-start-1 col-span-4 mt-2 capitalize",children:a.complaintaddress})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Description: "}),e.jsx("p",{className:"col-start-1 col-span-4 mt-2 capitalize",children:a.complaint_details})]}),g&&g.length>0&&e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Attachment Files "}),e.jsx("div",{className:"col-start-1 col-span-4 mt-2 text-xs  ",children:g.map((s,t)=>e.jsx("button",{className:" mx-1 my-1 px-3 py-1.5 bg-gray-500 rounded-full text-white",onClick:()=>{u(!0),N(s.attachment),y("new-grievance-attachment")},children:`Attachment ${t+1}`},t))})]})]})]}),e.jsxs("div",{className:"md:col-span-6 col-span-12 border px-2 py-3 rounded ",children:[e.jsx("p",{className:"pt-2 text-lg ",children:"Similar Request"}),e.jsx("hr",{className:"my-3 w-full"}),e.jsx("div",{className:"overflow-auto no-scrollbar",children:e.jsxs("table",{className:"w-full bg-gray-200 rounded ",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"items-center mx-3 py-2 font-lexend whitespace-nowrap",children:"Grievance"}),e.jsx("th",{className:"items-center mx-3 py-2 font-lexend whitespace-nowrap",children:"Department"}),e.jsx("th",{className:"items-center mx-3 py-2 font-lexend whitespace-nowrap",children:"Origin"}),e.jsx("th",{className:"items-center mx-3 py-2 font-lexend whitespace-nowrap",children:"Date"}),e.jsx("th",{className:"items-center mx-3 py-2 font-lexend whitespace-nowrap",children:"Action"})]})}),e.jsx("tbody",{className:"divide-y divide-gray-300",children:p&&p.length>0?p.map((s,t)=>e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("td",{className:"text-center mx-3 py-2.5 whitespace-nowrap",onClick:()=>$(s.grievance_id),children:s.grievance_id}),e.jsx("td",{className:"text-center mx-3 py-2.5 whitespace-nowrap text-gray-600 capitalize",children:s.dept_name}),e.jsx("td",{className:"text-center mx-3 py-2.5 whitespace-nowrap text-gray-600 capitalize",children:s.grievance_mode}),e.jsx("td",{className:"text-center mx-3 py-2.5 whitespace-nowrap text-gray-600 ",children:Z(s.createdAt)}),e.jsx("td",{className:"flex justify-center mt-3",children:e.jsx(K,{className:"text-xl",onClick:()=>$(s.grievance_id)})})]},t)):e.jsx("tr",{className:"",children:e.jsx("td",{className:"text-center py-2.5",colSpan:"5",children:"No matching data found"})})})]})})]})]}),e.jsxs("div",{className:"mx-3 my-3",children:[e.jsx("p",{className:"mb-2 mx-1 text-lg",children:"Complaint History"}),e.jsx("div",{className:"bg-gray-100 py-3 h-[530px]",children:e.jsxs("div",{className:"mx-8 ",children:[e.jsxs("p",{className:"py-3 font-semibold",children:["Complaint No ",a.grievance_id]}),e.jsxs("div",{className:"h-[380px]  overflow-x-auto no-scrollbar mb-3",children:[_&&_.slice().reverse().map((s,t)=>e.jsxs("div",{children:[e.jsx("p",{className:"py-1",children:new Date(s.createdAt).toLocaleDateString()}),e.jsxs("div",{className:"grid grid-cols-3 divide-x-2 divide-black",children:[e.jsx("p",{children:new Date(s.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!0})}),e.jsx("p",{className:"pl-5 col-span-2",children:s.log_details})]}),e.jsx("br",{})]},t)),e.jsx("p",{className:"py-2",children:new Date(a.createdAt).toLocaleDateString()}),e.jsxs("div",{className:"grid grid-cols-3 divide-x-2 divide-black",children:[e.jsx("p",{children:new Date(a.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!0})}),e.jsxs("p",{className:"pl-5 col-span-2",children:[" ","Assigned To Particular ",a.dept_name," Department"]})]}),e.jsx("br",{}),e.jsxs("div",{className:"grid grid-cols-3 divide-x-2 divide-black",children:[e.jsx("p",{children:new Date(a.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!0})}),e.jsxs("p",{className:"pl-5 col-span-2",children:["Ticket Raised- ",a.grievance_id]})]}),e.jsx("br",{}),j&&j.length>0&&e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Attachment Files "}),e.jsx("div",{className:"col-start-1 col-span-4 mt-2 text-xs  ",children:j.map((s,t)=>e.jsx("button",{className:" mx-1 my-1 px-3 py-1.5 bg-gray-500 rounded-full text-white",onClick:()=>{u(!0),N(s.attachment),y("grievance-worksheet-attachment")},children:`Attachment ${t+1}`},t))})]})]}),e.jsx("hr",{className:"my-3"}),e.jsxs("div",{className:"md:grid md:grid-cols-3 flex border-2 md:mx-20",children:[e.jsx("p",{className:"text-center px-3 py-1.5",children:"Status"}),e.jsx("p",{className:"text-center w-full bg-gray-800 md:col-span-2 text-white py-1.5",children:a.status})]})]})})]})]})]})}),P&&e.jsx(Y,{grievanceId:q,closeModal:()=>D(!1)}),w&&e.jsx(Q,{endpoint:I,toggleModal:H,attachmentFile:G}),B&&e.jsx(X,{matchData:p,togglReModal:V})]})};export{re as default};