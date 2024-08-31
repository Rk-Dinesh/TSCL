import{r as a,p as Q,b as N,A as S,d as A,j as e,f as W,e as X}from"./index-B-0fny-6.js";import{R as i}from"./index-BhEqOQck.js";const ae=()=>{const[u,Z]=a.useState(""),[n,$]=a.useState(1),[d]=a.useState(10),[x,D]=a.useState(1),[ee,I]=a.useState([]),[C,L]=a.useState([]),[g,E]=a.useState([]),[_,R]=a.useState([]),f=sessionStorage.getItem("token"),k=sessionStorage.getItem("dept"),[z,T]=a.useState({}),B=Q(),[P,U]=a.useState("All"),[j,b]=a.useState(null),[y,w]=a.useState(null),[h,v]=a.useState(null);a.useEffect(()=>{N.get(`${S}/new-grievance/getbydept?dept_name=${k}`,{headers:{Authorization:`Bearer ${f}`}}).then(t=>{const s=A(t.data.data);E(s);const c=s.filter(G=>Object.values(G).some(K=>K.toString().toLowerCase().includes(u.toLowerCase())));D(Math.ceil(c.length/d));const l=n*d,o=l-d;I(c.slice(o,l))}).catch(t=>{console.error(t)}),V(),Y()},[u,n]);const V=async()=>{try{const t=await N.get(`${S}/status/get`,{headers:{Authorization:`Bearer ${f}`}}),s=A(t.data.data),c=s.reduce((l,o)=>(l[o.status_name]=o.color,l),{});L(s),T(c)}catch(t){console.error("Error fetching existing ActiveStatus:",t)}},Y=async()=>{try{const t=await N.get(`${S}/user/getbydept?dept_name=${k}`,{headers:{Authorization:`Bearer ${f}`}}),s=A(t.data.data);R(s)}catch(t){sconsole.error("Error fetching existing ActiveStatus:",t)}},r=t=>{t>0&&t<=x&&$(t)},p=n*d,m=p-d,M=g.filter(t=>Object.values(t).some(s=>s.toString().toLowerCase().includes(u.toLowerCase()))),H=t=>{U(t),b(null),w(null),v(null),r(1)},O=t=>{b(t==="All"?null:t),r(1)},q=t=>{w(t==="All"?null:t),r(1)},J=t=>{v(t==="All"?null:t),r(1)},F=M.slice().reverse().filter(t=>{const s=P==="All"?!0:"",c=j===null?!0:t.status===j,l=y===null?!0:t.priority===y,o=h===null?!0:h==="Yet to be Assigned"?!t.assign_username:t.assign_username===h;return s&&c&&l&&o}).slice(m,p);return e.jsx("div",{className:"overflow-y-auto no-scrollbar",children:e.jsxs("div",{className:"  font-lexend h-screen ",children:[e.jsxs("div",{className:"bg-white h-4/5 mx-3 rounded-lg mt-8  p-3",children:[e.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-center md:gap-6 gap-2 md:mt-2 mx-3",children:[e.jsx("div",{className:"flex flex-wrap gap-3",children:e.jsx("p",{className:"text-lg  whitespace-nowrap",children:"View Report"})}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx("div",{className:"flex gap-2 flex-wrap",children:e.jsxs("select",{className:"block w-full  px-1 py-2 text-center  text-sm bg-primary text-white  border border-none rounded-full  hover:border-gray-200 outline-none capitalize",onChange:t=>J(t.target.value),value:h||"",children:[e.jsx("option",{hidden:!0,children:"Select Assign"}),e.jsx("option",{value:"All",children:"All"}),e.jsx("option",{value:"Yet to be Assigned",children:"Yet to be Assigned"}),_&&_.map(t=>e.jsx("option",{value:t.user_name,children:t.user_name},t.user_name))]})}),e.jsx("div",{className:"flex gap-2 flex-wrap",children:e.jsxs("select",{className:"block w-full  px-1 py-2 text-center  text-sm bg-primary text-white  border border-none rounded-full  hover:border-gray-200 outline-none capitalize",onChange:t=>q(t.target.value),value:y||"",children:[e.jsx("option",{hidden:!0,children:"Priority"}),e.jsx("option",{value:"All",children:"All"}),e.jsx("option",{value:"High",children:"High"}),e.jsx("option",{value:"Medium",children:"Medium"}),e.jsx("option",{value:"Low",children:"Low"})]})}),e.jsx("div",{className:"flex gap-2 flex-wrap",children:e.jsxs("select",{className:"block w-full  px-1 py-2 text-center  text-sm bg-primary text-white  border border-none rounded-full  hover:border-gray-200 outline-none capitalize",onChange:t=>O(t.target.value),value:j||"",children:[e.jsx("option",{hidden:!0,children:"Status"}),e.jsx("option",{value:"All",children:"All"}),C&&C.map(t=>e.jsx("option",{value:t.status_name,children:t.status_name},t.status_name))]})}),e.jsx("button",{className:`w-20 py-1.5 ${P==="All"?"bg-primary text-white":"bg-white text-black"} rounded-full`,onClick:()=>H("All"),children:"All"})]})]}),e.jsx("div",{className:" rounded-lg  py-3 overflow-x-auto no-scrollbar",children:e.jsxs("table",{className:"w-full mt-2 ",children:[e.jsx("thead",{className:" border-b border-gray-300  ",children:e.jsxs("tr",{className:"",children:[e.jsx("th",{className:"",children:e.jsx("p",{className:" mx-6 my-2 font-lexend font-semibold whitespace-nowrap",children:"#"})}),e.jsx("th",{children:e.jsx("p",{className:"mx-1.5 my-2 text-start font-lexend font-medium  whitespace-nowrap",children:"Complaint No"})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:["Complaint",e.jsx(i,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:["Department",e.jsx(i,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:["Date and Time ",e.jsx(i,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:["Raised by ",e.jsx(i,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:["Assigned JE ",e.jsx(i,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-center mx-2 my-2 font-lexend font-medium  whitespace-nowrap",children:["Priority ",e.jsx(i,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-center mx-2 my-2 font-lexend font-medium  whitespace-nowrap",children:["Status ",e.jsx(i,{})]})}),e.jsx("th",{children:e.jsx("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:"Action"})})]})}),e.jsx("tbody",{children:F.map((t,s)=>e.jsxs("tr",{className:" border-b border-gray-300  ",children:[e.jsx("td",{className:"",children:e.jsx("div",{className:"text-center text-sm mx-3 my-2 font-lexend whitespace-nowrap",children:m+s+1<10?`0${m+s+1}`:m+s+1})}),e.jsx("td",{children:e.jsx("p",{className:"border-2 w-28 border-slate-900 rounded-lg text-center py-1 my-1  capitalize text-slate-900",children:t.grievance_id})}),e.jsxs("td",{children:[" ",e.jsx("p",{className:" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:t.complaint})]}),e.jsxs("td",{children:[" ",e.jsx("p",{className:" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:t.dept_name})]}),e.jsx("td",{children:e.jsx("p",{className:" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:W(t.createdAt)})}),e.jsxs("td",{children:[" ",e.jsx("p",{className:" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:t.public_user_name})]}),e.jsxs("td",{children:[" ",e.jsx("p",{className:" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:t.assign_username?t.assign_username:"Yet to be assigned"})]}),e.jsx("td",{children:e.jsx("p",{className:`border w-26 rounded-full text-center py-1.5 mx-2 text-sm font-normal capitalize text-white  ${t.priority==="High"?"bg-red-500":t.priority==="Medium"?"bg-green-500":t.priority==="Low"?"bg-sky-500":""}`,children:t.priority})}),e.jsx("td",{children:e.jsx("p",{className:"border-2 w-28 rounded-full text-center py-1 tex-sm font-normal mx-2 capitalize  ",style:{borderColor:z[t.status]||"gray",color:z[t.status]||"black",fontSize:14},children:t.status})}),e.jsx("td",{children:e.jsx("div",{className:"mx-3 my-3 whitespace-nowrap",onClick:()=>B("/view2",{state:{grievanceId:t.grievance_id,deptName:t.dept_name}}),children:e.jsx(X,{})})})]},s))})]})})]}),e.jsx("div",{className:" mt-4 mb-5 mx-7",children:e.jsxs("nav",{className:"flex items-center flex-column flex-wrap md:flex-row md:justify-between justify-center ","aria-label":"Table navigation",children:[e.jsxs("span",{className:"text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center font-alegerya",children:["Showing"," ",e.jsxs("span",{className:"text-gray-700",children:[m+1," to ",Math.min(p,g.length)]})," ","of ",e.jsxs("span",{className:"text-gray-900",children:[g.length," entries"]})]}),e.jsxs("ul",{className:"inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 font-alegerya",children:[e.jsx("li",{children:e.jsx("button",{onClick:()=>r(1),disabled:n===1,className:"flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-s-lg hover:bg-paginate-bg hover:text-primary-hover",children:"<<"})}),e.jsx("li",{children:e.jsx("button",{onClick:()=>r(n-1),disabled:n===1,className:"flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover",children:"Back"})}),Array.from({length:x},(t,s)=>s+1).slice(Math.max(0,n-2),Math.min(x,n+1)).map(t=>e.jsx("li",{children:e.jsx("button",{onClick:()=>r(t),className:`flex items-center justify-center px-3 h-8 leading-tight border border-paginate-br hover:text-white hover:bg-primary ${n===t?"bg-primary text-white":"bg-white text-black"}`,children:t})},t)),e.jsx("li",{children:e.jsx("button",{onClick:()=>r(n+1),disabled:p>=M.length,className:"flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover",children:"Next"})}),e.jsx("li",{children:e.jsx("button",{onClick:()=>r(x),disabled:n===x,className:"flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-e-lg hover:bg-paginate-bg hover:text-primary-hover",children:">>"})})]})]})})]})})};export{ae as default};
