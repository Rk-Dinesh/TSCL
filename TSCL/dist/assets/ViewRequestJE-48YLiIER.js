import{r as c,j as e,V as ce,N as P,b as o,A as d,B as m,i as ne,k as ie,U as oe,u as de,m as me,o as pe,d as v}from"./index-DP2NNKOn.js";import{V as he,S as xe}from"./SimilarReq-C5Tuh5ra.js";const ge=a=>{const{matchData:w,togglSeModal:b,dataStatus:D,worksheet:_}=a,[A,q]=c.useState({}),f=localStorage.getItem("token");c.useEffect(()=>{document.querySelectorAll(".accordion").forEach(r=>{const p=r.querySelector(".accordion-header");r.querySelector(".accordion-body"),p.addEventListener("click",()=>{q(h=>({...h,[r.dataset.index]:!h[r.dataset.index]}))})})},[]);const S=async(i,r)=>{const p={status:i};try{const h=await o.post(`${d}/new-grievance/updatestatus?grievance_id=${r}`,p,{headers:{Authorization:`Bearer ${f}`}});if(h.status===200){m.success("Status Updated Successfully");const N=await o.post(`${d}/grievance-log/post`,{grievance_id:r,log_details:` SR : Assigned work is ${i} updated by ${localStorage.getItem("name")}`,created_by_user:localStorage.getItem("name")},{headers:{Authorization:`Bearer ${f}`}}),U=await o.post(`${d}/grievance-log/post`,{grievance_id:r,log_details:`  SR : Worksheet Updated by ${localStorage.getItem("name")} : ${_}`,created_by_user:localStorage.getItem("name")},{headers:{Authorization:`Bearer ${f}`}});m.success("Worksheet  Uploaded Successfully")}else console.error("Error in posting data",h),m.error("Failed to Upload")}catch(h){console.error("Error in posting data",h)}};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center",children:e.jsxs("div",{className:"bg-white w-full h-3/5 font-lexend m-2 mx-5 overflow-auto",children:[e.jsxs("div",{className:"flex justify-between mx-3 mt-2 items-center",children:[e.jsx("p",{className:"pt-2 text-lg text-slate-900 pl-5",children:"Similar Request"}),e.jsx("p",{className:"text-3xl pr-5",onClick:()=>b(),children:"x"})]}),e.jsx("hr",{className:"my-3 w-full"}),w&&w.length>0?w.map((i,r)=>e.jsxs("div",{className:"accordion mb-4","data-index":r,children:[e.jsxs("div",{className:"accordion-header flex items-center justify-between p-4 bg-slate-500 rounded-t cursor-pointer mx-3",children:[e.jsx("div",{className:"flex flex-wrap gap-3",children:e.jsxs("p",{className:"text-white",children:[e.jsxs("span",{className:"text-lg  font-medium",children:[i.grievance_id," :"]})," ",i.dept_name," - ",i.complaint]})}),e.jsx("span",{className:"text-2xl font-bold text-white",children:e.jsx(ce,{className:A[r]?" rotate-180 ":""})})]}),e.jsx("div",{className:`accordion-body p-4 bg-gray-50 rounded-b ${A[r]?"block":"hidden"}`,children:e.jsx("table",{className:"w-full bg-gray-100 rounded",children:e.jsxs("tbody",{className:"divide-y divide-gray-300",children:[e.jsx("tr",{children:e.jsx("td",{className:"text-start px-3 mx-3 py-2.5 whitespace-nowrap",children:e.jsxs("div",{className:"flex justify-between",children:["Department : ",i.dept_name,e.jsxs("select",{className:"col-span-2 bg-gray-100 block px-1 py-1 text-sm text-black border rounded-lg border-none outline-none capitalize",onChange:p=>S(p.target.value,i.grievance_id),children:[e.jsx("option",{value:i.status,hidden:!0,children:i.status}),D&&D.map((p,h)=>e.jsx("option",{value:p.status_name,children:p.status_name},h))]})]})})}),e.jsx("tr",{children:e.jsxs("td",{className:"text-start px-3 mx-3 py-2.5 ",children:["Description : ",i.complaint_details]})}),e.jsx("tr",{children:e.jsxs("td",{className:"text-start px-3 mx-3 py-2.5 whitespace-nowrap",children:["Date : ",P(i.createdAt)]})})]})})})]},r)):e.jsx("p",{className:" text-center font-semibold text-2xl mt-28",children:"No matching data found !!!"})]})})},ue=ne().shape({worksheet_name:ie().required("worksheet is required")}),_e=()=>{const[a,w]=c.useState(null),[b,D]=c.useState(null),[_,A]=c.useState(null),[q,f]=c.useState(null),[S,i]=c.useState([]),[r,p]=c.useState([]),[h,N]=c.useState(!0),[U,k]=c.useState(null),W=oe(),x=new URLSearchParams(W.search).get("grievanceId"),g=localStorage.getItem("token"),[I,F]=c.useState(!1),[T,V]=c.useState(!1),[H,L]=c.useState(!1),[O,B]=c.useState(null),[R,G]=c.useState([]),[z,E]=c.useState([]),[J,K]=c.useState(null),C=de(),{register:Z,formState:{errors:ye},handleSubmit:Q,reset:fe,setValue:Ne,watch:$}=me({resolver:pe(ue),mode:"onBlur"});c.useEffect(()=>{const s=async()=>{try{const l=await o.get(`${d}/new-grievance/getbyid?grievance_id=${x}`,{headers:{Authorization:`Bearer ${g}`}}),n=v(l.data.data);w(n);const te=await o.get(`${d}/new-grievance/filter?zone_name=${n.zone_name}&ward_name=${n.ward_name}&street_name=${n.street_name}&dept_name=${n.dept_name}&complaint=${n.complaint}`,{headers:{Authorization:`Bearer ${g}`}}),re=v(te.data.data).filter(le=>le.grievance_id!==x);p(re)}catch(l){k(l)}finally{N(!1)}},t=async()=>{try{const l=await o.get(`${d}/status/getactive`,{headers:{Authorization:`Bearer ${g}`}}),n=v(l.data.data);i(n)}catch(l){k(l)}finally{N(!1)}},u=async()=>{try{const l=await o.get(`${d}/new-grievance-attachment/getattachments?grievance_id=${x}`,{headers:{Authorization:`Bearer ${g}`}}),n=v(l.data.data);D(n)}catch(l){k(l)}finally{N(!1)}},y=async()=>{try{const l=await o.get(`${d}/grievance-worksheet-attachment/getattachments?grievance_id=${x}`,{headers:{Authorization:`Bearer ${g}`}}),n=v(l.data.data);A(n)}catch(l){k(l)}finally{N(!1)}},j=async()=>{try{const l=await o.get(`${d}/grievance-log/getbyid?grievance_id=${x}`,{headers:{Authorization:`Bearer ${g}`}}),n=v(l.data.data);G(n)}catch(l){k(l)}finally{N(!1)}};s(),t(),u(),j(),y()},[]);const X=()=>{F(!I),B(null)},Y=()=>{C("/requestview3")},ee=()=>{L(!L)},se=async s=>{if(s.toLowerCase()==="closed"&&!$("worksheet_name")){m.error("Please fill out the worksheet form before closing the request");return}const t={status:s};s.toLowerCase()!=="closed"&&(t.worksheet_name=$("worksheet_name"));try{const u=await o.post(`${d}/new-grievance/updatestatus?grievance_id=${x}`,t,{headers:{Authorization:`Bearer ${g}`}});if(u.status===200){m.success("Status Updated Successfully");const y=await o.post(`${d}/grievance-log/post`,{grievance_id:x,log_details:` Assigned work is ${s} updated by ${localStorage.getItem("name")}`,created_by_user:localStorage.getItem("name")},{headers:{Authorization:`Bearer ${g}`}});if(s.toLowerCase()==="closed"){M({worksheet_name:$("worksheet_name"),status:s.toLowerCase()}),r.length===0?C("/requestview3"):(V(!0),K($("worksheet_name")));return}C("/requestview3")}else console.error("Error in posting data",u),m.error("Failed to Upload")}catch(u){console.error("Error in posting data",u)}},ae=s=>{const t=s.target.files,u=250*1024;if(t.length>5)m.error("Maximum 5 files allowed"),s.target.value=null;else{for(const y of t)if(y.size>u){m.error(`File ${y.name} is too large. Please upload files up to 250KB.`),s.target.value=null;return}E(t)}},M=async s=>{const t=s.worksheet_name,u={worksheet_name:` WorkSheet given by ${localStorage.getItem("name")}: ${s.worksheet_name} `,grievance_id:x,created_by_user:localStorage.getItem("name")};try{if((await o.post(`${d}/grievance-worksheet/post`,u,{headers:{Authorization:`Bearer ${g}`}})).status===200){m.success("Wroksheet Uploaded Successfully");const j=await o.post(`${d}/grievance-log/post`,{grievance_id:x,log_details:` WorkSheet given by ${localStorage.getItem("name")}: ${t}`,created_by_user:localStorage.getItem("name")},{headers:{Authorization:`Bearer ${g}`}})}if(z.length>0)if(z.length>5)m.error("File limit exceeded. Maximum 5 files allowed.");else try{const j=new FormData;for(let n=0;n<z.length;n++)j.append("files",z[n]);j.append("grievance_id",x),j.append("created_by_user","admin"),(await o.post(`${d}/grievance-worksheet-attachment/post`,j,{headers:{"Content-Type":"multipart/form-data"}})).status===200&&(m.success("Attachment Uploaded Successfully"),E([]))}catch(j){console.error(j),m.error("Error creating attachment")}s.status!=="closed"&&C("/requestview3")}catch(y){console.log(y),m.error("An error occurred during submission. Please try again.")}};return e.jsxs(c.Fragment,{children:[e.jsx("div",{className:"h-screen overflow-y-auto no-scrollbar",children:a&&a.grievance_id&&e.jsxs("div",{className:"md:mx-6 mx-2  my-5 font-lexend",children:[e.jsxs("p",{children:["Complaint Details #",a.grievance_id]}),e.jsxs("div",{className:"bg-white mt-2 pb-3",children:[e.jsx("p",{className:"px-5 py-2 text-lg",children:"Request By :"}),e.jsxs("div",{className:"flex justify-between gap-3 mx-3 my-3",children:[e.jsxs("div",{className:"col-span-4 px-5 pb-3",children:[e.jsx("p",{className:"capitalize",children:a.public_user_name}),e.jsxs("p",{children:["+91 ",a.phone]})," "]}),e.jsxs("div",{className:"flex flex-col mx-3",children:[e.jsxs("div",{className:"flex gap-3 mb-3 items-center",children:[e.jsx("p",{children:"Status: "}),a.status&&a.status.toLowerCase()==="closed"?e.jsx("span",{className:"text-sm border-2 border-gray-500 w-28 text-center py-1.5 ml-3 rounded-full",children:"Closed"}):e.jsx("span",{className:"text-sm border-2 border-gray-500 px-3 py-0.5 rounded-full",children:e.jsxs("select",{className:"col-span-2 block px-1 py-1 text-sm text-black border rounded-lg border-none outline-none capitalize",onChange:s=>se(s.target.value),children:[e.jsx("option",{value:a.status,hidden:!0,children:a.status}),S&&S.map((s,t)=>e.jsx("option",{value:s.status_name,disabled:s.status_name.toLowerCase()==="closed"&&!$("worksheet_name"),children:s.status_name},t))]})})]}),e.jsxs("div",{className:"flex gap-3 items-center ",children:[e.jsx("p",{children:"Priority: "}),e.jsx("span",{className:`border w-28 rounded-full text-center py-1.5 mx-2 text-sm font-normal capitalize text-white  ${a.priority==="High"?"bg-red-500":a.priority==="Medium"?"bg-sky-500":a.priority==="Low"?"bg-green-500":""}`,children:a.priority})]})]})]}),e.jsx("hr",{}),e.jsxs("div",{className:"grid grid-cols-12 gap-2 mx-3 my-4",children:[e.jsxs("div",{className:"md:col-span-6 col-span-12 border px-2 py-3 rounded",children:[e.jsx("p",{className:"pt-2 text-lg",children:"Grievance Details"}),e.jsx("hr",{className:"my-3"}),e.jsxs("div",{className:"flex flex-col gap-3 mx-2 text-base",children:[e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Origin "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",a.grievance_mode]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Complaint Type "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",a.complaint_type_title]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Department "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",a.dept_name]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Complaint "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",a.complaint]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Zone "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",a.zone_name]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Ward "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",a.ward_name]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Street "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",a.street_name]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Pincode "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",a.pincode]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Complaint Address: "}),e.jsx("p",{className:"col-start-1 col-span-4 mt-2 capitalize",children:a.complaintaddress})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Description: "}),e.jsx("p",{className:"col-start-1 col-span-4 mt-2 capitalize",children:a.complaint_details})]}),b&&b.length>0&&e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Attachment Files "}),e.jsx("div",{className:"col-start-1 col-span-4 mt-2 text-xs  ",children:b.map((s,t)=>e.jsx("button",{className:" mx-1 my-1 px-3 py-1.5 bg-gray-500 rounded-full text-white",onClick:()=>{F(!0),B(s.attachment),f("new-grievance-attachment")},children:`Attachment ${t+1}`},t))})]})]})]}),e.jsxs("div",{className:"md:col-span-6 col-span-12 border px-1 py-3 rounded ",children:[e.jsx("p",{className:"pt-2 text-lg ",children:"Similar Request"}),e.jsx("hr",{className:"my-3 w-full"}),e.jsx("div",{className:"overflow-auto no-scrollbar",onClick:()=>L(!0),children:e.jsxs("table",{className:"w-full bg-gray-200 rounded  ",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"items-center mx-3 py-2 font-lexend whitespace-nowrap",children:"Date/Time"}),e.jsx("th",{className:"items-center mx-3 py-2 font-lexend whitespace-nowrap",children:"Complaint No"}),e.jsx("th",{className:"items-center mx-3 py-2 font-lexend whitespace-nowrap",children:"Status"})]})}),e.jsx("tbody",{className:"divide-y divide-gray-300",children:r&&r.length>0?r.map((s,t)=>e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("td",{className:"text-center mx-3 py-2.5 whitespace-nowrap",children:P(s.createdAt)}),e.jsx("td",{className:"text-center mx-3 py-2.5 whitespace-nowrap",children:s.grievance_id}),e.jsx("td",{className:"text-center mx-3 py-2.5 text-green-600 whitespace-nowrap capitalize",children:s.status})]},t)):e.jsx("tr",{children:e.jsx("td",{className:"text-center py-2.5",colSpan:"3",children:"No matching data found"})})})]})})]})]}),e.jsxs("div",{className:"grid grid-cols-12 gap-2 mx-3 my-3",children:[e.jsxs("div",{className:"md:col-span-6 col-span-12 border px-2 py-3 rounded mt-8",children:[e.jsx("div",{className:"flex justify-between items-center",children:e.jsx("p",{className:"mx-3",children:"Replay"})}),e.jsx("hr",{className:"my-3 w-full"}),e.jsxs("form",{onSubmit:Q(M),children:[e.jsx("textarea",{id:"worksheet_id",rows:"11",className:" w-full col-span-6 outline-none",placeholder:"Type....",...Z("worksheet_name")}),e.jsxs("div",{className:" md:mt-12",children:[e.jsx("input",{type:"file",id:"file",multiple:!0,accept:".jpeg, .jpg, .png",className:" py-2 px-3   outline-none",onChange:ae}),e.jsx("div",{className:"flex justify-end mx-3 mt-3",children:e.jsx("button",{type:"submit",className:" text-white bg-gray-800 text-sm font-lexend rounded-full px-3 py-1.5 ",children:"submit"})})]})]})]}),e.jsxs("div",{className:"md:col-span-6 col-span-12",children:[e.jsx("p",{className:"mb-2 mx-1 text-lg",children:"Complaint History"}),e.jsx("div",{className:"bg-gray-100 py-3 h-[530px]",children:e.jsxs("div",{className:"mx-8 ",children:[e.jsxs("p",{className:"py-3 font-semibold",children:["Complaint No ",a.grievance_id]}),e.jsxs("div",{className:"h-[380px]  overflow-x-auto no-scrollbar mb-3",children:[R&&R.slice().reverse().map((s,t)=>e.jsxs("div",{children:[e.jsx("p",{className:"py-1",children:new Date(s.createdAt).toLocaleDateString()}),e.jsxs("div",{className:"grid grid-cols-3 divide-x-2 divide-black",children:[e.jsx("p",{children:new Date(s.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!0})}),e.jsx("p",{className:"pl-5 col-span-2",children:s.log_details})]}),e.jsx("br",{})]},t)),e.jsx("p",{className:"py-2",children:new Date(a.createdAt).toLocaleDateString()}),e.jsxs("div",{className:"grid grid-cols-3 divide-x-2 divide-black",children:[e.jsx("p",{children:new Date(a.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!0})}),e.jsxs("p",{className:"pl-5 col-span-2",children:[" ","Assigned To Particular ",a.dept_name," Department"]})]}),e.jsx("br",{}),e.jsxs("div",{className:"grid grid-cols-3 divide-x-2 divide-black",children:[e.jsx("p",{children:new Date(a.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!0})}),e.jsxs("p",{className:"pl-5 col-span-2",children:["Ticket Raised- ",a.grievance_id]})]}),e.jsx("br",{}),_&&_.length>0&&e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Attachment Files "}),e.jsx("div",{className:"col-start-1 col-span-4 mt-2 text-xs  ",children:_.map((s,t)=>e.jsx("button",{className:" mx-1 my-1 px-3 py-1.5 bg-gray-500 rounded-full text-white",onClick:()=>{F(!0),B(s.attachment),f("grievance-worksheet-attachment")},children:`Attachment ${t+1}`},t))})]})]}),e.jsx("hr",{className:"my-3"}),e.jsxs("div",{className:"md:grid md:grid-cols-3 flex border-2 ",children:[e.jsx("p",{className:"text-center px-3 py-1.5",children:"Status"}),e.jsx("p",{className:"text-center w-full bg-gray-800 md:col-span-2 text-white py-1.5",children:a.status})]})]})})]})]})]})]})}),I&&e.jsx(he,{endpoint:q,toggleModal:X,attachmentFile:O}),T&&e.jsx(ge,{matchData:r,togglSeModal:Y,dataStatus:S,worksheet:J}),H&&e.jsx(xe,{matchData:r,togglReModal:ee})]})};export{_e as default};
