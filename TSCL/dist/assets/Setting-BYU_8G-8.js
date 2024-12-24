import{r as a,u as G,b as S,A as C,d as J,j as e,S as K,q as c,s as P,v as Q,w as W,B as I}from"./index-tsgvEHmX.js";import{D as X}from"./DeleteModal-DJp1pd7G.js";const te=({permissions:l})=>{const k=l==null?void 0:l.includes("create"),A=l==null?void 0:l.includes("edit"),z=l==null?void 0:l.includes("delete"),[i,h]=a.useState(!1),[_,m]=a.useState(null),[o,E]=a.useState(""),[d,L]=a.useState(1),[r]=a.useState(8),[j,M]=a.useState(1),[Y,O]=a.useState([]),[p,$]=a.useState([]),[u,B]=a.useState(null),f=localStorage.getItem("token"),g=G(),w=t=>{B(u===t?null:t)},R=t=>u===t;a.useEffect(()=>{y()},[o,d]);const V=t=>{t>0&&t<=j&&L(t)},y=()=>{S.get(`${C}/role/get`,{headers:{Authorization:`Bearer ${f}`}}).then(t=>{const s=J(t.data.data);$(s);const D=s.filter(q=>Object.values(q).some(H=>H.toString().toLowerCase().includes(o.toLowerCase())));M(Math.ceil(D.length/r));const v=d*r,U=v-r;O(D.slice(U,v))}).catch(t=>{console.error(t)})},b=()=>{h(!i),m(null)},x=d*r,n=x-r,N=p.filter(t=>Object.values(t).some(s=>s.toString().toLowerCase().includes(o.toLowerCase()))),F=N.slice().reverse().slice(n,x),T=async()=>{try{await S.delete(`${C}/role/delete?role_id=${_}`,{headers:{Authorization:`Bearer ${f}`}}),b(),y(),I.success("Deleted successfully")}catch{I.error("Failed to delete")}};return e.jsxs(a.Fragment,{children:[e.jsx("div",{className:"  bg-blue-100 overflow-y-auto no-scrollbar",children:e.jsxs("div",{className:"h-screen mt-10",children:[e.jsx(K,{title:"Role Access",hasCreatePermission:k,onClick:()=>g("/roleform"),searchValue:o,setSearchValue:E}),e.jsx("div",{className:"bg-white mx-4 rounded-lg my-3 h-3/5 ",children:e.jsx("div",{className:"overflow-x-auto  no-scrollbar",children:e.jsxs("table",{className:"w-full  mt-3",children:[e.jsx("thead",{className:" border-b-2 border-gray-300",children:e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("th",{className:"",children:e.jsx("p",{className:" mx-6 my-2 font-lexend font-semibold whitespace-nowrap",children:"#"})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font- whitespace-nowrap",children:["Role Name ",e.jsx(c,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Status ",e.jsx(c,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["CreatedBy ",e.jsx(c,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["CreatedAt ",e.jsx(c,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["UpdatedAt ",e.jsx(c,{})]})}),e.jsx("th",{children:e.jsx("p",{className:"mx-1.5 my-2 font-semibold font-lexend whitespace-nowrap text-center",children:"Action"})})]})}),e.jsx("tbody",{children:F.map((t,s)=>e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("td",{className:"",children:e.jsx("p",{className:" mx-3 my-2 font-lexend text-center whitespace-nowrap text-sm text-gray-700",children:n+s+1<10?`0${n+s+1}`:n+s+1})}),e.jsx("td",{children:e.jsx("p",{className:"mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm capitalize text-gray-700",children:t.role_name})}),e.jsx("td",{children:e.jsx("p",{className:" mx-1.5  my-2  font-lexend text-start whitespace-nowrap text-sm capitalize text-gray-700",children:t.status})}),e.jsx("td",{children:e.jsx("p",{className:"text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:t.created_by_user})}),e.jsx("td",{children:e.jsx("p",{className:"text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:P(t.createdAt)})}),e.jsx("td",{children:e.jsx("p",{className:"text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:P(t.updatedAt)})}),e.jsx("td",{children:e.jsxs("div",{className:"flex justify-start mx-1.5 my-3",children:[e.jsx(Q,{onClick:()=>w(s)}),R(s)&&e.jsxs("div",{className:" bg-white shadow-md rounded-lg ml-1",children:[A&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>g("/editrole",{state:{role_id:t.role_id}}),children:"Edit"}),z&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>{h(!0),m(t.role_id),w()},children:"Delete"})]})]})})]},s))})]})})}),e.jsx("div",{className:" my-3 mb-5 mx-7",children:e.jsx(W,{Length:p.length,currentPage:d,totalPages:j,firstIndex:n,lastIndex:x,paginate:V,hasNextPage:x>=N.length})})]})}),i&&e.jsx(X,{toggleDeleteModal:b,delete:T})]})};export{te as default};