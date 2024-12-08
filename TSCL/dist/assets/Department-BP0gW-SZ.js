import{i as K,k as M,r as n,m as Q,o as W,j as e,b as S,B as w,d as z,x as we,D as Ee,y as ve,q as P,C as Se,s as J,v as Pe,w as Te,E as Ce,z as Oe}from"./index-DP2NNKOn.js";import{S as X}from"./SavaCancel-Ci3tLGq5.js";import{A as h}from"./ApiClient-CPCcZu9F.js";import{D as Ie}from"./DeleteModal-DMwKPp4R.js";import{F as Ae,B as ke}from"./FileUploadButton-CMAr70dn.js";const Me=K().shape({org_name:M().test("not-select","Please select an Organization",a=>a!==""&&a!=="Select  Organization"),dept_name:M().required("Department is required")}),Be=({ExistingOrganiZations:a,toggleModal:y,handlerefresh:T})=>{const[E,B]=n.useState(null),[p,m]=n.useState(null),{register:g,formState:{errors:x},handleSubmit:u,watch:C}=Q({resolver:W(Me),mode:"all"});n.useEffect(()=>{if(p){const o=a.find(j=>j.org_name===p);o&&B(o.org_id)}},[p,a]);const f=async o=>{const j={...o,org_id:E,status:"active",created_by_user:localStorage.getItem("name")};try{const r=await S.post(h.POST_DEPARTMENT.url,j,{headers:h.POST_DEPARTMENT.headers});r.status===200?(w.success("Department created Successfully"),y(),T()):(console.error("Error in posting data",r),w.error("Failed to Upload"))}catch(r){console.error("Error in posting data",r)}};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center",children:e.jsxs("div",{className:"bg-white w-[522px] h-[368px] font-lexend m-2",children:[e.jsx("div",{className:"border-b-2 border-gray-300 mx-10",children:e.jsx("h1",{className:"text-xl font-medium pt-10 pb-2",children:"Add Department"})}),e.jsxs("form",{onSubmit:u(f),children:[e.jsxs("div",{className:"mx-6 my-3",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-3",htmlFor:"org_name",children:"Organization Name"}),e.jsxs("select",{className:"appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"org_name",...g("org_name"),onChange:o=>m(o.target.value),children:[e.jsx("option",{value:"",children:"Select Organization"}),a.map((o,j)=>e.jsx("option",{value:o.org_name,children:o.org_name},j))]}),x.org_name&&e.jsx("p",{className:"text-red-500",children:x.org_name.message})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-3",htmlFor:"dept_name",children:"Department Name"}),e.jsx("input",{className:"appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"dept_name",type:"text",placeholder:"Department Name",...g("dept_name")}),x.dept_name&&e.jsx("p",{className:"text-red-500",children:x.dept_name.message})]})]}),e.jsx(X,{onCancel:y})]})]})})},Fe=K().shape({org_name:M().test("not-select","Please select an Organization",a=>a!==""&&a!=="Select  Organization"),dept_name:M().required("Department is required"),status:M().test("not-select","Please select an Status",a=>a!==""&&a!=="Status")}),Ue=({ExistingOrganiZations:a,toggleModal:y,handlerefresh:T,deptId:E})=>{const[B,p]=n.useState(null),[m,g]=n.useState(null),{register:x,formState:{errors:u},handleSubmit:C,setValue:f,watch:o}=Q({resolver:W(Fe),mode:"all"});n.useEffect(()=>{(async()=>{try{const c=h.FETCH_DEPARTMENT(E),N=await S.get(c.url,{headers:c.headers}),d=z(N.data.data);f("org_name",d.org_name),g(d.org_name),f("dept_name",d.dept_name),f("status",d.status)}catch(c){console.error("Error fetching data",c)}})()},[E,f]),n.useEffect(()=>{if(m){const r=a.find(c=>c.org_name===m);r&&p(r.org_id)}},[m,a]);const j=async r=>{const c={...r};try{const N=h.UPDATE_DEPARTMENT(E),d=await S.post(N.url,c,{headers:N.headers});d.status===200?(w.success("Department Updated Successfully"),g(null),p(null),y(),T()):(console.error("Error in posting data",d),w.error("Failed to Upload"))}catch(N){console.error("Error in posting data",N)}};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center",children:e.jsxs("div",{className:"bg-white w-[522px] h-[368px] font-lexend m-2",children:[e.jsx("div",{className:"border-b-2 border-gray-300 mx-10",children:e.jsx("h1",{className:"text-xl font-medium pt-6 pb-2",children:"Edit Department"})}),e.jsxs("form",{onSubmit:C(j),children:[e.jsxs("div",{className:"mx-6 my-2",children:[e.jsxs("div",{className:"mb-2",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-2",htmlFor:"org_name",children:"Organization Name"}),e.jsxs("select",{className:"appearance-none border rounded-lg w-full py-1.5 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"org_name",...x("org_name"),onChange:r=>g(r.target.value),children:[e.jsx("option",{value:m,disabled:!0,children:m}),a.map((r,c)=>e.jsx("option",{value:r.org_name,children:r.org_name},c))]}),u.org_name&&e.jsx("p",{className:"text-red-500",children:u.org_name.message})]}),e.jsxs("div",{className:"mb-2",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-2",htmlFor:"dept_name",children:"Department Name"}),e.jsx("input",{className:"appearance-none border rounded-lg w-full py-1.5 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"dept_name",type:"text",placeholder:"Department Name",...x("dept_name")}),u.dept_name&&e.jsx("p",{className:"text-red-500",children:u.dept_name.message})]}),e.jsxs("div",{className:" grid grid-cols-3 mx-3 my-3 ",children:[e.jsx("label",{className:" text-gray-900 text-base font-normal  col-span-1",htmlFor:"status",children:"Status:"}),e.jsxs("select",{className:"   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none",id:"status",...x("status"),children:[e.jsx("option",{value:"",hidden:!0,children:"Status"}),e.jsx("option",{value:"active",children:"Active"}),e.jsx("option",{value:"inactive",children:"InActive"})]}),u.status&&e.jsx("p",{className:"text-red-500 text-xs text-center mb-3 ",children:u.status.message})]})]}),e.jsx(X,{onCancel:y})]})]})})},Re=`dept_name,org_name,status,created_by_user
Department,Organization,active,admin`,Ye=({permissions:a})=>{const y=a==null?void 0:a.includes("create"),T=a==null?void 0:a.includes("edit"),E=a==null?void 0:a.includes("delete"),B=a==null?void 0:a.includes("download"),[p,m]=n.useState(!1),[g,x]=n.useState(!1),[u,C]=n.useState(!1),[f,o]=n.useState(null),[j,r]=n.useState(null),[c,N]=n.useState(null),[d,ee]=n.useState(""),[F,te]=n.useState(1),[O]=n.useState(8),[L,ae]=n.useState(1),[ze,se]=n.useState([]),[D,V]=n.useState([]),[G,ne]=n.useState(null),[re,q]=n.useState(null),[$,H]=n.useState("Bulk Upload"),[le,oe]=n.useState(null),R=t=>{ne(G===t?null:t)},ce=t=>G===t;n.useEffect(()=>{I(),ue()},[d,F]);const de=t=>{t>0&&t<=L&&te(t)},I=()=>{S.get(h.GET_DEPARTMENT.url,{headers:h.GET_DEPARTMENT.headers}).then(t=>{const s=z(t.data.data);V(s);const _=s.filter(l=>Object.values(l).some(i=>i.toString().toLowerCase().includes(d.toLowerCase())));ae(Math.ceil(_.length/O));const b=F*O,v=b-O;se(_.slice(v,b))})},ie=()=>{m(!p)},me=()=>{x(!g),r(null)},xe=()=>{m(!p)},Y=()=>{C(!u),o(null)},ue=async()=>{try{const t=await S.get(h.GET_ORGANIZATIONACTIVE.url,{headers:h.GET_ORGANIZATIONACTIVE.headers}),s=z(t.data.data);N(s)}catch(t){console.error("Error fetching existing Organisations:",t)}},U=F*O,A=U-O,Z=D.filter(t=>Object.values(t).some(s=>s.toString().toLowerCase().includes(d.toLowerCase()))),pe=Z.slice().reverse().slice(A,U),he=async()=>{try{const t=h.DELETE_DEPARTMENT(f);await S.delete(t.url,{headers:t.headers}),Y(),I(),V(D.filter(s=>D.dept_id!==f)),w.success("Deleted successfully")}catch{w.error("Failed to delete")}},ge=t=>{q(t.target.files[0]),H("Upload")},fe=()=>{$==="Bulk Upload"?document.getElementById("fileInput").click():je(re)},je=async t=>{try{const s=new FormData;s.append("file",t),(await S.post(h.CSV_DEPARTMENT.url,s,{headers:{"Content-Type":"multipart/form-data"}})).status===200?(H("Bulk Upload"),q(null),I(),w.success("Data Uploaded Successfully")):w.error("Data failed to Upload")}catch(s){console.log(s)}},be=t=>{oe(t.target.value)},ye=async t=>{if(t==="csv"){const s=D.map(i=>({dept_id:i.dept_id,dept_name:i.dept_name,org_name:i.org_name,status:i.status,created_by_user:i.created_by_user})),_=[Object.keys(s[0]).join(","),...s.map(i=>Object.values(i).join(","))].join(`
`),b=new Blob([_],{type:"text/csv;charset=utf-8;"}),v=window.URL.createObjectURL(b),l=document.createElement("a");l.setAttribute("href",v),l.setAttribute("download","Department_data.csv"),l.style.visibility="hidden",document.body.appendChild(l),l.click(),document.body.removeChild(l)}else if(t==="pdf")try{const _=Math.ceil(D.length/30),b=new Ce("l","mm","a4");let v=0;for(let l=1;l<=_;l++){const i=(l-1)*30,De=Math.min(i+30,D.length),_e=D.slice(i,De).map(k=>[k.dept_id,k.dept_name,k.org_name,k.status,k.created_by_user]);b.text(`Page ${l}`,10,v+10),b.autoTable({startY:v+15,head:[["DeptId","DeptName","OrgName","Status","createdBy"]],body:_e,theme:"striped"}),l<_&&(b.addPage(),v=10)}b.save("Department_data.pdf")}catch(s){console.error("Error exporting data:",s)}},Ne=()=>{Oe(Re)};return e.jsxs(n.Fragment,{children:[e.jsx("div",{className:"  bg-blue-100 overflow-y-auto no-scrollbar",children:e.jsxs("div",{className:"h-screen",children:[e.jsxs("div",{className:"flex flex-row items-center md:justify-end gap-3 p-2 mt-1 mx-8 flex-wrap",children:[e.jsx(we,{value:d,onChange:t=>ee(t.target.value),placeholder:"Search Department"}),y&&e.jsx(Ae,{onChange:ge,buttonText:$,accept:".csv",onClick:fe}),B&&e.jsx(Ee,{selectedDoc:le,onChange:be,exportData:ye})]}),e.jsx(ve,{title:"Department",hasCreatePermission:y,onClick:()=>m(!0)}),e.jsx("div",{className:"bg-white mx-4 rounded-lg my-2 overflow-x-auto h-3/5 no-scrollbar",children:e.jsxs("table",{className:"w-full  mt-3",children:[e.jsx("thead",{className:"",children:e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("th",{className:"py-2",children:e.jsx("p",{className:" mx-6 my-2 font-lexend font-semibold whitespace-nowrap",children:"#"})}),e.jsx("th",{className:"",children:e.jsxs("p",{className:"flex gap-2 items-center mx-3 my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Department Name ",e.jsx(P,{})]})}),e.jsx("th",{className:"",children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5 my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Org Name ",e.jsx(P,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold  whitespace-nowrap",children:["Status ",e.jsx(P,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["CreatedBy ",e.jsx(P,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["CreatedAt ",e.jsx(P,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Last UpdatedAt ",e.jsx(P,{})]})}),e.jsx("th",{children:e.jsx("p",{className:"text-center mx-1.5 my-3 font-semibold font-lexend  whitespace-nowrap",children:"Action"})})]})}),e.jsx("tbody",{children:pe.map((t,s)=>e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("td",{className:"",children:e.jsx("div",{className:"items-center mx-6 my-2 font-lexend whitespace-nowrap text-sm text-center text-gray-800",children:A+s+1<10?`0${A+s+1}`:A+s+1})}),e.jsx("td",{children:e.jsxs("div",{className:"flex  gap-2 items-center justify-start mx-5 my-3  text-sm text-gray-800",children:[e.jsx("img",{src:Se,alt:"logo",className:"w-8 h-8"}),e.jsxs("p",{className:"font-lexend whitespace-nowrap capitalize   text-gray-800",children:[" ",t.dept_name]})]})}),e.jsx("td",{className:"",children:e.jsx("p",{className:"capitalize mx-3 my-2 font-lexend text-start whitespace-nowrap text-sm text-gray-800",children:t.org_name})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm text-gray-800",children:t.status})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize mx-1.5  my-2  font-lexend text-start whitespace-nowrap text-sm text-gray-800",children:t.created_by_user})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-800 ",children:J(t.createdAt)})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-800",children:J(t.updatedAt)})}),e.jsx("td",{children:e.jsxs("div",{className:"flex justify-start mx-1.5 my-3",children:[e.jsx(Pe,{onClick:()=>R(s)}),ce(s)&&e.jsxs("div",{className:" bg-white shadow-md rounded-lg ml-1",children:[T&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>{x(!0),r(t.dept_id),R()},children:"Edit"}),E&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>{C(!0),o(t.dept_id),R()},children:"Delete"})]})]})})]},s))})]})}),e.jsxs("div",{className:" my-2 mb-5 mx-7",children:[e.jsx(ke,{handleDownload:Ne}),e.jsx(Te,{Length:D.length,currentPage:F,totalPages:L,firstIndex:A,lastIndex:U,paginate:de,hasNextPage:U>=Z.length})]})]})}),p&&e.jsx(Be,{toggleModal:ie,toggleCloseModal:xe,ExistingOrganiZations:c,handlerefresh:I}),g&&e.jsx(Ue,{toggleModal:me,handlerefresh:I,ExistingOrganiZations:c,deptId:j}),u&&e.jsx(Ie,{toggleDeleteModal:Y,delete:he})]})};export{Ye as default};
