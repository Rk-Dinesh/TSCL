import{c as N,a,r as h,p as $,u as f,j as e,o as j,b as w,A as y,d as E,B as l}from"./index-B-0fny-6.js";const C=N().shape({user_name:a().required("Name is required"),phone:a().required("Contact number is required").matches(/^[0-9]{10}$/,"Contact number must be 10 digits"),email:a().required("Email id is required").email("Invalid email format"),address:a().required("Address is required"),pincode:a().required("Pincode is required").matches(/^[0-9]{6}$/,"Pincode must be 6 digits")}),I=N().shape({old_password:a().required("Old password is required"),login_password:a().required("Confirm password is required").test("passwords-match","New password and confirm password must match",function(o){return this.parent.new_password===o})}),U=()=>{const o=sessionStorage.getItem("code"),i=sessionStorage.getItem("token"),[c,b]=h.useState({}),[v,x]=h.useState(null),g=$(),{register:n,formState:{errors:t},handleSubmit:_,reset:A,setValue:d,watch:D}=f({resolver:j(C),mode:"onBlur"}),{register:u,formState:{errors:m},handleSubmit:P}=f({resolver:j(I),mode:"onBlur"});h.useEffect(()=>{(async()=>{try{const r=await w.get(`${y}/user/getbyid?user_id=${o}`,{headers:{Authorization:`Bearer ${i}`}}),s=E(r.data.data);b(s),d("user_name",s.user_name),d("phone",s.phone),x(s.phone),d("email",s.email),d("address",s.address),d("pincode",s.pincode)}catch(r){console.error("Error fetching data",r)}})()},[o,d]);const S=async p=>{const r={...p};try{const s=await w.post(`${y}/user/update?user_id=${o}`,r,{headers:{Authorization:`Bearer ${i}`}});s.status===200?(l.success("Profile Updated Successfully"),x(null),g("/dashboard")):(console.error("Error in posting data",s),l.error("Failed to Upload"))}catch(s){console.error("Error in posting data",s)}},q=async p=>{const r={...p};try{const s=await w.post(`${y}/user/userchangepassword?phone=${v}`,r,{headers:{Authorization:`Bearer ${i}`}});s.status===200?(l.success(s.data.message),x(null),g("/dashboard")):l.error(s.data.message)}catch{l.error("Old Password is Incorrect")}};return e.jsxs("div",{className:"grid grid-cols-12 gap-3 mx-3 my-4 overflow-y-auto no-scrollbar",children:[e.jsx("div",{className:"md:col-span-6 col-span-12  border w-full px-2 py-3 rounded-lg  bg-white",children:c&&e.jsxs("div",{className:"md:col-span-4 col-span-6 ",children:[e.jsxs("div",{className:"flex flex-row justify-center gap-4 items-center my-4",children:[e.jsx("div",{className:"flex mb-3 items-center",children:e.jsx("p",{className:"text-5xl bg-blue-200 text-gray-600 px-7 py-5 rounded-full",children:c.user_name?c.user_name.slice(0,1):"T"})}),e.jsx("div",{className:"flex",children:e.jsx("p",{className:"text-primary font-lexend text-2xl font-medium",children:c.user_name})})]}),e.jsx("div",{className:"md:flex md:justify-center",children:e.jsxs("form",{onSubmit:_(S),children:[e.jsx("div",{className:"col-span-4 my-4 pr-3",children:e.jsx("input",{type:"text",id:"phone",className:"w-full md:w-80 text-start border-2 bg-gray-200 rounded-lg mx-2  px-2 py-2 outline-none text-gray-600",placeholder:"Phone Number",...n("phone"),readOnly:!0})}),e.jsx("div",{className:"col-span-4 my-4  pr-3 ",children:e.jsx("input",{type:"email",id:"email",className:"w-full md:w-80 text-start border-2 bg-gray-200  rounded-lg mx-2  px-2 py-2 outline-none text-gray-600",placeholder:"abc@gmail.com",...n("email"),readOnly:!0})}),e.jsxs("div",{className:"col-span-4  my-4  pr-3",children:[e.jsx("input",{type:"text",id:"user_name",className:"w-full md:w-80 text-start border-2 overflow-hidden rounded-lg mx-2  px-2 py-2 outline-none text-gray-700",placeholder:"User Name",...n("user_name")}),t.user_name&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:t.user_name.message})]}),e.jsxs("div",{className:"col-span-4 my-4 pr-3",children:[e.jsx("input",{type:"text",id:"address",className:"w-full md:w-80 text-start border-2  rounded-lg mx-2  px-2 py-2 outline-none text-gray-700",placeholder:"Address",...n("address")}),t.address&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2  pt-2",children:t.address.message})]}),e.jsxs("div",{className:"col-span-4 my-4 pr-3",children:[e.jsx("input",{type:"text",id:"pincode",className:"w-full md:w-80 text-start border-2  rounded-lg mx-2  px-2 py-2 outline-none text-gray-700",placeholder:"Pincode",...n("pincode")}),t.pincode&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2  pt-2",children:t.pincode.message})]}),e.jsx("div",{className:" text-center my-5",children:e.jsx("button",{type:"submit",className:" text-white bg-primary text-base font-lexend rounded-full px-4 py-1.5 ",children:"Update Profile"})})]})})]})}),e.jsxs("div",{className:"md:col-span-6 col-span-12 border px-2 py-3  rounded bg-white",children:[e.jsx("div",{className:"md:col-span-4 col-span-12 md:px-12 px-4 pt-6 ",children:e.jsxs("div",{className:" flex flex-col",children:[e.jsx("div",{children:e.jsx("p",{className:"text-xl font-medium text-primary font-lexend",children:"Update Password"})}),e.jsx("div",{children:e.jsx("p",{className:"text-base font-medium text-red-600 mt-4 mb-1",children:"Important Note:"})}),e.jsx("div",{children:e.jsx("p",{className:"text-sm font-normal text-gray-400",children:"Password must contain 1 Capital Letter, 1 Number,1 special Character and it should contain 9 letter"})}),e.jsx("div",{children:e.jsx("p",{className:"text-xs font-normal text-gray-400 mt-2",children:"Example: Pass@1234"})})]})}),e.jsx("div",{className:"md:flex md:justify-center mt-8",children:e.jsxs("form",{onSubmit:P(q),children:[e.jsxs("div",{className:"col-span-4 my-4  px-3",children:[e.jsx("input",{type:"password",id:"old_password",className:"w-full md:w-80 text-start border-2  rounded-lg mx-2  px-2 py-2 outline-none",placeholder:"Old Password",...u("old_password")}),m.old_password&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:m.old_password.message})]}),e.jsx("div",{className:"col-span-4 my-4  px-3",children:e.jsx("input",{type:"password",id:"new_password",className:"w-full md:w-80 text-start border-2  rounded-lg mx-2  px-2 py-2 outline-none",placeholder:"New Password",...u("new_password")})}),e.jsxs("div",{className:"col-span-4 my-4  px-3",children:[e.jsx("input",{type:"password",id:"login_password",className:"w-full md:w-80 text-start border-2  rounded-lg mx-2  px-2 py-2 outline-none",placeholder:"Confirm Password",...u("login_password")}),m.login_password&&e.jsx("p",{className:"text-red-500 text-xs text-start px-2 pt-2",children:m.login_password.message})]}),e.jsx("div",{className:" text-center my-6 sm:py-5",children:e.jsx("button",{type:"submit",className:" text-white bg-primary text-base font-lexend rounded-full px-4 py-1.5 ",children:"Change Password"})})]})})]})]})};export{U as default};