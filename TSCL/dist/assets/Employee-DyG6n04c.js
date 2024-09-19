import{i as W,k as m,r as n,l as X,o as Z,j as e,b as D,B as v,d as Y,n as ve,p as Pe}from"./index-KIUE0VQ7.js";import{R as S,P as we}from"./Pagination-CV7LYs7l.js";import{D as Se}from"./DeleteModal-DF4QeBZf.js";import{S as ke,D as Ce,E as Ie}from"./DocumentDownload-LdYQKIu7.js";import{S as ee}from"./SavaCancel-BUt4HGhj.js";import{A as j}from"./ApiClient-CgGLjmH-.js";import{F as Me,B as Oe}from"./FileUploadButton-DdJ5gyML.js";import{H as Te}from"./HeaderButton-WWvRh6x_.js";import"./index-D2tH468i.js";import"./index-aTCdm8he.js";import"./index-DhZKdBy-.js";const Fe=W().shape({emp_name:m().trim().required("Employee Name is required"),dept_name:m().required("Department is required"),phone:m().test("len","Phone Number must be 10 characters",s=>s.length===10).required("Phone Number is required"),email:m().email("Invalid Email Id").required("Email Id is required"),address:m().required("Address is required"),dob:m().required("DOB is required"),pincode:m().test("len","Pincode must be 6 characters",s=>s.length===6).required("Pincode is required"),designation:m().test("not-select","Please select a Designation",s=>s!==""&&s!=="Designation")}),Le=s=>{const{ExistingDesignation:E,ExistingDept:k}=s,[N,C]=n.useState(""),{register:p,formState:{errors:d},handleSubmit:P}=X({resolver:Z(Fe),mode:"all"}),I=l=>{const i=l.target.value,u=E.find(h=>h.designation===i);C(u.desgination_id)},O=async l=>{const i={...l,status:"active",created_by_user:sessionStorage.getItem("name"),designation_id:N};try{const u=await D.post(j.POST_EMPLOYEE.url,i,{headers:j.POST_EMPLOYEE.headers});u.status===200?(v.success(u.data.message),s.toggleModal(),s.handlerefresh()):(console.error("Error in posting data",u),v.error("Failed to Upload"))}catch(u){console.error("Error in posting data",u)}};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center",children:e.jsx("div",{className:"bg-white w-fit h-fit font-lexend m-2",children:e.jsxs("form",{onSubmit:P(O),children:[e.jsxs("div",{className:"border-b-2 border-gray-300 mx-10 my-5",children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"block text-black text-lg font-medium mb-2 col-span-1 whitespace-nowrap",htmlFor:"emp_name",children:"Name:"}),e.jsx("input",{type:"text",id:"emp_name",className:"mx-2 font-lexend px-2 text-sm text-end outline-none col-span-2",placeholder:"Employee Name",...p("emp_name")})]}),d.emp_name&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:d.emp_name.message})]}),e.jsxs("div",{className:"flex flex-col gap-3 mx-10 my-1",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"text-black text-lg font-medium mb-2 col-span-2",htmlFor:"dept_name",children:"Department:"}),e.jsxs("select",{className:"text-sm text-black border border-gray-900 rounded-lg border-none outline-none",id:"dept_name",...p("dept_name"),children:[e.jsx("option",{value:"",children:"Department"}),k.map(l=>e.jsx("option",{value:l.dept_name,children:l.dept_name},l.dept_id))]})]}),d.dept_name&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:d.dept_name.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"text-black text-lg font-medium mb-2 col-span-1",htmlFor:"phone",children:"Phone:"}),e.jsx("input",{type:"text",id:"phone",className:"w-6/5 text-end outline-none col-span-2",placeholder:"Phone Number",...p("phone")})]}),d.phone&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:d.phone.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"text-black text-lg font-medium mb-2 col-span-1",htmlFor:"email",children:"Email Id:"}),e.jsx("input",{type:"email",id:"email",className:"text-end outline-none col-span-2",placeholder:"abc@gmail.com",...p("email")})]}),d.email&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:d.email.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"text-black text-lg font-medium mb-2 col-span-1",htmlFor:"address",children:"Address:"}),e.jsx("input",{type:"text",id:"address",className:"text-end outline-none col-span-2",placeholder:"Address",...p("address")})]}),d.address&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:d.address.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"text-black text-lg font-medium mb-2 col-span-1",htmlFor:"pincode",children:"Pincode:"}),e.jsx("input",{type:"text",id:"pincode",className:"text-end outline-none col-span-2",placeholder:"Pincode",...p("pincode")})]}),d.pincode&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:d.pincode.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"text-black text-lg font-medium mb-2 col-span-1",htmlFor:"dob",children:"Date of Birth :"}),e.jsx("input",{type:"text",id:"dob",className:"text-end outline-none col-span-2",placeholder:"DOB",...p("dob")})]}),d.dob&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:d.dob.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3",children:[e.jsx("label",{className:"text-black text-lg font-medium mb-2 col-span-2",htmlFor:"designation",children:"Desgination :"}),e.jsxs("select",{className:"text-sm text-black border border-gray-900 rounded-lg border-none outline-none",id:"designation",...p("designation"),onChange:I,children:[e.jsx("option",{value:"",children:"Designation"}),E.map(l=>e.jsx("option",{value:l.designation,children:l.designation},l.designation_id))]})]}),d.designation&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:d.designation.message})]})]}),e.jsx("div",{className:"py-6",children:e.jsx(ee,{onCancel:s.toggleModal})})]})})})},qe=W().shape({emp_name:m().trim().required("Employee Name is required"),dept_name:m().required("Department is required"),address:m().required("Address is required"),dob:m().required("DOB is required"),pincode:m().test("len","Pincode must be 6 characters",s=>s.length===6).required("Pincode is required"),designation:m().test("not-select","Please select a Designation",s=>s!==""&&s!=="Designation"),status:m().test("not-select","Please select an Status",s=>s!==""&&s!=="Status")}),Ae=s=>{const{ExistingDesignation:E,ExistingDept:k,adminId:N}=s,[C,p]=n.useState(null),[d,P]=n.useState(null),[I,O]=n.useState(null),{register:l,formState:{errors:i},handleSubmit:u,setValue:h,watch:U}=X({resolver:Z(qe),mode:"all"});n.useEffect(()=>{(async()=>{try{const b=j.FETCH_EMPLOYEE(N),g=await D.get(b.url,{headers:b.headers}),r=Y(g.data.data);h("emp_name",r.emp_name),h("dept_name",r.dept_name),p(r.dept_name),h("address",r.address),h("pincode",r.pincode),h("dob",r.dob),P(r.designation),h("designation_id",r.designation_id),h("designation",r.designation),h("status",r.status)}catch(b){console.error("Error fetching data",b)}})()},[N,h]);const q=c=>{const b=c.target.value,g=E.find(r=>r.designation===b);O(g.desgination_id)},V=async c=>{const b={...c,designation_id:I};try{const g=j.UPDATE_EMPLOYEE(N),r=await D.post(g.url,b,{headers:g.headers});r.status===200?(v.success(r.data.message),p(null),P(null),s.toggleModal(),s.handlerefresh()):(console.error("Error in posting data",r),v.error("Failed to Upload"))}catch(g){console.error("Error in posting data",g)}};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ",children:e.jsx("div",{className:"bg-white w-fit h-fit  font-lexend m-2",children:e.jsxs("form",{onSubmit:u(V),children:[e.jsxs("div",{className:"border-b-2 border-gray-300 mx-10 my-5",children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"block text-black text-lg font-medium mb-2 col-span-1 whitespace-nowrap",htmlFor:"emp_name",children:"Name:"}),e.jsx("input",{type:"text",id:"emp_name",className:"mx-2 font-lexend px-2 text-sm text-end outline-none col-span-2",placeholder:"Employee Name",...l("emp_name")})]}),i.emp_name&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:i.emp_name.message})]}),e.jsxs("div",{className:"flex flex-col gap-3 mx-10 my-1",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"text-black text-lg font-medium mb-2 col-span-2",htmlFor:"dept_name",children:"Department:"}),e.jsxs("select",{className:"text-sm text-black border border-gray-900 rounded-lg border-none outline-none",id:"dept_name",...l("dept_name"),children:[e.jsx("option",{value:C,children:C}),k.map(c=>e.jsx("option",{value:c.dept_name,children:c.dept_name},c.dept_id))]})]}),i.dept_name&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:i.dept_name.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"text-black text-lg font-medium mb-2 col-span-1",htmlFor:"address",children:"Address:"}),e.jsx("input",{type:"text",id:"address",className:"text-end outline-none col-span-2",placeholder:"Address",...l("address")})]}),i.address&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:i.address.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"text-black text-lg font-medium mb-2 col-span-1",htmlFor:"pincode",children:"Pincode:"}),e.jsx("input",{type:"text",id:"pincode",className:"text-end outline-none col-span-2",placeholder:"Pincode",...l("pincode")})]}),i.pincode&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:i.pincode.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsx("label",{className:"text-black text-lg font-medium mb-2 col-span-1",htmlFor:"dob",children:"Date of Birth :"}),e.jsx("input",{type:"text",id:"dob",className:"text-end outline-none col-span-2",placeholder:"DOB",...l("dob")})]}),i.dob&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:i.dob.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"grid grid-cols-3",children:[e.jsx("label",{className:"text-black text-lg font-medium mb-2 col-span-2",htmlFor:"designation",children:"Desgination :"}),e.jsxs("select",{className:"text-sm text-black border border-gray-900 rounded-lg border-none outline-none",id:"designation",...l("designation"),onChange:q,children:[e.jsx("option",{value:d,children:d}),E.map(c=>e.jsx("option",{value:c.designation,children:c.designation},c.designation_id))]})]}),i.designation&&e.jsx("p",{className:"text-red-500 text-xs text-end ",children:i.designation.message})]}),e.jsxs("div",{className:" grid grid-cols-3 gap-3 ",children:[e.jsx("label",{className:" text-black text-lg font-medium mb-2 col-span-2",htmlFor:"status",children:"Status:"}),e.jsxs("select",{className:"   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none",id:"status",...l("status"),children:[e.jsx("option",{value:"",hidden:!0,children:"Status"}),e.jsx("option",{value:"active",children:"Active"}),e.jsx("option",{value:"inactive",children:"InActive"})]}),i.status&&e.jsx("p",{className:"text-red-500 text-xs text-center mb-3 ",children:i.status.message})]})]}),e.jsx("div",{className:"py-6",children:e.jsx(ee,{onCancel:s.toggleModal})})]})})})},Be=`emp_name,designation_id,designation,dept_name,phone,email,address,pincode,status,created_by_user
name,DE***,designation,Department,1234567890,abc@gmail.com,address,123456,active,admin`,Ze=({permissions:s})=>{const[E,k]=n.useState(!1),N=s==null?void 0:s.includes("create"),C=s==null?void 0:s.includes("edit"),p=s==null?void 0:s.includes("delete"),d=s==null?void 0:s.includes("download"),[P,I]=n.useState(!1),[O,l]=n.useState(null),[i,u]=n.useState(!1),[h,U]=n.useState(null),[q,V]=n.useState(null),[c,b]=n.useState(null),[g,r]=n.useState(""),[A,te]=n.useState(1),[T]=n.useState(8),[R,se]=n.useState(1),[Ye,ae]=n.useState([]),[M,ne]=n.useState([]),[z,le]=n.useState(null),[de,$]=n.useState(null),[H,J]=n.useState("Bulk Upload"),[ie,oe]=n.useState(null),G=t=>{le(z===t?null:t)},re=t=>z===t;n.useEffect(()=>{F(),pe(),he()},[g,A]);const ce=t=>{t>0&&t<=R&&te(t)},F=()=>{D.get(j.GET_EMPLOYEE.url,{headers:j.GET_EMPLOYEE.headers}).then(t=>{const a=Y(t.data.data);ne(a);const _=a.filter(x=>Object.values(x).some(o=>o.toString().toLowerCase().includes(g.toLowerCase())));se(Math.ceil(_.length/T));const y=A*T,w=y-T;ae(_.slice(w,y))}).catch(t=>{console.error(t)})},me=()=>{k(!E)},xe=()=>{I(!P),l(null)},K=()=>{u(!i),U(null)},pe=async()=>{try{const t=await D.get(j.GET_DESIG_EMPLOYEEACTIVE.url,{headers:j.GET_DESIG_EMPLOYEEACTIVE.headers}),a=Y(t.data.data);V(a)}catch(t){console.error("Error fetching existing Roles:",t)}},he=async()=>{try{const t=await D.get(j.GET_DEPT_EMPLOYEEACTIVE.url,{headers:j.GET_DEPT_EMPLOYEEACTIVE.headers}),a=Y(t.data.data);b(a)}catch(t){console.error("Error fetching existing Department:",t)}},B=A*T,L=B-T,Q=M.filter(t=>Object.values(t).some(a=>a.toString().toLowerCase().includes(g.toLowerCase()))),ge=Q.slice().reverse().slice(L,B),ue=async()=>{try{const t=j.DELETE_EMPLOYEE(h);await D.delete(t.url,{headers:t.headers}),K(),F(),v.success("Deleted successfully")}catch{v.error("Failed to delete")}},je=t=>{$(t.target.files[0]),J("Upload")},be=()=>{H==="Bulk Upload"?document.getElementById("fileInput").click():fe(de)},fe=async t=>{try{const a=new FormData;a.append("file",t),(await D.post(j.CSV_EMPLOYEE.url,a,{headers:{"Content-Type":"multipart/form-data"}})).status===200?(J("Bulk Upload"),$(null),F(),v.success("Data Uploaded Successfully")):v.error("Data failed to Upload")}catch(a){console.log(a)}},ye=t=>{oe(t.target.value)},Ee=async t=>{if(t==="csv"){const a=M.map(o=>({emp_id:o.emp_id,emp_name:o.emp_name,designation_id:o.designation_id,designation:o.designation,dept_name:o.dept_name,phone:o.phone,email:o.email,address:o.address,pincode:o.pincode,status:o.status,role:o.role,created_by_user:o.created_by_user})),_=[Object.keys(a[0]).join(","),...a.map(o=>Object.values(o).join(","))].join(`
`),y=new Blob([_],{type:"text/csv;charset=utf-8;"}),w=window.URL.createObjectURL(y),x=document.createElement("a");x.setAttribute("href",w),x.setAttribute("download","Employee_data.csv"),x.style.visibility="hidden",document.body.appendChild(x),x.click(),document.body.removeChild(x)}else if(t==="pdf")try{const _=Math.ceil(M.length/30),y=new Ie("l","mm","a4");let w=0;for(let x=1;x<=_;x++){const o=(x-1)*30,_e=Math.min(o+30,M.length),De=M.slice(o,_e).map(f=>[f.emp_id,f.emp_name,f.designation,f.dept_name,f.phone,f.email,f.address,f.pincode,f.status,f.created_by_user]);y.text(`Page ${x}`,10,w+10),y.autoTable({startY:w+15,head:[["Emp_Id","Emp_Name","Designation","Dept_Name","Phone","Email","Address","Pincode","Status","CreatedBy"]],body:De,theme:"striped"}),x<_&&(y.addPage(),w=10)}y.save("Employee_data.pdf")}catch(a){console.error("Error exporting data:",a)}},Ne=()=>{Pe(Be)};return e.jsxs(n.Fragment,{children:[e.jsx("div",{className:"  bg-blue-100 overflow-y-auto no-scrollbar",children:e.jsxs("div",{className:"h-screen",children:[e.jsxs("div",{className:"flex flex-row items-center md:justify-end gap-3 p-2 mt-3 mx-8 flex-wrap",children:[e.jsx(ke,{value:g,onChange:t=>r(t.target.value),placeholder:"Search Employee"}),N&&e.jsx(Me,{onChange:je,buttonText:H,accept:".csv",onClick:be}),d&&e.jsx(Ce,{selectedDoc:ie,onChange:ye,exportData:Ee})]}),e.jsx(Te,{title:"TSCL Employee",hasCreatePermission:N,onClick:()=>k(!0)}),e.jsx("div",{className:"bg-white mx-4 rounded-lg my-3  h-3/5 ",children:e.jsx("div",{className:"overflow-x-auto no-scrollbar",children:e.jsxs("table",{className:"w-full  mt-3",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("th",{className:"py-2",children:e.jsx("p",{className:" mx-6 my-2 font-lexend font-semibold whitespace-nowrap",children:"#"})}),e.jsx("th",{children:e.jsxs("div",{className:"flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",children:["Employee Name ",e.jsx(S,{})]})}),e.jsx("th",{children:e.jsxs("div",{className:"flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",children:["Designation",e.jsx(S,{})]})}),e.jsx("th",{children:e.jsxs("div",{className:"flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",children:["Department",e.jsx(S,{})]})}),e.jsx("th",{children:e.jsxs("div",{className:"flex gap-2 items-center justify-start mx-3  my-2 font-lexend font-semibold whitespace-nowrap",children:["Phone",e.jsx(S,{})]})}),e.jsx("th",{children:e.jsxs("div",{className:"flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",children:["Email",e.jsx(S,{})]})}),e.jsx("th",{children:e.jsxs("div",{className:"flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",children:["Status",e.jsx(S,{})]})}),e.jsx("th",{children:e.jsxs("div",{className:"flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",children:["CreatedBy",e.jsx(S,{})]})}),e.jsx("th",{children:e.jsx("div",{className:"mx-1 my-3 text-start font-lexend font-semibold whitespace-nowrap",children:"Action"})})]})}),e.jsx("tbody",{children:ge.map((t,a)=>e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("td",{className:"",children:e.jsxs("p",{className:"text-center text-sm mx-4 my-2 font-lexend whitespace-nowrap  text-gray-700",children:[" ",L+a+1<10?`0${L+a+1}`:L+a+1]})}),e.jsx("td",{children:e.jsx("p",{className:" mx-1  my-2 font-lexend whitespace-nowrap text-start text-sm capitalize text-gray-700",children:t.emp_name})}),e.jsx("td",{children:e.jsx("p",{className:"text-start text-sm  mx-1  my-2  font-lexend whitespace-nowrap capitalize text-gray-700",children:t.designation})}),e.jsx("td",{children:e.jsx("p",{className:"text-start text-sm  mx-1  my-2  font-lexend whitespace-nowrap capitalize text-gray-700",children:t.dept_name})}),e.jsx("td",{children:e.jsx("p",{className:"text-start text-sm mx-3  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",children:t.phone})}),e.jsx("td",{children:e.jsx("p",{className:"text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",children:t.email})}),e.jsx("td",{children:e.jsx("p",{className:"text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",children:t.status})}),e.jsx("td",{children:e.jsx("p",{className:"text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",children:t.created_by_user})}),e.jsx("td",{children:e.jsxs("div",{className:"flex justify-start mx-1.5 my-3",children:[e.jsx(ve,{onClick:()=>G(a)}),re(a)&&e.jsxs("div",{className:" bg-white shadow-md rounded-lg ml-1",children:[C&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>{I(!0),l(t.emp_id),G()},children:"Edit"}),p&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>{u(!0),U(t.emp_id),G()},children:"Delete"})]})]})})]},a))})]})})}),e.jsxs("div",{className:" my-3 mb-5 mx-7",children:[e.jsx(Oe,{handleDownload:Ne}),e.jsx(we,{Length:M.length,currentPage:A,totalPages:R,firstIndex:L,lastIndex:B,paginate:ce,hasNextPage:B>=Q.length})]})]})}),E&&e.jsx(Le,{toggleModal:me,handlerefresh:F,ExistingDesignation:q,ExistingDept:c}),P&&e.jsx(Ae,{toggleModal:xe,handlerefresh:F,ExistingDesignation:q,ExistingDept:c,adminId:O}),i&&e.jsx(Se,{toggleDeleteModal:K,delete:ue})]})};export{Ze as default};