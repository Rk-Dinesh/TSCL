import{c as q,a as I,u as R,o as T,j as e,b as k,A as z,B as p,r as s,d as G,I as ne,F as U,R as le,e as S,f as V,g as oe,D as ie}from"./index-B6bLt-HT.js";const ce=q().shape({org_name:I().required("Organization is required")}),de=a=>{const{register:o,formState:{errors:h},handleSubmit:g,watch:i}=R({resolver:T(ce),mode:"all"}),u=async b=>{const c=sessionStorage.getItem("token"),f={...b,status:"active",created_by_user:"admin"};try{const l=await k.post(`${z}/organization/post`,f,{headers:{Authorization:`Bearer ${c}`}});l.status===200?(p.success("Org created Successfully"),a.toggleModal(),a.handlerefresh()):(console.error("Error in posting data",l),p.error("Failed to Upload"))}catch(l){console.error("Error in posting data",l)}};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ",children:e.jsxs("div",{className:"bg-white w-[522px] h-[358px]  font-lexend m-2 ",children:[e.jsx("div",{className:"border-b-2 border-gray-300 mx-10",children:e.jsx("h1",{className:"text-xl font-medium pt-10 pb-2",children:"Add Organization"})}),e.jsxs("form",{onSubmit:g(u),children:[e.jsxs("div",{className:"mx-6 my-10",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-4",htmlFor:"org_name",children:"Organization Name"}),e.jsx("input",{className:"appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"org_name",type:"text",placeholder:" Organization Name",...o("org_name")}),h.org_name&&e.jsx("p",{className:"text-red-500",children:h.org_name.message})]}),e.jsxs("div",{className:"flex justify-end  mx-10 gap-5 ",children:[e.jsx("div",{className:"border border-primary text-primary bg-none font-lexend rounded-3xl px-5 py-1.5",onClick:a.toggleModal,children:"cancel"}),e.jsx("button",{className:" text-white bg-primary font-lexend rounded-3xl px-5 py-1.5",type:"submit",children:"Save"})]})]})]})})},xe=q().shape({org_name:I().required("Organization is required"),status:I().test("not-select","Please select an Status",a=>a!==""&&a!=="Status")}),me=a=>{const{orgId:o}=a,h=sessionStorage.getItem("token"),{register:g,formState:{errors:i},handleSubmit:u,watch:b,setValue:c}=R({resolver:T(xe),mode:"all"});s.useEffect(()=>{(async()=>{try{const d=await k.get(`${z}/organization/getbyid?org_id=${o}`,{headers:{Authorization:`Bearer ${h}`}}),x=G(d.data.data);c("org_name",x.org_name),c("status",x.status)}catch(d){console.error("Error fetching data",d)}})()},[o,c]);const f=async l=>{const d=sessionStorage.getItem("token"),x={...l};try{const m=await k.post(`${z}/organization/update?org_id=${o}`,x,{headers:{Authorization:`Bearer ${d}`}});m.status===200?(p.success("Org Updated Successfully"),a.toggleModal(),a.handlerefresh()):(console.error("Error in posting data",m),p.error("Failed to Upload"))}catch(m){console.error("Error in posting data",m)}};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ",children:e.jsxs("div",{className:"bg-white w-[522px] h-[358px]  font-lexend m-2 ",children:[e.jsx("div",{className:"border-b-2 border-gray-300 mx-10",children:e.jsx("h1",{className:"text-xl font-medium pt-10 pb-2",children:"Edit Organization"})}),e.jsxs("form",{onSubmit:u(f),children:[e.jsxs("div",{className:"mx-8 my-6",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-4",htmlFor:"org_name",children:"Organization Name"}),e.jsx("input",{className:"appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"org_name",type:"text",placeholder:" Organization Name",...g("org_name")}),i.org_name&&e.jsx("p",{className:"text-red-500",children:i.org_name.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:" grid grid-cols-3 mx-10 my-8",children:[e.jsx("label",{className:" text-gray-900 text-base font-normal  col-span-1",htmlFor:"status",children:"Status:"}),e.jsxs("select",{className:"   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none",id:"status",...g("status"),children:[e.jsx("option",{value:"",hidden:!0,children:"Status"}),e.jsx("option",{value:"active",children:"Active"}),e.jsx("option",{value:"inactive",children:"InActive"})]})]}),i.status&&e.jsx("p",{className:"text-red-500 text-xs text-center -mt-4 mb-2 ",children:i.status.message})]}),e.jsxs("div",{className:"flex justify-end  mx-10 gap-5 ",children:[e.jsx("div",{className:"border border-primary text-primary bg-none font-lexend rounded-3xl px-5 py-1.5",onClick:a.toggleModal,children:"cancel"}),e.jsx("button",{className:" text-white bg-primary font-lexend rounded-3xl px-5 py-1.5",type:"submit",children:"Save"})]})]})]})})},ue=({permissions:a})=>{const o=a==null?void 0:a.includes("create"),h=a==null?void 0:a.includes("edit"),g=a==null?void 0:a.includes("delete"),[i,u]=s.useState(!1),[b,c]=s.useState(!1),[f,l]=s.useState(null),[d,x]=s.useState(!1),[m,M]=s.useState(null),[O,H]=s.useState(""),[n,J]=s.useState(1),[j]=s.useState(8),[y,K]=s.useState(1),[he,Q]=s.useState([]),[w,A]=s.useState([]),[$,W]=s.useState(null),E=sessionStorage.getItem("token"),D=t=>{W($===t?null:t)},X=t=>$===t;s.useEffect(()=>{_()},[O,n]);const N=t=>{t>0&&t<=y&&J(t)},_=()=>{k.get(`${z}/organization/get`,{headers:{Authorization:`Bearer ${E}`}}).then(t=>{const r=G(t.data.data);A(r);const F=r.filter(se=>Object.values(se).some(re=>re.toString().toLowerCase().includes(O.toLowerCase())));K(Math.ceil(F.length/j));const L=n*j,ae=L-j;Q(F.slice(ae,L))}).catch(t=>{console.error(t)})},Y=()=>{u(!i)},Z=()=>{c(!b),l(null)},P=()=>{x(!d),M(null)},C=n*j,v=C-j,B=w.filter(t=>Object.values(t).some(r=>r.toString().toLowerCase().includes(O.toLowerCase()))),ee=B.slice(v,C),te=async()=>{try{await k.delete(`${z}/organization/delete?org_id=${m}`,{headers:{Authorization:`Bearer ${E}`}}),P(),_(),A(w.filter(t=>w.org_id!==m)),p.success("Deleted successfully")}catch{p.error("Failed to delete")}};return e.jsxs(s.Fragment,{children:[e.jsx("div",{className:"  bg-blue-100 overflow-y-auto no-scrollbar",children:e.jsxs("div",{className:"h-screen ",children:[e.jsxs("div",{className:"flex flex-row md:justify-end gap-3 p-2 mt-3 mx-8 flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-3 bg-white py-1.5 px-3 rounded-full",children:[e.jsx(ne,{className:"text-xl"}),e.jsx("input",{type:"search",className:"outline-none bg-transparent text-base",placeholder:"Search Organization",value:O,onChange:t=>H(t.target.value)})]}),o&&e.jsx("a",{href:"#",children:e.jsxs("button",{className:"flex gap-2 items-center border-2 border-blue-500 font-lexend bg-slate-100 text-blue-500 rounded-full py-1.5 px-3 justify-center",children:[" ",e.jsx(U,{}),"Bulk Upload"]})}),e.jsx("a",{href:"#",children:e.jsxs("button",{className:"flex gap-2 items-center border-2 bg-slate-100  font-lexend text-black rounded-full p-2 w-32 justify-between",children:[" ","CSV ",e.jsx(le,{})]})})]}),e.jsxs("div",{className:"flex flex-row  gap-1 justify-between items-center my-2 mx-8 flex-wrap",children:[e.jsxs("h1",{className:"md:text-xl text-lg font-medium whitespace-nowrap",children:[" ","Organization"]}),o&&e.jsxs("button",{className:"flex flex-row  gap-2  font-lexend items-center border-2 bg-blue-500 text-white rounded-full py-2 px-3 justify-between mb-2 md:text-base text-sm",onClick:()=>u(!0),children:[e.jsx(U,{})," Add Organization"]})]}),e.jsx("div",{className:"bg-white mx-4 rounded-lg my-3  h-3/5 ",children:e.jsx("div",{className:"overflow-x-auto no-scrollbar my-3",children:e.jsxs("table",{className:"w-full  ",children:[e.jsx("thead",{className:" border-b-2 border-gray-300",children:e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("th",{className:"py-2",children:e.jsx("p",{className:" mx-6 my-2 font-lexend font-semibold whitespace-nowrap",children:"#"})}),e.jsx("th",{className:"",children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5 my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Org Name ",e.jsx(S,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Status ",e.jsx(S,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["CreatedBy ",e.jsx(S,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["CreatedAt ",e.jsx(S,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Last UpdatedAt ",e.jsx(S,{})]})}),e.jsx("th",{children:e.jsx("p",{className:"text-start mx-1.5 my-3 font-semibold font-lexend",children:"Action"})})]})}),e.jsx("tbody",{children:ee.map((t,r)=>e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("td",{className:"",children:e.jsx("div",{className:"items-center mx-6 my-2 font-lexend whitespace-nowrap text-sm text-center",children:v+r+1<10?`0${v+r+1}`:v+r+1})}),e.jsx("td",{className:"",children:e.jsx("p",{className:"capitalize mx-1.5 my-2 font-lexend text-start whitespace-nowrap text-sm",children:t.org_name})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm",children:t.status})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize mx-1.5  my-2  font-lexend text-start whitespace-nowrap text-sm",children:t.created_by_user})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm ",children:V(t.createdAt)})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm",children:V(t.updatedAt)})}),e.jsx("td",{children:e.jsxs("div",{className:"flex justify-start mx-1.5 my-3",children:[e.jsx(oe,{onClick:()=>D(r)}),X(r)&&e.jsxs("div",{className:" bg-white shadow-md rounded-lg ml-1",children:[h&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>{c(!0),l(t.org_id),D()},children:"Edit"}),g&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>{x(!0),M(t.org_id),D()},children:"Delete"})]})]})})]},r))})]})})}),e.jsx("div",{className:" my-3 mb-5 mx-7",children:e.jsxs("nav",{className:"flex items-center flex-column flex-wrap md:flex-row md:justify-between justify-center pt-4","aria-label":"Table navigation",children:[e.jsxs("span",{className:"text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center font-alegerya",children:["Showing"," ",e.jsxs("span",{className:"text-gray-700",children:[v+1," to ",Math.min(C,w.length)]})," ","of"," ",e.jsxs("span",{className:"text-gray-900",children:[w.length," entries"]})]}),e.jsxs("ul",{className:"inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 font-alegerya",children:[e.jsx("li",{children:e.jsx("button",{onClick:()=>N(1),disabled:n===1,className:"flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-s-lg hover:bg-paginate-bg hover:text-primary-hover",children:"<<"})}),e.jsx("li",{children:e.jsx("button",{onClick:()=>N(n-1),disabled:n===1,className:"flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover",children:"Back"})}),Array.from({length:y},(t,r)=>r+1).slice(Math.max(0,n-2),Math.min(y,n+1)).map(t=>e.jsx("li",{children:e.jsx("button",{onClick:()=>N(t),className:`flex items-center justify-center px-3 h-8 leading-tight border border-paginate-br hover:text-white hover:bg-primary ${n===t?"bg-primary text-white":"bg-white text-black"}`,children:t})},t)),e.jsx("li",{children:e.jsx("button",{onClick:()=>N(n+1),disabled:C>=B.length,className:"flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover",children:"Next"})}),e.jsx("li",{children:e.jsx("button",{onClick:()=>N(y),disabled:n===y,className:"flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-e-lg hover:bg-paginate-bg hover:text-primary-hover",children:">>"})})]})]})})]})}),i&&e.jsx(de,{toggleModal:Y,handlerefresh:_}),b&&e.jsx(me,{toggleModal:Z,handlerefresh:_,orgId:f}),d&&e.jsx(ie,{toggleDeleteModal:P,delete:te})]})};export{ue as default};
