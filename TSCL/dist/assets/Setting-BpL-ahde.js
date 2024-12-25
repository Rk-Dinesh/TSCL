import{r as a,u as K,b as D,A as S,d as Q,j as e,q as I,s as W,B as k}from"./index-Cb3AN3R3.js";import{R as c}from"./index-C-hq6bKM.js";import{D as X}from"./DeleteModal-De28Bu6M.js";import{P as Y}from"./Pagination-ClPqWgoN.js";import{S as Z}from"./SearchHeader-Cu036AJA.js";import"./index-Du0g9a49.js";import"./index-BK6gNoz8.js";const oe=({permissions:l})=>{const A=l==null?void 0:l.includes("create"),z=l==null?void 0:l.includes("edit"),E=l==null?void 0:l.includes("delete"),[m,h]=a.useState(!1),[_,p]=a.useState(null),[o,$]=a.useState(""),[d,j]=a.useState(1),[r,L]=a.useState(10),[u,M]=a.useState(1),[ee,O]=a.useState([]),[x,R]=a.useState([]),[f,B]=a.useState(null),g=localStorage.getItem("token"),w=K(),y=t=>{B(f===t?null:t)},F=t=>f===t;a.useEffect(()=>{b()},[o,d,r]);const V=t=>{t>0&&t<=u&&j(t)},b=()=>{D.get(`${S}/role/get`,{headers:{Authorization:`Bearer ${g}`}}).then(t=>{const s=Q(t.data.data);R(s);const P=s.filter(G=>Object.values(G).some(J=>J.toString().toLowerCase().includes(o.toLowerCase())));M(Math.ceil(P.length/r));const C=d*r,H=C-r;O(P.slice(H,C))}).catch(t=>{console.error(t)})},N=()=>{h(!m),p(null)},i=d*r,n=i-r,v=x.filter(t=>Object.values(t).some(s=>s.toString().toLowerCase().includes(o.toLowerCase()))),T=v.slice().reverse().slice(n,i),U=async()=>{try{await D.delete(`${S}/role/delete?role_id=${_}`,{headers:{Authorization:`Bearer ${g}`}}),N(),b(),k.success("Deleted successfully")}catch{k.error("Failed to delete")}},q=t=>{const s=parseInt(t.target.value,10);L(s),j(1)};return e.jsxs(a.Fragment,{children:[e.jsx("div",{className:"  bg-blue-100 overflow-y-auto no-scrollbar",children:e.jsxs("div",{className:"h-screen mt-10",children:[e.jsx(Z,{title:"Role Access",hasCreatePermission:A,onClick:()=>w("/roleform"),searchValue:o,setSearchValue:$}),e.jsxs("div",{className:`bg-white  mx-4 rounded-lg overflow-x-auto mt-1  p-3 ${x.length<7?"h-3/5":"h-fit"}`,children:[e.jsxs("div",{className:"flex items-center gap-3 mx-3",children:[e.jsx("label",{htmlFor:"itemsPerPage",className:"font-medium text-gray-600",children:"Page Entries"}),e.jsxs("select",{id:"itemsPerPage",value:r,onChange:q,className:" p-1 outline-none text-sm rounded px-2",children:[e.jsx("option",{value:"10",children:"10"}),e.jsx("option",{value:"20",children:"20"}),e.jsx("option",{value:"50",children:"50"}),e.jsx("option",{value:"100",children:"100"})]})]}),e.jsx("div",{className:"overflow-x-auto  ",children:e.jsxs("table",{className:"w-full  mt-3",children:[e.jsx("thead",{className:" border-b-2 border-gray-300",children:e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("th",{className:"",children:e.jsx("p",{className:" mx-6 my-2 font-lexend font-semibold whitespace-nowrap",children:"#"})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font- whitespace-nowrap",children:["Role Name ",e.jsx(c,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Status ",e.jsx(c,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["CreatedBy ",e.jsx(c,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["CreatedAt ",e.jsx(c,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["UpdatedAt ",e.jsx(c,{})]})}),e.jsx("th",{children:e.jsx("p",{className:"mx-1.5 my-2 font-semibold font-lexend whitespace-nowrap text-center",children:"Action"})})]})}),e.jsx("tbody",{children:T.map((t,s)=>e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("td",{className:"",children:e.jsx("p",{className:" mx-3 my-2 font-lexend text-center whitespace-nowrap text-sm text-gray-700",children:n+s+1<10?`0${n+s+1}`:n+s+1})}),e.jsx("td",{children:e.jsx("p",{className:"mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm capitalize text-gray-700",children:t.role_name})}),e.jsx("td",{children:e.jsx("p",{className:" mx-1.5  my-2  font-lexend text-start whitespace-nowrap text-sm capitalize text-gray-700",children:t.status})}),e.jsx("td",{children:e.jsx("p",{className:"text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:t.created_by_user})}),e.jsx("td",{children:e.jsx("p",{className:"text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:I(t.createdAt)})}),e.jsx("td",{children:e.jsx("p",{className:"text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:I(t.updatedAt)})}),e.jsx("td",{children:e.jsxs("div",{className:"flex justify-start mx-1.5 my-3",children:[e.jsx(W,{onClick:()=>y(s)}),F(s)&&e.jsxs("div",{className:" bg-white shadow-md rounded-lg ml-1",children:[z&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>w("/editrole",{state:{role_id:t.role_id}}),children:"Edit"}),E&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>{h(!0),p(t.role_id),y()},children:"Delete"})]})]})})]},s))})]})})]}),e.jsx("div",{className:" my-3 mb-5 mx-7",children:e.jsx(Y,{Length:x.length,currentPage:d,totalPages:u,firstIndex:n,lastIndex:i,paginate:V,hasNextPage:i>=v.length})})]})}),m&&e.jsx(X,{toggleDeleteModal:N,delete:U})]})};export{oe as default};
