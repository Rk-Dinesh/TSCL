import{i as B,k as b,m as L,o as O,j as e,b as y,A as w,B as j,r as a,d as U,S as re,q as C,s as z,v as oe,w as ne}from"./index-DP2NNKOn.js";import{D as ce}from"./DeleteModal-DMwKPp4R.js";import{S as R}from"./SavaCancel-Ci3tLGq5.js";const de=/^#([0-9A-F]{3}){1,2}$/i,ie=B().shape({status_name:b().required("status is required").lowercase(),color:b().matches(de,"Enter a valid hex color code").required("Color is required")}),xe=s=>{const{register:d,formState:{errors:n},handleSubmit:u,watch:o}=L({resolver:O(ie),mode:"all"}),h=async g=>{const c={...g,status:"active",created_by_user:localStorage.getItem("name")};try{const m=localStorage.getItem("token"),i=await y.post(`${w}/status/post`,c,{headers:{Authorization:`Bearer ${m}`}});i.status===200?(j.success(" created Successfully"),s.toggleModal(),s.handlerefresh()):(console.error("Error in posting data",i),j.error("Failed to Upload"))}catch(m){console.error("Error in posting data",m)}};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ",children:e.jsxs("div",{className:"bg-white w-[522px] h-[330px]  font-lexend m-2",children:[e.jsx("div",{className:"border-b-2 border-gray-300 mx-10",children:e.jsx("h1",{className:"text-xl font-medium pt-10 pb-2",children:"Add Status"})}),e.jsxs("form",{onSubmit:u(h),children:[e.jsxs("div",{className:"mx-6 my-2",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-4",htmlFor:"status_name",children:"Status"}),e.jsx("input",{className:"appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"status_name",type:"text",placeholder:"Status",...d("status_name")}),n.status_name&&e.jsx("p",{className:"text-red-500",children:n.status_name.message})]}),e.jsxs("div",{className:"mx-6 my-3",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-3",htmlFor:"color",children:"Color"}),e.jsx("input",{className:"w-1/2 rounded-full outline-none bg-transparent",id:"color",type:"color",list:"allowed-colors",...d("color")}),e.jsxs("datalist",{id:"allowed-colors",children:[e.jsx("option",{value:"#111827"}),e.jsx("option",{value:"#14532d"}),e.jsx("option",{value:"#eab308"}),e.jsx("option",{value:"#1e40af"}),e.jsx("option",{value:"#65a30d"})]}),n.color&&e.jsx("p",{className:"text-red-500",children:n.color.message})]}),e.jsx(R,{onCancel:s.toggleModal})]})]})})},ue=/^#([0-9A-F]{3}){1,2}$/i,me=B().shape({status_name:b().required("status is required").lowercase(),color:b().matches(ue,"Enter a valid hex color code").required("Color is required"),status:b().test("not-select","Please select an Status",s=>s!==""&&s!=="Status")}),he=s=>{const{status_id:d}=s,n=localStorage.getItem("token"),{register:u,formState:{errors:o},handleSubmit:h,watch:g,setValue:c}=L({resolver:O(me),mode:"all"});a.useEffect(()=>{(async()=>{try{const x=await y.get(`${w}/status/getbyid?status_id=${d}`,{headers:{Authorization:`Bearer ${n}`}}),l=U(x.data.data);c("status_name",l.status_name),c("color",l.color),c("status",l.status)}catch(x){console.error("Error fetching data",x)}})()},[d,c]);const m=async i=>{const x={...i};try{const l=await y.post(`${w}/status/update?status_id=${d}`,x,{headers:{Authorization:`Bearer ${n}`}});l.status===200?(j.success(" Updated Successfully"),s.toggleModal(),s.handlerefresh()):(console.error("Error in posting data",l),j.error("Failed to Upload"))}catch(l){console.error("Error in posting data",l)}};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ",children:e.jsxs("div",{className:"bg-white w-[522px] h-[330px]  font-lexend m-2",children:[e.jsx("div",{className:"border-b-2 border-gray-300 mx-10",children:e.jsx("h1",{className:"text-xl font-medium pt-10 ",children:"Edit status"})}),e.jsxs("form",{onSubmit:h(m),children:[e.jsxs("div",{className:"mx-6 my-2",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-2",htmlFor:"status_name",children:"Status"}),e.jsx("input",{className:"appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"status_name",type:"text",placeholder:"status ",...u("status_name")}),o.status_name&&e.jsx("p",{className:"text-red-500",children:o.status_name.message})]}),e.jsxs("div",{className:"mx-6 my-3",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-3",htmlFor:"color",children:"Color"}),e.jsx("input",{className:"w-1/2 rounded-full outline-none bg-transparent",id:"color",type:"color",list:"allowed-colors",...u("color")}),e.jsxs("datalist",{id:"allowed-colors",children:[e.jsx("option",{value:"#111827"}),e.jsx("option",{value:"#14532d"}),e.jsx("option",{value:"#eab308"}),e.jsx("option",{value:"#1e40af"}),e.jsx("option",{value:"#65a30d"})]}),o.color&&e.jsx("p",{className:"text-red-500",children:o.color.message})]}),e.jsxs("div",{children:[e.jsxs("div",{className:" grid grid-cols-3 mx-10 my-4",children:[e.jsx("label",{className:" text-gray-900 text-base font-normal  col-span-1",htmlFor:"status",children:"Status:"}),e.jsxs("select",{className:"   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none",id:"status",...u("status"),children:[e.jsx("option",{value:"",hidden:!0,children:"Status"}),e.jsx("option",{value:"active",children:"Active"}),e.jsx("option",{value:"inactive",children:"InActive"})]})]}),o.status&&e.jsx("p",{className:"text-red-500 text-xs text-center -mt-2 mb-2 ",children:o.status.message})]}),e.jsx(R,{onCancel:s.toggleModal})]})]})})},be=({permissions:s})=>{const d=s==null?void 0:s.includes("create"),n=s==null?void 0:s.includes("edit"),u=s==null?void 0:s.includes("delete"),[o,h]=a.useState(!1),[g,c]=a.useState(!1),[m,i]=a.useState(null),[x,l]=a.useState(!1),[V,D]=a.useState(null),[N,T]=a.useState(""),[S,H]=a.useState(1),[p]=a.useState(8),[$,G]=a.useState(1),[je,J]=a.useState([]),[A,K]=a.useState([]),[E,Q]=a.useState(null),I=localStorage.getItem("token"),k=t=>{Q(E===t?null:t)},W=t=>E===t;a.useEffect(()=>{v()},[N,S]);const X=t=>{t>0&&t<=$&&H(t)},v=()=>{y.get(`${w}/status/get`,{headers:{Authorization:`Bearer ${I}`}}).then(t=>{const r=U(t.data.data);K(r);const F=r.filter(ae=>Object.values(ae).some(le=>le.toString().toLowerCase().includes(N.toLowerCase())));G(Math.ceil(F.length/p));const q=S*p,se=q-p;J(F.slice(se,q))}).catch(t=>{console.error(t)})},Y=()=>{h(!o)},Z=()=>{c(!g),i(null)},M=()=>{l(!x),D(null)},_=S*p,f=_-p,P=A.filter(t=>Object.values(t).some(r=>r.toString().toLowerCase().includes(N.toLowerCase()))),ee=P.slice().reverse().slice(f,_),te=async()=>{try{await y.delete(`${w}/status/delete?status_id=${V}`,{headers:{Authorization:`Bearer ${I}`}}),M(),v(),j.success("Deleted successfully")}catch{j.error("Failed to delete")}};return e.jsxs(a.Fragment,{children:[e.jsx("div",{className:"  bg-blue-100 overflow-y-auto no-scrollbar",children:e.jsxs("div",{className:"h-screen mt-10",children:[e.jsx(re,{title:"Status",hasCreatePermission:d,onClick:()=>h(!0),searchValue:N,setSearchValue:T}),e.jsx("div",{className:"bg-white mx-4 rounded-lg my-3 h-3/5 ",children:e.jsx("div",{className:"overflow-x-auto  no-scrollbar",children:e.jsxs("table",{className:"w-full  mt-3",children:[e.jsx("thead",{className:" border-b-2 border-gray-300",children:e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("th",{className:"",children:e.jsx("p",{className:" mx-6 my-2 font-lexend font-semibold whitespace-nowrap",children:"#"})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font- whitespace-nowrap",children:["Status Name",e.jsx(C,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["CreatedBy ",e.jsx(C,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["CreatedAt ",e.jsx(C,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["UpdatedAt ",e.jsx(C,{})]})}),e.jsx("th",{children:e.jsx("p",{className:"mx-1.5 my-2 font-semibold font-lexend whitespace-nowrap text-center",children:"Action"})})]})}),e.jsx("tbody",{children:ee.map((t,r)=>e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("td",{className:"",children:e.jsx("p",{className:" mx-3 my-2 font-lexend text-center whitespace-nowrap text-sm text-gray-700",children:f+r+1<10?`0${f+r+1}`:f+r+1})}),e.jsx("td",{children:e.jsx("p",{className:"mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm capitalize text-gray-700",children:t.status_name})}),e.jsx("td",{children:e.jsx("p",{className:"text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:t.created_by_user})}),e.jsx("td",{children:e.jsx("p",{className:"text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:z(t.createdAt)})}),e.jsx("td",{children:e.jsx("p",{className:"text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700",children:z(t.updatedAt)})}),e.jsx("td",{children:e.jsxs("div",{className:"flex justify-start mx-1.5 my-3",children:[e.jsx(oe,{onClick:()=>k(r)}),W(r)&&e.jsxs("div",{className:" bg-white shadow-md rounded-lg ml-1",children:[n&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>{c(!0),i(t.status_id),k()},children:"Edit"}),u&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>{l(!0),D(t.status_id),k()},children:"Delete"})]})]})})]},r))})]})})}),e.jsx("div",{className:" my-3 mb-5 mx-7",children:e.jsx(ne,{Length:A.length,currentPage:S,totalPages:$,firstIndex:f,lastIndex:_,paginate:X,hasNextPage:_>=P.length})})]})}),o&&e.jsx(xe,{toggleModal:Y,handlerefresh:v}),g&&e.jsx(he,{toggleModal:Z,handlerefresh:v,status_id:m}),x&&e.jsx(ce,{toggleDeleteModal:M,delete:te})]})};export{be as default};
