import{r as l,j as e,i as V,k as d,l as ce,u as de,n as ie,D as oe,E as me,F as xe,y as pe,p as k,m as ue,b as o,A as m,d as v,H as he,J as fe,o as be,B as _}from"./index-Cb3AN3R3.js";import{G as ge}from"./GrievanceDetailsModal-Ce37D8zL.js";import{F as je}from"./index-BK6gNoz8.js";const Ne=({options:i,register:S,error:F})=>{const[C,n]=l.useState(!1),[f,D]=l.useState(null),A=x=>{D(x),n(!1),S.onChange({target:{name:S.name,value:x.res_name}})};return e.jsxs("div",{className:"relative",children:[e.jsx("button",{type:"button",onClick:()=>n(!C),className:"block w-full px-4 py-3 text-left text-sm text-black bg-gray-50 border border-gray-200 rounded-lg outline-none",children:f?e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("img",{src:f.image,alt:"icon",className:"w-6 h-6"}),f.res_name]}):"Select an Origin"}),C&&e.jsx("div",{className:"absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg",children:i&&(i==null?void 0:i.map((x,q)=>e.jsxs("div",{className:"flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer",onClick:()=>A(x),children:[e.jsx("img",{src:x.image,alt:"icon",className:"w-6 h-6"}),x.res_name]},q)))}),F&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:F.message})]})},ye=V().shape({public_user_name:d().required("Name is required"),phone:d().required("Contact number is required").matches(/^[0-9]{10}$/,"Contact number must be 10 digits"),email:d().required("Email id is required").email("Invalid email format"),address:d().required("Address is required")}),ve=V().shape({grievance_mode:d().required("Origin is required"),complaint_type_title:d().required("Complaint  is required"),dept_name:d().required("Department is required"),ward_name:d().required("Ward is required"),street_name:d().required("Street is required"),pincode:d().required("Pincode is required").matches(/^[0-9]{6}$/,"Pincode must be 6 digits"),complaintaddress:d().required("Complaint Address is required"),complaint:d().required("Complaint Type is required"),complaint_details:d().required("Description is required")}),_e=V().shape({...ye.fields,...ve.fields}).required(),De=()=>{const i=ce(),S=de(),[F,C]=l.useState(!1),[n,f]=l.useState(null);l.useState([]);const[D,A]=l.useState([]),[x,q]=l.useState([]),[H,J]=l.useState([]),[w,O]=l.useState([]);l.useState("");const b=localStorage.getItem("token"),[$,B]=l.useState([]),[K,E]=l.useState(!1),[we,Q]=l.useState(null),[X,Y]=l.useState(null),[Z,M]=l.useState(!1);l.useEffect(()=>{i(ie()),i(oe()),i(me()),i(xe()),i(pe())},[i]);const P=k(t=>t.department);k(t=>t.complaint);const R=k(t=>t.ward),W=k(t=>t.complainttype),T=k(t=>t.origin),{register:c,formState:{errors:a},handleSubmit:ee,reset:te,setValue:r,watch:g}=ue({resolver:be(_e),mode:"onBlur"}),h=g("phone"),I=g("ward_name"),j=g("dept_name"),G=g("complaint_type_title"),se=g("address");l.useEffect(()=>{j?o.get(`${m}/complaint/getdept?dept_name=${j}`,{headers:{Authorization:`Bearer ${b}`}}).then(t=>{try{const s=v(t.data.data);q(s),r("complaint_type_title","")}catch(s){console.error("Error decrypting data:",s)}}).catch(t=>{console.error("Error fetching data:",t)}):q([])},[j]),l.useEffect(()=>{I?o.get(`${m}/street/getward?ward_name=${I}`,{headers:{Authorization:`Bearer ${b}`}}).then(t=>{try{const s=v(t.data.data);A(s),r("street_name","")}catch(s){console.error("Error decrypting data:",s)}}).catch(t=>{console.error("Error fetching data:",t)}):A([])},[I]),l.useEffect(()=>{if(h&&h.length===10){async function t(){try{const s=await o.get(`${m}/public-user/getbyphone?phone=${h}`,{headers:{Authorization:`Bearer ${b}`}}),u=v(s.data.data);r("public_user_name",u.public_user_name),r("email",u.email),r("address",u.address),r("pincode",u.pincode),f(u)}catch{f(null)}}t()}else r("public_user_name",""),r("email",""),r("address",""),r("pincode",""),f(null)},[h]),l.useEffect(()=>{h&&h.length===10?o.get(`${m}/new-grievance/getbyphone?phone=${h}`,{headers:{Authorization:`Bearer ${b}`}}).then(t=>{const s=v(t.data.data);B(s)}).catch(t=>{console.error(t)}):B([])},[h]),l.useEffect(()=>{j&&G&&o.get(`${m}/template/getbyquery?dept_name=${j}&complaint_type=${G}`,{headers:{Authorization:`Bearer ${b}`}}).then(t=>{try{const s=v(t.data.data);J(s),r("complaint_details","")}catch(s){console.error("Error decrypting data:",s)}}).catch(t=>{console.error("Error fetching data:",t)})},[j,G]);const ae=t=>{const s=t.target.files;s.length>5?(_.error("Maximum 5 files allowed"),t.target.value=null):O(s)},le=async t=>{const s={public_user_name:t.public_user_name,phone:t.phone,email:t.email,address:t.address,pincode:t.pincode,login_password:"tscl@123",verification_status:"active",user_status:"active"};let p;if(n)await o.post(`${m}/public-user/post`,s),p=n.public_user_id;else{const N=await o.post(`${m}/public-user/post`,s);p=v(N.data.data)}const u={grievance_mode:t.grievance_mode,complaint_type_title:t.complaint,dept_name:t.dept_name,ward_name:t.ward_name,street_name:t.street_name,pincode:t.pincode,complaintaddress:t.complaintaddress,complaint:t.complaint_type_title,complaint_details:t.complaint_details,public_user_id:p,public_user_name:t.public_user_name,phone:t.phone,operator:localStorage.getItem("name"),operator_id:localStorage.getItem("code")};try{const N=await o.post(`${m}/new-grievance/post`,u,{headers:{Authorization:`Bearer ${b}`}}),U=await N.data.data;if(N.status===200&&_.success("Grievance created Successfully"),w.length>0)if(w.length>5)_.error("File limit exceeded. Maximum 5 files allowed.");else try{const y=new FormData;for(let z=0;z<w.length;z++)y.append("files",w[z]);y.append("grievance_id",U),y.append("created_by_user","admin"),(await o.post(`${m}/new-grievance-attachment/post`,y,{headers:{"Content-Type":"multipart/form-data"}})).status===200&&(O([]),_.success("Attachment created Successfully"))}catch(y){console.error(y),_.error("Error creating attachment")}te(),S(`/view?grievanceId=${U}`)}catch(N){console.log(N),_.error("An error occurred during submission. Please try again.")}},re=async(t,s)=>{try{return(await o.post(`${m}/translate/translate`,{text:t,targetLanguage:s})).data.translatedText}catch(p){return console.error(p),null}},ne=t=>{Q(t),r("complaint_details",t.desc),E(!1)},L=t=>{Y(t),M(!0)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"grid grid-cols-12 gap-3 mx-3  overflow-y-auto no-scrollbar",children:[e.jsxs("div",{className:"bg-blue-100 lg:col-span-6 md:col-span-12 col-span-12   text-start h-fit   font-lexend ",children:[e.jsx("h1",{className:"text-lg my-5",children:"Grievance Form"}),e.jsxs("div",{className:"  bg-white w-full h-fit rounded-lg ",children:[e.jsx("div",{className:"border-b-2 border-search",children:e.jsx("h1",{className:" text-lg font-bold px-3 py-3",children:"Request by"})}),e.jsxs("form",{onSubmit:ee(le),children:[e.jsxs("div",{className:"flex flex-col flex-wrap overflow-hidden my-5 gap-2",children:[e.jsxs("div",{className:"flex flex-col md:flex-row  md:justify-between font-normal mx-10",children:[e.jsx("label",{className:"block text-black text-base font-medium mb-2",htmlFor:"phone",children:"Phone"}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"text",id:"phone",className:"w-full md:w-80 text-start border-2  rounded-lg ml-2 px-2 py-2 outline-none",placeholder:"Phone Number",...c("phone")}),a.phone&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:a.phone.message})]})]}),e.jsxs("div",{className:"flex flex-col md:flex-row  md:justify-between font-normal mx-10",children:[e.jsx("label",{className:"block text-black text-base font-medium mb-2",htmlFor:"public_user_name",children:"Name"}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"text",id:"public_user_name",className:"w-full md:w-80 text-start border-2  rounded-lg ml-2 px-2 py-2 outline-none",placeholder:"User Name",...c("public_user_name"),defaultValue:n?n.public_user_name:""}),a.public_user_name&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:a.public_user_name.message})]})]}),e.jsxs("div",{className:"flex flex-col md:flex-row  md:justify-between font-normal mx-10",children:[e.jsx("label",{className:"block text-black text-base font-medium mb-2",htmlFor:"email",children:"Email id"}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"email",id:"email",className:"w-full md:w-80 text-start border-2  rounded-lg ml-2 px-2 py-2 outline-none",placeholder:"abc@gmail.com",...c("email"),defaultValue:n?n.email:""}),a.email&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:a.email.message})]})]}),e.jsxs("div",{className:"flex flex-col md:flex-row  md:justify-between font-normal mx-10",children:[e.jsx("label",{className:"block text-black text-base font-medium mb-2 py-2",htmlFor:"address",children:"Address"}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"text",id:"address",className:"w-full md:w-80 text-start border-2  rounded-lg ml-2 px-2 py-2 outline-none",placeholder:"Enter your Address",...c("address"),defaultValue:n?n.address:""}),a.address&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:a.address.message})]})]})]}),e.jsxs("div",{className:" flex-col justify-center items-center max-w-[592px] bg-white h-fit rounded-lg mt-5",children:[e.jsx("div",{className:"border-b-2 border-search",children:e.jsx("h1",{className:" text-lg font-bold  px-3 py-3",children:"Grievance Details"})}),e.jsxs("div",{className:"flex flex-col flex-wrap overflow-y-auto my-5 gap-2 no-scrollbar",children:[e.jsxs("div",{className:"flex flex-col md:grid md:grid-cols-3  font-normal mx-10  ",children:[e.jsx("label",{className:"block text-black text-base font-medium mb-2 md:col-span-1",htmlFor:"grievance_mode",children:"Origin"}),e.jsx("div",{className:"md:col-span-2",children:e.jsx(Ne,{options:T==null?void 0:T.data,register:c("grievance_mode"),error:a.grievance_mode})})]}),e.jsxs("div",{className:"flex flex-col md:grid md:grid-cols-3    font-normal mx-10 gap-1 ",children:[e.jsx("label",{className:"block text-black text-base font-medium mb-2 md:col-span-1",htmlFor:"complaint",children:"Complaint Type"}),e.jsxs("div",{className:" md:col-span-2",children:[e.jsxs("select",{className:"block w-full   px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none",defaultValue:"",...c("complaint"),children:[e.jsx("option",{value:"",disabled:!0,children:"Select a Complaint Type"}),W.data&&W.data.map((t,s)=>e.jsx("option",{value:t.complaint_type,children:t.complaint_type},s))]}),a.complaint&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:a.complaint.message})]})]}),e.jsxs("div",{className:"flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ",children:[e.jsx("label",{className:"block text-black text-base font-medium mb-2 md:col-span-1",htmlFor:"dept_name",children:"Department"}),e.jsxs("div",{className:"md:col-span-2",children:[e.jsxs("select",{className:"block w-full  px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none",defaultValue:"",...c("dept_name"),children:[e.jsx("option",{value:"",disabled:!0,children:"Select a Department"}),P.data&&P.data.map((t,s)=>e.jsx("option",{value:t.dept_name,children:t.dept_name},s))]}),a.dept_name&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:a.dept_name.message})]})]}),e.jsxs("div",{className:"flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ",children:[e.jsx("label",{className:"block text-black text-base font-medium mb-2 md:col-span-1",htmlFor:"complaint_type_title",children:"Complaint"}),e.jsxs("div",{className:" md:col-span-2",children:[e.jsxs("select",{className:"block w-full   px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none",defaultValue:"",...c("complaint_type_title"),children:[e.jsx("option",{value:"",disabled:!0,children:"Select a Complaint"}),x&&x.map((t,s)=>e.jsx("option",{value:t.complaint_type_title,children:t.complaint_type_title},s))]}),a.complaint_type_title&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:a.complaint_type_title.message})]})]}),e.jsxs("div",{className:"flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ",children:[e.jsx("label",{className:"block text-black text-base font-medium mb-2 md:col-span-1",htmlFor:"ward_name",children:"Ward"}),e.jsxs("div",{className:" md:col-span-2",children:[e.jsxs("select",{className:"block w-full  px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none",defaultValue:"",...c("ward_name"),children:[e.jsx("option",{value:"",disabled:!0,children:"Select a Ward"}),R.data&&R.data.map((t,s)=>e.jsx("option",{value:t.ward_name,children:t.ward_name},s))]}),a.ward_name&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:a.ward_name.message})]})]}),e.jsxs("div",{className:"flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ",children:[e.jsx("label",{className:"block text-black text-base font-medium mb-2 md:col-span-1",htmlFor:"street_name",children:"Street"}),e.jsxs("div",{className:"md:col-span-2",children:[e.jsxs("select",{className:"block w-full  px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none",defaultValue:"",...c("street_name"),children:[e.jsx("option",{value:"",disabled:!0,children:"Select a Street"}),D&&D.map((t,s)=>e.jsx("option",{value:t.street_name,children:t.street_name},s))]}),a.street_name&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:a.street_name.message})]})]}),e.jsxs("div",{className:"gflex flex-col md:grid md:grid-cols-3   font-normal mx-10",children:[e.jsx("label",{className:"block text-black text-base font-medium mb-2 md:col-span-1",htmlFor:"pincode",children:"Pincode"}),e.jsxs("div",{className:"flex flex-col md:col-span-2",children:[e.jsx("input",{type:"text",id:"pincode",className:"w-full text-start border-2  rounded-lg  px-2 py-2 outline-none",placeholder:"Pincode",...c("pincode"),defaultValue:n?n.pincode:""}),a.pincode&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:a.pincode.message})]})]}),e.jsxs("div",{className:"flex flex-col md:grid md:grid-cols-3 font-normal mx-10",children:[e.jsx("label",{className:"block text-black text-base font-medium mb-2 md:col-span-1",htmlFor:"complaintaddress",children:"Complaint Address"}),e.jsxs("div",{className:"flex flex-col md:col-span-2 border rounded p-1",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-2 mx-1",children:[e.jsx("input",{type:"checkbox",id:"sameAsResidentAddress",checked:F,onChange:t=>{C(t.target.checked),t.target.checked?r("complaintaddress",se):r("complaintaddress","")}}),e.jsx("label",{className:"text-black text-sm font-medium",htmlFor:"sameAsResidentAddress",children:"Same as Resident Address"})]}),e.jsx("hr",{className:"w-full"}),e.jsx("textarea",{id:"complaintaddress",rows:"5",className:"block py-2.5 pl-3 w-full text-sm text-gray-900 rounded border-none outline-none focus:outline-none focus:shadow-outline mb-2",placeholder:"Complaint Address here...",...c("complaintaddress")}),a.complaintaddress&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2",children:a.complaintaddress.message})]})]}),e.jsxs("div",{className:" flex flex-col md:grid md:grid-cols-3   font-normal mx-10 ",children:[e.jsxs("div",{className:"md:col-span-1",children:[e.jsx("label",{className:"block text-black text-base  font-medium mb-2 ",htmlFor:"complaint_details",children:"Description"}),e.jsx("p",{className:"bg-green-500 w-28 py-1.5 text-center text-white rounded-lg shadow-lg my-5 text-sm",onClick:()=>E(!0),children:"Template"})]}),e.jsxs("div",{className:"flex flex-col md:col-span-2 border rounded p-1",children:[e.jsx("div",{className:"flex justify-end items-center -mb-1 gap-3",children:e.jsxs("select",{className:"block px-4 py-3 text-sm rounded-lg outline-none",onChange:t=>{const s=t.target.value,p=g("complaint_details");re(p,s).then(u=>{r("complaint_details",u)})},children:[e.jsx("option",{hidden:!0,value:"",children:"LAN"}),e.jsx("option",{value:"ta",children:"EN - TA"}),e.jsx("option",{value:"en",children:"TA - EN"})]})}),e.jsx("hr",{className:"w-full"}),e.jsx("textarea",{id:"complaint_details",rows:"5",className:"block py-2.5 pl-3 w-full text-sm text-gray-900 rounded border-none outline-none focus:outline-none focus:shadow-outline mb-2",placeholder:"Description here...",...c("complaint_details")}),a.complaint_details&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2",children:a.complaint_details.message})]})]}),e.jsxs("div",{className:" flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ",children:[e.jsxs("label",{className:"block text-black text-base  font-medium mb-2 md:col-span-1",htmlFor:"file",children:["Attachment"," ",e.jsxs("p",{className:"text-xs ",children:["(optional / ",e.jsx("br",{})," upto 5 files allowed)"]})]}),e.jsxs("div",{className:"flex flex-col md:col-span-2",children:[e.jsx("input",{type:"file",id:"file",multiple:!0,accept:".jpeg, .jpg, .png",className:" w-full py-2 px-2 rounded-lg outline-none",onChange:ae}),w.length>=5&&e.jsx("p",{className:"text-red-500 text-sm",children:"Maximum 5 files allowed"})]})]})]}),e.jsx("div",{className:" text-center my-3",children:e.jsx("button",{type:"submit",className:" text-white bg-primary text-base font-lexend rounded-full px-4 py-1.5 mb-4",children:"Submit"})})]})]})]})]}),e.jsxs("div",{className:" lg:col-span-6 md:col-span-12 col-span-12 font-lexend",children:[e.jsx("h1",{className:"text-lg my-5",children:"Telecaller Details & Grievance List"}),e.jsxs("div",{className:" bg-white shadow-sm border rounded-lg p-4",children:[e.jsx("div",{className:"flex justify-between items-center border-b pb-2 mb-4",children:e.jsx("h2",{className:"text-lg font-bold",children:"Telecaller Details"})}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("label",{htmlFor:"telecallerNo",className:"w-32 text-gray-600 font-medium",children:"Telecaller No."}),e.jsx("input",{type:"text",id:"telecallerNo",placeholder:"1234567890",className:"flex-1 border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"}),e.jsx("button",{className:"bg-red-500 text-white p-2 rounded-full hover:bg-red-600",children:e.jsx(je,{})})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("label",{htmlFor:"telecallerName",className:"w-32 text-gray-600 font-medium",children:"Telecaller Name"}),e.jsx("span",{className:"text-gray-700",children:localStorage.getItem("name")})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("label",{htmlFor:"recordedLink",className:"w-32 text-gray-600 font-medium",children:"Recorded Link"}),e.jsx("a",{href:"https://www.google.co.in/",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:underline",children:"https://www.google.co.in/"})]})]})]}),e.jsx("div",{className:"bg-white rounded-lg my-2 py-3 overflow-x-auto h-2/5 no-scrollbar",children:e.jsxs("table",{className:"w-full mt-2 mx-3",children:[e.jsx("thead",{className:"border-b border-gray-300",children:e.jsxs("tr",{className:"",children:[e.jsx("th",{children:e.jsx("p",{className:" my-2 text-start font-lexend font-bold text-base  whitespace-nowrap",children:"Complaint"})}),e.jsx("th",{children:e.jsx("p",{className:"text-start mx-1 my-2 font-lexend font-bold text-base whitespace-nowrap",children:"Raised by"})}),e.jsx("th",{children:e.jsx("p",{className:"text-start mx-1  my-2 font-lexend font-bold text-base whitespace-nowrap",children:"Department"})}),e.jsx("th",{children:e.jsx("p",{className:"text-start my-2 font-lexend font-bold text-base whitespace-nowrap",children:"Date/Time"})}),e.jsx("th",{className:"items-center mx-3 py-2 font-lexend whitespace-nowrap",children:"Action"})]})}),e.jsx("tbody",{children:$&&($==null?void 0:$.slice(0,10).map((t,s)=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("p",{className:"border-2 w-20 border-slate-900 rounded-lg text-center py-1 my-1 text-sm   text-slate-900",onClick:()=>L(t.grievance_id),children:t.grievance_id})}),e.jsxs("td",{children:[" ",e.jsx("p",{className:"capitalize  mx-1   my-2 font-lexend whitespace-nowrap text-sm text-gray-700",children:t.public_user_name})]}),e.jsxs("td",{children:[" ",e.jsx("p",{className:"capitalize text-start   my-2 font-lexend whitespace-nowrap text-sm text-gray-700",children:t.dept_name})]}),e.jsx("td",{children:e.jsx("p",{className:" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-700",children:he(t.createdAt)})}),e.jsx("td",{className:"flex justify-center mt-3",children:e.jsx(fe,{className:"text-xl",onClick:()=>L(t.grievance_id)})})]},s)))})]})})]})]}),K&&e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50",children:e.jsxs("div",{className:"bg-white p-6 rounded-lg w-3/4 md:w-1/2 max-w-2xl",children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4 text-start",children:"Templates"}),e.jsx("div",{className:"space-y-4 max-h-96 overflow-y-auto",children:H.map((t,s)=>e.jsxs("button",{className:"flex justify-between items-start w-full py-3 px-4 text-sm text-black border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none",onClick:()=>ne(t),children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-md text-start",children:t.temp_title}),e.jsx("hr",{className:"mt-2 w-full"}),e.jsx("p",{className:"text-base text-gray-700 mt-1 text-start",children:t.desc})]}),e.jsx("span",{className:"text-blue-500 font-medium ",children:"Select"})]},s))}),e.jsx("div",{className:"mt-6 flex justify-end",children:e.jsx("button",{className:"py-1.5 px-5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none",onClick:()=>E(!1),children:"Close"})})]})}),Z&&e.jsx(ge,{grievanceId:X,closeModal:()=>M(!1)})]})};export{De as default};
