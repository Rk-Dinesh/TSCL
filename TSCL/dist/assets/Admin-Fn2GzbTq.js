import {
  i as H,
  k as u,
  O as qe,
  r as n,
  m as Q,
  o as J,
  j as e,
  b as E,
  B as S,
  d as B,
  Q as oe,
  T as ce,
  A as Oe,
  x as Ue,
  D as Be,
  y as Le,
  q,
  v as Ve,
  w as We,
  E as Ge,
  z as Ze,
} from "./index-DP2NNKOn.js";
import { S as K } from "./SavaCancel-Ci3tLGq5.js";
import { A as b } from "./ApiClient-CPCcZu9F.js";
import { D as $e } from "./DeleteModal-DMwKPp4R.js";
import { F as Ye, B as He } from "./FileUploadButton-CMAr70dn.js";
const Qe = H().shape({
    user_name: u().trim().required("User Name is required"),
    dept_name: u().required("Department is required"),
    phone: u()
      .test("len", "Phone Number must be 10 characters", (t) => t.length === 10)
      .required("Phone Number is required"),
    email: u().email("Invalid Email Id").required("Email Id is required"),
    address: u().required("Address is required"),
    login_password: u().required("Password is required"),
    pincode: u()
      .test("len", "Pincode must be 6 characters", (t) => t.length === 6)
      .required("Pincode is required"),
    role: u().test(
      "not-select",
      "Please select a Role",
      (t) => t !== "" && t !== "Role"
    ),
    zone_name: u().optional(),
    ward_name: qe().of(u()).nullable().default([]),
  }),
  Je = (t) => {
    const { ExistingRoles: _, ExistingEmployees: y, isZone: C, isWard: g } = t,
      [M, I] = n.useState(""),
      [D, P] = n.useState([]),
      {
        register: h,
        formState: { errors: r },
        handleSubmit: v,
        setValue: w,
        watch: O,
      } = Q({
        resolver: J(Qe),
        mode: "all",
        register: { ward_name: { multiple: !0 } },
      }),
      T = O("zone_name");
    n.useEffect(() => {
      if (T) {
        const a = g == null ? void 0 : g.filter((m) => m.zone_name === T);
        P(a || []), w("ward_name", "");
      } else P([]);
    }, [T, g]);
    const N = (a) => {
        const m = a.target.value,
          x = y.find((z) => z.emp_name === m);
        x &&
          (I(""),
          w("dept_name", x.dept_name),
          w("phone", x.phone),
          w("email", x.email),
          w("address", x.address),
          w("pincode", x.pincode));
      },
      c = (a) => {
        const m = a.target.value,
          x = _.find((z) => z.role_name === m);
        I(x ? x.role_id : "");
      },
      L = async (a) => {
        const m = {
          ...a,
          status: "active",
          created_by_user: localStorage.getItem("name"),
          role_id: M,
        };
        try {
          const x = await E.post(b.POST_ADMIN.url, m, {
            headers: b.POST_ADMIN.headers,
          });
          x.status === 200
            ? (S.success(x.data.message), t.toggleModal(), t.handlerefresh())
            : (console.error("Error in posting data", x),
              S.error("Failed to Upload"));
        } catch (x) {
          console.error("Error in posting data", x);
        }
      };
    return e.jsx("div", {
      className:
        "fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center",
      children: e.jsx("div", {
        className: "bg-white w-fit h-fit font-lexend m-2",
        children: e.jsxs("form", {
          onSubmit: v(L),
          children: [
            e.jsxs("div", {
              className: "border-b-2 border-gray-300 mx-10 my-5",
              children: [
                e.jsxs("div", {
                  className: "grid grid-cols-3 gap-3",
                  children: [
                    e.jsx("label", {
                      className:
                        "block text-black text-base font-medium mb-2 col-span-2 whitespace-nowrap",
                      htmlFor: "user_name",
                      children: "Name:",
                    }),
                    e.jsxs("select", {
                      className:
                        "text-sm text-black border border-gray-900 rounded-lg border-none outline-none",
                      id: "user_name",
                      ...h("user_name"),
                      onChange: N,
                      children: [
                        e.jsx("option", {
                          value: "",
                          children: "Employee Name",
                        }),
                        y.map((a, m) =>
                          e.jsx(
                            "option",
                            { value: a.emp_name, children: a.emp_name },
                            m
                          )
                        ),
                      ],
                    }),
                  ],
                }),
                r.user_name &&
                  e.jsx("p", {
                    className: "text-red-500 text-xs text-end ",
                    children: r.user_name.message,
                  }),
              ],
            }),
            e.jsxs("div", {
              className: "flex flex-col gap-3 mx-10 ",
              children: [
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: "grid grid-cols-3 gap-3",
                      children: [
                        e.jsx("label", {
                          className:
                            "text-black text-base font-medium mb-2 col-span-1",
                          htmlFor: "dept_name",
                          children: "Department:",
                        }),
                        e.jsx("input", {
                          type: "text",
                          id: "dept_name",
                          className: "w-6/5 text-end outline-none col-span-2",
                          placeholder: "Department ",
                          ...h("dept_name"),
                        }),
                      ],
                    }),
                    r.dept_name &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: r.dept_name.message,
                      }),
                  ],
                }),
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: "grid grid-cols-3 gap-3",
                      children: [
                        e.jsx("label", {
                          className:
                            "text-black text-base font-medium mb-2 col-span-1",
                          htmlFor: "phone",
                          children: "Phone:",
                        }),
                        e.jsx("input", {
                          type: "text",
                          id: "phone",
                          className: "w-6/5 text-end outline-none col-span-2",
                          placeholder: "Phone Number",
                          ...h("phone"),
                        }),
                      ],
                    }),
                    r.phone &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: r.phone.message,
                      }),
                  ],
                }),
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: "grid grid-cols-3 gap-3",
                      children: [
                        e.jsx("label", {
                          className:
                            "text-black text-base font-medium mb-2 col-span-1",
                          htmlFor: "email",
                          children: "Email Id:",
                        }),
                        e.jsx("input", {
                          type: "email",
                          id: "email",
                          className: "text-end outline-none col-span-2",
                          placeholder: "abc@gmail.com",
                          ...h("email"),
                        }),
                      ],
                    }),
                    r.email &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: r.email.message,
                      }),
                  ],
                }),
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: "grid grid-cols-3 gap-3",
                      children: [
                        e.jsx("label", {
                          className:
                            "text-black text-base font-medium mb-2 col-span-1",
                          htmlFor: "address",
                          children: "Address:",
                        }),
                        e.jsx("input", {
                          type: "text",
                          id: "address",
                          className: "text-end outline-none col-span-2",
                          placeholder: "Address",
                          ...h("address"),
                        }),
                      ],
                    }),
                    r.address &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: r.address.message,
                      }),
                  ],
                }),
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: "grid grid-cols-3 gap-3",
                      children: [
                        e.jsx("label", {
                          className:
                            "text-black text-base font-medium mb-2 col-span-1",
                          htmlFor: "pincode",
                          children: "Pincode:",
                        }),
                        e.jsx("input", {
                          type: "text",
                          id: "pincode",
                          className: "text-end outline-none col-span-2",
                          placeholder: "Pincode",
                          ...h("pincode"),
                        }),
                      ],
                    }),
                    r.pincode &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: r.pincode.message,
                      }),
                  ],
                }),
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: "grid grid-cols-3",
                      children: [
                        e.jsx("label", {
                          className:
                            "text-black text-base font-medium mb-2 col-span-2",
                          htmlFor: "role",
                          children: "Role:",
                        }),
                        e.jsxs("select", {
                          className:
                            "text-sm text-black border border-gray-900 rounded-lg border-none outline-none",
                          id: "role",
                          ...h("role"),
                          onChange: c,
                          children: [
                            e.jsx("option", { value: "", children: "Role" }),
                            _.map((a, m) =>
                              e.jsx(
                                "option",
                                { value: a.role_name, children: a.role_name },
                                m
                              )
                            ),
                          ],
                        }),
                      ],
                    }),
                    r.role &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: r.role.message,
                      }),
                  ],
                }),
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: "grid grid-cols-3 gap-3",
                      children: [
                        e.jsx("label", {
                          className:
                            "text-black text-base font-medium mb-2 col-span-1",
                          htmlFor: "login_password",
                          children: "Password:",
                        }),
                        e.jsx("input", {
                          type: "password",
                          id: "login_password",
                          className: "text-end outline-none col-span-2",
                          placeholder: "Password",
                          ...h("login_password"),
                        }),
                      ],
                    }),
                    r.login_password &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: r.login_password.message,
                      }),
                  ],
                }),
                e.jsx("p", {
                  className: "text-gray-500 my-1",
                  children: "Auto Assign Options :",
                }),
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: "grid grid-cols-3",
                      children: [
                        e.jsx("label", {
                          className:
                            "text-black text-base font-medium mb-2 col-span-2",
                          htmlFor: "zone_name",
                          children: "Zone:",
                        }),
                        e.jsxs("select", {
                          className:
                            "text-sm text-black border border-gray-900 rounded-lg border-none outline-none",
                          id: "zone_name",
                          ...h("zone_name"),
                          children: [
                            e.jsx("option", { value: "", children: "Zone" }),
                            C.map((a, m) =>
                              e.jsx(
                                "option",
                                { value: a.zone_name, children: a.zone_name },
                                m
                              )
                            ),
                          ],
                        }),
                      ],
                    }),
                    r.zone_name &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: r.zone_name.message,
                      }),
                  ],
                }),
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: "grid grid-cols-3",
                      children: [
                        e.jsx("label", {
                          className:
                            "text-black text-base font-medium mb-2 col-span-2",
                          htmlFor: "ward_name",
                          children: "Ward:",
                        }),
                        e.jsxs("select", {
                          className:
                            "text-sm text-black border border-gray-900 rounded-lg border-none outline-none",
                          id: "ward_name",
                          ...h("ward_name"),
                          multiple: !0,
                          size: 4,
                          children: [
                            e.jsx("option", {
                              disabled: !0,
                              children: "Ward Name",
                            }),
                            D.map((a, m) =>
                              e.jsx(
                                "option",
                                {
                                  value: a.ward_name,
                                  className: "my-0.5 ",
                                  children: a.ward_name,
                                },
                                m
                              )
                            ),
                          ],
                        }),
                      ],
                    }),
                    r.ward_name &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: r.ward_name.message,
                      }),
                  ],
                }),
              ],
            }),
            e.jsx("div", {
              className: "py-6",
              children: e.jsx(K, { onCancel: t.toggleModal }),
            }),
          ],
        }),
      }),
    });
  },
  Ke = H().shape({
    user_name: u().required("User Name is required"),
    dept_name: u().required("Department is required"),
    address: u().required("Address is required"),
    pincode: u().required("Pincode is required"),
    status: u().test(
      "not-select",
      "Please select an Status",
      (t) => t !== "" && t !== "Status"
    ),
    role: u().test(
      "not-select",
      "Please select an Role",
      (t) => t !== "" && t !== "Role"
    ),
  }),
  Xe = (t) => {
    const { ExistingRoles: _, adminId: y, isZone: C, isWard: g } = t,
      [M, I] = n.useState(null),
      [D, P] = n.useState(null),
      [h, r] = n.useState(null),
      [v, w] = n.useState([]),
      [O, T] = n.useState([]),
      {
        register: N,
        formState: { errors: c },
        handleSubmit: L,
        setValue: a,
        watch: m,
      } = Q({ resolver: J(Ke), mode: "all" }),
      x = (d) => {
        if (d) {
          const i = d.target.value,
            j = g == null ? void 0 : g.filter((o) => o.zone_name === i);
          w(j), a("ward_name", []), I("");
        } else w([]);
      };
    n.useEffect(() => {
      (async () => {
        try {
          const i = b.FETCH_ADMIN(y),
            j = await E.get(i.url, { headers: i.headers }),
            o = B(j.data.data);
          a("user_name", o.user_name),
            a("dept_name", o.dept_name),
            a("address", o.address),
            a("pincode", o.pincode),
            P(o.role),
            a("role", o.role),
            r(o.role_id),
            a("status", o.status),
            a("zone_name", o.zone_name),
            T(o.zone_name),
            a("ward_name", o.ward_name),
            I(o.ward_name);
        } catch (i) {
          console.error("Error fetching data", i);
        }
      })();
    }, [y, a]);
    const z = (d) => {
        r(null);
        const i = d.target.value,
          j = _.find((o) => o.role_name === i);
        j && r(j.role_id);
      },
      Y = async (d) => {
        const i = { ...d, role_id: h };
        try {
          const j = b.UPDATE_ADMIN(y),
            o = await E.post(j.url, i, { headers: j.headers });
          o.status === 200
            ? (S.success(o.data.message),
              P(null),
              t.toggleModal(),
              t.handlerefresh())
            : (console.error("Error in posting data", o),
              S.error("Failed to Upload"));
        } catch (j) {
          console.error("Error in posting data", j);
        }
      };
    return e.jsx("div", {
      className:
        "fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ",
      children: e.jsx("div", {
        className: "bg-white w-fit h-fit  font-lexend m-2",
        children: e.jsxs("form", {
          onSubmit: L(Y),
          children: [
            e.jsxs("div", {
              className: "border-b-2 border-gray-300 mx-10 my-5",
              children: [
                e.jsxs("div", {
                  className: " grid grid-cols-3 gap-3",
                  children: [
                    e.jsx("label", {
                      className:
                        "block text-black text-base font-medium mb-2 col-span-1 whitespace-nowrap",
                      htmlFor: "user_name",
                      children: "Name :",
                    }),
                    e.jsx("input", {
                      type: "text",
                      id: "user_name",
                      className:
                        "mx-2 font-lexend px-2 text-sm text-end outline-none col-span-2",
                      placeholder: "User Name",
                      ...N("user_name"),
                    }),
                  ],
                }),
                c.user_name &&
                  e.jsx("p", {
                    className: "text-red-500 text-xs text-end ",
                    children: c.user_name.message,
                  }),
              ],
            }),
            e.jsxs("div", {
              className: " flex flex-col gap-3 mx-10 my-1 ",
              children: [
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: "grid grid-cols-3 gap-3",
                      children: [
                        e.jsx("label", {
                          className:
                            " text-black text-base font-medium mb-2 col-span-1",
                          htmlFor: "dept_name",
                          children: "Department :",
                        }),
                        e.jsx("input", {
                          type: "text",
                          id: "dept_name",
                          className: "w-6/5 text-end outline-none col-span-2",
                          placeholder: " Department Name",
                          ...N("dept_name"),
                        }),
                      ],
                    }),
                    c.dept_name &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: c.dept_name.message,
                      }),
                  ],
                }),
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: "grid grid-cols-3 gap-3",
                      children: [
                        e.jsx("label", {
                          className:
                            " text-black text-base font-medium mb-2 col-span-1",
                          htmlFor: "address",
                          children: "Address :",
                        }),
                        e.jsx("input", {
                          type: "text",
                          id: "address",
                          className: " text-end outline-none col-span-2",
                          placeholder: "Address",
                          ...N("address"),
                        }),
                      ],
                    }),
                    c.address &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: c.address.message,
                      }),
                  ],
                }),
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: "grid grid-cols-3 gap-3",
                      children: [
                        e.jsx("label", {
                          className:
                            " text-black text-base font-medium mb-2 col-span-1",
                          htmlFor: "pincode",
                          children: "Pincode :",
                        }),
                        e.jsx("input", {
                          type: "text",
                          id: "pincode",
                          className: " text-end outline-none col-span-2",
                          placeholder: "Pincode ",
                          ...N("pincode"),
                        }),
                      ],
                    }),
                    c.pincode &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: c.pincode.message,
                      }),
                  ],
                }),
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: " grid grid-cols-3",
                      children: [
                        e.jsx("label", {
                          className:
                            " text-black text-base font-medium mb-2 col-span-2",
                          htmlFor: "status",
                          children: "Status:",
                        }),
                        e.jsxs("select", {
                          className:
                            "   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none",
                          id: "status",
                          ...N("status"),
                          children: [
                            e.jsx("option", {
                              value: "",
                              hidden: !0,
                              children: "Status",
                            }),
                            e.jsx("option", {
                              value: "active",
                              children: "Active",
                            }),
                            e.jsx("option", {
                              value: "inactive",
                              children: "InActive",
                            }),
                          ],
                        }),
                      ],
                    }),
                    c.status &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: c.status.message,
                      }),
                  ],
                }),
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: " grid grid-cols-3",
                      children: [
                        e.jsx("label", {
                          className:
                            " text-black text-base font-medium mb-2 col-span-2",
                          htmlFor: "role",
                          children: "Role:",
                        }),
                        e.jsxs("select", {
                          className:
                            "   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none",
                          id: "role",
                          ...N("role"),
                          onChange: z,
                          children: [
                            e.jsx("option", {
                              value: D,
                              hidden: !0,
                              children: D,
                            }),
                            _.map((d, i) =>
                              e.jsx(
                                "option",
                                { value: d.role_name, children: d.role_name },
                                i
                              )
                            ),
                          ],
                        }),
                      ],
                    }),
                    c.role &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: c.role.message,
                      }),
                  ],
                }),
                e.jsx("p", {
                  className: "text-gray-500",
                  children: "Auto Assign Options : ",
                }),
                e.jsxs("p", {
                  className: "text-sm text-red-500 -mt-2",
                  children: [
                    "Note:",
                    " ",
                    e.jsx("span", {
                      className: "text-xs text-gray-500",
                      children:
                        "if zone value is altered,compulsory to select wards for auto assign",
                    }),
                  ],
                }),
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: "grid grid-cols-3",
                      children: [
                        e.jsx("label", {
                          className:
                            "text-black text-base font-medium mb-2 col-span-2",
                          htmlFor: "zone_name",
                          children: "Zone:",
                        }),
                        e.jsxs("select", {
                          className:
                            "text-sm text-black border border-gray-900 rounded-lg border-none outline-none",
                          id: "zone_name",
                          ...N("zone_name"),
                          onChange: x,
                          children: [
                            e.jsx("option", {
                              value: O,
                              disabled: !0,
                              children: O,
                            }),
                            C.map((d, i) =>
                              e.jsx(
                                "option",
                                { value: d.zone_name, children: d.zone_name },
                                i
                              )
                            ),
                          ],
                        }),
                      ],
                    }),
                    c.zone_name &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: c.zone_name.message,
                      }),
                  ],
                }),
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: "grid grid-cols-3",
                      children: [
                        e.jsx("label", {
                          className:
                            "text-black text-base font-medium mb-2 col-span-2",
                          htmlFor: "ward_name",
                          children: "Ward:",
                        }),
                        e.jsxs("select", {
                          className:
                            "text-sm text-black border border-gray-900 rounded-lg border-none outline-none col-span-1 ",
                          id: "ward_name",
                          ...N("ward_name"),
                          multiple: !0,
                          size: 5,
                          children: [
                            M &&
                              M.map((d, i) =>
                                e.jsx(
                                  "option",
                                  { value: d, disabled: !0, children: d },
                                  i
                                )
                              ),
                            v.map((d, i) =>
                              e.jsx(
                                "option",
                                {
                                  value: d.ward_name,
                                  className: "my-0.5 ",
                                  children: d.ward_name,
                                },
                                i
                              )
                            ),
                          ],
                        }),
                      ],
                    }),
                    c.ward_name &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: c.ward_name.message,
                      }),
                  ],
                }),
              ],
            }),
            e.jsx("div", {
              className: "py-6",
              children: e.jsx(K, { onCancel: t.toggleModal }),
            }),
          ],
        }),
      }),
    });
  },
  es = H().shape({
    login_password: u()
      .required("Confirm password is required")
      .test(
        "passwords-match",
        "New password and confirm password must match",
        function (t) {
          return this.parent.new_password === t;
        }
      ),
  }),
  ss = (t) => {
    const {
        register: _,
        formState: { errors: y },
        handleSubmit: C,
      } = Q({ resolver: J(es), mode: "onBlur" }),
      [g, M] = n.useState(!1),
      I = localStorage.getItem("token"),
      D = () => {
        M(!g);
      },
      P = async (h) => {
        const r = { ...h };
        try {
          const v = await E.post(
            `${Oe}/user/userforgotpassword?phone=${t.phoneID}`,
            r,
            { headers: { Authorization: `Bearer ${I}` } }
          );
          v.status === 200
            ? (S.success(v.data.message), t.togglePassModal())
            : S.error(v.data.message);
        } catch (v) {
          console.error("Error in posting data", v);
        }
      };
    return e.jsx("div", {
      className:
        "fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ",
      children: e.jsxs("div", {
        className: "bg-white w-[380px] h-fit  font-lexend m-2 rounded",
        children: [
          e.jsx("div", {
            className: "border-b-2 border-gray-300 mx-10",
            children: e.jsx("h1", {
              className: "text-xl font-medium pt-10 pb-2",
              children: "Change Password",
            }),
          }),
          e.jsxs("form", {
            onSubmit: C(P),
            children: [
              e.jsx("div", {
                className: "col-span-4 my-4  px-3",
                children: e.jsxs("div", {
                  className:
                    "flex items-center border-2  rounded-lg mx-2  px-2 py-2 outline-none",
                  children: [
                    e.jsx("input", {
                      type: g ? "text" : "password",
                      id: "new_password",
                      className: "w-full md:w-72 text-start outline-none",
                      placeholder: "New Password",
                      ..._("new_password"),
                    }),
                    e.jsx("button", {
                      type: "button",
                      className:
                        "text-gray-500 hover:text-gray-900 transition duration-300 outline-none",
                      onClick: D,
                      children: g ? e.jsx(oe, {}) : e.jsx(ce, {}),
                    }),
                  ],
                }),
              }),
              e.jsxs("div", {
                className: "col-span-4 my-4  px-3",
                children: [
                  e.jsxs("div", {
                    className:
                      "flex items-center border-2  rounded-lg mx-2  px-2 py-2 outline-none",
                    children: [
                      e.jsx("input", {
                        type: g ? "text" : "password",
                        id: "login_password",
                        className: "w-full md:w-72 text-start outline-none ",
                        placeholder: "Confirm Password",
                        ..._("login_password"),
                      }),
                      e.jsx("button", {
                        type: "button",
                        className:
                          "text-gray-500 hover:text-gray-900 transition duration-300 outline-none",
                        onClick: D,
                        children: g ? e.jsx(oe, {}) : e.jsx(ce, {}),
                      }),
                    ],
                  }),
                  y.login_password &&
                    e.jsx("p", {
                      className: "text-red-500 text-xs text-start px-2 pt-2",
                      children: y.login_password.message,
                    }),
                ],
              }),
              e.jsx("div", {
                className: "py-6",
                children: e.jsx(K, { onCancel: t.togglePassModal }),
              }),
            ],
          }),
        ],
      }),
    });
  },
  ts = `user_name,dept_name,phone,email,address,pincode,login_password,status,role,created_by_user
UserName,Department,phone,email@gmail.com,Address,123456,passord,status,role,admin`,
  is = ({ permissions: t }) => {
    const [_, y] = n.useState(!1),
      C = t == null ? void 0 : t.includes("create"),
      g = t == null ? void 0 : t.includes("edit"),
      M = t == null ? void 0 : t.includes("delete"),
      I = t == null ? void 0 : t.includes("download"),
      [D, P] = n.useState(!1),
      [h, r] = n.useState(!1),
      [v, w] = n.useState(null),
      [O, T] = n.useState(null),
      [N, c] = n.useState(!1),
      [L, a] = n.useState(null),
      [m, x] = n.useState(null),
      [z, Y] = n.useState(null),
      [d, i] = n.useState(""),
      [j, o] = n.useState(1),
      [V] = n.useState(8),
      [X, ie] = n.useState(1),
      [as, me] = n.useState([]),
      [U, xe] = n.useState([]),
      [ee, he] = n.useState(null),
      [pe, se] = n.useState(null),
      [te, ae] = n.useState("Bulk Upload"),
      [ue, ge] = n.useState(null),
      [ne, je] = n.useState([]),
      [le, be] = n.useState([]),
      Z = (s) => {
        he(ee === s ? null : s);
      },
      fe = (s) => ee === s;
    n.useEffect(() => {
      W(), ve(), Ee(), De(), Pe();
    }, [d, j]);
    const Ne = (s) => {
        s > 0 && s <= X && o(s);
      },
      W = () => {
        E.get(b.GET_ADMIN.url, { headers: b.GET_ADMIN.headers })
          .then((s) => {
            const l = B(s.data.data);
            xe(l);
            const F = l.filter((f) =>
              Object.values(f).some((p) =>
                p.toString().toLowerCase().includes(d.toLowerCase())
              )
            );
            ie(Math.ceil(F.length / V));
            const k = j * V,
              R = k - V;
            me(F.slice(R, k));
          })
          .catch((s) => {
            console.error(s);
          });
      },
      _e = () => {
        y(!_);
      },
      ye = () => {
        P(!D), T(null);
      },
      re = () => {
        c(!N), a(null);
      },
      we = () => {
        r(!h), w(null);
      },
      ve = async () => {
        try {
          const s = await E.get(b.GET_ROLE_ADMINACTIVE.url, {
              headers: b.GET_ROLE_ADMINACTIVE.headers,
            }),
            l = B(s.data.data);
          x(l);
        } catch (s) {
          console.error("Error fetching existing Roles:", s);
        }
      },
      Ee = async () => {
        try {
          const s = await E.get(b.GET_EMPLOYEE_ADMINACTIVE.url, {
              headers: b.GET_EMPLOYEE_ADMINACTIVE.headers,
            }),
            l = B(s.data.data);
          Y(l);
        } catch (s) {
          console.error("Error fetching existing Department:", s);
        }
      },
      De = async () => {
        try {
          const s = await E.get(b.GET_ZONE_ADMINACTIVE.url, {
              headers: b.GET_EMPLOYEE_ADMINACTIVE.headers,
            }),
            l = B(s.data.data);
          je(l);
        } catch (s) {
          console.error("Error fetching existing Department:", s);
        }
      },
      Pe = async () => {
        try {
          const s = await E.get(b.GET_WARD_ADMINACTIVE.url, {
              headers: b.GET_WARD_ADMINACTIVE.headers,
            }),
            l = B(s.data.data);
          be(l);
        } catch (s) {
          console.error("Error fetching existing Department:", s);
        }
      },
      $ = j * V,
      G = $ - V,
      de = U.filter((s) =>
        Object.values(s).some((l) =>
          l.toString().toLowerCase().includes(d.toLowerCase())
        )
      ),
      Ae = de.slice().reverse().slice(G, $),
      Se = async () => {
        try {
          const s = b.DELETE_ADMIN(L);
          await E.delete(s.url, { headers: s.headers }),
            re(),
            W(),
            S.success("Deleted successfully");
        } catch {
          S.error("Failed to delete");
        }
      },
      Ie = (s) => {
        se(s.target.files[0]), ae("Upload");
      },
      ke = () => {
        te === "Bulk Upload"
          ? document.getElementById("fileInput").click()
          : Ce(pe);
      },
      Ce = async (s) => {
        try {
          const l = new FormData();
          l.append("file", s),
            (
              await E.post(b.UPLOAD_ADMIN.url, l, {
                headers: { "Content-Type": "multipart/form-data" },
              })
            ).status === 200
              ? (ae("Bulk Upload"),
                se(null),
                W(),
                S.success("Data Uploaded Successfully"))
              : S.error("Data failed to Upload");
        } catch (l) {
          console.log(l);
        }
      },
      Me = (s) => {
        ge(s.target.value);
      },
      Te = async (s) => {
        if (s === "csv") {
          const l = U.map((p) => ({
              user_id: p.user_id,
              user_name: p.user_name,
              dept_name: p.dept_name,
              phone: p.phone,
              email: p.email,
              address: p.address,
              pincode: p.pincode,
              status: p.status,
              role: p.role,
              created_by_user: p.created_by_user,
            })),
            F = [
              Object.keys(l[0]).join(","),
              ...l.map((p) => Object.values(p).join(",")),
            ].join(`
`),
            k = new Blob([F], { type: "text/csv;charset=utf-8;" }),
            R = window.URL.createObjectURL(k),
            f = document.createElement("a");
          f.setAttribute("href", R),
            f.setAttribute("download", "Admin_data.csv"),
            (f.style.visibility = "hidden"),
            document.body.appendChild(f),
            f.click(),
            document.body.removeChild(f);
        } else if (s === "pdf")
          try {
            const F = Math.ceil(U.length / 30),
              k = new Ge("l", "mm", "a4");
            let R = 0;
            for (let f = 1; f <= F; f++) {
              const p = (f - 1) * 30,
                ze = Math.min(p + 30, U.length),
                Re = U.slice(p, ze).map((A) => [
                  A.user_id,
                  A.user_name,
                  A.dept_name,
                  A.phone,
                  A.email,
                  A.address,
                  A.pincode,
                  A.status,
                  A.role,
                  A.created_by_user,
                ]);
              k.text(`Page ${f}`, 10, R + 10),
                k.autoTable({
                  startY: R + 15,
                  head: [
                    [
                      "User_Id",
                      "User_Name",
                      "Dept_Name",
                      "Phone",
                      "Email",
                      "Address",
                      "Pincode",
                      "Status",
                      "Role",
                      "CreatedBy",
                    ],
                  ],
                  body: Re,
                  theme: "striped",
                }),
                f < F && (k.addPage(), (R = 10));
            }
            k.save("Admin_data.pdf");
          } catch (l) {
            console.error("Error exporting data:", l);
          }
      },
      Fe = () => {
        Ze(ts);
      };
    return e.jsxs(n.Fragment, {
      children: [
        e.jsx("div", {
          className: "  bg-blue-100 overflow-y-auto no-scrollbar",
          children: e.jsxs("div", {
            className: "h-screen",
            children: [
              e.jsxs("div", {
                className:
                  "flex flex-row items-center md:justify-end gap-3 p-2 mt-2 mx-8 flex-wrap ",
                children: [
                  e.jsx(Ue, {
                    value: d,
                    onChange: (s) => i(s.target.value),
                    placeholder: "Search Admin",
                  }),
                  C &&
                    e.jsx(Ye, {
                      onChange: Ie,
                      buttonText: te,
                      accept: ".csv",
                      onClick: ke,
                    }),
                  I &&
                    e.jsx(Be, {
                      selectedDoc: ue,
                      onChange: Me,
                      exportData: Te,
                    }),
                ],
              }),
              e.jsx(Le, {
                title: "MSCL Admin",
                hasCreatePermission: C,
                onClick: () => y(!0),
              }),
              e.jsx("div", {
                className: "bg-white mx-4 rounded-lg my-2  h-3/5 ",
                children: e.jsx("div", {
                  className: "overflow-x-auto no-scrollbar",
                  children: e.jsxs("table", {
                    className: "w-full  mt-3",
                    children: [
                      e.jsx("thead", {
                        children: e.jsxs("tr", {
                          className: "border-b-2 border-gray-300",
                          children: [
                            e.jsx("th", {
                              className: "py-2",
                              children: e.jsx("p", {
                                className:
                                  " mx-6 my-2 font-lexend font-semibold whitespace-nowrap",
                                children: "#",
                              }),
                            }),
                            e.jsx("th", {
                              children: e.jsxs("div", {
                                className:
                                  "flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",
                                children: ["Username ", e.jsx(q, {})],
                              }),
                            }),
                            e.jsx("th", {
                              children: e.jsxs("div", {
                                className:
                                  "flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",
                                children: ["Department", e.jsx(q, {})],
                              }),
                            }),
                            e.jsx("th", {
                              children: e.jsxs("div", {
                                className:
                                  "flex gap-2 items-center justify-start mx-3  my-2 font-lexend font-semibold whitespace-nowrap",
                                children: ["Phone", e.jsx(q, {})],
                              }),
                            }),
                            e.jsx("th", {
                              children: e.jsxs("div", {
                                className:
                                  "flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",
                                children: ["Email", e.jsx(q, {})],
                              }),
                            }),
                            e.jsx("th", {
                              children: e.jsxs("div", {
                                className:
                                  "flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",
                                children: ["Status", e.jsx(q, {})],
                              }),
                            }),
                            e.jsx("th", {
                              children: e.jsxs("div", {
                                className:
                                  "flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",
                                children: ["Role", e.jsx(q, {})],
                              }),
                            }),
                            e.jsx("th", {
                              children: e.jsxs("div", {
                                className:
                                  "flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",
                                children: ["CreatedBy", e.jsx(q, {})],
                              }),
                            }),
                            e.jsx("th", {
                              children: e.jsx("div", {
                                className:
                                  "mx-1 my-3 text-start font-lexend font-semibold whitespace-nowrap",
                                children: "Action",
                              }),
                            }),
                          ],
                        }),
                      }),
                      e.jsx("tbody", {
                        children: Ae.map((s, l) =>
                          e.jsxs(
                            "tr",
                            {
                              className: "border-b-2 border-gray-300",
                              children: [
                                e.jsx("td", {
                                  className: "",
                                  children: e.jsxs("p", {
                                    className:
                                      "text-center text-sm mx-4 my-2 font-lexend whitespace-nowrap  text-gray-700",
                                    children: [
                                      " ",
                                      G + l + 1 < 10
                                        ? `0${G + l + 1}`
                                        : G + l + 1,
                                    ],
                                  }),
                                }),
                                e.jsx("td", {
                                  children: e.jsx("p", {
                                    className:
                                      " mx-1  my-2 font-lexend whitespace-nowrap text-start text-sm capitalize text-gray-700",
                                    children: s.user_name,
                                  }),
                                }),
                                e.jsx("td", {
                                  children: e.jsx("p", {
                                    className:
                                      "text-start text-sm  mx-1  my-2  font-lexend whitespace-nowrap capitalize text-gray-700",
                                    children: s.dept_name,
                                  }),
                                }),
                                e.jsx("td", {
                                  children: e.jsx("p", {
                                    className:
                                      "text-start text-sm mx-3  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",
                                    children: s.phone,
                                  }),
                                }),
                                e.jsx("td", {
                                  children: e.jsx("p", {
                                    className:
                                      "text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",
                                    children: s.email,
                                  }),
                                }),
                                e.jsx("td", {
                                  children: e.jsx("p", {
                                    className:
                                      "text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",
                                    children: s.status,
                                  }),
                                }),
                                e.jsx("td", {
                                  children: e.jsx("p", {
                                    className:
                                      "text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",
                                    children: s.role,
                                  }),
                                }),
                                e.jsx("td", {
                                  children: e.jsx("p", {
                                    className:
                                      "text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",
                                    children: s.created_by_user,
                                  }),
                                }),
                                e.jsx("td", {
                                  children: e.jsxs("div", {
                                    className: "flex justify-start mx-1.5 my-3",
                                    children: [
                                      e.jsx(Ve, { onClick: () => Z(l) }),
                                      fe(l) &&
                                        e.jsxs("div", {
                                          className:
                                            " bg-white shadow-md rounded-lg ml-1",
                                          children: [
                                            g &&
                                              e.jsxs("div", {
                                                children: [
                                                  e.jsx("button", {
                                                    className:
                                                      "block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",
                                                    onClick: () => {
                                                      P(!0), T(s.user_id), Z();
                                                    },
                                                    children: "Edit",
                                                  }),
                                                  e.jsx("button", {
                                                    className:
                                                      "block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",
                                                    onClick: () => {
                                                      r(!0), w(s.phone), Z();
                                                    },
                                                    children: "Password",
                                                  }),
                                                ],
                                              }),
                                            M &&
                                              e.jsx("button", {
                                                className:
                                                  "block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",
                                                onClick: () => {
                                                  c(!0), a(s.user_id), Z();
                                                },
                                                children: "Delete",
                                              }),
                                          ],
                                        }),
                                    ],
                                  }),
                                }),
                              ],
                            },
                            l
                          )
                        ),
                      }),
                    ],
                  }),
                }),
              }),
              e.jsxs("div", {
                className: " my-2 mb-5 mx-7",
                children: [
                  e.jsx(He, { handleDownload: Fe }),
                  e.jsx(We, {
                    Length: U.length,
                    currentPage: j,
                    totalPages: X,
                    firstIndex: G,
                    lastIndex: $,
                    paginate: Ne,
                    hasNextPage: $ >= de.length,
                  }),
                ],
              }),
            ],
          }),
        }),
        _ &&
          e.jsx(Je, {
            toggleModal: _e,
            handlerefresh: W,
            ExistingRoles: m,
            ExistingEmployees: z,
            isZone: ne,
            isWard: le,
          }),
        D &&
          e.jsx(Xe, {
            toggleModal: ye,
            handlerefresh: W,
            ExistingRoles: m,
            adminId: O,
            isZone: ne,
            isWard: le,
          }),
        N && e.jsx($e, { toggleDeleteModal: re, delete: Se }),
        h && e.jsx(ss, { togglePassModal: we, phoneID: v }),
      ],
    });
  };
export { is as default };
