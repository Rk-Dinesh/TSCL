import{i as Z,k as q,r as n,u as J,l as K,o as Q,b as o,A as d,d as x,j as e,B as k,H as ce,t as ie}from"./index-Bcq-xcbe.js";import{V as le}from"./ViewAttachment-BP9cdpur.js";const oe=Z().shape({dept_name:q().test("not-select","Please select an Department",s=>s!==""&&s!=="Select  Department"),complaint:q().test("not-select","Please select an complaint",s=>s!==""&&s!=="Select  complaint")}),de=s=>{const b=sessionStorage.getItem("token"),[y,A]=n.useState([]),[h,z]=n.useState([]),[T,w]=n.useState([]),_=J(),{register:D,formState:{errors:g},handleSubmit:F,watch:S}=K({resolver:Q(oe),mode:"all"});n.useEffect(()=>{C(),E()},[]);const C=async()=>{try{const a=await o.get(`${d}/department/getactive`,{headers:{Authorization:`Bearer ${b}`}}),m=x(a.data.data);A(m)}catch(a){console.error("Error fetching existing Department:",a)}},E=async()=>{try{const a=await o.get(`${d}/complaint/getactive`,{headers:{Authorization:`Bearer ${b}`}}),m=x(a.data.data);z(m)}catch(a){console.error("Error fetching existing Department:",a)}},$=a=>{if(a){const m=a.target.value,l=h==null?void 0:h.filter(f=>f.dept_name===m);w(l)}else setFilteredWards([])},B=async a=>{const m={...a};try{const l=sessionStorage.getItem("token"),f=await o.post(`${d}/new-grievance/tickettransfer?grievance_id=${s.transerId}`,m,{headers:{Authorization:`Bearer ${l}`}});if(f.status===200){k.success("Ticket Transfered Successfully"),s.toggleTModal(),_("/requestview2");const u=await o.post(`${d}/grievance-log/post`,{grievance_id:s.transerId,log_details:`Ticket from ${s.transferDept[0]} ${s.transferDept[1]} complaint is transfered to ${a.dept_name} ${a.complaint} complaint`,created_by_user:"admin"},{headers:{Authorization:`Bearer ${l}`}})}else console.error("Error in posting data",f),k.error("Failed to Upload")}catch(l){console.error("Error in posting data",l)}};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ",children:e.jsxs("div",{className:"bg-white  h-fit  font-lexend m-2 rounded-sm w-[500px]",children:[e.jsx("div",{className:"border-b-2 border-gray-300 mx-6",children:e.jsx("h1",{className:"text-xl font-medium pt-6 ",children:"Ticket Transfer"})}),e.jsx("form",{onSubmit:F(B),children:e.jsxs("div",{className:"  py-2 mx-6 my-3 gap-5 ",children:[e.jsxs("div",{className:"mb-3 flex items-baseline gap-3",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-3 w-2/6",htmlFor:"dept_name",children:"Department"}),e.jsxs("select",{className:"appearance-none border rounded-lg w-4/6 py-1.5 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"dept_name",...D("dept_name"),onChange:$,children:[e.jsx("option",{value:"",children:"Select Department"}),y.map(a=>e.jsx("option",{value:a.dept_name,children:a.dept_name},a.dept_id))]})]}),g.dept_name&&e.jsx("p",{className:"text-red-500 text-end text-sm mb-2 -mt-2",children:g.dept_name.message}),e.jsxs("div",{className:"mb-3 flex items-baseline gap-3",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-3 w-2/6",htmlFor:"complaint",children:"Complaint Type"}),e.jsxs("select",{className:"appearance-none border rounded-lg w-4/6 py-1.5 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"complaint",...D("complaint"),children:[e.jsx("option",{value:"",children:"Select complaint"}),T.map(a=>e.jsx("option",{value:a.complaint_type_title,children:a.complaint_type_title},a.complaint_id))]})]}),g.complaint&&e.jsx("p",{className:"text-red-500 text-end text-sm mb-2 -mt-2",children:g.complaint.message}),e.jsxs("div",{className:"flex justify-end py-3 mx-10 my-3 gap-5",children:[e.jsx("div",{className:"border border-primary text-primary bg-none font-lexend rounded-3xl px-5 py-1.5",onClick:s.toggleTModal,children:"Cancel"}),e.jsx("button",{className:"text-white bg-primary font-lexend rounded-3xl px-5 py-1.5",children:"Transfer"})]})]})})]})})},me=Z().shape({assign_username:q().required(" required ")}),ue=()=>{var G,O;const[s,b]=n.useState(null),[y,A]=n.useState(null),[h,z]=n.useState(null),[T,w]=n.useState(null),[_,D]=n.useState([]),[g,F]=n.useState([]),[S,C]=n.useState([]),[E,$]=n.useState(null),[B,a]=n.useState(null),[m,l]=n.useState(!0),[f,u]=n.useState(null),P=ce(),j=(G=P.state)==null?void 0:G.grievanceId,X=(O=P.state)==null?void 0:O.deptName,p=sessionStorage.getItem("token"),[W,I]=n.useState(!1),[R,V]=n.useState(!1),[Y,L]=n.useState(null),ee=J(),{register:se,formState:{errors:H},handleSubmit:ae,watch:pe}=K({resolver:Q(me),mode:"all"});n.useEffect(()=>{const t=async()=>{try{const r=await o.get(`${d}/new-grievance/getbyid?grievance_id=${j}`,{headers:{Authorization:`Bearer ${p}`}}),c=x(r.data.data);b(c);const N=await o.get(`${d}/new-grievance/filter?zone_name=${c.zone_name}&ward_name=${c.ward_name}&street_name=${c.street_name}&dept_name=${c.dept_name}&complaint=${c.complaint}`,{headers:{Authorization:`Bearer ${p}`}});C(x(N.data.data))}catch(r){u(r)}finally{l(!1)}},i=async()=>{try{const r=await o.get(`${d}/user/getbydept?dept_name=${X}`,{headers:{Authorization:`Bearer ${p}`}}),c=x(r.data.data);D(c)}catch(r){u(r)}finally{l(!1)}},v=async()=>{try{const r=await o.get(`${d}/new-grievance-attachment/getattachments?grievance_id=${j}`,{headers:{Authorization:`Bearer ${p}`}}),c=x(r.data.data);A(c)}catch(r){u(r)}finally{l(!1)}},M=async()=>{try{const r=await o.get(`${d}/grievance-log/getbyid?grievance_id=${j}`,{headers:{Authorization:`Bearer ${p}`}}),c=x(r.data.data);F(c)}catch(r){u(r)}finally{l(!1)}},U=async()=>{try{const r=await o.get(`${d}/grievance-worksheet-attachment/getattachments?grievance_id=${j}`,{headers:{Authorization:`Bearer ${p}`}}),c=x(r.data.data);z(c)}catch(r){u(r)}finally{l(!1)}};t(),i(),v(),M(),U()},[]);const te=()=>{I(!W),L(null)},re=()=>{V(!R),$(null),a(null)},ne=async t=>{const i=event.target.querySelector("select"),v=i.options[i.selectedIndex],M=v.getAttribute("data-user-id"),U=v.getAttribute("data-user-phone"),r=v.getAttribute("data-user-name"),c={...t,assign_user:M,assign_userphone:U};try{const N=await o.post(`${d}/new-grievance/updateassign?grievance_id=${j}`,c,{headers:{Authorization:`Bearer ${p}`}});if(N.status===200){k.success("Work Assigned Successfully"),ee("/requestview2");const xe=await o.post(`${d}/grievance-log/post`,{grievance_id:j,log_details:`Work Assigned to ${r}`,created_by_user:"admin"},{headers:{Authorization:`Bearer ${p}`}})}else console.error("Error in posting data",N),k.error("Failed to Upload")}catch(N){console.error("Error in posting data",N)}};return e.jsxs(n.Fragment,{children:[e.jsx("div",{className:"h-screen overflow-y-auto no-scrollbar",children:s&&s.grievance_id&&e.jsxs("div",{className:"md:mx-6 mx-2  my-5 font-lexend",children:[e.jsxs("div",{className:"flex gap-1 justify-between flex-wrap items-center",children:[e.jsxs("p",{children:["Complaint Details #",s.grievance_id]}),e.jsx("button",{className:"bg-primary rounded-full px-3 py-1.5 text-white text-sm mr-3",onClick:()=>{V(!0),$(s.grievance_id),a([s.dept_name,s.complaint])},children:"Ticket Transfer"})]}),e.jsxs("div",{className:"bg-white mt-2 pb-3",children:[e.jsx("p",{className:"px-5 py-2 text-lg",children:"Request By :"}),e.jsxs("div",{className:"md:grid md:grid-cols-12 grid grid-cols-12 items-center gap-6 mx-3 my-3",children:[e.jsxs("div",{className:"md:col-span-3 col-span-6 flex-col-2 px-5 pb-3",children:[e.jsx("p",{className:"capitalize",children:s.public_user_name}),e.jsxs("p",{children:["+91 ",s.phone]})," "]}),e.jsxs("div",{className:"md:col-span-3 col-span-6 ",children:[e.jsxs("div",{className:"flex gap-3 mb-2  items-center",children:[e.jsx("p",{children:"Status: "}),e.jsx("span",{className:" ml-1 text-sm border border-gray-500 w-28 py-1 text-center rounded-full capitalize",children:s.status})]}),e.jsxs("div",{className:"flex gap-1 items-center",children:[e.jsx("p",{className:"-ml-2",children:"Priority : "}),e.jsx("span",{className:`border w-28 rounded-full text-center py-1.5 mx-2 text-sm font-normal capitalize text-white  ${s.priority==="High"?"bg-red-500":s.priority==="Medium"?"bg-sky-500":s.priority==="Low"?"bg-green-500":""}`,children:s.priority})]})]}),e.jsx("form",{onSubmit:ae(ne),children:e.jsxs("div",{className:" flex gap-4 items-center",children:[e.jsx("div",{className:"md:col-span-4 col-span-6",children:e.jsxs("select",{className:"col-span-2 block px-6 py-1.5 text-sm text-black border rounded-lg border-gray-500 outline-none capitalize",defaultValue:"",...se("assign_username"),children:[e.jsx("option",{value:s.assign_username?s.assign_username:"",hidden:!0,children:s.assign_username?s.assign_username:"Assign User"}),_&&_.map(t=>e.jsx("option",{value:t.user_name,"data-user-id":t.user_id,"data-user-phone":t.phone,"data-user-name":t.user_name,children:t.user_name},t.user_name))]})}),e.jsx("div",{className:"md:col-span-2 col-span-6",children:e.jsx("button",{className:"bg-primary px-4 py-1.5 text-sm text-white rounded-full",children:"Submit"})}),H.assign_username&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:H.assign_username.message})]})})]}),e.jsx("hr",{}),e.jsxs("div",{className:"grid grid-cols-12 gap-2 mx-3 my-4",children:[e.jsxs("div",{className:"md:col-span-6 col-span-12 border px-2 py-3 rounded",children:[e.jsx("p",{className:"pt-2 text-lg",children:"Grievance Details"}),e.jsx("hr",{className:"my-3"}),e.jsxs("div",{className:"flex flex-col gap-3 mx-2 text-base",children:[e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Origin "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",s.grievance_mode]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Complaint Type "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",s.complaint_type_title]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Department "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",s.dept_name]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Complaint "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",s.complaint]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Zone "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",s.zone_name]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Ward "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",s.ward_name]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Street "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",s.street_name]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Pincode "}),e.jsxs("p",{className:"col-span-2 capitalize",children:[": ",s.pincode]})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Description: "}),e.jsx("p",{className:"col-start-1 col-span-4 mt-2 capitalize",children:s.complaint_details})]}),y&&y.length>0&&e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Attachment Files "}),e.jsx("div",{className:"col-start-1 col-span-4 mt-2 text-xs  ",children:y.map((t,i)=>e.jsx("button",{className:" mx-1 my-1 px-3 py-1.5 bg-gray-500 rounded-full text-white",onClick:()=>{I(!0),L(t.attachment),w("new-grievance-attachment")},children:`Attachment ${i+1}`},i))})]})]})]}),e.jsxs("div",{className:"md:col-span-6 col-span-12 border px-2 py-3 rounded ",children:[e.jsx("p",{className:"pt-2 text-lg ",children:"Similar Request"}),e.jsx("hr",{className:"my-3 w-full"}),e.jsx("div",{className:"overflow-auto no-scrollbar",children:e.jsxs("table",{className:"w-full bg-gray-200 rounded ",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"items-center mx-3 py-2 font-lexend whitespace-nowrap",children:"Date/Time"}),e.jsx("th",{className:"items-center mx-3 py-2 font-lexend whitespace-nowrap",children:"Complaint No"}),e.jsx("th",{className:"items-center mx-3 py-2 font-lexend whitespace-nowrap",children:"Status"})]})}),e.jsx("tbody",{className:"divide-y divide-gray-300",children:S&&S.length>0?S.map((t,i)=>e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("td",{className:"text-center mx-3 py-2.5 whitespace-nowrap",children:ie(t.createdAt)}),e.jsx("td",{className:"text-center mx-3 py-2.5 whitespace-nowrap",children:t.grievance_id}),e.jsx("td",{className:"text-center mx-3 py-2.5 text-green-600 whitespace-nowrap capitalize",children:t.status})]},i)):e.jsx("tr",{children:e.jsx("td",{className:"text-center py-2.5",colSpan:"3",children:"No matching data found"})})})]})})]})]}),e.jsxs("div",{className:"mx-3 my-3 ",children:[e.jsx("p",{className:"mb-2 mx-1 text-lg",children:"Complaint History"}),e.jsx("div",{className:"bg-gray-100 py-3 h-[530px]",children:e.jsxs("div",{className:"mx-8 ",children:[e.jsxs("p",{className:"py-3 font-semibold",children:["Complaint No ",s.grievance_id]}),e.jsxs("div",{className:"h-[380px]  overflow-x-auto no-scrollbar mb-3",children:[g&&g.slice().reverse().map((t,i)=>e.jsxs("div",{children:[e.jsx("p",{className:"py-1",children:new Date(t.createdAt).toLocaleDateString()}),e.jsxs("div",{className:"grid grid-cols-3 divide-x-2 divide-black",children:[e.jsx("p",{children:new Date(t.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!0})}),e.jsx("p",{className:"pl-5 col-span-2",children:t.log_details})]}),e.jsx("br",{})]},i)),e.jsx("p",{className:"py-2",children:new Date(s.createdAt).toLocaleDateString()}),e.jsxs("div",{className:"grid grid-cols-3 divide-x-2 divide-black",children:[e.jsx("p",{children:new Date(s.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!0})}),e.jsxs("p",{className:"pl-5 col-span-2",children:[" ","Assigned To Particular Department"]})]}),e.jsx("br",{}),e.jsxs("div",{className:"grid grid-cols-3 divide-x-2 divide-black",children:[e.jsx("p",{children:new Date(s.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!0})}),e.jsxs("p",{className:"pl-5 col-span-2",children:["Ticket Raised- ",s.grievance_id]})]}),e.jsx("br",{}),h&&h.length>0&&e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("p",{className:"col-span-2",children:"Attachment Files "}),e.jsx("div",{className:"col-start-1 col-span-4 mt-2 text-xs  ",children:h.map((t,i)=>e.jsx("button",{className:" mx-1 my-1 px-3 py-1.5 bg-gray-500 rounded-full text-white",onClick:()=>{I(!0),L(t.attachment),w("grievance-worksheet-attachment")},children:`Attachment ${i+1}`},i))})]})]}),e.jsx("hr",{className:"my-3"}),e.jsxs("div",{className:"md:grid md:grid-cols-3 flex border-2 md:mx-20",children:[e.jsx("p",{className:"text-center px-3 py-1.5",children:"Status"}),e.jsx("p",{className:"text-center w-full bg-gray-800 md:col-span-2 text-white py-1.5",children:s.status})]})]})})]})]})]})}),W&&e.jsx(le,{endpoint:T,toggleModal:te,attachmentFile:Y}),R&&e.jsx(de,{toggleTModal:re,transerId:E,transferDept:B})]})};export{ue as default};