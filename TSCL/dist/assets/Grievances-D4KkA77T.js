import{r,p as G,b as w,A as N,d as v,j as e,I as R,F as T,f as B,e as V}from"./index-B-0fny-6.js";import{a as F,R as l}from"./index-BhEqOQck.js";const Y=({permissions:n})=>{const C=n==null?void 0:n.includes("create");n==null||n.includes("edit"),n==null||n.includes("delete"),r.useState(!1);const[m,S]=r.useState(""),[a,k]=r.useState(1),[i]=r.useState(8),[c,A]=r.useState(1),[O,I]=r.useState([]),[f,P]=r.useState([]),u=sessionStorage.getItem("token"),j=G(),_=()=>{j("/form")},[H,D]=r.useState([]),[b,z]=r.useState({});r.useEffect(()=>{w.get(`${N}/new-grievance/get`,{headers:{Authorization:`Bearer ${u}`}}).then(t=>{const s=v(t.data.data);P(s);const p=s.filter($=>Object.values($).some(E=>E.toString().toLowerCase().includes(m.toLowerCase())));A(Math.ceil(p.length/i));const o=a*i,g=o-i;I(p.slice(g,o))}).catch(t=>{console.error(t)}),L()},[m,a]);const L=async()=>{try{const t=await w.get(`${N}/status/get`,{headers:{Authorization:`Bearer ${u}`}}),s=v(t.data.data),p=s.reduce((o,g)=>(o[g.status_name]=g.color,o),{});D(s),z(p)}catch(t){console.error("Error fetching existing ActiveStatus:",t)}},x=t=>{t>0&&t<=c&&k(t)},h=a*i,d=h-i,y=f.filter(t=>Object.values(t).some(s=>s.toString().toLowerCase().includes(m.toLowerCase()))),M=y.slice().reverse().slice(d,h);return e.jsx(r.Fragment,{children:e.jsx("div",{className:"  bg-blue-100 overflow-y-auto no-scrollbar",children:e.jsxs("div",{className:"h-screen",children:[e.jsxs("div",{className:"flex flex-row  gap-3 p-2 mt-3 mx-8 flex-wrap md:justify-end ",children:[e.jsxs("p",{className:"flex items-center gap-3 bg-white px-3 py-1.5 rounded-full",children:[e.jsx(R,{className:"text-xl"}),e.jsx("input",{type:"search",className:"outline-none bg-transparent text-base",placeholder:"Search Grievances",value:m,onChange:t=>S(t.target.value)})]}),e.jsx("a",{href:"#",children:e.jsxs("button",{className:"flex gap-2 items-center border-2 font-lexend bg-slate-100 text-black rounded-full px-3  py-1.5 w-28 justify-between",children:[" ","CSV ",e.jsx(F,{})]})})]}),e.jsxs("div",{className:"flex flex-row  gap-1 justify-between items-center my-2 mx-8 flex-wrap",children:[e.jsxs("h1",{className:"md:text-xl text-lg font-medium whitespace-nowrap",children:[" ","New Grievances"]}),C&&e.jsxs("button",{className:"flex flex-row-2 gap-2 items-center border-2 bg-blue-500 text-white font-lexend rounded-full p-2.5 w-fit justify-between md:text-base text-sm",onClick:_,children:[e.jsx(T,{})," Add Grievances"]})]}),e.jsx("div",{className:"bg-white mx-4 rounded-lg my-3 py-3 overflow-x-auto h-3/5 no-scrollbar ",children:e.jsxs("table",{className:"w-full mt-2 ",children:[e.jsx("thead",{className:" border-b border-gray-300  ",children:e.jsxs("tr",{className:"",children:[e.jsx("th",{className:"",children:e.jsx("p",{className:" mx-6 my-2 font-lexend font-medium whitespace-nowrap",children:"#"})}),e.jsx("th",{children:e.jsx("p",{className:"mx-1.5 my-2 text-start font-lexend font-medium  whitespace-nowrap",children:"Complaint No"})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:["Raised by ",e.jsx(l,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:["Complaint Type ",e.jsx(l,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:["Department",e.jsx(l,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:["Assigned JE ",e.jsx(l,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:["Date and Time ",e.jsx(l,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-center mx-2 my-2 font-lexend font-medium  whitespace-nowrap",children:["Priority ",e.jsx(l,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-center mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:["Status ",e.jsx(l,{})]})}),e.jsx("th",{children:e.jsx("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:"Action"})})]})}),e.jsx("tbody",{children:M.map((t,s)=>e.jsxs("tr",{className:" border-b border-gray-300  ",children:[e.jsx("td",{className:"",children:e.jsx("div",{className:"text-center text-sm mx-3 my-2 font-lexend whitespace-nowrap text-gray-700",children:d+s+1<10?`0${d+s+1}`:d+s+1})}),e.jsx("td",{children:e.jsx("p",{className:"border-2 w-28 border-slate-900 rounded-lg text-center py-1 my-1   text-slate-900",children:t.grievance_id})}),e.jsxs("td",{children:[" ",e.jsx("p",{className:"capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-700",children:t.public_user_name})]}),e.jsxs("td",{children:[" ",e.jsx("p",{className:"capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-700",children:t.complaint_type_title})]}),e.jsxs("td",{children:[" ",e.jsx("p",{className:"capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-700",children:t.dept_name})]}),e.jsxs("td",{children:[" ",e.jsx("p",{className:" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:t.assign_username?t.assign_username:"Yet to be assigned"})]}),e.jsx("td",{children:e.jsx("p",{className:" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-700",children:B(t.createdAt)})}),e.jsx("td",{children:e.jsx("p",{className:`border w-26 rounded-full text-center py-1.5 mx-2 text-sm font-normal capitalize text-white  ${t.priority==="High"?"bg-red-500":t.priority==="Medium"?"bg-green-500":t.priority==="Low"?"bg-sky-500":""}`,children:t.priority})}),e.jsx("td",{children:e.jsx("p",{className:"border-2 w-28 rounded-full text-center py-1 tex-sm font-normal mx-2 capitalize  ",style:{borderColor:b[t.status]||"gray",color:b[t.status]||"black",fontSize:14},children:t.status})}),e.jsx("td",{children:e.jsx("div",{className:"mx-3 my-3 whitespace-nowrap",onClick:()=>j("/view",{state:{grievanceId:t.grievance_id}}),children:e.jsx(V,{})})})]},s))})]})}),e.jsx("div",{className:" my-3 mb-5 mx-7",children:e.jsxs("nav",{className:"flex items-center flex-column flex-wrap md:flex-row md:justify-between justify-center pt-4","aria-label":"Table navigation",children:[e.jsxs("span",{className:"text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center font-alegerya",children:["Showing"," ",e.jsxs("span",{className:"text-gray-700",children:[d+1," to ",Math.min(h,f.length)]})," ","of"," ",e.jsxs("span",{className:"text-gray-900",children:[f.length," entries"]})]}),e.jsxs("ul",{className:"inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 font-alegerya",children:[e.jsx("li",{children:e.jsx("button",{onClick:()=>x(1),disabled:a===1,className:"flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-s-lg hover:bg-paginate-bg hover:text-primary-hover",children:"<<"})}),e.jsx("li",{children:e.jsx("button",{onClick:()=>x(a-1),disabled:a===1,className:"flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover",children:"Back"})}),Array.from({length:c},(t,s)=>s+1).slice(Math.max(0,a-2),Math.min(c,a+1)).map(t=>e.jsx("li",{children:e.jsx("button",{onClick:()=>x(t),className:`flex items-center justify-center px-3 h-8 leading-tight border border-paginate-br hover:text-white hover:bg-primary ${a===t?"bg-primary text-white":"bg-white text-black"}`,children:t})},t)),e.jsx("li",{children:e.jsx("button",{onClick:()=>x(a+1),disabled:h>=y.length,className:"flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover",children:"Next"})}),e.jsx("li",{children:e.jsx("button",{onClick:()=>x(c),disabled:a===c,className:"flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-e-lg hover:bg-paginate-bg hover:text-primary-hover",children:">>"})})]})]})})]})})})};export{Y as default};