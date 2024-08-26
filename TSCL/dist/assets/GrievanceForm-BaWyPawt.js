import{c as F,a as r,k as J,i as K,r as d,m as L,n as Q,p as X,q as Y,s as ee,t as te,v as p,u as le,j as e,o as se,b,A as g,d as ae,B as u}from"./index-Ck5knsAu.js";const re=F().shape({public_user_name:r().required("Name is required"),phone:r().required("Contact number is required").matches(/^[0-9]{10}$/,"Contact number must be 10 digits"),email:r().required("Email id is required").email("Invalid email format"),address:r().required("Address is required")}),ne=F().shape({grievance_mode:r().required("Origin is required"),complaint_type_title:r().required("Complaint  is required"),dept_name:r().required("Department is required"),zone_name:r().required("Zone is required"),ward_name:r().required("Ward is required"),street_name:r().required("Street is required"),pincode:r().required("Pincode is required").matches(/^[0-9]{6}$/,"Pincode must be 6 digits"),complaint:r().required("Complaint Type is required"),complaint_details:r().required("Description is required")}),ie=F().shape({...re.fields,...ne.fields}).required(),oe=()=>{const m=J(),B=K(),[i,y]=d.useState(null),[q,C]=d.useState([]),[D,z]=d.useState([]),[A,V]=d.useState([]),[h,W]=d.useState([]),$=sessionStorage.getItem("token");d.useEffect(()=>{m(L()),m(Q()),m(X()),m(Y()),m(ee()),m(te())},[m]);const E=p(t=>t.department),N=p(t=>t.complaint),P=p(t=>t.zone),I=p(t=>t.ward),G=p(t=>t.street),T=p(t=>t.complainttype),{register:a,formState:{errors:l},handleSubmit:M,reset:O,setValue:n,watch:_}=le({resolver:se(ie),mode:"onBlur"}),j=_("phone"),v=_("zone_name"),w=_("ward_name"),k=_("dept_name");d.useEffect(()=>{if(k){const t=N.data.filter(s=>s.dept_name===k);V(t),n("complaint_type_title","")}else V([])},[k,N.data]),d.useEffect(()=>{if(v){const t=I.data.filter(s=>s.zone_name===v);C(t),n("ward_name",""),n("street_name","")}else C([])},[v,I.data]),d.useEffect(()=>{if(w){const t=G.data.filter(s=>s.ward_name===w);z(t),n("street_name","")}else z([])},[w,G.data]),d.useEffect(()=>{if(j&&j.length===10){async function t(){try{const s=await b.get(`${g}/public-user/getbyphone?phone=${j}`,{headers:{Authorization:`Bearer ${$}`}}),c=ae(s.data.data);n("public_user_name",c.public_user_name),n("email",c.email),n("address",c.address),n("pincode",c.pincode),y(c)}catch{y(null)}}t()}else n("public_user_name",""),n("email",""),n("address",""),n("pincode",""),y(null)},[j]);const R=t=>{const s=t.target.files;s.length>5?(u.error("Maximum 5 files allowed"),t.target.value=null):W(s)},U=async t=>{const s={public_user_name:t.public_user_name,phone:t.phone,email:t.email,address:t.address,pincode:t.pincode,login_password:"tscl@123",verification_status:"active",user_status:"active"},Z=x=>{const f=N.data.find(o=>o.complaint_type_title===x);return f?f.priority:null};let c;i?(await b.post(`${g}/public-user/post`,s),c=i.public_user_id):c=(await b.post(`${g}/public-user/post`,s)).data.data.public_user_id;const H={grievance_mode:t.grievance_mode,complaint_type_title:t.complaint_type_title,dept_name:t.dept_name,zone_name:t.zone_name,ward_name:t.ward_name,street_name:t.street_name,pincode:t.pincode,complaint:t.complaint,complaint_details:t.complaint_details,public_user_id:c,public_user_name:t.public_user_name,phone:t.phone,status:"new",statusflow:"new",priority:Z(t.complaint_type_title)};try{const x=await b.post(`${g}/new-grievance/post`,H,{headers:{Authorization:`Bearer ${$}`}}),f=await x.data.data;if(x.status===200&&u.success("Grievance created Successfully"),h.length>0)if(h.length>5)u.error("File limit exceeded. Maximum 5 files allowed.");else try{const o=new FormData;for(let S=0;S<h.length;S++)o.append("files",h[S]);o.append("grievance_id",f),o.append("created_by_user","admin"),(await b.post(`${g}/new-grievance-attachment/post`,o,{headers:{"Content-Type":"multipart/form-data"}})).status===200&&(W([]),u.success("Attachment created Successfully"))}catch(o){console.error(o),u.error("Error creating attachment")}O(),B("/view",{state:{grievanceId:f}})}catch(x){console.log(x),u.error("An error occurred during submission. Please try again.")}};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"bg-blue-100 flex flex-col  md:px-8 px-3 text-start h-fit   font-lexend overflow-y-auto no-scrollbar",children:[e.jsx("h1",{className:"text-xl my-5",children:"Grievance Form"}),e.jsxs("div",{className:"  bg-white max-w-[592px] h-fit rounded-lg ",children:[e.jsx("div",{className:"border-b-2 border-search",children:e.jsx("h1",{className:" text-xl px-3 py-3",children:"Request by"})}),e.jsxs("form",{onSubmit:M(U),children:[e.jsxs("div",{className:"flex flex-col flex-wrap overflow-hidden my-5 gap-2",children:[e.jsxs("div",{className:"flex flex-col md:flex-row  md:justify-between font-normal mx-10",children:[e.jsx("label",{className:"block text-black text-lg font-medium mb-2",htmlFor:"phone",children:"Contact Number"}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"text",id:"phone",className:"w-full md:w-80 text-start border-2  rounded-lg ml-2 px-2 py-2 outline-none",placeholder:"Phone Number",...a("phone")}),l.phone&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:l.phone.message})]})]}),e.jsxs("div",{className:"flex flex-col md:flex-row  md:justify-between font-normal mx-10",children:[e.jsx("label",{className:"block text-black text-lg font-medium mb-2",htmlFor:"public_user_name",children:"Name"}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"text",id:"public_user_name",className:"w-full md:w-80 text-start border-2  rounded-lg ml-2 px-2 py-2 outline-none",placeholder:"User Name",...a("public_user_name"),defaultValue:i?i.public_user_name:""}),l.public_user_name&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:l.public_user_name.message})]})]}),e.jsxs("div",{className:"flex flex-col md:flex-row  md:justify-between font-normal mx-10",children:[e.jsx("label",{className:"block text-black text-lg font-medium mb-2",htmlFor:"email",children:"Email id"}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"email",id:"email",className:"w-full md:w-80 text-start border-2  rounded-lg ml-2 px-2 py-2 outline-none",placeholder:"abc@gmail.com",...a("email"),defaultValue:i?i.email:""}),l.email&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:l.email.message})]})]}),e.jsxs("div",{className:"flex flex-col md:flex-row  md:justify-between font-normal mx-10",children:[e.jsx("label",{className:"block text-black text-lg font-medium mb-2 py-2",htmlFor:"address",children:"Address"}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"text",id:"address",className:"w-full md:w-80 text-start border-2  rounded-lg ml-2 px-2 py-2 outline-none",placeholder:"Enter your Address",...a("address"),defaultValue:i?i.address:""}),l.address&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:l.address.message})]})]})]}),e.jsxs("div",{className:" flex-col justify-center items-center max-w-[592px] bg-white h-fit rounded-lg mt-5",children:[e.jsx("div",{className:"border-b-2 border-search",children:e.jsx("h1",{className:" text-xl px-3 py-3",children:"Grievance Details"})}),e.jsxs("div",{className:"flex flex-col flex-wrap overflow-y-auto my-5 gap-2 no-scrollbar",children:[e.jsxs("div",{className:"flex flex-col md:grid md:grid-cols-3  font-normal mx-10  ",children:[e.jsx("label",{className:"block text-black text-lg font-medium mb-2 md:col-span-1",htmlFor:"grievance_mode",children:"Origin"}),e.jsxs("div",{className:" md:col-span-2",children:[e.jsxs("select",{className:"block w-full  px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none",defaultValue:"",...a("grievance_mode"),children:[e.jsx("option",{value:"",disabled:!0,children:"Select an Origin"}),e.jsx("option",{value:"Whatsapp",children:"Whatsapp"}),e.jsx("option",{value:"Call",children:"Call"}),e.jsx("option",{value:"Website",children:"Website"})]}),l.grievance_mode&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:l.grievance_mode.message})]})]}),e.jsxs("div",{className:"flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ",children:[e.jsx("label",{className:"block text-black text-lg font-medium mb-2 md:col-span-1",htmlFor:"complaint",children:"Complaint Type"}),e.jsxs("div",{className:" md:col-span-2",children:[e.jsxs("select",{className:"block w-full   px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none",defaultValue:"",...a("complaint"),children:[e.jsx("option",{value:"",disabled:!0,children:"Select a Complaint Type"}),T.data&&T.data.map(t=>e.jsx("option",{value:t.complaint_type,children:t.complaint_type},t.compliant_type_id))]}),l.complaint&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:l.complaint.message})]})]}),e.jsxs("div",{className:"flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ",children:[e.jsx("label",{className:"block text-black text-lg font-medium mb-2 md:col-span-1",htmlFor:"dept_name",children:"Department"}),e.jsxs("div",{className:"md:col-span-2",children:[e.jsxs("select",{className:"block w-full  px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none",defaultValue:"",...a("dept_name"),children:[e.jsx("option",{value:"",disabled:!0,children:"Select a Department"}),E.data&&E.data.map(t=>e.jsx("option",{value:t.dept_name,children:t.dept_name},t.dept_id))]}),l.dept_name&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:l.dept_name.message})]})]}),e.jsxs("div",{className:"flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ",children:[e.jsx("label",{className:"block text-black text-lg font-medium mb-2 md:col-span-1",htmlFor:"complaint_type_title",children:"Complaint"}),e.jsxs("div",{className:" md:col-span-2",children:[e.jsxs("select",{className:"block w-full   px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none",defaultValue:"",...a("complaint_type_title"),children:[e.jsx("option",{value:"",disabled:!0,children:"Select a Complaint"}),A&&A.map(t=>e.jsx("option",{value:t.complaint_type_title,children:t.complaint_type_title},t.complaint_id))]}),l.complaint_type_title&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:l.complaint_type_title.message})]})]}),e.jsxs("div",{className:"flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ",children:[e.jsx("label",{className:"block text-black text-lg font-medium mb-2 md:col-span-1",htmlFor:"zone_name",children:"Zone"}),e.jsxs("div",{className:"md:col-span-2",children:[e.jsxs("select",{className:"block w-full  px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none",defaultValue:"",...a("zone_name"),children:[e.jsx("option",{value:"",disabled:!0,children:"Select a Zone"}),P.data&&P.data.map(t=>e.jsx("option",{value:t.zone_name,children:t.zone_name},t.zone_id))]}),l.zone_name&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:l.zone_name.message})]})]}),e.jsxs("div",{className:"flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ",children:[e.jsx("label",{className:"block text-black text-lg font-medium mb-2 md:col-span-1",htmlFor:"ward_name",children:"Ward"}),e.jsxs("div",{className:" md:col-span-2",children:[e.jsxs("select",{className:"block w-full  px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none",defaultValue:"",...a("ward_name"),children:[e.jsx("option",{value:"",disabled:!0,children:"Select a Ward"}),q&&q.map(t=>e.jsx("option",{value:t.ward_name,children:t.ward_name},t.ward_id))]}),l.ward_name&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:l.ward_name.message})]})]}),e.jsxs("div",{className:"flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ",children:[e.jsx("label",{className:"block text-black text-lg font-medium mb-2 md:col-span-1",htmlFor:"street_name",children:"Street"}),e.jsxs("div",{className:"md:col-span-2",children:[e.jsxs("select",{className:"block w-full  px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none",defaultValue:"",...a("street_name"),children:[e.jsx("option",{value:"",disabled:!0,children:"Select a Street"}),D&&D.map(t=>e.jsx("option",{value:t.street_name,children:t.street_name},t.street_id))]}),l.street_name&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:l.street_name.message})]})]}),e.jsxs("div",{className:"gflex flex-col md:grid md:grid-cols-3   font-normal mx-10",children:[e.jsx("label",{className:"block text-black text-lg font-medium mb-2 md:col-span-1",htmlFor:"pincode",children:"Pincode"}),e.jsxs("div",{className:"flex flex-col md:col-span-2",children:[e.jsx("input",{type:"text",id:"pincode",className:"w-full text-start border-2  rounded-lg  px-2 py-2 outline-none",placeholder:"Pincode",...a("pincode"),defaultValue:i?i.pincode:""}),l.pincode&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:l.pincode.message})]})]}),e.jsxs("div",{className:" flex flex-col md:grid md:grid-cols-3   font-normal mx-10 ",children:[e.jsx("label",{className:"block text-black text-lg  font-medium mb-2 md:col-span-1",htmlFor:"complaint_details",children:"Description"}),e.jsxs("div",{className:"flex flex-col md:col-span-2",children:[e.jsx("textarea",{id:"complaint_details",rows:"5",className:"block  py-2.5 pl-3  w-full  text-sm text-gray-900 rounded border border-gray-300 focus:outline-none focus:shadow-outline mb-2",placeholder:"Description here...",...a("complaint_details")}),l.complaint_details&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 ",children:l.complaint_details.message})]})]}),e.jsxs("div",{className:" flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ",children:[e.jsxs("label",{className:"block text-black text-lg  font-medium mb-2 md:col-span-1",htmlFor:"file",children:["Attachment ",e.jsxs("p",{className:"text-xs ",children:["(optional / ",e.jsx("br",{})," upto 5 files allowed)"]})]}),e.jsxs("div",{className:"flex flex-col md:col-span-2",children:[e.jsx("input",{type:"file",id:"file",multiple:!0,className:" w-full py-2 px-2 rounded-lg outline-none",onChange:R}),h.length>=5&&e.jsx("p",{className:"text-red-500 text-sm",children:"Maximum 5 files allowed"})]})]})]}),e.jsx("div",{className:" text-center my-3",children:e.jsx("button",{type:"submit",className:" text-white bg-primary text-base font-lexend rounded-full px-4 py-1.5 ",children:"Submit"})})]})]})]})]})})};export{oe as default};
