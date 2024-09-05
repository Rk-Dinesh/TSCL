import{r as l,q as H,b as D,A as S,d as J,j as e,I as K,F as Q,f as I,e as W,B as P}from"./index-CgbAUok4.js";import{R as d}from"./index-D2OykF5_.js";import{D as X}from"./DeleteModal-6zNkx-TN.js";import"./index-DutUBxhm.js";const ae=({permissions:r})=>{const A=r==null?void 0:r.includes("create"),M=r==null?void 0:r.includes("edit"),_=r==null?void 0:r.includes("delete"),[g,p]=l.useState(!1),[z,f]=l.useState(null),[x,R]=l.useState(""),[a,$]=l.useState(1),[n]=l.useState(8),[c,B]=l.useState(1),[Y,E]=l.useState([]),[m,O]=l.useState([]),[b,L]=l.useState(null),j=sessionStorage.getItem("token"),u=H(),y=t=>{L(b===t?null:t)},F=t=>b===t;l.useEffect(()=>{w()},[x,a]);const i=t=>{t>0&&t<=c&&$(t)},w=()=>{D.get(`${S}/role/get`,{headers:{Authorization:`Bearer ${j}`}}).then(t=>{const s=J(t.data.data);O(s);const C=s.filter(q=>Object.values(q).some(G=>G.toString().toLowerCase().includes(x.toLowerCase())));B(Math.ceil(C.length/n));const k=a*n,V=k-n;E(C.slice(V,k))}).catch(t=>{console.error(t)})},N=()=>{p(!g),f(null)},h=a*n,o=h-n,v=m.filter(t=>Object.values(t).some(s=>s.toString().toLowerCase().includes(x.toLowerCase()))),T=v.slice().reverse().slice(o,h),U=async()=>{try{await D.delete(`${S}/role/delete?role_id=${z}`,{headers:{Authorization:`Bearer ${j}`}}),N(),w(),P.success("Deleted successfully")}catch{P.error("Failed to delete")}};return e.jsxs(l.Fragment,{children:[e.jsx("div",{className:"  bg-blue-100 overflow-y-auto no-scrollbar",children:e.jsxs("div",{className:"h-screen mt-10",children:[e.jsxs("div",{className:"flex justify-between items-center my-2 mx-8 flex-wrap gap-3",children:[e.jsx("h1",{className:"md:text-xl text-lg font-medium ",children:" Roles"}),e.jsxs("div",{className:"flex items-center  gap-3 flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-3 bg-white px-2 py-1.5 rounded-full ",children:[e.jsx(K,{className:"text-xl"}),e.jsx("input",{type:"search",className:"outline-none bg-transparent text-base",placeholder:"Search User",value:x,onChange:t=>R(t.target.value)})]}),A&&e.jsxs("button",{className:"flex flex-row-2 gap-2  font-lexend items-center border-2 bg-blue-500 text-white rounded-full py-1.5 w-fit justify-between px-3 md:text-base text-sm",onClick:()=>u("/roleform"),children:[e.jsx(Q,{})," Add Role"]})]})]}),e.jsx("div",{className:"bg-white mx-4 rounded-lg my-3 h-3/5 ",children:e.jsx("div",{className:"overflow-x-auto  no-scrollbar",children:e.jsxs("table",{className:"w-full  mt-3",children:[e.jsx("thead",{className:" border-b-2 border-gray-300",children:e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("th",{className:"",children:e.jsx("p",{className:" mx-6 my-2 font-lexend font-semibold whitespace-nowrap",children:"#"})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font- whitespace-nowrap",children:["Role Name ",e.jsx(d,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Status ",e.jsx(d,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["CreatedBy ",e.jsx(d,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["CreatedAt ",e.jsx(d,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["UpdatedAt ",e.jsx(d,{})]})}),e.jsx("th",{children:e.jsx("p",{className:"mx-1.5 my-2 font-semibold font-lexend whitespace-nowrap text-center",children:"Action"})})]})}),e.jsx("tbody",{children:T.map((t,s)=>e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("td",{className:"",children:e.jsx("p",{className:" mx-3 my-2 font-lexend text-center whitespace-nowrap text-sm text-gray-700",children:o+s+1<10?`0${o+s+1}`:o+s+1})}),e.jsx("td",{children:e.jsx("p",{className:"mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm capitalize text-gray-700",children:t.role_name})}),e.jsx("td",{children:e.jsx("p",{className:" mx-1.5  my-2  font-lexend text-start whitespace-nowrap text-sm capitalize text-gray-700",children:t.status})}),e.jsx("td",{children:e.jsx("p",{className:"text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:t.created_by_user})}),e.jsx("td",{children:e.jsx("p",{className:"text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:I(t.createdAt)})}),e.jsx("td",{children:e.jsx("p",{className:"text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:I(t.updatedAt)})}),e.jsx("td",{children:e.jsxs("div",{className:"flex justify-start mx-1.5 my-3",children:[e.jsx(W,{onClick:()=>y(s)}),F(s)&&e.jsxs("div",{className:" bg-white shadow-md rounded-lg ml-1",children:[M&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>u("/editrole",{state:{role_id:t.role_id}}),children:"Edit"}),_&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>{p(!0),f(t.role_id),y()},children:"Delete"})]})]})})]},s))})]})})}),e.jsx("div",{className:" my-3 mb-5 mx-7",children:e.jsxs("nav",{className:"flex items-center flex-column flex-wrap md:flex-row md:justify-between justify-center pt-4","aria-label":"Table navigation",children:[e.jsxs("span",{className:"text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center font-alegerya",children:["Showing"," ",e.jsxs("span",{className:"text-gray-700",children:[o+1," to ",Math.min(h,m.length)]})," ","of ",e.jsxs("span",{className:"text-gray-900",children:[m.length," entries"]})]}),e.jsxs("ul",{className:"inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 font-alegerya",children:[e.jsx("li",{children:e.jsx("button",{onClick:()=>i(1),disabled:a===1,className:"flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-s-lg hover:bg-paginate-bg hover:text-primary-hover",children:"<<"})}),e.jsx("li",{children:e.jsx("button",{onClick:()=>i(a-1),disabled:a===1,className:"flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover",children:"Back"})}),Array.from({length:c},(t,s)=>s+1).slice(Math.max(0,a-2),Math.min(c,a+1)).map(t=>e.jsx("li",{children:e.jsx("button",{onClick:()=>i(t),className:`flex items-center justify-center px-3 h-8 leading-tight border border-paginate-br hover:text-white hover:bg-primary ${a===t?"bg-primary text-white":"bg-white text-black"}`,children:t})},t)),e.jsx("li",{children:e.jsx("button",{onClick:()=>i(a+1),disabled:h>=v.length,className:"flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover",children:"Next"})}),e.jsx("li",{children:e.jsx("button",{onClick:()=>i(c),disabled:a===c,className:"flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-e-lg hover:bg-paginate-bg hover:text-primary-hover",children:">>"})})]})]})})]})}),g&&e.jsx(X,{toggleDeleteModal:N,delete:U})]})};export{ae as default};