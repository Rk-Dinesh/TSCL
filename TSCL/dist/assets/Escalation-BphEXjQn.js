import{r,u as q,b as P,A as Y,d as G,j as e,q as f,s as H,B as J}from"./index-Cb3AN3R3.js";import{R as i}from"./index-C-hq6bKM.js";import{S as K,D as Q,E as W}from"./DocumentDownload-A0b-q8L_.js";import{P as X}from"./Pagination-ClPqWgoN.js";import{A as Z}from"./ApiClient-w4qWO__2.js";import"./index-CmROlnnr.js";import"./index-Du0g9a49.js";const ie=({permissions:c})=>{c==null||c.includes("create"),c==null||c.includes("edit"),c==null||c.includes("delete");const _=c==null?void 0:c.includes("download"),[u,D]=r.useState(""),[g,y]=r.useState(1),[d,I]=r.useState(10),[w,C]=r.useState(1),[ee,E]=r.useState([]),[x,S]=r.useState([]),A=localStorage.getItem("token"),O=localStorage.getItem("designation"),z=localStorage.getItem("dept"),[L,k]=r.useState(null),v=q();r.useEffect(()=>{b()},[u,g,d]);const $=t=>{t>0&&t<=w&&y(t)},b=()=>{P.get(`${Y}/grievance-escalation/getbydeptrole?escalation_department=${z}&escalation_to=${O}`,{headers:{Authorization:`Bearer ${A}`}}).then(t=>{const a=G(t.data.data);S(a);const m=a.filter(n=>Object.values(n).some(s=>s.toString().toLowerCase().includes(u.toLowerCase())));C(Math.ceil(m.length/d));const l=g*d,h=l-d;E(m.slice(h,l))}).catch(t=>{console.error(t)})},j=g*d,p=j-d,N=x.filter(t=>Object.values(t).some(a=>a.toString().toLowerCase().includes(u.toLowerCase()))),R=N.slice().reverse().slice(p,j),T=t=>{k(t.target.value)},U=async t=>{if(t==="csv"){const a=x.map(s=>({grievance_id:s.grievance_id,escalation_department:s.escalation_department,escalation_complaint:s.escalation_complaint,escalated_due:s.escalated_due,escalated_user:s.escalated_user,escalation_details:s.escalation_details,status:s.status,updatedAt:f(s.updatedAt)})),m=[Object.keys(a[0]).join(","),...a.map(s=>Object.values(s).join(","))].join(`
`),l=new Blob([m],{type:"text/csv;charset=utf-8;"}),h=window.URL.createObjectURL(l),n=document.createElement("a");n.setAttribute("href",h),n.setAttribute("download","Escalation_data.csv"),n.style.visibility="hidden",document.body.appendChild(n),n.click(),document.body.removeChild(n)}else if(t==="pdf")try{const m=Math.ceil(x.length/30),l=new W("l","mm","a4");let h=0;for(let n=1;n<=m;n++){const s=(n-1)*30,V=Math.min(s+30,x.length),F=x.slice(s,V).map(o=>[o.grievance_id,o.escalation_department,o.escalation_complaint,o.escalated_due,o.escalated_user,o.escalation_details,o.status,f(o.updatedAt)]);l.text(`Page ${n}`,10,h+10),l.autoTable({startY:h+15,head:[["grievance_id","Department","Complaint","Over Due","Escalated User","Escalation Details","status","LastUpdated"]],body:F,theme:"striped"}),n<m&&(l.addPage(),h=10)}l.save("Escalation_data.pdf")}catch(a){console.error("Error exporting data:",a)}},B=()=>{try{P.post(Z.POST_ESCALATION.url).then(t=>{b(),J.success("Manual Escalation Done!!!")}).catch(t=>{console.error(t)})}catch{}},M=t=>{const a=parseInt(t.target.value,10);I(a),y(1)};return e.jsx(r.Fragment,{children:e.jsx("div",{className:"  bg-blue-100 overflow-y-auto no-scrollbar",children:e.jsxs("div",{className:"h-screen ",children:[e.jsxs("div",{className:"flex flex-row  gap-1 justify-between items-center my-7 mx-8 flex-wrap",children:[e.jsxs("h1",{className:"md:text-xl text-lg font-medium whitespace-nowrap",children:[" ","Escalation"]}),e.jsxs("div",{className:"flex flex-row items-center gap-2",children:[e.jsx(K,{value:u,onChange:t=>D(t.target.value),placeholder:"Search Escalation"}),e.jsx("button",{className:"bg-red-600 rounded-full px-3 py-2 text-white text-sm",onClick:()=>B(),children:"Refresh"}),_&&e.jsx(Q,{selectedDoc:L,onChange:T,exportData:U})]})]}),e.jsxs("div",{className:`bg-white  mx-4 rounded-lg overflow-x-auto mt-1  p-3 ${x.length<6?"h-3/5":"h-fit"}`,children:[e.jsxs("div",{className:"flex items-center gap-3 mx-3",children:[e.jsx("label",{htmlFor:"itemsPerPage",className:"font-medium text-gray-600",children:"Page Entries"}),e.jsxs("select",{id:"itemsPerPage",value:d,onChange:M,className:" p-1 outline-none text-sm rounded px-2",children:[e.jsx("option",{value:"10",children:"10"}),e.jsx("option",{value:"20",children:"20"}),e.jsx("option",{value:"50",children:"50"}),e.jsx("option",{value:"100",children:"100"})]})]}),e.jsx("div",{className:"overflow-x-auto  my-1",children:e.jsxs("table",{className:"w-full  ",children:[e.jsx("thead",{className:" border-b-2 border-gray-300",children:e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("th",{className:"py-2",children:e.jsx("p",{className:" mx-6 my-2 font-lexend font-semibold whitespace-nowrap",children:"#"})}),e.jsx("th",{className:"",children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5 my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Complaint No ",e.jsx(i,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Department ",e.jsx(i,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Complaint ",e.jsx(i,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-center font-semibold whitespace-nowrap",children:["Date ",e.jsx(i,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Over Due ",e.jsx(i,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Escalated User ",e.jsx(i,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-center font-semibold whitespace-nowrap",children:["Escalation Level ",e.jsx(i,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-center font-semibold whitespace-nowrap",children:["Status ",e.jsx(i,{})]})}),e.jsx("th",{children:e.jsx("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:"Action"})})]})}),e.jsx("tbody",{children:R.map((t,a)=>e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("td",{className:"",children:e.jsx("div",{className:"items-center mx-6 my-2 font-lexend whitespace-nowrap text-sm text-center",children:p+a+1<10?`0${p+a+1}`:p+a+1})}),e.jsx("td",{children:e.jsx("p",{className:"border-2 w-28 border-slate-900 rounded-lg text-center py-1 my-1 capitalize text-slate-900 ",onClick:()=>v(`/escalateview?grievanceId=${t.grievance_id}`),children:t.grievance_id})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm text-gray-800",children:t.escalation_department})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm text-gray-800",children:t.escalation_complaint})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize mx-1.5  my-2  font-lexend text-center whitespace-nowrap text-sm text-gray-800",children:f(t.updatedAt)})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize mx-1.5  my-2  font-lexend text-center whitespace-nowrap text-sm text-gray-800",children:t.escalated_due})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-800",children:t.escalated_user})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-800",children:t.escalation_details})}),e.jsx("td",{children:e.jsx("p",{className:"border w-28 rounded-full text-center py-1.5 mx-2 text-sm font-normal capitalize border-gray-800 text-gray-800",children:t.status})}),e.jsx("td",{children:e.jsx("div",{className:"mx-3 my-3 whitespace-nowrap",onClick:()=>v("/view",{state:{grievanceId:t.grievance_id}}),children:e.jsx(H,{})})})]},a))})]})})]}),e.jsx("div",{className:" my-3 mb-5 mx-7",children:e.jsx(X,{Length:x.length,currentPage:g,totalPages:w,firstIndex:p,lastIndex:j,paginate:$,hasNextPage:j>=N.length})})]})})})};export{ie as default};
