import{c,a,p as x,u as o,j as e,l as p,o as g}from"./index-B-0fny-6.js";const u=c().shape({public_user_name:a().required("User Name is required"),phone:a().required("Phone Number is required"),email:a().required("Email Id  is required"),login_password:a().required("password is required")}),y=()=>{const l=x(),{register:t,formState:{errors:s},handleSubmit:d,setValue:h,watch:b}=o({resolver:g(u),mode:"all"}),r=async n=>{const i={...n};l("/auth",{state:{DataForm:i}})},m=()=>{l("/")};return e.jsxs("div",{className:"h-screen  bg-primary py-6 flex flex-col md:items-center gap-8 justify-center ",children:[e.jsxs("div",{className:"flex items-center justify-center gap-3",children:[e.jsx("img",{src:p,alt:"Image",className:"w-24 h-24"}),e.jsx("p",{className:"text-6xl text-secondary",children:"TSCL"})]}),e.jsx("div",{className:"mx-3",children:e.jsx("div",{className:"p-6  md:max-w-[600px] w-full   md:bg-white  relative rounded-lg ",children:e.jsxs("div",{className:"font-lexend text-start mt-2",children:[e.jsxs("form",{onSubmit:d(r),children:[e.jsx("p",{className:"text-xl md:text-black text-gray-200   md:mx-3 my-3",children:"Sign Up"}),e.jsxs("div",{className:"grid md:grid-cols-3 grid-col-2  font-normal md:mx-4 py-1.5",children:[e.jsxs("label",{className:" md:text-black text-slate-800 flex text-lg font-medium mb-2 col-span-1",htmlFor:"public_user_name",children:["Name",e.jsx("span",{className:"md:text-red-700 text-red-900 px-2",children:"*"})]}),e.jsx("input",{type:"text",id:"public_user_name",className:"md:col-span-2 col-span-1 border outline-none rounded-lg   px-5  py-1.5 bg-gray-200 md:bg-gray-50",placeholder:"Enter your Name",...t("public_user_name")}),s.public_user_name&&e.jsx("p",{className:"md:text-red-500  text-red-700 md:text-xs text-sm text-end mt-1 md:col-span-3",children:s.public_user_name.message})]}),e.jsxs("div",{className:" grid md:grid-cols-3 grid-col-2  font-normal md:mx-4 py-1.5",children:[e.jsxs("label",{className:"col-span-1 md:text-black text-slate-800 text-lg font-medium mb-2 ",htmlFor:"email",children:["Email Id",e.jsx("span",{className:"md:text-red-700 text-red-900 px-2",children:"*"})]}),e.jsx("input",{type:"email",id:"email",className:"md:col-span-2 col-span-1  border outline-none  rounded-lg py-1.5 px-5 bg-gray-200 md:bg-gray-50",placeholder:"tscl123@gmail.com",...t("email")}),s.email&&e.jsx("p",{className:"md:text-red-500  text-red-700 md:text-xs text-sm text-end mt-1 md:col-span-3",children:s.email.message})]}),e.jsxs("div",{className:" grid md:grid-cols-3 grid-col-2 font-normal md:mx-4 py-1.5",children:[e.jsxs("label",{className:" md:text-black text-slate-800 text-lg font-medium mb-2 col-span-1",htmlFor:"phone",children:["Phone Number",e.jsx("span",{className:"md:text-red-700 text-red-900 px-2",children:"*"})]}),e.jsx("input",{type:"text",id:"phone",className:"md:col-span-2 col-span-1 border rounded-lg  px-5 py-1.5 outline-none bg-gray-200 md:bg-gray-50",placeholder:"123456789",...t("phone")}),s.phone&&e.jsx("p",{className:"md:text-red-500  text-red-700 md:text-xs text-sm text-end mt-1 md:col-span-3 ",children:s.phone.message})]}),e.jsxs("div",{className:"grid md:grid-cols-3 grid-col-2  font-normal md:mx-4 py-1.5",children:[e.jsxs("label",{className:"flex md:text-black text-slate-800 text-lg font-medium mb-2 col-span-1",htmlFor:"login_password",children:["Password",e.jsx("span",{className:"md:text-red-700 text-red-900 px-2",children:"*"})]}),e.jsx("input",{type:"password",id:"login_password",className:"md:col-span-2 col-span-1  border outline-none  rounded-lg py-1.5 px-5 bg-gray-200 md:bg-gray-50",placeholder:"* * * * * * * * * * ",...t("login_password")}),s.login_password&&e.jsx("p",{className:"md:text-red-500  text-red-700 md:text-xs text-sm text-end mt-1 md:col-span-3",children:s.login_password.message})]}),e.jsx("div",{className:"flex justify-center mt-3",children:e.jsx("button",{className:"px-5 py-1.5 md:text-white text-primary text-base rounded-full md:bg-primary bg-gray-50 md:hover:bg-primary-hover",type:"submit",children:"Send OTP"})})]}),e.jsxs("p",{className:"text-sm text-center mt-3",children:["Already have an account?"," ",e.jsx("span",{className:"text-base md:text-primary text-white",onClick:m,children:"Sign In"})]})]})})})]})};export{y as default};