import{r,n as E,j as e,F as L,R as n,h as B,i as M,b as N,A as v,d as C}from"./index-C-tKFev5.js";const q=()=>{const[g,V]=r.useState(""),[a,S]=r.useState(1),[c]=r.useState(10),[x,_]=r.useState(1),[O,k]=r.useState([]),[m,A]=r.useState([]),j=sessionStorage.getItem("token"),f=E(),[I,P]=r.useState([]);r.useState([]);const[d,z]=r.useState("All");r.useEffect(()=>{const t=async()=>{try{const i=await N.get(`${v}/new-grievance/get`,{headers:{Authorization:`Bearer ${j}`}}),h=C(i.data.data);A(h);const u=h.filter(R=>Object.values(R).some($=>$.toString().toLowerCase().includes(g.toLowerCase())));_(Math.ceil(u.length/c));const w=a*c,D=w-c;k(u.slice(D,w))}catch{}},s=async()=>{try{const i=await N.get(`${v}/complainttype/getactive`,{headers:{Authorization:`Bearer ${j}`}}),h=C(i.data.data);P(h)}catch(i){console.error("Error fetching existing Complainttype:",i)}};t(),s()},[g,a,d]);const l=t=>{t>0&&t<=x&&S(t)},p=a*c,o=p-c,y=m.filter(t=>Object.values(t).some(s=>s.toString().toLowerCase().includes(g.toLowerCase()))),T=y.filter(t=>d==="All"?!0:t.complaint_type_title===d).slice(o,p),b=t=>{z(t),l(1)};return e.jsx("div",{className:"overflow-y-auto no-scrollbar",children:e.jsxs("div",{className:"  font-lexend h-screen ",children:[e.jsxs("div",{className:"flex justify-between items-center my-4 mx-8 gap-1 flex-wrap",children:[e.jsx("h1",{className:"md:text-lg text-sm ",children:"New Grievance"}),e.jsxs("button",{className:"flex flex-row-2 gap-2 font-medium font-lexend items-center border-2 bg-blue-500 text-white rounded-full py-2 px-3 justify-between md:text-base text-sm",onClick:()=>f("/form",{state:{grievanceId:m.grievance_id}}),children:[e.jsx(L,{})," Add Report"]})]}),e.jsxs("div",{className:"bg-white h-4/5 mx-3 rounded-lg mt-5  p-3",children:[e.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-center md:gap-6 gap-2 md:mt-2 mx-3",children:[e.jsx("div",{className:"flex flex-wrap gap-3",children:e.jsx("p",{className:"text-lg  whitespace-nowrap",children:"View Report"})}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[I.map((t,s)=>e.jsx("div",{children:e.jsx("button",{className:`px-2 py-1.5 capitalize ${d===t.complaint_type?"bg-primary text-white":"bg-blue-100 text-primary"} rounded-full`,onClick:()=>b(t.complaint_type),children:t.complaint_type})},s)),e.jsx("button",{className:`w-20 py-1.5 ${d==="All"?"bg-primary text-white":"bg-blue-100 text-primary"} rounded-full`,onClick:()=>b("All"),children:"All"})]})]}),e.jsx("div",{className:" rounded-lg  py-3 overflow-x-auto no-scrollbar",children:e.jsxs("table",{className:"w-full mt-2 ",children:[e.jsx("thead",{className:" border-b border-gray-300  ",children:e.jsxs("tr",{className:"",children:[e.jsx("th",{className:"",children:e.jsx("p",{className:" mx-6 my-2 font-lexend font-semibold whitespace-nowrap",children:"#"})}),e.jsx("th",{children:e.jsx("p",{className:"mx-1.5 my-2 text-start font-lexend  whitespace-nowrap",children:"Complaint No"})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend  whitespace-nowrap",children:["Raised by ",e.jsx(n,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend  whitespace-nowrap",children:["Complaint Type ",e.jsx(n,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend  whitespace-nowrap",children:["Department",e.jsx(n,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend  whitespace-nowrap",children:["Assigned JE ",e.jsx(n,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend  whitespace-nowrap",children:["Date and Time ",e.jsx(n,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-center mx-2 my-2 font-lexend  whitespace-nowrap",children:["Priority ",e.jsx(n,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-center mx-1.5 my-2 font-lexend  whitespace-nowrap",children:["Status ",e.jsx(n,{})]})}),e.jsx("th",{children:e.jsx("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend  whitespace-nowrap",children:"Action"})})]})}),e.jsx("tbody",{children:T.map((t,s)=>e.jsxs("tr",{className:" border-b border-gray-300  ",children:[e.jsx("td",{className:"",children:e.jsx("div",{className:"text-center text-sm mx-3 my-2 font-lexend whitespace-nowrap text-gray-700",children:o+s+1<10?`0${o+s+1}`:o+s+1})}),e.jsx("td",{children:e.jsx("p",{className:"border-2 w-28 border-green-600 rounded-lg text-center py-1 my-1  text-green-600 ",children:t.grievance_id})}),e.jsxs("td",{children:[" ",e.jsx("p",{className:"capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-700",children:t.public_user_name})]}),e.jsxs("td",{children:[" ",e.jsx("p",{className:"capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-700",children:t.complaint_type_title})]}),e.jsxs("td",{children:[" ",e.jsx("p",{className:"capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-700",children:t.dept_name})]}),e.jsxs("td",{children:[" ",e.jsx("p",{className:" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:t.assign_username?t.assign_username:"Yet to be assigned"})]}),e.jsx("td",{children:e.jsx("p",{className:" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-700",children:B(t.createdAt)})}),e.jsxs("td",{children:[" ",e.jsx("p",{className:" border w-28 border-gray-500 rounded-full text-center py-1 mx-2 tex-sm capitalize text-gray-900",children:t.priority})]}),e.jsxs("td",{children:[" ",e.jsx("p",{className:" capitalize border w-28 border-gray-500 rounded-full text-center py-1 tex-sm text-gray-900  ",children:t.status})]}),e.jsx("td",{children:e.jsx("div",{className:"mx-3 my-3 whitespace-nowrap",onClick:()=>f("/view",{state:{grievanceId:t.grievance_id}}),children:e.jsx(M,{})})})]},s))})]})})]}),e.jsx("div",{className:" mt-4 mb-5 mx-7",children:e.jsxs("nav",{className:"flex items-center flex-column flex-wrap md:flex-row md:justify-between justify-center ","aria-label":"Table navigation",children:[e.jsxs("span",{className:"text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center font-alegerya",children:["Showing"," ",e.jsxs("span",{className:"text-gray-700",children:[o+1," to ",Math.min(p,m.length)]})," ","of ",e.jsxs("span",{className:"text-gray-900",children:[m.length," entries"]})]}),e.jsxs("ul",{className:"inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 font-alegerya",children:[e.jsx("li",{children:e.jsx("button",{onClick:()=>l(1),disabled:a===1,className:"flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-s-lg hover:bg-paginate-bg hover:text-primary-hover",children:"<<"})}),e.jsx("li",{children:e.jsx("button",{onClick:()=>l(a-1),disabled:a===1,className:"flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover",children:"Back"})}),Array.from({length:x},(t,s)=>s+1).slice(Math.max(0,a-2),Math.min(x,a+1)).map(t=>e.jsx("li",{children:e.jsx("button",{onClick:()=>l(t),className:`flex items-center justify-center px-3 h-8 leading-tight border border-paginate-br hover:text-white hover:bg-primary ${a===t?"bg-primary text-white":"bg-white text-black"}`,children:t})},t)),e.jsx("li",{children:e.jsx("button",{onClick:()=>l(a+1),disabled:p>=y.length,className:"flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover",children:"Next"})}),e.jsx("li",{children:e.jsx("button",{onClick:()=>l(x),disabled:a===x,className:"flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-e-lg hover:bg-paginate-bg hover:text-primary-hover",children:">>"})})]})]})})]})})};export{q as default};
