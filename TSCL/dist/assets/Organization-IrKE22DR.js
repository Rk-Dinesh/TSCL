import{i as H,k as M,r,m as Y,o as J,j as e,b as O,B as y,d as K,q as $,s as ye,v as Ne}from"./index-Cb3AN3R3.js";import{R as P}from"./index-C-hq6bKM.js";import{S as Q}from"./SavaCancel-CuKZ8TfL.js";import{A as x}from"./ApiClient-w4qWO__2.js";import{D as we}from"./DeleteModal-De28Bu6M.js";import{S as Oe,D as Se,E as ve}from"./DocumentDownload-A0b-q8L_.js";import{P as De}from"./Pagination-ClPqWgoN.js";import{B as Ie}from"./BulkUploadButton-C25cRLG1.js";import{F as _e}from"./FileUploadButton-DWkzr3As.js";import{H as Ee}from"./HeaderButton-By5upfsz.js";import"./index-Du0g9a49.js";import"./index-CmROlnnr.js";import"./index-BK6gNoz8.js";const Pe=H().shape({org_name:M().required("Organization is required")}),Ae=a=>{const[u,h]=r.useState(!1),{register:g,formState:{errors:N},handleSubmit:c,watch:S}=Y({resolver:J(Pe),mode:"all"}),v=async f=>{const D={...f,status:"active",created_by_user:localStorage.getItem("name")};try{h(!0);const l=await O.post(x.POST_ORGANIZATION.url,D,{headers:x.POST_ORGANIZATION.headers});l.status===200?(y.success("Org created Successfully"),h(!1),a.toggleModal(),a.handlerefresh()):(console.error("Error in posting data",l),h(!1),y.error("Failed to Upload"))}catch(l){console.error("Error in posting data",l),h(!1)}};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ",children:e.jsxs("div",{className:"bg-white w-[522px] h-[358px]  font-lexend m-2 ",children:[e.jsx("div",{className:"border-b-2 border-gray-300 mx-10",children:e.jsx("h1",{className:"text-xl font-medium pt-10 pb-2",children:"Add Organization"})}),e.jsxs("form",{onSubmit:c(v),children:[e.jsxs("div",{className:"mx-6 my-10",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-4",htmlFor:"org_name",children:"Organization Name"}),e.jsx("input",{className:"appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"org_name",type:"text",placeholder:" Organization Name",...g("org_name")}),N.org_name&&e.jsx("p",{className:"text-red-500",children:N.org_name.message})]}),e.jsx(Q,{onCancel:a.toggleModal,isLoading:u})]})]})})},Ce=H().shape({org_name:M().required("Organization is required"),status:M().test("not-select","Please select an Status",a=>a!==""&&a!=="Status")}),Te=a=>{const{orgId:u}=a,[h,g]=r.useState(!1),{register:N,formState:{errors:c},handleSubmit:S,watch:v,setValue:f}=Y({resolver:J(Ce),mode:"all"});r.useEffect(()=>{(async()=>{try{const d=x.FETCH_ORGANIZATION(u),i=await O.get(d.url,{headers:d.headers}),p=K(i.data.data);f("org_name",p.org_name),f("status",p.status)}catch(d){console.error("Error fetching data",d)}})()},[u,f]);const D=async l=>{localStorage.getItem("token");const d={...l};try{g(!0);const i=x.UPDATE_ORGANIZATION(u),p=await O.post(i.url,d,{headers:i.headers});p.status===200?(y.success("Org Updated Successfully"),g(!1),a.toggleModal(),a.handlerefresh()):(console.error("Error in posting data",p),g(!1),y.error("Failed to Upload"))}catch(i){console.error("Error in posting data",i),g(!1)}};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ",children:e.jsxs("div",{className:"bg-white w-[522px] h-[358px]  font-lexend m-2 ",children:[e.jsx("div",{className:"border-b-2 border-gray-300 mx-10",children:e.jsx("h1",{className:"text-xl font-medium pt-10 pb-2",children:"Edit Organization"})}),e.jsxs("form",{onSubmit:S(D),children:[e.jsxs("div",{className:"mx-8 my-6",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-4",htmlFor:"org_name",children:"Organization Name"}),e.jsx("input",{className:"appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"org_name",type:"text",placeholder:" Organization Name",...N("org_name")}),c.org_name&&e.jsx("p",{className:"text-red-500",children:c.org_name.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:" grid grid-cols-3 mx-10 my-8",children:[e.jsx("label",{className:" text-gray-900 text-base font-normal  col-span-1",htmlFor:"status",children:"Status:"}),e.jsxs("select",{className:"   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none",id:"status",...N("status"),children:[e.jsx("option",{value:"",hidden:!0,children:"Status"}),e.jsx("option",{value:"active",children:"Active"}),e.jsx("option",{value:"inactive",children:"InActive"})]})]}),c.status&&e.jsx("p",{className:"text-red-500 text-xs text-center -mt-4 mb-2 ",children:c.status.message})]}),e.jsx(Q,{onCancel:a.toggleModal,isLoading:h})]})]})})},ke=`org_name,status,created_by_user
organization,active,admin`,Ke=({permissions:a})=>{const u=a==null?void 0:a.includes("create"),h=a==null?void 0:a.includes("edit"),g=a==null?void 0:a.includes("delete"),N=a==null?void 0:a.includes("download"),[c,S]=r.useState(!1),[v,f]=r.useState(!1),[D,l]=r.useState(null),[d,i]=r.useState(!1),[p,B]=r.useState(null),[A,W]=r.useState(""),[C,X]=r.useState(1),[I]=r.useState(8),[U,ee]=r.useState(1),[ze,te]=r.useState([]),[j,L]=r.useState([]),[F,ae]=r.useState(null);localStorage.getItem("token");const[se,R]=r.useState(null),[G,Z]=r.useState("Bulk Upload"),[re,ne]=r.useState(null),z=t=>{ae(F===t?null:t)},oe=t=>F===t;r.useEffect(()=>{_()},[A,C]);const le=t=>{t>0&&t<=U&&X(t)},_=()=>{O.get(x.GET_ORGANIZATION.url,{headers:x.GET_ORGANIZATION.headers}).then(t=>{const s=K(t.data.data);L(s);const b=s.filter(n=>Object.values(n).some(o=>o.toString().toLowerCase().includes(A.toLowerCase())));ee(Math.ceil(b.length/I));const m=C*I,w=m-I;te(b.slice(w,m))}).catch(t=>{console.error(t)})},ce=()=>{S(!c)},de=()=>{f(!v),l(null)},V=()=>{i(!d),B(null)},T=C*I,E=T-I,q=j.filter(t=>Object.values(t).some(s=>s.toString().toLowerCase().includes(A.toLowerCase()))),ie=q.slice().reverse().slice(E,T),me=async()=>{try{const t=x.DELETE_ORGANIZATION(p);await O.delete(t.url,{headers:x.DELETE_ORGANIZATION.headers}),V(),_(),L(j.filter(s=>j.org_id!==p)),y.success("Deleted successfully")}catch{y.error("Failed to delete")}},xe=t=>{R(t.target.files[0]),Z("Upload")},ue=()=>{G==="Bulk Upload"?document.getElementById("fileInput").click():he(se)},he=async t=>{try{const s=new FormData;s.append("file",t),(await O.post(x.CSV_ORGANIZATION.url,s,{headers:{"Content-Type":"multipart/form-data"}})).status===200?(Z("Bulk Upload"),R(null),_(),y.success("Data Uploaded Successfully")):y.error("Data failed to Upload")}catch(s){console.log(s)}},ge=t=>{ne(t.target.value)},fe=async t=>{if(t==="csv"){const s=j.map(o=>({org_id:o.org_id,org_name:o.org_name,status:o.status,created_by_user:o.created_by_user})),b=[Object.keys(s[0]).join(","),...s.map(o=>Object.values(o).join(","))].join(`
`),m=new Blob([b],{type:"text/csv;charset=utf-8;"}),w=window.URL.createObjectURL(m),n=document.createElement("a");n.setAttribute("href",w),n.setAttribute("download","Organization_data.csv"),n.style.visibility="hidden",document.body.appendChild(n),n.click(),document.body.removeChild(n)}else if(t==="pdf")try{const b=Math.ceil(j.length/30),m=new ve("l","mm","a4");let w=0;for(let n=1;n<=b;n++){const o=(n-1)*30,je=Math.min(o+30,j.length),be=j.slice(o,je).map(k=>[k.org_id,k.org_name,k.status,k.created_by_user]);m.text(`Page ${n}`,10,w+10),m.autoTable({startY:w+15,head:[["OrgID","OrgName","Status","createdBy"]],body:be,theme:"striped"}),n<b&&(m.addPage(),w=10)}m.save("Organization_data.pdf")}catch(s){console.error("Error exporting data:",s)}},pe=()=>{Ne(ke)};return e.jsxs(r.Fragment,{children:[e.jsx("div",{className:"  bg-blue-100 overflow-y-auto no-scrollbar",children:e.jsxs("div",{className:"h-screen ",children:[e.jsxs("div",{className:"flex flex-row md:justify-end gap-2 p-2 mt-2 mx-8 flex-wrap items-center",children:[e.jsx(Oe,{value:A,onChange:t=>W(t.target.value),placeholder:"Search Organization"}),u&&e.jsx(_e,{onChange:xe,buttonText:G,accept:".csv",onClick:ue}),N&&e.jsx(Se,{selectedDoc:re,onChange:ge,exportData:fe})]}),e.jsx(Ee,{title:"Organization",hasCreatePermission:u,onClick:()=>S(!0)}),e.jsx("div",{className:"bg-white mx-4 rounded-lg my-3  h-3/5 ",children:e.jsx("div",{className:"overflow-x-auto no-scrollbar my-2",children:e.jsxs("table",{className:"w-full  ",children:[e.jsx("thead",{className:" border-b-2 border-gray-300",children:e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("th",{className:"py-2",children:e.jsx("p",{className:" mx-6 my-2 font-lexend font-semibold whitespace-nowrap",children:"#"})}),e.jsx("th",{className:"",children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5 my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Org Name ",e.jsx(P,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Status ",e.jsx(P,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["CreatedBy ",e.jsx(P,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["CreatedAt ",e.jsx(P,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Last UpdatedAt ",e.jsx(P,{})]})}),e.jsx("th",{children:e.jsx("p",{className:"text-start mx-1.5 my-3 font-semibold font-lexend",children:"Action"})})]})}),e.jsx("tbody",{children:ie.map((t,s)=>e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("td",{className:"",children:e.jsx("div",{className:"items-center mx-6 my-2 font-lexend whitespace-nowrap text-sm text-center",children:E+s+1<10?`0${E+s+1}`:E+s+1})}),e.jsx("td",{className:"",children:e.jsx("p",{className:"capitalize mx-1.5 my-2 font-lexend text-start whitespace-nowrap text-sm text-gray-800",children:t.org_name})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm text-gray-800",children:t.status})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize mx-1.5  my-2  font-lexend text-start whitespace-nowrap text-sm text-gray-800",children:t.created_by_user})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-800 ",children:$(t.createdAt)})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-800",children:$(t.updatedAt)})}),e.jsx("td",{children:e.jsxs("div",{className:"flex justify-start mx-1.5 my-3",children:[e.jsx(ye,{onClick:()=>z(s)}),oe(s)&&e.jsxs("div",{className:" bg-white shadow-md rounded-lg ml-1",children:[h&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>{f(!0),l(t.org_id),z()},children:"Edit"}),g&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>{i(!0),B(t.org_id),z()},children:"Delete"})]})]})})]},s))})]})})}),e.jsxs("div",{className:" my-2 mb-5 mx-7",children:[e.jsx(Ie,{handleDownload:pe}),e.jsx(De,{Length:j.length,currentPage:C,totalPages:U,firstIndex:E,lastIndex:T,paginate:le,hasNextPage:T>=q.length})]})]})}),c&&e.jsx(Ae,{toggleModal:ce,handlerefresh:_}),v&&e.jsx(Te,{toggleModal:de,handlerefresh:_,orgId:D}),d&&e.jsx(we,{toggleDeleteModal:V,delete:me})]})};export{Ke as default};
