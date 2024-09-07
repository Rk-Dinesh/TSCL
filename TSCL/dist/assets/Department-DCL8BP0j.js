import{i as W,k as $,r as n,l as X,o as Z,j as e,b as v,A as S,B as N,d as R,p as ve,m as Q,n as Se}from"./index-KlxDuXca.js";import{R as C,P as ke}from"./Pagination-CZoS4CI6.js";import{S as ee}from"./SavaCancel-DnY9KWLv.js";import{D as Pe}from"./DeleteModal-Bq2aEtZp.js";import{S as Ce,D as Oe,E as Ie}from"./DocumentDownload-Cf_kB8s3.js";import{F as Be,B as Ee}from"./FileUploadButton-Bc1PelCC.js";import{H as ze}from"./HeaderButton-D4Lkrp4E.js";import"./index-BebfzzXM.js";import"./index-BKjO-751.js";import"./index-D_Jj7K4f.js";const $e=W().shape({org_name:$().test("not-select","Please select an Organization",a=>a!==""&&a!=="Select  Organization"),dept_name:$().required("Department is required")}),Ae=({ExistingOrganiZations:a,toggleModal:j,handlerefresh:O})=>{const[_,A]=n.useState(null),[x,m]=n.useState(null),{register:h,formState:{errors:p},handleSubmit:b,watch:u}=X({resolver:Z($e),mode:"all"});n.useEffect(()=>{if(x){const r=a.find(P=>P.org_name===x);r&&A(r.org_id)}},[x,a]);const k=async r=>{const P={...r,org_id:_,status:"active",created_by_user:sessionStorage.getItem("name")};try{const y=sessionStorage.getItem("token"),o=await v.post(`${S}/department/post`,P,{headers:{Authorization:`Bearer ${y}`}});o.status===200?(N.success("Department created Successfully"),j(),O()):(console.error("Error in posting data",o),N.error("Failed to Upload"))}catch(y){console.error("Error in posting data",y)}};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center",children:e.jsxs("div",{className:"bg-white w-[522px] h-[368px] font-lexend m-2",children:[e.jsx("div",{className:"border-b-2 border-gray-300 mx-10",children:e.jsx("h1",{className:"text-xl font-medium pt-10 pb-2",children:"Add Department"})}),e.jsxs("form",{onSubmit:b(k),children:[e.jsxs("div",{className:"mx-6 my-3",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-3",htmlFor:"org_name",children:"Organization Name"}),e.jsxs("select",{className:"appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"org_name",...h("org_name"),onChange:r=>m(r.target.value),children:[e.jsx("option",{value:"",children:"Select Organization"}),a.map(r=>e.jsx("option",{value:r.org_name,children:r.org_name},r.org_id))]}),p.org_name&&e.jsx("p",{className:"text-red-500",children:p.org_name.message})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-3",htmlFor:"dept_name",children:"Department Name"}),e.jsx("input",{className:"appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"dept_name",type:"text",placeholder:"Department Name",...h("dept_name")}),p.dept_name&&e.jsx("p",{className:"text-red-500",children:p.dept_name.message})]})]}),e.jsx(ee,{onCancel:j})]})]})})},Ue=W().shape({org_name:$().test("not-select","Please select an Organization",a=>a!==""&&a!=="Select  Organization"),dept_name:$().required("Department is required"),status:$().test("not-select","Please select an Status",a=>a!==""&&a!=="Status")}),Fe=({ExistingOrganiZations:a,toggleModal:j,handlerefresh:O,deptId:_})=>{const[A,x]=n.useState(null),[m,h]=n.useState(null),p=sessionStorage.getItem("token"),{register:b,formState:{errors:u},handleSubmit:k,setValue:r,watch:P}=X({resolver:Z(Ue),mode:"all"});n.useEffect(()=>{(async()=>{try{const g=await v.get(`${S}/department/getbyid?dept_id=${_}`,{headers:{Authorization:`Bearer ${p}`}}),l=R(g.data.data);r("org_name",l.org_name),h(l.org_name),r("dept_name",l.dept_name),r("status",l.status)}catch(g){console.error("Error fetching data",g)}})()},[_,r]),n.useEffect(()=>{if(m){const o=a.find(g=>g.org_name===m);o&&x(o.org_id)}},[m,a]);const y=async o=>{const g={...o};try{const l=await v.post(`${S}/department/update?dept_id=${_}`,g,{headers:{Authorization:`Bearer ${p}`}});l.status===200?(N.success("Department Updated Successfully"),h(null),x(null),j(),O()):(console.error("Error in posting data",l),N.error("Failed to Upload"))}catch(l){console.error("Error in posting data",l)}};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center",children:e.jsxs("div",{className:"bg-white w-[522px] h-[368px] font-lexend m-2",children:[e.jsx("div",{className:"border-b-2 border-gray-300 mx-10",children:e.jsx("h1",{className:"text-xl font-medium pt-6 pb-2",children:"Edit Department"})}),e.jsxs("form",{onSubmit:k(y),children:[e.jsxs("div",{className:"mx-6 my-2",children:[e.jsxs("div",{className:"mb-2",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-2",htmlFor:"org_name",children:"Organization Name"}),e.jsxs("select",{className:"appearance-none border rounded-lg w-full py-1.5 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"org_name",...b("org_name"),onChange:o=>h(o.target.value),children:[e.jsx("option",{value:m,disabled:!0,children:m}),a.map(o=>e.jsx("option",{value:o.org_name,children:o.org_name},o.org_id))]}),u.org_name&&e.jsx("p",{className:"text-red-500",children:u.org_name.message})]}),e.jsxs("div",{className:"mb-2",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-2",htmlFor:"dept_name",children:"Department Name"}),e.jsx("input",{className:"appearance-none border rounded-lg w-full py-1.5 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"dept_name",type:"text",placeholder:"Department Name",...b("dept_name")}),u.dept_name&&e.jsx("p",{className:"text-red-500",children:u.dept_name.message})]}),e.jsxs("div",{className:" grid grid-cols-3 mx-3 my-3 ",children:[e.jsx("label",{className:" text-gray-900 text-base font-normal  col-span-1",htmlFor:"status",children:"Status:"}),e.jsxs("select",{className:"   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none",id:"status",...b("status"),children:[e.jsx("option",{value:"",hidden:!0,children:"Status"}),e.jsx("option",{value:"active",children:"Active"}),e.jsx("option",{value:"inactive",children:"InActive"})]}),u.status&&e.jsx("p",{className:"text-red-500 text-xs text-center mb-3 ",children:u.status.message})]})]}),e.jsx(ee,{onCancel:j})]})]})})},Me=`dept_name,org_name,status,created_by_user
Department,Organization,active,admin`,Xe=({permissions:a})=>{const j=a==null?void 0:a.includes("create"),O=a==null?void 0:a.includes("edit"),_=a==null?void 0:a.includes("delete"),A=a==null?void 0:a.includes("download"),[x,m]=n.useState(!1),[h,p]=n.useState(!1),[b,u]=n.useState(!1),[k,r]=n.useState(null),[P,y]=n.useState(null),[o,g]=n.useState(null),[l,te]=n.useState(""),[U,ae]=n.useState(1),[I]=n.useState(8),[T,se]=n.useState(1),[Le,ne]=n.useState([]),[w,q]=n.useState([]),[V,re]=n.useState(null),M=sessionStorage.getItem("token"),[oe,H]=n.useState(null),[Y,G]=n.useState("Bulk Upload"),[le,ce]=n.useState(null),L=t=>{re(V===t?null:t)},de=t=>V===t;n.useEffect(()=>{B(),ue()},[l,U]);const ie=t=>{t>0&&t<=T&&ae(t)},B=()=>{v.get(`${S}/department/get`,{headers:{Authorization:`Bearer ${M}`}}).then(t=>{const s=R(t.data.data);q(s);const d=s.filter(c=>Object.values(c).some(i=>i.toString().toLowerCase().includes(l.toLowerCase())));se(Math.ceil(d.length/I));const f=U*I,D=f-I;ne(d.slice(D,f))})},me=()=>{m(!x)},xe=()=>{p(!h),y(null)},pe=()=>{m(!x)},J=()=>{u(!b),r(null)},ue=async()=>{try{const t=await v.get(`${S}/organization/getactive`,{headers:{Authorization:`Bearer ${M}`}}),s=R(t.data.data);g(s)}catch(t){console.error("Error fetching existing Organisations:",t)}},F=U*I,E=F-I,K=w.filter(t=>Object.values(t).some(s=>s.toString().toLowerCase().includes(l.toLowerCase()))),he=K.slice().reverse().slice(E,F),ge=async()=>{try{await v.delete(`${S}/department/delete?dept_id=${k}`,{headers:{Authorization:`Bearer ${M}`}}),J(),B(),q(w.filter(t=>w.dept_id!==k)),N.success("Deleted successfully")}catch{N.error("Failed to delete")}},fe=t=>{H(t.target.files[0]),G("Upload")},je=()=>{Y==="Bulk Upload"?document.getElementById("fileInput").click():be(oe)},be=async t=>{try{const s=new FormData;s.append("file",t),(await v.post(`${S}/department/uploadcsv`,s,{headers:{"Content-Type":"multipart/form-data"}})).status===200?(G("Bulk Upload"),H(null),B(),N.success("Data Uploaded Successfully")):N.error("Data failed to Upload")}catch(s){console.log(s)}},ye=t=>{ce(t.target.value)},we=async t=>{if(t==="csv"){const s=w.map(i=>({dept_id:i.dept_id,dept_name:i.dept_name,org_name:i.org_name,status:i.status,created_by_user:i.created_by_user})),d=[Object.keys(s[0]).join(","),...s.map(i=>Object.values(i).join(","))].join(`
`),f=new Blob([d],{type:"text/csv;charset=utf-8;"}),D=window.URL.createObjectURL(f),c=document.createElement("a");c.setAttribute("href",D),c.setAttribute("download","Department_data.csv"),c.style.visibility="hidden",document.body.appendChild(c),c.click(),document.body.removeChild(c)}else if(t==="pdf")try{const d=Math.ceil(w.length/30),f=new Ie("l","mm","a4");let D=0;for(let c=1;c<=d;c++){const i=(c-1)*30,_e=Math.min(i+30,w.length),De=w.slice(i,_e).map(z=>[z.dept_id,z.dept_name,z.org_name,z.status,z.created_by_user]);f.text(`Page ${c}`,10,D+10),f.autoTable({startY:D+15,head:[["DeptId","DeptName","OrgName","Status","createdBy"]],body:De,theme:"striped"}),c<d&&(f.addPage(),D=10)}f.save("Department_data.pdf")}catch(s){console.error("Error exporting data:",s)}},Ne=()=>{const t=new Blob([Me],{type:"text/csv"}),s=URL.createObjectURL(t),d=document.createElement("a");d.href=s,d.download="bulkupload_template.csv",d.click(),URL.revokeObjectURL(s)};return e.jsxs(n.Fragment,{children:[e.jsx("div",{className:"  bg-blue-100 overflow-y-auto no-scrollbar",children:e.jsxs("div",{className:"h-screen",children:[e.jsxs("div",{className:"flex flex-row items-center md:justify-end gap-3 p-2 mt-3 mx-8 flex-wrap",children:[e.jsx(Ce,{value:l,onChange:t=>te(t.target.value),placeholder:"Search Department"}),j&&e.jsx(Be,{onChange:fe,buttonText:Y,accept:".csv",onClick:je}),A&&e.jsx(Oe,{selectedDoc:le,onChange:ye,exportData:we})]}),e.jsx(ze,{title:"Department",hasCreatePermission:j,onClick:()=>m(!0)}),e.jsx("div",{className:"bg-white mx-4 rounded-lg my-3 overflow-x-auto h-3/5 no-scrollbar",children:e.jsxs("table",{className:"w-full  mt-3",children:[e.jsx("thead",{className:"",children:e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("th",{className:"py-2",children:e.jsx("p",{className:" mx-6 my-2 font-lexend font-semibold whitespace-nowrap",children:"#"})}),e.jsx("th",{className:"",children:e.jsxs("p",{className:"flex gap-2 items-center mx-3 my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Department Name ",e.jsx(C,{})]})}),e.jsx("th",{className:"",children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5 my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Org Name ",e.jsx(C,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold  whitespace-nowrap",children:["Status ",e.jsx(C,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["CreatedBy ",e.jsx(C,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["CreatedAt ",e.jsx(C,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Last UpdatedAt ",e.jsx(C,{})]})}),e.jsx("th",{children:e.jsx("p",{className:"text-center mx-1.5 my-3 font-semibold font-lexend  whitespace-nowrap",children:"Action"})})]})}),e.jsx("tbody",{children:he.map((t,s)=>e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("td",{className:"",children:e.jsx("div",{className:"items-center mx-6 my-2 font-lexend whitespace-nowrap text-sm text-center text-gray-800",children:E+s+1<10?`0${E+s+1}`:E+s+1})}),e.jsx("td",{children:e.jsxs("div",{className:"flex  gap-2 items-center justify-start mx-5 my-3  text-sm text-gray-800",children:[e.jsx("img",{src:ve,alt:"logo",className:"w-8 h-8"}),e.jsxs("p",{className:"font-lexend whitespace-nowrap capitalize   text-gray-800",children:[" ",t.dept_name]})]})}),e.jsx("td",{className:"",children:e.jsx("p",{className:"capitalize mx-3 my-2 font-lexend text-start whitespace-nowrap text-sm text-gray-800",children:t.org_name})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm text-gray-800",children:t.status})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize mx-1.5  my-2  font-lexend text-start whitespace-nowrap text-sm text-gray-800",children:t.created_by_user})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-800 ",children:Q(t.createdAt)})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-800",children:Q(t.updatedAt)})}),e.jsx("td",{children:e.jsxs("div",{className:"flex justify-start mx-1.5 my-3",children:[e.jsx(Se,{onClick:()=>L(s)}),de(s)&&e.jsxs("div",{className:" bg-white shadow-md rounded-lg ml-1",children:[O&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>{p(!0),y(t.dept_id),L()},children:"Edit"}),_&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>{u(!0),r(t.dept_id),L()},children:"Delete"})]})]})})]},s))})]})}),e.jsxs("div",{className:" my-3 mb-5 mx-7",children:[e.jsx(Ee,{handleDownload:Ne}),e.jsx(ke,{Length:w.length,currentPage:U,totalPages:T,firstIndex:E,lastIndex:F,paginate:ie,hasNextPage:F>=K.length})]})]})}),x&&e.jsx(Ae,{toggleModal:me,toggleCloseModal:pe,ExistingOrganiZations:o,handlerefresh:B}),h&&e.jsx(Fe,{toggleModal:xe,handlerefresh:B,ExistingOrganiZations:o,deptId:P}),b&&e.jsx(Pe,{toggleDeleteModal:J,delete:ge})]})};export{Xe as default};
