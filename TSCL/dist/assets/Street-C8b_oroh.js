import{i as ae,k as L,r,l as se,o as re,j as e,b as I,A as P,B as _,d as q,I as Se,F as ee,m as te,n as ke}from"./index-BcYsGqVu.js";import{R as z}from"./index-D7OJULEB.js";import{D as De}from"./DeleteModal-CGzHCWo0.js";import{P as Ce,a as ze}from"./index-1Cs2earB.js";import{a as Ie}from"./index-D_-LWkAi.js";import{E as Pe}from"./jspdf.plugin.autotable-doWDoFvS.js";const Ee=ae().shape({ward_name:L().test("not-select","Please select a ward",a=>a!==""&&a!=="Select Street"),street_name:L().required("street_name is required")}),Me=a=>{const{ExistingWards:u}=a,[v,E]=r.useState(null),[A,j]=r.useState(null),[S,k]=r.useState(null),[y,M]=r.useState(null),{register:m,formState:{errors:x},handleSubmit:w,watch:f}=se({resolver:re(Ee),mode:"all"});r.useEffect(()=>{if(y){const o=u.find(p=>p.ward_name===y);o&&(E(o.zone_id),j(o.ward_id),k(o.zone_name))}},[y,u]);const $=async o=>{const p={...o,zone_id:v,ward_id:A,zone_name:S,status:"active",created_by_user:sessionStorage.getItem("name")};try{const g=sessionStorage.getItem("token"),l=await I.post(`${P}/street/post`,p,{headers:{Authorization:`Bearer ${g}`}});l.status===200?(_.success("Street created Successfully"),a.toggleModal(),a.handlerefresh()):(console.error("Error in posting data",l),_.error("Failed to Upload"))}catch(g){console.error("Error in posting data",g)}};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ",children:e.jsxs("div",{className:"bg-white w-[522px] h-[368px]  font-lexend m-2",children:[e.jsx("div",{className:"border-b-2 border-gray-300 mx-10",children:e.jsx("h1",{className:"text-xl font-medium pt-10 pb-2",children:"Add Street"})}),e.jsxs("form",{onSubmit:w($),children:[e.jsxs("div",{className:"mx-6 my-3",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-3",htmlFor:"ward_name",children:"Ward Name"}),e.jsxs("select",{className:"appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"ward_name",...m("ward_name"),onChange:o=>M(o.target.value),children:[e.jsx("option",{value:"",children:"Select Street"}),u.map(o=>e.jsx("option",{value:o.ward_name,children:o.ward_name},o.ward_id))]}),x.ward_name&&e.jsx("p",{className:"text-red-500",children:x.ward_name.message})]}),e.jsxs("div",{className:"",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-3",htmlFor:"street_name",children:"Street Name"}),e.jsx("input",{className:"appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"street_name",type:"text",placeholder:"Street Name",...m("street_name")}),x.street_name&&e.jsx("p",{className:"text-red-500",children:x.street_name.message})]})]}),e.jsxs("div",{className:"flex justify-end mx-10  gap-5 ",children:[e.jsx("div",{className:"border border-primary text-primary bg-none font-lexend rounded-3xl px-5 py-1.5",onClick:a.toggleCloseModal,children:"cancel"}),e.jsx("button",{className:" text-white bg-primary font-lexend rounded-3xl px-5 py-1.5",children:"Save"})]})]})]})})},$e=ae().shape({ward_name:L().test("not-select","Please select a ward",a=>a!==""&&a!=="Select Street"),street_name:L().required("street_name is required"),status:L().test("not-select","Please select an Status",a=>a!==""&&a!=="Status")}),Ae=a=>{const{ExistingWards:u,streetId:v}=a,E=sessionStorage.getItem("token"),[A,j]=r.useState(null),[S,k]=r.useState(null),[y,M]=r.useState(null),[m,x]=r.useState(null),{register:w,formState:{errors:f},handleSubmit:$,watch:o,setValue:p}=se({resolver:re($e),mode:"all"});r.useEffect(()=>{(async()=>{try{const n=await I.get(`${P}/street/getbyid?street_id=${v}`,{headers:{Authorization:`Bearer ${E}`}}),h=q(n.data.data);x(h.ward_name),p("ward_name",h.ward_name),p("street_name",h.street_name),p("status",h.status)}catch(n){console.error("Error fetching data",n)}})()},[v,p]),r.useEffect(()=>{if(m){const l=u.find(n=>n.ward_name===m);l&&(j(l.zone_id),k(l.ward_id),M(l.zone_name))}},[m,u]);const g=async l=>{const n={...l,zone_id:A,ward_id:S,zone_name:y};try{const h=await I.post(`${P}/street/update?street_id=${v}`,n,{headers:{Authorization:`Bearer ${E}`}});h.status===200?(_.success("Street updated Successfully"),j(null),k(null),M(null),x(null),a.toggleModal(),a.handlerefresh()):(console.error("Error in posting data",h),_.error("Failed to Upload"))}catch(h){console.error("Error in posting data",h)}};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ",children:e.jsxs("div",{className:"bg-white w-[522px] h-[368px]  font-lexend m-2",children:[e.jsx("div",{className:"border-b-2 border-gray-300 mx-10",children:e.jsx("h1",{className:"text-xl font-medium pt-6 pb-2",children:"Edit Street"})}),e.jsxs("form",{onSubmit:$(g),children:[e.jsxs("div",{className:"mx-6 my-2",children:[e.jsxs("div",{className:"mb-2",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-2",htmlFor:"ward_name",children:"Ward Name"}),e.jsxs("select",{className:"appearance-none border rounded-lg w-full py-1.5 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"ward_name",...w("ward_name"),onChange:l=>x(l.target.value),children:[e.jsx("option",{value:m,disabled:!0,children:m}),u.map(l=>e.jsx("option",{value:l.ward_name,children:l.ward_name},l.ward_id))]}),f.ward_name&&e.jsx("p",{className:"text-red-500",children:f.ward_name.message})]}),e.jsxs("div",{className:"",children:[e.jsx("label",{className:"block text-gray-900 text-base font-normal mb-2",htmlFor:"street_name",children:"Street Name"}),e.jsx("input",{className:"appearance-none border rounded-lg w-full py-1.5 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline",id:"street_name",type:"text",placeholder:"Street Name",...w("street_name")}),f.street_name&&e.jsx("p",{className:"text-red-500",children:f.street_name.message})]}),e.jsxs("div",{className:" grid grid-cols-3 mx-3 my-3 ",children:[e.jsx("label",{className:" text-gray-900 text-base font-normal  col-span-1",htmlFor:"status",children:"Status:"}),e.jsxs("select",{className:"   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none",id:"status",...w("status"),children:[e.jsx("option",{value:"",hidden:!0,children:"Status"}),e.jsx("option",{value:"active",children:"Active"}),e.jsx("option",{value:"inactive",children:"InActive"})]}),f.status&&e.jsx("p",{className:"text-red-500 text-xs text-center mb-3 ",children:f.status.message})]})]}),e.jsxs("div",{className:"flex justify-end mx-10  gap-5 ",children:[e.jsx("div",{className:"border border-primary text-primary bg-none font-lexend rounded-3xl px-5 py-1.5",onClick:a.toggleModal,children:"cancel"}),e.jsx("button",{className:" text-white bg-primary font-lexend rounded-3xl px-5 py-1.5",children:"Save"})]})]})]})})},Be=`street_name,ward_id,ward_name,zone_id,zone_name,status,created_by_user
 streetName,Ward***,WardName,Z***,ZoneName,Status,admin`,Ve=({permissions:a})=>{const u=a==null?void 0:a.includes("create"),v=a==null?void 0:a.includes("edit"),E=a==null?void 0:a.includes("delete"),A=a==null?void 0:a.includes("download"),[j,S]=r.useState(!1),[k,y]=r.useState(!1),[M,m]=r.useState(null),[x,w]=r.useState(!1),[f,$]=r.useState(null),[o,p]=r.useState(null),[g,l]=r.useState(""),[n,h]=r.useState(1),[B]=r.useState(8),[F,ne]=r.useState(1),[Fe,le]=r.useState([]),[D,oe]=r.useState([]),[H,de]=r.useState(null),T=sessionStorage.getItem("token"),[ce,Y]=r.useState(null),[G,J]=r.useState("Bulk Upload"),[Z,ie]=r.useState(null),V=t=>{de(H===t?null:t)},me=t=>H===t;r.useEffect(()=>{U(),pe()},[g,n]);const W=t=>{t>0&&t<=F&&h(t)},U=()=>{I.get(`${P}/street/get`,{headers:{Authorization:`Bearer ${T}`}}).then(t=>{const s=q(t.data.data);oe(s);const i=s.filter(c=>Object.values(c).some(d=>d.toString().toLowerCase().includes(g.toLowerCase())));ne(Math.ceil(i.length/B));const b=n*B,C=b-B;le(i.slice(C,b))})},xe=()=>{S(!j)},he=()=>{y(!k),m(null)},ue=()=>{S(!j)},K=()=>{w(!x),$(null)},pe=async()=>{try{const t=await I.get(`${P}/ward/getactive`,{headers:{Authorization:`Bearer ${T}`}}),s=q(t.data.data);p(s)}catch(t){console.error("Error fetching existing roles:",t)}},R=n*B,O=R-B,Q=D.filter(t=>Object.values(t).some(s=>s.toString().toLowerCase().includes(g.toLowerCase()))),ge=Q.slice(O,R),fe=async()=>{try{await I.delete(`${P}/street/delete?street_id=${f}`,{headers:{Authorization:`Bearer ${T}`}}),K(),U(),_.success("Deleted successfully")}catch{_.error("Failed to delete")}},be=t=>{Y(t.target.files[0]),J("Upload")},je=()=>{G==="Bulk Upload"?document.getElementById("fileInput").click():ye(ce)},ye=async t=>{try{const s=new FormData;s.append("file",t),(await I.post(`${P}/street/uploadcsv`,s,{headers:{"Content-Type":"multipart/form-data"}})).status===200?(J("Bulk Upload"),Y(null),U(),_.success("Data Uploaded Successfully")):_.error("Data failed to Upload")}catch(s){console.log(s)}},we=t=>{ie(t.target.value)},X=async t=>{if(t==="csv"){const s=D.map(d=>({street_id:d.street_id,street_name:d.street_name,ward_id:d.ward_id,ward_name:d.ward_name,zone_id:d.zone_id,zone_name:d.zone_name,status:d.status,created_by_user:d.created_by_user})),i=[Object.keys(s[0]).join(","),...s.map(d=>Object.values(d).join(","))].join(`
`),b=new Blob([i],{type:"text/csv;charset=utf-8;"}),C=window.URL.createObjectURL(b),c=document.createElement("a");c.setAttribute("href",C),c.setAttribute("download","Street_data.csv"),c.style.visibility="hidden",document.body.appendChild(c),c.click(),document.body.removeChild(c)}else if(t==="pdf")try{const i=Math.ceil(D.length/30),b=new Pe("l","mm","a4");let C=0;for(let c=1;c<=i;c++){const d=(c-1)*30,_e=Math.min(d+30,D.length),ve=D.slice(d,_e).map(N=>[N.street_id,N.street_name,N.ward_id,N.ward_name,N.zone_id,N.zone_name,N.status,N.created_by_user]);b.text(`Page ${c}`,10,C+10),b.autoTable({startY:C+15,head:[["street_id","street_name","ward_id","ward_name","zone_id","zone_name","status","created_by_user"]],body:ve,theme:"striped"}),c<i&&(b.addPage(),C=10)}b.save("Street_data.pdf")}catch(s){console.error("Error exporting data:",s)}},Ne=()=>{const t=new Blob([Be],{type:"text/csv"}),s=URL.createObjectURL(t),i=document.createElement("a");i.href=s,i.download="street_bulkupload_template.csv",i.click(),URL.revokeObjectURL(s)};return e.jsxs(r.Fragment,{children:[e.jsx("div",{className:"  bg-blue-100 overflow-y-auto no-scrollbar",children:e.jsxs("div",{className:"h-screen",children:[e.jsxs("div",{className:"flex flex-row items-center md:justify-end gap-3 p-2 mt-3 mx-8 flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-3 bg-white px-3 py-2 rounded-full",children:[e.jsx(Se,{className:"text-xl"}),e.jsx("input",{type:"search",className:"outline-none bg-transparent text-base",placeholder:"Search Street",value:g,onChange:t=>l(t.target.value)})]}),u&&e.jsxs("div",{className:"relative text-center   hover:text-white py-1.5 rounded-full",children:[e.jsx("input",{type:"file",id:"fileInput",className:"hidden",onChange:be,accept:".csv"}),e.jsxs("button",{className:"flex items-center gap-2 justify-center border-primary border-2 font-normal text-base w-36 py-1.5  rounded-full text-primary hover:text-white hover:bg-primary  ",onClick:je,children:[e.jsx(ee,{}),G]})]}),A&&e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("form",{children:e.jsxs("select",{className:"block w-full py-2 px-2  text-sm border-2 text-gray-400  border-gray-300 rounded-full bg-gray-50 outline-none",onChange:we,children:[e.jsx("option",{hidden:!0,children:"Download"}),e.jsx("option",{value:"csv",children:"CSV"}),e.jsx("option",{value:"pdf",children:"PDF"})]})}),Z===null&&e.jsx(Ie,{className:"text-2xl text-gray-500"}),Z==="csv"&&e.jsx(Ce,{className:"text-3xl text-gray-500",onClick:()=>X("csv")}),Z==="pdf"&&e.jsx(ze,{className:"text-3xl text-gray-500",onClick:()=>X("pdf")})]})]}),e.jsxs("div",{className:"flex justify-between items-center my-2 mx-8 gap-1 flex-wrap",children:[e.jsx("h1",{className:"md:text-xl text-lg font-medium ",children:"Street"}),u&&e.jsxs("button",{className:"flex flex-row-2 gap-2  font-lexend items-center border-2 bg-blue-500 text-white rounded-full py-2 px-3 justify-between md:text-base text-sm",onClick:()=>S(!0),children:[e.jsx(ee,{})," Add Street"]})]}),e.jsx("div",{className:"bg-white mx-4 rounded-lg my-3  h-3/5 ",children:e.jsx("div",{className:"overflow-x-auto no-scrollbar",children:e.jsxs("table",{className:"w-full  mt-3",children:[e.jsx("thead",{className:" border-b-2 border-gray-300",children:e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("th",{className:"",children:e.jsx("p",{className:" mx-6 my-2 font-lexend font-semibold whitespace-nowrap",children:"#"})}),e.jsx("th",{className:"",children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-semibold",children:["Street ",e.jsx(z,{})]})}),e.jsx("th",{className:"",children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-semibold",children:["Ward ",e.jsx(z,{})]})}),e.jsx("th",{className:"",children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-semibold",children:["Zone ",e.jsx(z,{})]})}),e.jsx("th",{className:"",children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-semibold",children:["Status ",e.jsx(z,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold",children:["CreatedBy ",e.jsx(z,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold",children:["CreatedAt",e.jsx(z,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold",children:["UpdatedAt",e.jsx(z,{})]})}),e.jsx("th",{children:e.jsx("p",{className:"text-center mx-1.5 my-3 font-lexend font-semibold",children:"Action"})})]})}),e.jsx("tbody",{children:ge.map((t,s)=>e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("td",{className:"",children:e.jsx("div",{className:"items-center mx-6 my-2 font-lexend whitespace-nowrap text-sm text-center text-gray-700",children:O+s+1<10?`0${O+s+1}`:O+s+1})}),e.jsx("td",{children:e.jsx("p",{className:"text-start text-sm mx-1.5 my-2 font-lexend whitespace-nowrap capitalize text-gray-700",children:t.street_name})}),e.jsx("td",{children:e.jsx("p",{className:"text-start text-sm mx-1.5 my-2 font-lexend whitespace-nowrap capitalize text-gray-700",children:t.ward_name})}),e.jsx("td",{children:e.jsx("p",{className:"text-start text-sm mx-1.5 my-2 font-lexend whitespace-nowrap capitalize text-gray-700",children:t.zone_name})}),e.jsx("td",{children:e.jsx("p",{className:"text-start text-sm mx-1.5 my-2 font-lexend whitespace-nowrap capitalize text-gray-700",children:t.status})}),e.jsx("td",{children:e.jsx("p",{className:"text-start text-sm mx-1.5  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",children:t.created_by_user})}),e.jsx("td",{children:e.jsx("p",{className:"text-start text-sm mx-1.5 my-2  font-lexend whitespace-nowrap capitalize text-gray-700",children:te(t.createdAt)})}),e.jsx("td",{children:e.jsx("p",{className:"text-start text-sm mx-1.5  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",children:te(t.updatedAt)})}),e.jsx("td",{children:e.jsxs("div",{className:"flex justify-start mx-1.5 my-3",children:[e.jsx(ke,{onClick:()=>V(s)}),me(s)&&e.jsxs("div",{className:" bg-white shadow-md rounded-lg ml-1",children:[v&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>{y(!0),m(t.street_id),V()},children:"Edit"}),E&&e.jsx("button",{className:"block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",onClick:()=>{w(!0),$(t.street_id),V()},children:"Delete"})]})]})})]},s))})]})})}),e.jsxs("div",{className:" my-3 mb-5 mx-7",children:[e.jsx("div",{className:"text-center",children:e.jsx("button",{className:"bg-primary px-3 py-2 rounded-full text-white text-sm font-alegerya",onClick:Ne,children:"Bulk Upload Template"})}),e.jsxs("nav",{className:"flex items-center flex-column flex-wrap md:flex-row md:justify-between justify-center pt-4","aria-label":"Table navigation",children:[e.jsxs("span",{className:"text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center font-alegerya",children:["Showing"," ",e.jsxs("span",{className:"text-gray-700",children:[O+1," to ",Math.min(R,D.length)]})," ","of ",e.jsxs("span",{className:"text-gray-900",children:[D.length," entries"]})]}),e.jsxs("ul",{className:"inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 font-alegerya",children:[e.jsx("li",{children:e.jsx("button",{onClick:()=>W(1),disabled:n===1,className:"flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-s-lg hover:bg-paginate-bg hover:text-primary-hover",children:"<<"})}),e.jsx("li",{children:e.jsx("button",{onClick:()=>W(n-1),disabled:n===1,className:"flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover",children:"Back"})}),Array.from({length:F},(t,s)=>s+1).slice(Math.max(0,n-2),Math.min(F,n+1)).map(t=>e.jsx("li",{children:e.jsx("button",{onClick:()=>W(t),className:`flex items-center justify-center px-3 h-8 leading-tight border border-paginate-br hover:text-white hover:bg-primary ${n===t?"bg-primary text-white":"bg-white text-black"}`,children:t})},t)),e.jsx("li",{children:e.jsx("button",{onClick:()=>W(n+1),disabled:R>=Q.length,className:"flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover",children:"Next"})}),e.jsx("li",{children:e.jsx("button",{onClick:()=>W(F),disabled:n===F,className:"flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-e-lg hover:bg-paginate-bg hover:text-primary-hover",children:">>"})})]})]})]})]})}),j&&e.jsx(Me,{toggleModal:xe,toggleCloseModal:ue,ExistingWards:o,handlerefresh:U}),k&&e.jsx(Ae,{toggleModal:he,handlerefresh:U,ExistingWards:o,streetId:M}),x&&e.jsx(De,{toggleDeleteModal:K,delete:fe})]})};export{Ve as default};
