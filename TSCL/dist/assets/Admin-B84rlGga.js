import{i as oe,k as h,H as Ie,r as n,l as ie,o as ce,j as e,b as _,A as w,B as E,d as W,I as Fe,F as de,n as Re}from"./index-BcYsGqVu.js";import{R as U}from"./index-D7OJULEB.js";import{D as $e}from"./DeleteModal-CGzHCWo0.js";import{P as Ue,a as Be}from"./index-1Cs2earB.js";import{a as Me}from"./index-D_-LWkAi.js";import{E as qe}from"./jspdf.plugin.autotable-doWDoFvS.js";const Oe=oe().shape({user_name:h().trim().required("User Name is required"),dept_name:h().required("Department is required"),phone:h().test("len","Phone Number must be 10 characters",s=>s.length===10).required("Phone Number is required"),email:h().email("Invalid Email Id").required("Email Id is required"),address:h().required("Address is required"),login_password:h().required("Password is required"),pincode:h().test("len","Pincode must be 6 characters",s=>s.length===6).required("Pincode is required"),role:h().test("not-select","Please select a Role",s=>s!==""&&s!=="Role"),zone_name:h().optional(),ward_name:Ie().of(h()).nullable().default([])}),Le=s=>{const{ExistingRoles:D,ExistingEmployees:k,isZone:B,isWard:N}=s,[M,A]=n.useState(""),[z,P]=n.useState([]),{register:p,formState:{errors:d},handleSubmit:q,setValue:j,watch:O}=ie({resolver:ce(Oe),mode:"all",register:{ward_name:{multiple:!0}}}),C=O("zone_name");n.useEffect(()=>{if(C){const l=N==null?void 0:N.filter(o=>o.zone_name===C);P(l||[]),j("ward_name","")}else P([])},[C,N]);const I=l=>{const o=l.target.value,u=k.find(i=>i.emp_name===o);u&&(A(""),j("dept_name",u.dept_name),j("phone",u.phone),j("email",u.email),j("address",u.address),j("pincode",u.pincode))},f=l=>{const o=l.target.value,u=D.find(i=>i.role_name===o);A(u?u.role_id:"")},m=async l=>{const o={...l,status:"active",created_by_user:sessionStorage.getItem("name"),role_id:M},u=sessionStorage.getItem("token");try{const i=await _.post(`${w}/user/post`,o,{headers:{Authorization:`Bearer ${u}`}});i.status===200?(E.success(i.data.message),s.toggleModal(),s.handlerefresh()):(console.error("Error in posting data",i),E.error("Failed to Upload"))}catch(i){console.error("Error in posting data",i)}};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center",children:e.jsx("div",{className:"bg-white w-fit h-fit font-lexend m-2",children:e.jsxs("form",{onSubmit:q(m),children:[e.jsxs("div",{className:"border-b-2 border-gray-300 mx-10 my-5",children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"block text-black text-base font-medium mb-2 col-span-2 whitespace-nowrap",htmlFor:"user_name",children:"Name:"}),e.jsxs("select",{className:"text-sm text-black border border-gray-900 rounded-lg border-none outline-none",id:"user_name",...p("user_name"),onChange:I,children:[e.jsx("option",{value:"",children:"Employee Name"}),k.map(l=>e.jsx("option",{value:l.emp_name,children:l.emp_name},l.emp_id))]})]}),d.user_name&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:d.user_name.message})]}),e.jsxs("div",{className:"flex flex-col gap-3 mx-10 ",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"text-black text-base font-medium mb-2 col-span-1",htmlFor:"dept_name",children:"Department:"}),e.jsx("input",{type:"text",id:"dept_name",className:"w-6/5 text-end outline-none col-span-2",placeholder:"Department ",...p("dept_name")})]}),d.dept_name&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:d.dept_name.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"text-black text-base font-medium mb-2 col-span-1",htmlFor:"phone",children:"Phone:"}),e.jsx("input",{type:"text",id:"phone",className:"w-6/5 text-end outline-none col-span-2",placeholder:"Phone Number",...p("phone")})]}),d.phone&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:d.phone.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"text-black text-base font-medium mb-2 col-span-1",htmlFor:"email",children:"Email Id:"}),e.jsx("input",{type:"email",id:"email",className:"text-end outline-none col-span-2",placeholder:"abc@gmail.com",...p("email")})]}),d.email&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:d.email.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"text-black text-base font-medium mb-2 col-span-1",htmlFor:"address",children:"Address:"}),e.jsx("input",{type:"text",id:"address",className:"text-end outline-none col-span-2",placeholder:"Address",...p("address")})]}),d.address&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:d.address.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"text-black text-base font-medium mb-2 col-span-1",htmlFor:"pincode",children:"Pincode:"}),e.jsx("input",{type:"text",id:"pincode",className:"text-end outline-none col-span-2",placeholder:"Pincode",...p("pincode")})]}),d.pincode&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:d.pincode.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3",children:[e.jsx("label",{className:"text-black text-base font-medium mb-2 col-span-2",htmlFor:"role",children:"Role:"}),e.jsxs("select",{className:"text-sm text-black border border-gray-900 rounded-lg border-none outline-none",id:"role",...p("role"),onChange:f,children:[e.jsx("option",{value:"",children:"Role"}),D.map(l=>e.jsx("option",{value:l.role_name,children:l.role_name},l.role_id))]})]}),d.role&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:d.role.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"text-black text-base font-medium mb-2 col-span-1",htmlFor:"login_password",children:"Password:"}),e.jsx("input",{type:"password",id:"login_password",className:"text-end outline-none col-span-2",placeholder:"Password",...p("login_password")})]}),d.login_password&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:d.login_password.message})]}),e.jsx("p",{className:"text-gray-500 my-1",children:"Auto Assign Options :"}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3",children:[e.jsx("label",{className:"text-black text-base font-medium mb-2 col-span-2",htmlFor:"zone_name",children:"Zone:"}),e.jsxs("select",{className:"text-sm text-black border border-gray-900 rounded-lg border-none outline-none",id:"zone_name",...p("zone_name"),children:[e.jsx("option",{value:"",children:"Zone"}),B.map(l=>e.jsx("option",{value:l.zone_name,children:l.zone_name},l.zone_id))]})]}),d.zone_name&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:d.zone_name.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3",children:[e.jsx("label",{className:"text-black text-base font-medium mb-2 col-span-2",htmlFor:"ward_name",children:"Ward:"}),e.jsxs("select",{className:"text-sm text-black border border-gray-900 rounded-lg border-none outline-none",id:"ward_name",...p("ward_name"),multiple:!0,size:4,children:[e.jsx("option",{disabled:!0,children:"Ward Name"}),z.map(l=>e.jsx("option",{value:l.ward_name,className:"my-0.5 ",children:l.ward_name},l.ward_id))]})]}),d.ward_name&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:d.ward_name.message})]})]}),e.jsxs("div",{className:"flex justify-end py-6 mx-10 my-3 gap-5",children:[e.jsx("div",{className:"border border-primary text-primary bg-none font-lexend rounded-3xl px-5 py-1.5",onClick:s.toggleModal,children:"Cancel"}),e.jsx("button",{className:"text-white bg-primary font-lexend rounded-3xl px-5 py-1.5",children:"Save"})]})]})})})},We=oe().shape({user_name:h().required("User Name is required"),dept_name:h().required("Department is required"),address:h().required("Address is required"),pincode:h().required("Pincode is required"),status:h().test("not-select","Please select an Status",s=>s!==""&&s!=="Status"),role:h().test("not-select","Please select an Role",s=>s!==""&&s!=="Role")}),Ze=s=>{const{ExistingRoles:D,adminId:k,isZone:B,isWard:N}=s,[M,A]=n.useState(null),[z,P]=n.useState(null),[p,d]=n.useState(null),[q,j]=n.useState([]),[O,C]=n.useState([]),I=sessionStorage.getItem("token"),{register:f,formState:{errors:m},handleSubmit:l,setValue:o,watch:u}=ie({resolver:ce(We),mode:"all"}),i=r=>{if(r){const b=r.target.value,c=N==null?void 0:N.filter(Z=>Z.zone_name===b);j(c),o("ward_name",[]),A("")}else j([])};n.useEffect(()=>{(async()=>{try{const b=await _.get(`${w}/user/getbyid?user_id=${k}`,{headers:{Authorization:`Bearer ${I}`}}),c=W(b.data.data);o("user_name",c.user_name),o("dept_name",c.dept_name),o("address",c.address),o("pincode",c.pincode),P(c.role),o("role",c.role),o("status",c.status),o("zone_name",c.zone_name),C(c.zone_name),o("ward_name",c.ward_name),A(c.ward_name)}catch(b){console.error("Error fetching data",b)}})()},[k,o]);const G=r=>{const b=r.target.value,c=D.find(Z=>Z.role_name===b);c&&d(c.role_id)},F=async r=>{const b={...r,role_id:p};try{const c=await _.post(`${w}/user/update?user_id=${k}`,b,{headers:{Authorization:`Bearer ${I}`}});c.status===200?(E.success(c.data.message),P(null),s.toggleModal(),s.handlerefresh()):(console.error("Error in posting data",c),E.error("Failed to Upload"))}catch(c){console.error("Error in posting data",c)}};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ",children:e.jsx("div",{className:"bg-white w-fit h-fit  font-lexend m-2",children:e.jsxs("form",{onSubmit:l(F),children:[e.jsxs("div",{className:"border-b-2 border-gray-300 mx-10 my-5",children:[e.jsxs("div",{className:" grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"block text-black text-base font-medium mb-2 col-span-1 whitespace-nowrap",htmlFor:"user_name",children:"Name :"}),e.jsx("input",{type:"text",id:"user_name",className:"mx-2 font-lexend px-2 text-sm text-end outline-none col-span-2",placeholder:"User Name",...f("user_name")})]}),m.user_name&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:m.user_name.message})]}),e.jsxs("div",{className:" flex flex-col gap-3 mx-10 my-1 ",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:" text-black text-base font-medium mb-2 col-span-1",htmlFor:"dept_name",children:"Department :"}),e.jsx("input",{type:"text",id:"dept_name",className:"w-6/5 text-end outline-none col-span-2",placeholder:" Department Name",...f("dept_name")})]}),m.dept_name&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:m.dept_name.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:" text-black text-base font-medium mb-2 col-span-1",htmlFor:"address",children:"Address :"}),e.jsx("input",{type:"text",id:"address",className:" text-end outline-none col-span-2",placeholder:"Address",...f("address")})]}),m.address&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:m.address.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:" text-black text-base font-medium mb-2 col-span-1",htmlFor:"pincode",children:"Pincode :"}),e.jsx("input",{type:"text",id:"pincode",className:" text-end outline-none col-span-2",placeholder:"Pincode ",...f("pincode")})]}),m.pincode&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:m.pincode.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:" grid grid-cols-3",children:[e.jsx("label",{className:" text-black text-base font-medium mb-2 col-span-2",htmlFor:"status",children:"Status:"}),e.jsxs("select",{className:"   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none",id:"status",...f("status"),children:[e.jsx("option",{value:"",hidden:!0,children:"Status"}),e.jsx("option",{value:"active",children:"Active"}),e.jsx("option",{value:"inactive",children:"InActive"})]})]}),m.status&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:m.status.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:" grid grid-cols-3",children:[e.jsx("label",{className:" text-black text-base font-medium mb-2 col-span-2",htmlFor:"role",children:"Role:"}),e.jsxs("select",{className:"   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none",id:"role",...f("role"),onChange:G,children:[e.jsx("option",{value:z,hidden:!0,children:z}),D.map(r=>e.jsx("option",{value:r.role_name,children:r.role_name},r.role_name))]})]}),m.role&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:m.role.message})]}),e.jsx("p",{className:"text-gray-500",children:"Auto Assign Options : "}),e.jsxs("p",{className:"text-sm text-red-500 -mt-2",children:["Note:"," ",e.jsx("span",{className:"text-xs text-gray-500",children:"if zone value is altered,compulsory to select wards for auto assign"})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3",children:[e.jsx("label",{className:"text-black text-base font-medium mb-2 col-span-2",htmlFor:"zone_name",children:"Zone:"}),e.jsxs("select",{className:"text-sm text-black border border-gray-900 rounded-lg border-none outline-none",id:"zone_name",...f("zone_name"),onChange:i,children:[e.jsx("option",{value:O,disabled:!0,children:O}),B.map(r=>e.jsx("option",{value:r.zone_name,children:r.zone_name},r.zone_id))]})]}),m.zone_name&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:m.zone_name.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3",children:[e.jsx("label",{className:"text-black text-base font-medium mb-2 col-span-2",htmlFor:"ward_name",children:"Ward:"}),e.jsxs("select",{className:"text-sm text-black border border-gray-900 rounded-lg border-none outline-none col-span-1 ",id:"ward_name",...f("ward_name"),multiple:!0,size:5,children:[M&&M.map((r,b)=>e.jsx("option",{value:r,disabled:!0,children:r},b)),q.map(r=>e.jsx("option",{value:r.ward_name,className:"my-0.5 ",children:r.ward_name},r.ward_id))]})]}),m.ward_name&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:m.ward_name.message})]})]}),e.jsxs("div",{className:"flex justify-end  py-6 mx-10 my-3 gap-5 ",children:[e.jsx("div",{className:"border border-primary text-primary bg-none font-lexend rounded-3xl px-5 py-1.5",onClick:s.toggleModal,children:"cancel"}),e.jsx("button",{className:" text-white bg-primary font-lexend rounded-3xl px-5 py-1.5",children:"Save"})]})]})})})},Te=`user_name,dept_name,phone,email,address,pincode,login_password,status,role,created_by_user
UserName,Department,phone,email@gmail.com,Address,123456,passord,status,role,admin`,Xe=({permissions:s})=>{const[D,k]=n.useState(!1),B=s==null?void 0:s.includes("create"),N=s==null?void 0:s.includes("edit"),M=s==null?void 0:s.includes("delete"),A=s==null?void 0:s.includes("download"),[z,P]=n.useState(!1),[p,d]=n.useState(null),[q,j]=n.useState(!1),[O,C]=n.useState(null),[I,f]=n.useState(null),[m,l]=n.useState(null),[o,u]=n.useState(""),[i,G]=n.useState(1),[F]=n.useState(8),[r,b]=n.useState(1),[c,Z]=n.useState([]),[R,me]=n.useState([]),[Q,xe]=n.useState(null),L=sessionStorage.getItem("token"),[he,X]=n.useState(null),[ee,te]=n.useState("Bulk Upload"),[J,pe]=n.useState(null),[se,ue]=n.useState([]),[ae,ge]=n.useState([]),K=t=>{xe(Q===t?null:t)},be=t=>Q===t;n.useEffect(()=>{V(),ye(),Ne(),ve(),_e()},[o,i]);const T=t=>{t>0&&t<=r&&G(t)},V=()=>{_.get(`${w}/user/get`,{headers:{Authorization:`Bearer ${L}`}}).then(t=>{const a=W(t.data.data);me(a);const y=a.filter(g=>Object.values(g).some(x=>x.toString().toLowerCase().includes(o.toLowerCase())));b(Math.ceil(y.length/F));const S=i*F,$=S-F;Z(y.slice($,S))}).catch(t=>{console.error(t)})},je=()=>{k(!D)},fe=()=>{P(!z),d(null)},ne=()=>{j(!q),C(null)},ye=async()=>{try{const t=await _.get(`${w}/role/getactive`,{headers:{Authorization:`Bearer ${L}`}}),a=W(t.data.data);f(a)}catch(t){console.error("Error fetching existing Roles:",t)}},Ne=async()=>{try{const t=await _.get(`${w}/employee/getactive`,{headers:{Authorization:`Bearer ${L}`}}),a=W(t.data.data);l(a)}catch(t){console.error("Error fetching existing Department:",t)}},ve=async()=>{try{const t=await _.get(`${w}/zone/getactive`,{headers:{Authorization:`Bearer ${L}`}}),a=W(t.data.data);ue(a)}catch(t){console.error("Error fetching existing Department:",t)}},_e=async()=>{try{const t=await _.get(`${w}/ward/getactive`,{headers:{Authorization:`Bearer ${L}`}}),a=W(t.data.data);ge(a)}catch(t){console.error("Error fetching existing Department:",t)}},Y=i*F,H=Y-F,re=R.filter(t=>Object.values(t).some(a=>a.toString().toLowerCase().includes(o.toLowerCase()))),we=re.slice().reverse().slice(H,Y),ke=async()=>{try{await _.delete(`${w}/user/delete?user_id=${O}`,{headers:{Authorization:`Bearer ${L}`}}),ne(),V(),E.success("Deleted successfully")}catch{E.error("Failed to delete")}},Se=t=>{X(t.target.files[0]),te("Upload")},De=()=>{ee==="Bulk Upload"?document.getElementById("fileInput").click():Pe(he)},Pe=async t=>{try{const a=new FormData;a.append("file",t),(await _.post(`${w}/user/uploadcsv`,a,{headers:{"Content-Type":"multipart/form-data"}})).status===200?(te("Bulk Upload"),X(null),V(),E.success("Data Uploaded Successfully")):E.error("Data failed to Upload")}catch(a){console.log(a)}},Ce=t=>{pe(t.target.value)},le=async t=>{if(t==="csv"){const a=R.map(x=>({user_id:x.user_id,user_name:x.user_name,dept_name:x.dept_name,phone:x.phone,email:x.email,address:x.address,pincode:x.pincode,status:x.status,role:x.role,created_by_user:x.created_by_user})),y=[Object.keys(a[0]).join(","),...a.map(x=>Object.values(x).join(","))].join(`
`),S=new Blob([y],{type:"text/csv;charset=utf-8;"}),$=window.URL.createObjectURL(S),g=document.createElement("a");g.setAttribute("href",$),g.setAttribute("download","Admin_data.csv"),g.style.visibility="hidden",document.body.appendChild(g),g.click(),document.body.removeChild(g)}else if(t==="pdf")try{const y=Math.ceil(R.length/30),S=new qe("l","mm","a4");let $=0;for(let g=1;g<=y;g++){const x=(g-1)*30,Ae=Math.min(x+30,R.length),ze=R.slice(x,Ae).map(v=>[v.user_id,v.user_name,v.dept_name,v.phone,v.email,v.address,v.pincode,v.status,v.role,v.created_by_user]);S.text(`Page ${g}`,10,$+10),S.autoTable({startY:$+15,head:[["User_Id","User_Name","Dept_Name","Phone","Email","Address","Pincode","Status","Role","CreatedBy"]],body:ze,theme:"striped"}),g<y&&(S.addPage(),$=10)}S.save("Admin_data.pdf")}catch(a){console.error("Error exporting data:",a)}},Ee=()=>{const t=new Blob([Te],{type:"text/csv"}),a=URL.createObjectURL(t),y=document.createElement("a");y.href=a,y.download="bulkupload_template.csv",y.click(),URL.revokeObjectURL(a)};return e.jsxs(n.Fragment,{children:[e.jsx("div",{className:"  bg-blue-100 overflow-y-auto no-scrollbar",children:e.jsxs("div",{className:"h-screen",children:[e.jsxs("div",{className:"flex flex-row items-center md:justify-end gap-3 p-2 mt-3 mx-8 flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-3 bg-white py-2 px-3 rounded-full",children:[e.jsx(Fe,{className:"text-xl"}),e.jsx("input",{type:"search",className:"outline-none bg-transparent text-base",placeholder:"Search Admin",value:o,onChange:t=>u(t.target.value)})]}),B&&e.jsxs("div",{className:"relative text-center   hover:text-white py-1.5 rounded-full",children:[e.jsx("input",{type:"file",id:"fileInput",className:"hidden",onChange:Se,accept:".csv"}),e.jsxs("button",{className:"flex items-center gap-2 justify-center border-primary border-2 font-normal text-base w-36 py-1.5  rounded-full text-primary hover:text-white hover:bg-primary  ",onClick:De,children:[e.jsx(de,{}),ee]})]}),A&&e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("form",{children:e.jsxs("select",{className:"block w-full py-2 px-2  text-sm border-2 text-gray-400  border-gray-300 rounded-full bg-gray-50 outline-none",onChange:Ce,children:[e.jsx("option",{hidden:!0,children:"Download"}),e.jsx("option",{value:"csv",children:"CSV"}),e.jsx("option",{value:"pdf",children:"PDF"})]})}),J===null&&e.jsx(Me,{className:"text-2xl text-gray-500"}),J==="csv"&&e.jsx(Ue,{className:"text-3xl text-gray-500",onClick:()=>le("csv")}),J==="pdf"&&e.jsx(Be,{className:"text-3xl text-gray-500",onClick:()=>le("pdf")})]})]}),e.jsxs("div",{className:"flex justify-between items-center my-2 mx-8 gap-1 flex-wrap",children:[e.jsx("h1",{className:"md:text-2xl text-lg font-medium   font-lexend",children:"TSCL User"}),B&&e.jsx("a",{href:"#",children:e.jsxs("button",{className:"flex flex-row-2 gap-2  items-center border-2  font-lexend bg-blue-500 text-white rounded-full p-2.5 w-fit justify-between md:text-base text-sm",onClick:()=>k(!0),children:[e.jsx(de,{})," Add User"]})})]}),e.jsx("div",{className:"bg-white mx-4 rounded-lg my-3  h-3/5 ",children:e.jsx("div",{className:"overflow-x-auto no-scrollbar",children:e.jsxs("table",{className:"w-full  mt-3",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("th",{className:"py-2",children:e.jsx("p",{className:" mx-6 my-2 font-lexend font-semibold whitespace-nowrap",children:"#"})}),e.jsx("th",{children:e.jsxs("div",{className:"flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",children:["Username ",e.jsx(U,{})]})}),e.jsx("th",{children:e.jsxs("div",{className:"flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",children:["Department",e.jsx(U,{})]})}),e.jsx("th",{children:e.jsxs("div",{className:"flex gap-2 items-center justify-start mx-3  my-2 font-lexend font-semibold whitespace-nowrap",children:["Phone",e.jsx(U,{})]})}),e.jsx("th",{children:e.jsxs("div",{className:"flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",children:["Email",e.jsx(U,{})]})}),e.jsx("th",{children:e.jsxs("div",{className:"flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",children:["Status",e.jsx(U,{})]})}),e.jsx("th",{children:e.jsxs("div",{className:"flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",children:["Role",e.jsx(U,{})]})}),e.jsx("th",{children:e.jsxs("div",{className:"flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",children:["CreatedBy",e.jsx(U,{})]})}),e.jsx("th",{children:e.jsx("div",{className:"mx-1 my-3 text-start font-lexend font-semibold whitespace-nowrap",children:"Action"})})]})}),e.jsx("tbody",{children:we.map((t,a)=>e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("td",{className:"",children:e.jsxs("p",{className:"text-center text-sm mx-4 my-2 font-lexend whitespace-nowrap  text-gray-700",children:[" ",H+a+1<10?`0${H+a+1}`:H+a+1]})}),e.jsx("td",{children:e.jsx("p",{className:" mx-1  my-2 font-lexend whitespace-nowrap text-start text-sm capitalize text-gray-700",children:t.user_name})}),e.jsx("td",{children:e.jsx("p",{className:"text-start text-sm  mx-1  my-2  font-lexend whitespace-nowrap capitalize text-gray-700",children:t.dept_name})}),e.jsx("td",{children:e.jsx("p",{className:"text-start text-sm mx-3  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",children:t.phone})}),e.jsx("td",{children:e.jsx("p",{className:"text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",children:t.email})}),e.jsx("td",{children:e.jsx("p",{className:"text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",children:t.status})}),e.jsx("td",{children:e.jsx("p",{className:"text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",children:t.role})}),e.jsx("td",{children:e.jsx("p",{className:"text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",children:t.created_by_user})}),e.jsx("td",{children:e.jsxs("div",{className:"flex justify-start mx-1.5 my-3",children:[e.jsx(Re,{onClick:()=>K(a)}),be(a)&&e.jsxs("div",{className:" bg-white shadow-md rounded-lg ml-1",children:[N&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>{P(!0),d(t.user_id),K()},children:"Edit"}),M&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>{j(!0),C(t.user_id),K()},children:"Delete"})]})]})})]},a))})]})})}),e.jsxs("div",{className:" my-3 mb-5 mx-7",children:[e.jsx("div",{className:"text-center",children:e.jsx("button",{className:"bg-primary px-3 py-2 rounded-full text-white text-sm font-alegerya",onClick:Ee,children:"Bulk Upload Template"})}),e.jsxs("nav",{className:"flex items-center flex-column flex-wrap md:flex-row md:justify-between justify-center pt-4","aria-label":"Table navigation",children:[e.jsxs("span",{className:"text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center font-alegerya",children:["Showing"," ",e.jsxs("span",{className:"text-gray-700",children:[H+1," to ",Math.min(Y,R.length)]})," ","of ",e.jsxs("span",{className:"text-gray-900",children:[R.length," entries"]})]}),e.jsxs("ul",{className:"inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 font-alegerya",children:[e.jsx("li",{children:e.jsx("button",{onClick:()=>T(1),disabled:i===1,className:"flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-s-lg hover:bg-paginate-bg hover:text-primary-hover",children:"<<"})}),e.jsx("li",{children:e.jsx("button",{onClick:()=>T(i-1),disabled:i===1,className:"flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover",children:"Back"})}),Array.from({length:r},(t,a)=>a+1).slice(Math.max(0,i-2),Math.min(r,i+1)).map(t=>e.jsx("li",{children:e.jsx("button",{onClick:()=>T(t),className:`flex items-center justify-center px-3 h-8 leading-tight border border-paginate-br hover:text-white hover:bg-primary ${i===t?"bg-primary text-white":"bg-white text-black"}`,children:t})},t)),e.jsx("li",{children:e.jsx("button",{onClick:()=>T(i+1),disabled:Y>=re.length,className:"flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover",children:"Next"})}),e.jsx("li",{children:e.jsx("button",{onClick:()=>T(r),disabled:i===r,className:"flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-e-lg hover:bg-paginate-bg hover:text-primary-hover",children:">>"})})]})]})]})]})}),D&&e.jsx(Le,{toggleModal:je,handlerefresh:V,ExistingRoles:I,ExistingEmployees:m,isZone:se,isWard:ae}),z&&e.jsx(Ze,{toggleModal:fe,handlerefresh:V,ExistingRoles:I,adminId:p,isZone:se,isWard:ae}),q&&e.jsx($e,{toggleDeleteModal:ne,delete:ke})]})};export{Xe as default};