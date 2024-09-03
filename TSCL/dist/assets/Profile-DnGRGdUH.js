import{c as S,a as r,r as i,q as U,u as P,j as e,E as g,H as j,o as _,b as f,A as N,d as k,B as c}from"./index-CgbAUok4.js";const F=S().shape({user_name:r().required("Name is required"),phone:r().required("Contact number is required").matches(/^[0-9]{10}$/,"Contact number must be 10 digits"),email:r().required("Email id is required").email("Invalid email format"),address:r().required("Address is required"),pincode:r().required("Pincode is required").matches(/^[0-9]{6}$/,"Pincode must be 6 digits")}),z=S().shape({old_password:r().required("Old password is required"),login_password:r().required("Confirm password is required").test("passwords-match","New password and confirm password must match",function(d){return this.parent.new_password===d})}),L=()=>{const d=sessionStorage.getItem("code"),m=sessionStorage.getItem("token"),[x,q]=i.useState({}),[$,h]=i.useState(null),[n,E]=i.useState(!1),[w,C]=i.useState(!1),b=U(),{register:l,formState:{errors:a},handleSubmit:B,reset:T,setValue:o,watch:V}=P({resolver:_(F),mode:"onBlur"}),{register:y,formState:{errors:p},handleSubmit:I}=P({resolver:_(z),mode:"onBlur"});i.useEffect(()=>{(async()=>{try{const t=await f.get(`${N}/user/getbyid?user_id=${d}`,{headers:{Authorization:`Bearer ${m}`}}),s=k(t.data.data);q(s),o("user_name",s.user_name),o("phone",s.phone),h(s.phone),o("email",s.email),o("address",s.address),o("pincode",s.pincode)}catch(t){console.error("Error fetching data",t)}})()},[d,o]);const A=async u=>{const t={...u};try{const s=await f.post(`${N}/user/update?user_id=${d}`,t,{headers:{Authorization:`Bearer ${m}`}});s.status===200?(c.success("Profile Updated Successfully"),h(null),b("/dashboard")):(console.error("Error in posting data",s),c.error("Failed to Upload"))}catch(s){console.error("Error in posting data",s)}},D=async u=>{const t={...u};try{const s=await f.post(`${N}/user/userchangepassword?phone=${$}`,t,{headers:{Authorization:`Bearer ${m}`}});s.status===200?(c.success(s.data.message),h(null),b("/dashboard")):c.error(s.data.message)}catch{c.error("Old Password is Incorrect")}},v=()=>{E(!n)},O=()=>{C(!w)};return e.jsxs("div",{className:"grid grid-cols-12 gap-3 mx-3 my-4 overflow-y-auto no-scrollbar",children:[e.jsx("div",{className:"md:col-span-6 col-span-12  border w-full px-2 py-3 rounded-lg  bg-white",children:x&&e.jsxs("div",{className:"md:col-span-4 col-span-6 ",children:[e.jsxs("div",{className:"flex flex-row justify-center gap-4 items-center my-4",children:[e.jsx("div",{className:"flex mb-3 items-center",children:e.jsx("p",{className:"text-5xl bg-blue-200 text-gray-600 px-7 py-5 rounded-full",children:x.user_name?x.user_name.slice(0,1):"T"})}),e.jsx("div",{className:"flex",children:e.jsx("p",{className:"text-primary font-lexend text-2xl font-medium",children:x.user_name})})]}),e.jsx("div",{className:"md:flex md:justify-center",children:e.jsxs("form",{onSubmit:B(A),children:[e.jsx("div",{className:"col-span-4 my-4 pr-3",children:e.jsx("input",{type:"text",id:"phone",className:"w-full md:w-80 text-start border-2 bg-gray-200 rounded-lg mx-2  px-2 py-2 outline-none text-gray-600",placeholder:"Phone Number",...l("phone"),readOnly:!0})}),e.jsx("div",{className:"col-span-4 my-4  pr-3 ",children:e.jsx("input",{type:"email",id:"email",className:"w-full md:w-80 text-start border-2 bg-gray-200  rounded-lg mx-2  px-2 py-2 outline-none text-gray-600",placeholder:"abc@gmail.com",...l("email"),readOnly:!0})}),e.jsxs("div",{className:"col-span-4  my-4  pr-3",children:[e.jsx("input",{type:"text",id:"user_name",className:"w-full md:w-80 text-start border-2 overflow-hidden rounded-lg mx-2  px-2 py-2 outline-none text-gray-700",placeholder:"User Name",...l("user_name")}),a.user_name&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:a.user_name.message})]}),e.jsxs("div",{className:"col-span-4 my-4 pr-3",children:[e.jsx("input",{type:"text",id:"address",className:"w-full md:w-80 text-start border-2  rounded-lg mx-2  px-2 py-2 outline-none text-gray-700",placeholder:"Address",...l("address")}),a.address&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2  pt-2",children:a.address.message})]}),e.jsxs("div",{className:"col-span-4 my-4 pr-3",children:[e.jsx("input",{type:"text",id:"pincode",className:"w-full md:w-80 text-start border-2  rounded-lg mx-2  px-2 py-2 outline-none text-gray-700",placeholder:"Pincode",...l("pincode")}),a.pincode&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2  pt-2",children:a.pincode.message})]}),e.jsx("div",{className:" text-center my-5",children:e.jsx("button",{type:"submit",className:" text-white bg-primary text-base font-lexend rounded-full px-4 py-1.5 ",children:"Update Profile"})})]})})]})}),e.jsxs("div",{className:"md:col-span-6 col-span-12 border px-2 py-3  rounded bg-white",children:[e.jsx("div",{className:"md:col-span-4 col-span-12 md:px-12 px-4 pt-6 ",children:e.jsxs("div",{className:" flex flex-col",children:[e.jsx("div",{children:e.jsx("p",{className:"text-xl font-medium text-primary font-lexend",children:"Update Password"})}),e.jsx("div",{children:e.jsx("p",{className:"text-base font-medium text-red-600 mt-4 mb-1",children:"Important Note:"})}),e.jsx("div",{children:e.jsx("p",{className:"text-sm font-normal text-gray-400",children:"Password must contain 1 Capital Letter, 1 Number,1 special Character and it should contain 9 letter"})}),e.jsx("div",{children:e.jsx("p",{className:"text-xs font-normal text-gray-400 mt-2",children:"Example: Pass@1234"})})]})}),e.jsx("div",{className:"md:flex md:justify-center mt-8",children:e.jsxs("form",{onSubmit:I(D),children:[e.jsxs("div",{className:"col-span-4 my-4  px-3",children:[e.jsxs("div",{className:"flex items-center border-2  rounded-lg mx-2  px-2 py-2 outline-none",children:[e.jsx("input",{type:w?"text":"password",id:"old_password",className:"w-full md:w-72 text-start outline-none",placeholder:"Old Password",...y("old_password")}),e.jsx("button",{type:"button",className:"text-gray-500 hover:text-gray-900 transition duration-300 outline-none",onClick:O,children:w?e.jsx(g,{}):e.jsx(j,{})})]}),p.old_password&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:p.old_password.message})]}),e.jsx("div",{className:"col-span-4 my-4  px-3",children:e.jsxs("div",{className:"flex items-center border-2  rounded-lg mx-2  px-2 py-2 outline-none",children:[e.jsx("input",{type:n?"text":"password",id:"new_password",className:"w-full md:w-72 text-start outline-none",placeholder:"New Password",...y("new_password")}),e.jsx("button",{type:"button",className:"text-gray-500 hover:text-gray-900 transition duration-300 outline-none",onClick:v,children:n?e.jsx(g,{}):e.jsx(j,{})})]})}),e.jsxs("div",{className:"col-span-4 my-4  px-3",children:[e.jsxs("div",{className:"flex items-center border-2  rounded-lg mx-2  px-2 py-2 outline-none",children:[e.jsx("input",{type:n?"text":"password",id:"login_password",className:"w-full md:w-72 text-start outline-none ",placeholder:"Confirm Password",...y("login_password")}),e.jsx("button",{type:"button",className:"text-gray-500 hover:text-gray-900 transition duration-300 outline-none",onClick:v,children:n?e.jsx(g,{}):e.jsx(j,{})})]}),p.login_password&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:p.login_password.message})]}),e.jsx("div",{className:" text-center my-6 sm:py-5",children:e.jsx("button",{type:"submit",className:" text-white bg-primary text-base font-lexend rounded-full px-4 py-1.5 ",children:"Change Password"})})]})})]})]})};export{L as default};
