import {
  r as u,
  u as f,
  U as h,
  j as t,
  C as g,
  B as o,
  b as y,
  A as b,
} from "./index-DP2NNKOn.js";
const N = () => {
  const [a, d] = u.useState({ otp1: "", otp2: "", otp3: "", otp4: "" }),
    m = f(),
    x = h(),
    r = (e, s) => {
      d({ ...a, [e]: s.target.value });
    },
    p = async (e) => {
      var s;
      e.preventDefault();
      try {
        const l = Object.values(a).join("");
        if (l.length !== 4) {
          o.error("Please fill in the complete OTP");
          return;
        }
        if (l === "1234") {
          o.success("OTP verified");
          const c = { ...((s = x.state) == null ? void 0 : s.DataForm) };
          (c.verification_status = "verified"),
            (c.user_status = "active"),
            (c.role = "user");
          const i = await y.post(`${b}/public-user/post`, c);
          i.status === 200
            ? (o.success(i.data.message), m("/"))
            : (console.error(response.data.message),
              o.error("Error posting form data"));
        } else o.error("Invalid OTP");
      } catch {
        o.error("Invalid credentials");
      }
    },
    n = (e) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        const s = e.target.tabIndex - 2;
        s > -1 && e.target.form.elements[s].focus();
      } else {
        const s = e.target.tabIndex;
        s < 4 && e.target.form.elements[s].focus();
      }
    };
  return t.jsxs("div", {
    className:
      "h-screen  bg-primary py-6 flex flex-col items-center gap-8 justify-center ",
    children: [
      t.jsxs("div", {
        className: "flex items-center gap-4",
        children: [
          t.jsx("img", { src: g, alt: "Image", className: "w-24 h-24" }),
          t.jsx("p", {
            className: "text-6xl text-secondary ",
            children: "MSCL",
          }),
        ],
      }),
      t.jsx("div", {
        className: "p-6 md:w-[550px]   md:bg-white  rounded-lg mx-5",
        children: t.jsxs("div", {
          className: "font-lexend text-start mt-2",
          children: [
            t.jsx("p", {
              className: "text-xl py-2 md:text-black text-gray-200 text-center",
              children: "One Time Password",
            }),
            t.jsxs("form", {
              onSubmit: p,
              children: [
                t.jsxs("div", {
                  className: "flex justify-center gap-3  pt-5",
                  children: [
                    t.jsx("input", {
                      name: "otp1",
                      type: "text",
                      autoComplete: "off",
                      className:
                        "w-12 h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500",
                      value: a.otp1,
                      onChange: (e) => r("otp1", e),
                      tabIndex: "1",
                      maxLength: "1",
                      onKeyUp: (e) => n(e),
                    }),
                    t.jsx("input", {
                      name: "otp2",
                      type: "text",
                      autoComplete: "off",
                      className:
                        "w-12 h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500",
                      value: a.otp2,
                      onChange: (e) => r("otp2", e),
                      tabIndex: "2",
                      maxLength: "1",
                      onKeyUp: (e) => n(e),
                    }),
                    t.jsx("input", {
                      name: "otp3",
                      type: "text",
                      autoComplete: "off",
                      className:
                        "w-12 h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500",
                      value: a.otp3,
                      onChange: (e) => r("otp3", e),
                      tabIndex: "3",
                      maxLength: "1",
                      onKeyUp: (e) => n(e),
                    }),
                    t.jsx("input", {
                      name: "otp4",
                      type: "text",
                      autoComplete: "off",
                      className:
                        "w-12 h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500",
                      value: a.otp4,
                      onChange: (e) => r("otp4", e),
                      tabIndex: "4",
                      maxLength: "1",
                      onKeyUp: (e) => n(e),
                    }),
                  ],
                }),
                t.jsx("p", {
                  className:
                    "text-center text-xs md:text-primary text-white ml-36 mt-2",
                  children: "Resend 3s",
                }),
                t.jsx("div", {
                  className: "text-center my-5",
                  children: t.jsx("button", {
                    className:
                      "px-5 py-2 md:bg-primary md:text-white text-primary bg-gray-100 rounded-full",
                    type: "submit",
                    children: "Verify OTP",
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
};
export { N as default };
