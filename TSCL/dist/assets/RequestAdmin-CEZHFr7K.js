import{r as a,u as Q,b,A as v,d as N,j as e,s as W}from"./index-KlxDuXca.js";import{R as l,P as X}from"./Pagination-CZoS4CI6.js";const ae=()=>{const[u,Z]=a.useState(""),[x,$]=a.useState(1),[c]=a.useState(10),[S,D]=a.useState(1),[ee,L]=a.useState([]),[A,M]=a.useState([]),[C,E]=a.useState([]),[_,R]=a.useState([]),p=sessionStorage.getItem("token"),P=sessionStorage.getItem("dept"),[z,T]=a.useState({}),U=Q(),[k,Y]=a.useState("All"),[g,f]=a.useState(null),[j,y]=a.useState(null),[m,w]=a.useState(null);a.useEffect(()=>{b.get(`${v}/new-grievance/getbydept?dept_name=${P}`,{headers:{Authorization:`Bearer ${p}`}}).then(t=>{const s=N(t.data.data);E(s);const r=s.filter(G=>Object.values(G).some(K=>K.toString().toLowerCase().includes(u.toLowerCase())));D(Math.ceil(r.length/c));const n=x*c,i=n-c;L(r.slice(i,n))}).catch(t=>{console.error(t)}),B(),H()},[u,x]);const B=async()=>{try{const t=await b.get(`${v}/status/get`,{headers:{Authorization:`Bearer ${p}`}}),s=N(t.data.data),r=s.reduce((n,i)=>(n[i.status_name]=i.color,n),{});M(s),T(r)}catch(t){console.error("Error fetching existing ActiveStatus:",t)}},H=async()=>{try{const t=await b.get(`${v}/user/getbydept?dept_name=${P}`,{headers:{Authorization:`Bearer ${p}`}}),s=N(t.data.data);R(s)}catch(t){sconsole.error("Error fetching existing ActiveStatus:",t)}},o=t=>{t>0&&t<=S&&$(t)},h=x*c,d=h-c,I=C.filter(t=>Object.values(t).some(s=>s.toString().toLowerCase().includes(u.toLowerCase()))),O=t=>{Y(t),f(null),y(null),w(null),o(1)},V=t=>{f(t==="All"?null:t),o(1)},q=t=>{y(t==="All"?null:t),o(1)},J=t=>{w(t==="All"?null:t),o(1)},F=I.slice().reverse().filter(t=>{const s=k==="All"?!0:"",r=g===null?!0:t.status===g,n=j===null?!0:t.priority===j,i=m===null?!0:m==="Yet to be Assigned"?!t.assign_username:t.assign_username===m;return s&&r&&n&&i}).slice(d,h);return e.jsx("div",{className:"overflow-y-auto no-scrollbar",children:e.jsxs("div",{className:"  font-lexend h-screen ",children:[e.jsxs("div",{className:"bg-white h-4/5 mx-3 rounded-lg mt-8  p-3",children:[e.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-center md:gap-6 gap-2 md:mt-2 mx-3",children:[e.jsx("div",{className:"flex flex-wrap gap-3",children:e.jsx("p",{className:"text-lg  whitespace-nowrap",children:"View Report"})}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx("div",{className:"flex gap-2 flex-wrap",children:e.jsxs("select",{className:"block w-full  px-1 py-2 text-center  text-sm bg-primary text-white  border border-none rounded-full  hover:border-gray-200 outline-none capitalize",onChange:t=>J(t.target.value),value:m||"",children:[e.jsx("option",{hidden:!0,children:"Select Assign"}),e.jsx("option",{value:"All",children:"All"}),e.jsx("option",{value:"Yet to be Assigned",children:"Yet to be Assigned"}),_&&_.map(t=>e.jsx("option",{value:t.user_name,children:t.user_name},t.user_name))]})}),e.jsx("div",{className:"flex gap-2 flex-wrap",children:e.jsxs("select",{className:"block w-full  px-1 py-2 text-center  text-sm bg-primary text-white  border border-none rounded-full  hover:border-gray-200 outline-none capitalize",onChange:t=>q(t.target.value),value:j||"",children:[e.jsx("option",{hidden:!0,children:"Priority"}),e.jsx("option",{value:"All",children:"All"}),e.jsx("option",{value:"High",children:"High"}),e.jsx("option",{value:"Medium",children:"Medium"}),e.jsx("option",{value:"Low",children:"Low"})]})}),e.jsx("div",{className:"flex gap-2 flex-wrap",children:e.jsxs("select",{className:"block w-full  px-1 py-2 text-center  text-sm bg-primary text-white  border border-none rounded-full  hover:border-gray-200 outline-none capitalize",onChange:t=>V(t.target.value),value:g||"",children:[e.jsx("option",{hidden:!0,children:"Status"}),e.jsx("option",{value:"All",children:"All"}),A&&A.map(t=>e.jsx("option",{value:t.status_name,children:t.status_name},t.status_name))]})}),e.jsx("button",{className:`w-20 py-1.5 ${k==="All"?"bg-primary text-white":"bg-white text-black"} rounded-full`,onClick:()=>O("All"),children:"All"})]})]}),e.jsx("div",{className:" rounded-lg  py-3 overflow-x-auto no-scrollbar",children:e.jsxs("table",{className:"w-full mt-2 ",children:[e.jsx("thead",{className:" border-b border-gray-300  ",children:e.jsxs("tr",{className:"",children:[e.jsx("th",{className:"",children:e.jsx("p",{className:" mx-3 my-2 font-lexend font-semibold whitespace-nowrap",children:"#"})}),e.jsx("th",{children:e.jsx("p",{className:"mx-1.5 my-2 text-start font-lexend font-medium  whitespace-nowrap",children:"Complaint No"})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:["Complaint",e.jsx(l,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:["Department",e.jsx(l,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:["Date and Time ",e.jsx(l,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:["Raised by ",e.jsx(l,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:["Assigned JE ",e.jsx(l,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-center mx-2 my-2 font-lexend font-medium  whitespace-nowrap",children:["Priority ",e.jsx(l,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-center mx-2 my-2 font-lexend font-medium  whitespace-nowrap",children:["Status ",e.jsx(l,{})]})})]})}),e.jsx("tbody",{children:F.map((t,s)=>e.jsxs("tr",{className:" border-b border-gray-300  ",children:[e.jsx("td",{className:"",children:e.jsx("div",{className:"text-center text-sm mx-3 my-2 font-lexend whitespace-nowrap",children:d+s+1<10?`0${d+s+1}`:d+s+1})}),e.jsx("td",{children:e.jsx("p",{className:"border-2 w-28 border-slate-900 rounded-lg text-center py-1 my-1  capitalize text-slate-900",onClick:()=>U("/view2",{state:{grievanceId:t.grievance_id,deptName:t.dept_name}}),children:t.grievance_id})}),e.jsxs("td",{children:[" ",e.jsx("p",{className:" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:t.complaint})]}),e.jsxs("td",{children:[" ",e.jsx("p",{className:" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:t.dept_name})]}),e.jsx("td",{children:e.jsx("p",{className:" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:W(t.createdAt)})}),e.jsxs("td",{children:[" ",e.jsx("p",{className:" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:t.public_user_name})]}),e.jsxs("td",{children:[" ",e.jsx("p",{className:" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:t.assign_username?t.assign_username:"Yet to be assigned"})]}),e.jsx("td",{children:e.jsx("p",{className:`border-2 w-26 rounded-full text-center py-1.5 mx-2 text-sm font-medium capitalize  ${t.priority==="High"?"text-red-500 border-red-500":t.priority==="Medium"?"text-sky-500 border-sky-500":t.priority==="Low"?"text-green-500 border-green-500":""}`,children:t.priority})}),e.jsx("td",{children:e.jsx("p",{className:"border-2 w-28 rounded-full text-center py-1 tex-sm font-normal mx-2 capitalize  ",style:{borderColor:z[t.status]||"gray",color:z[t.status]||"black",fontSize:14},children:t.status})})]},s))})]})})]}),e.jsx("div",{className:" mt-4 mb-5 mx-7",children:e.jsx(X,{Length:C.length,currentPage:x,totalPages:S,firstIndex:d,lastIndex:h,paginate:o,hasNextPage:h>=I.length})})]})})};export{ae as default};
