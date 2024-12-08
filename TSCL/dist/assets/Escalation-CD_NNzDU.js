import{r,u as V,b as v,A as q,d as F,j as e,x as Y,D as G,q as d,s as g,v as H,w as J,E as K,B as Q}from"./index-DP2NNKOn.js";import{A as W}from"./ApiClient-CPCcZu9F.js";const ae=({permissions:c})=>{c==null||c.includes("create"),c==null||c.includes("edit"),c==null||c.includes("delete");const N=c==null?void 0:c.includes("download"),[u,_]=r.useState(""),[j,P]=r.useState(1),[h]=r.useState(8),[y,D]=r.useState(1),[X,E]=r.useState([]),[m,S]=r.useState([]),C=localStorage.getItem("token"),I=localStorage.getItem("role"),A=localStorage.getItem("dept"),[O,z]=r.useState(null),L=V();r.useEffect(()=>{w()},[u,j]);const k=t=>{t>0&&t<=y&&P(t)},w=()=>{v.get(`${q}/grievance-escalation/getbydeptrole?escalation_department=${A}&escalation_to=${I}`,{headers:{Authorization:`Bearer ${C}`}}).then(t=>{const a=F(t.data.data);S(a);const i=a.filter(n=>Object.values(n).some(s=>s.toString().toLowerCase().includes(u.toLowerCase())));D(Math.ceil(i.length/h));const l=j*h,x=l-h;E(i.slice(x,l))}).catch(t=>{console.error(t)})},f=j*h,p=f-h,b=m.filter(t=>Object.values(t).some(a=>a.toString().toLowerCase().includes(u.toLowerCase()))),T=b.slice().reverse().slice(p,f),U=t=>{z(t.target.value)},$=async t=>{if(t==="csv"){const a=m.map(s=>({grievance_id:s.grievance_id,escalation_department:s.escalation_department,escalation_complaint:s.escalation_complaint,escalated_due:s.escalated_due,escalated_user:s.escalated_user,escalation_details:s.escalation_details,status:s.status,updatedAt:g(s.updatedAt)})),i=[Object.keys(a[0]).join(","),...a.map(s=>Object.values(s).join(","))].join(`
`),l=new Blob([i],{type:"text/csv;charset=utf-8;"}),x=window.URL.createObjectURL(l),n=document.createElement("a");n.setAttribute("href",x),n.setAttribute("download","Escalation_data.csv"),n.style.visibility="hidden",document.body.appendChild(n),n.click(),document.body.removeChild(n)}else if(t==="pdf")try{const i=Math.ceil(m.length/30),l=new K("l","mm","a4");let x=0;for(let n=1;n<=i;n++){const s=(n-1)*30,B=Math.min(s+30,m.length),M=m.slice(s,B).map(o=>[o.grievance_id,o.escalation_department,o.escalation_complaint,o.escalated_due,o.escalated_user,o.escalation_details,o.status,g(o.updatedAt)]);l.text(`Page ${n}`,10,x+10),l.autoTable({startY:x+15,head:[["grievance_id","Department","Complaint","Over Due","Escalated User","Escalation Details","status","LastUpdated"]],body:M,theme:"striped"}),n<i&&(l.addPage(),x=10)}l.save("Escalation_data.pdf")}catch(a){console.error("Error exporting data:",a)}},R=()=>{try{v.post(W.POST_ESCALATION.url).then(t=>{w(),Q.success("Manual Escalation Done!!!")}).catch(t=>{console.error(t)})}catch{}};return e.jsx(r.Fragment,{children:e.jsx("div",{className:"  bg-blue-100 overflow-y-auto no-scrollbar",children:e.jsxs("div",{className:"h-screen ",children:[e.jsxs("div",{className:"flex flex-row  gap-1 justify-between items-center my-7 mx-8 flex-wrap",children:[e.jsxs("h1",{className:"md:text-xl text-lg font-medium whitespace-nowrap",children:[" ","Escalation"]}),e.jsxs("div",{className:"flex flex-row items-center gap-2",children:[e.jsx(Y,{value:u,onChange:t=>_(t.target.value),placeholder:"Search Escalation"}),e.jsx("button",{className:"bg-red-600 rounded-full px-3 py-2 text-white text-sm",onClick:()=>R(),children:"Refresh"}),N&&e.jsx(G,{selectedDoc:O,onChange:U,exportData:$})]})]}),e.jsx("div",{className:"bg-white mx-4 rounded-lg my-3  h-3/5 ",children:e.jsx("div",{className:"overflow-x-auto no-scrollbar my-3",children:e.jsxs("table",{className:"w-full  ",children:[e.jsx("thead",{className:" border-b-2 border-gray-300",children:e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("th",{className:"py-2",children:e.jsx("p",{className:" mx-6 my-2 font-lexend font-semibold whitespace-nowrap",children:"#"})}),e.jsx("th",{className:"",children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5 my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Complaint No ",e.jsx(d,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Department ",e.jsx(d,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Complaint ",e.jsx(d,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-center font-semibold whitespace-nowrap",children:["Date ",e.jsx(d,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Over Due ",e.jsx(d,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap",children:["Escalated User ",e.jsx(d,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-center font-semibold whitespace-nowrap",children:["Escalation Level ",e.jsx(d,{})]})}),e.jsx("th",{children:e.jsxs("p",{className:"flex gap-2 items-center mx-1.5  my-2 font-lexend justify-center font-semibold whitespace-nowrap",children:["Status ",e.jsx(d,{})]})}),e.jsx("th",{children:e.jsx("p",{className:"flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap",children:"Action"})})]})}),e.jsx("tbody",{children:T.map((t,a)=>e.jsxs("tr",{className:"border-b-2 border-gray-300",children:[e.jsx("td",{className:"",children:e.jsx("div",{className:"items-center mx-6 my-2 font-lexend whitespace-nowrap text-sm text-center",children:p+a+1<10?`0${p+a+1}`:p+a+1})}),e.jsx("td",{children:e.jsx("p",{className:"border-2 w-28 border-slate-900 rounded-lg text-center py-1 my-1 capitalize text-slate-900 ",children:t.grievance_id})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm text-gray-800",children:t.escalation_department})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm text-gray-800",children:t.escalation_complaint})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize mx-1.5  my-2  font-lexend text-center whitespace-nowrap text-sm text-gray-800",children:g(t.updatedAt)})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize mx-1.5  my-2  font-lexend text-center whitespace-nowrap text-sm text-gray-800",children:t.escalated_due})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-800",children:t.escalated_user})}),e.jsx("td",{children:e.jsx("p",{className:"capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-800",children:t.escalation_details})}),e.jsx("td",{children:e.jsx("p",{className:"border w-28 rounded-full text-center py-1.5 mx-2 text-sm font-normal capitalize border-gray-800 text-gray-800",children:t.status})}),e.jsx("td",{children:e.jsx("div",{className:"mx-3 my-3 whitespace-nowrap",onClick:()=>L("/view",{state:{grievanceId:t.grievance_id}}),children:e.jsx(H,{})})})]},a))})]})})}),e.jsx("div",{className:" my-3 mb-5 mx-7",children:e.jsx(J,{Length:m.length,currentPage:j,totalPages:y,firstIndex:p,lastIndex:f,paginate:k,hasNextPage:f>=b.length})})]})})})};export{ae as default};
