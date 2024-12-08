import{r as i,j as e,b as x,A as m,V as h,N as p}from"./index-DP2NNKOn.js";const f=r=>{const{endpoint:a,attachmentFile:l}=r,[c,o]=i.useState(null);return i.useEffect(()=>{(async()=>{try{const t=await x.get(`${m}/${a}/file/${l}`,{responseType:"blob"}),d=new Blob([t.data],{type:t.headers["content-type"]}),n=URL.createObjectURL(d);o(n)}catch(t){console.error("Error fetching data",t)}})()},[l]),e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ",children:e.jsx("div",{className:"bg-white w-fit h-fit  font-lexend m-2 rounded-xl",children:e.jsxs("div",{className:"  py-6 mx-8 my-3 gap-5 ",children:[c&&e.jsx("img",{src:c,alt:"attachment",className:"w-72 h-72 mb-3"}),e.jsx("div",{className:"border border-primary text-primary bg-none font-lexend rounded-3xl px-3 py-1.5 text-center",onClick:r.toggleModal,children:"cancel"})]})})})},j=r=>{const{matchData:a,togglReModal:l}=r,[c,o]=i.useState({});return localStorage.getItem("token"),i.useEffect(()=>{document.querySelectorAll(".accordion").forEach(t=>{const d=t.querySelector(".accordion-header");t.querySelector(".accordion-body"),d.addEventListener("click",()=>{o(n=>({...n,[t.dataset.index]:!n[t.dataset.index]}))})})},[]),e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center",children:e.jsxs("div",{className:"bg-white w-full h-3/5 font-lexend m-2 mx-5 overflow-auto",children:[e.jsxs("div",{className:"flex justify-between mx-3 mt-2 items-center",children:[e.jsx("p",{className:"pt-2 text-lg text-slate-900 pl-5",children:"Similar Request"}),e.jsx("p",{className:"text-3xl pr-5",onClick:()=>l(),children:"x"})]}),e.jsx("hr",{className:"my-3 w-full"}),a&&a.length>0?a.map((s,t)=>e.jsxs("div",{className:"accordion mb-4","data-index":t,children:[e.jsxs("div",{className:"accordion-header flex items-center justify-between p-4 bg-slate-500 rounded-t cursor-pointer mx-3",children:[e.jsx("div",{className:"flex flex-wrap gap-3",children:e.jsxs("p",{className:"text-white",children:[e.jsxs("span",{className:"text-lg  font-medium",children:[s.grievance_id," :"]})," ",s.dept_name," - ",s.complaint]})}),e.jsx("span",{className:"text-2xl font-bold text-white",children:e.jsx(h,{className:c[t]?" rotate-180 ":""})})]}),e.jsx("div",{className:`accordion-body p-4 bg-gray-50 rounded-b ${c[t]?"block":"hidden"}`,children:e.jsx("table",{className:"w-full bg-gray-100 rounded",children:e.jsxs("tbody",{className:"divide-y divide-gray-300",children:[e.jsx("tr",{children:e.jsxs("td",{className:"text-start px-3 mx-3 py-2.5 whitespace-nowrap",children:["Department : ",s.dept_name]})}),e.jsx("tr",{children:e.jsxs("td",{className:"text-start px-3 mx-3 py-2.5 ",children:["Description : ",s.complaint_details]})}),e.jsx("tr",{children:e.jsxs("td",{className:"text-start px-3 mx-3 py-2.5 whitespace-nowrap",children:["Date : ",p(s.createdAt)]})})]})})})]},t)):e.jsx("p",{className:" text-center font-semibold text-2xl mt-28",children:"No matching data found !!!"})]})})};export{j as S,f as V};
