import {
  i as W,
  k as c,
  r as l,
  m as X,
  o as Z,
  j as e,
  b as v,
  B as _,
  d as Y,
  x as _e,
  D as Pe,
  y as we,
  q as S,
  v as Se,
  w as ke,
  E as Ce,
  z as Ie,
} from "./index-DP2NNKOn.js";
import { D as Me } from "./DeleteModal-DMwKPp4R.js";
import { S as ee } from "./SavaCancel-Ci3tLGq5.js";
import { A as b } from "./ApiClient-CPCcZu9F.js";
import { F as Oe, B as Te } from "./FileUploadButton-CMAr70dn.js";
const Fe = W().shape({
    emp_name: c().trim().required("Employee Name is required"),
    dept_name: c().required("Department is required"),
    phone: c()
      .test("len", "Phone Number must be 10 characters", (s) => s.length === 10)
      .required("Phone Number is required"),
    email: c().email("Invalid Email Id").required("Email Id is required"),
    address: c().required("Address is required"),
    dob: c().required("DOB is required"),
    pincode: c()
      .test("len", "Pincode must be 6 characters", (s) => s.length === 6)
      .required("Pincode is required"),
    designation: c().test(
      "not-select",
      "Please select a Designation",
      (s) => s !== "" && s !== "Designation"
    ),
  }),
  Le = (s) => {
    const { ExistingDesignation: E, ExistingDept: k } = s,
      [N, C] = l.useState(""),
      {
        register: p,
        formState: { errors: d },
        handleSubmit: P,
      } = X({ resolver: Z(Fe), mode: "all" }),
      I = (i) => {
        const n = i.target.value,
          j = E.find((h) => h.designation === n);
        C(j.desgination_id);
      },
      O = async (i) => {
        const n = {
          ...i,
          status: "active",
          created_by_user: localStorage.getItem("name"),
          designation_id: N,
        };
        try {
          const j = await v.post(b.POST_EMPLOYEE.url, n, {
            headers: b.POST_EMPLOYEE.headers,
          });
          j.status === 200
            ? (_.success(j.data.message), s.toggleModal(), s.handlerefresh())
            : (console.error("Error in posting data", j),
              _.error("Failed to Upload"));
        } catch (j) {
          console.error("Error in posting data", j);
        }
      };
    return e.jsx("div", {
      className:
        "fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center",
      children: e.jsx("div", {
        className: "bg-white w-fit h-fit font-lexend m-2",
        children: e.jsxs("form", {
          onSubmit: P(O),
          children: [
            e.jsxs("div", {
              className: "border-b-2 border-gray-300 mx-10 my-5",
              children: [
                e.jsxs("div", {
                  className: "grid grid-cols-3 gap-3",
                  children: [
                    e.jsx("label", {
                      className:
                        "block text-black text-lg font-medium mb-2 col-span-1 whitespace-nowrap",
                      htmlFor: "emp_name",
                      children: "Name:",
                    }),
                    e.jsx("input", {
                      type: "text",
                      id: "emp_name",
                      className:
                        "mx-2 font-lexend px-2 text-sm text-end outline-none col-span-2",
                      placeholder: "Employee Name",
                      ...p("emp_name"),
                    }),
                  ],
                }),
                d.emp_name &&
                  e.jsx("p", {
                    className: "text-red-500 text-xs text-end ",
                    children: d.emp_name.message,
                  }),
              ],
            }),
            e.jsxs("div", {
              className: "flex flex-col gap-3 mx-10 my-1",
              children: [
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: "grid grid-cols-3 gap-3",
                      children: [
                        e.jsx("label", {
                          className:
                            "text-black text-lg font-medium mb-2 col-span-2",
                          htmlFor: "dept_name",
                          children: "Department:",
                        }),
                        e.jsxs("select", {
                          className:
                            "text-sm text-black border border-gray-900 rounded-lg border-none outline-none",
                          id: "dept_name",
                          ...p("dept_name"),
                          children: [
                            e.jsx("option", {
                              value: "",
                              children: "Department",
                            }),
                            k.map((i, n) =>
                              e.jsx(
                                "option",
                                { value: i.dept_name, children: i.dept_name },
                                n
                              )
                            ),
                          ],
                        }),
                      ],
                    }),
                    d.dept_name &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: d.dept_name.message,
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
                            "text-black text-lg font-medium mb-2 col-span-1",
                          htmlFor: "phone",
                          children: "Phone:",
                        }),
                        e.jsx("input", {
                          type: "text",
                          id: "phone",
                          className: "w-6/5 text-end outline-none col-span-2",
                          placeholder: "Phone Number",
                          ...p("phone"),
                        }),
                      ],
                    }),
                    d.phone &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: d.phone.message,
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
                            "text-black text-lg font-medium mb-2 col-span-1",
                          htmlFor: "email",
                          children: "Email Id:",
                        }),
                        e.jsx("input", {
                          type: "email",
                          id: "email",
                          className: "text-end outline-none col-span-2",
                          placeholder: "abc@gmail.com",
                          ...p("email"),
                        }),
                      ],
                    }),
                    d.email &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: d.email.message,
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
                            "text-black text-lg font-medium mb-2 col-span-1",
                          htmlFor: "address",
                          children: "Address:",
                        }),
                        e.jsx("input", {
                          type: "text",
                          id: "address",
                          className: "text-end outline-none col-span-2",
                          placeholder: "Address",
                          ...p("address"),
                        }),
                      ],
                    }),
                    d.address &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: d.address.message,
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
                            "text-black text-lg font-medium mb-2 col-span-1",
                          htmlFor: "pincode",
                          children: "Pincode:",
                        }),
                        e.jsx("input", {
                          type: "text",
                          id: "pincode",
                          className: "text-end outline-none col-span-2",
                          placeholder: "Pincode",
                          ...p("pincode"),
                        }),
                      ],
                    }),
                    d.pincode &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: d.pincode.message,
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
                            "text-black text-lg font-medium mb-2 col-span-1",
                          htmlFor: "dob",
                          children: "Date of Birth :",
                        }),
                        e.jsx("input", {
                          type: "text",
                          id: "dob",
                          className: "text-end outline-none col-span-2",
                          placeholder: "DOB",
                          ...p("dob"),
                        }),
                      ],
                    }),
                    d.dob &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: d.dob.message,
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
                            "text-black text-lg font-medium mb-2 col-span-2",
                          htmlFor: "designation",
                          children: "Desgination :",
                        }),
                        e.jsxs("select", {
                          className:
                            "text-sm text-black border border-gray-900 rounded-lg border-none outline-none",
                          id: "designation",
                          ...p("designation"),
                          onChange: I,
                          children: [
                            e.jsx("option", {
                              value: "",
                              children: "Designation",
                            }),
                            E.map((i, n) =>
                              e.jsx(
                                "option",
                                {
                                  value: i.designation,
                                  children: i.designation,
                                },
                                n
                              )
                            ),
                          ],
                        }),
                      ],
                    }),
                    d.designation &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: d.designation.message,
                      }),
                  ],
                }),
              ],
            }),
            e.jsx("div", {
              className: "py-6",
              children: e.jsx(ee, { onCancel: s.toggleModal }),
            }),
          ],
        }),
      }),
    });
  },
  qe = W().shape({
    emp_name: c().trim().required("Employee Name is required"),
    dept_name: c().required("Department is required"),
    address: c().required("Address is required"),
    dob: c().required("DOB is required"),
    pincode: c()
      .test("len", "Pincode must be 6 characters", (s) => s.length === 6)
      .required("Pincode is required"),
    designation: c().test(
      "not-select",
      "Please select a Designation",
      (s) => s !== "" && s !== "Designation"
    ),
    status: c().test(
      "not-select",
      "Please select an Status",
      (s) => s !== "" && s !== "Status"
    ),
  }),
  Ae = (s) => {
    const { ExistingDesignation: E, ExistingDept: k, adminId: N } = s,
      [C, p] = l.useState(null),
      [d, P] = l.useState(null),
      [I, O] = l.useState(null),
      {
        register: i,
        formState: { errors: n },
        handleSubmit: j,
        setValue: h,
        watch: U,
      } = X({ resolver: Z(qe), mode: "all" });
    l.useEffect(() => {
      (async () => {
        try {
          const m = b.FETCH_EMPLOYEE(N),
            u = await v.get(m.url, { headers: m.headers }),
            r = Y(u.data.data);
          h("emp_name", r.emp_name),
            h("dept_name", r.dept_name),
            p(r.dept_name),
            h("address", r.address),
            h("pincode", r.pincode),
            h("dob", r.dob),
            P(r.designation),
            h("designation_id", r.designation_id),
            h("designation", r.designation),
            h("status", r.status);
        } catch (m) {
          console.error("Error fetching data", m);
        }
      })();
    }, [N, h]);
    const q = (g) => {
        const m = g.target.value,
          u = E.find((r) => r.designation === m);
        O(u.desgination_id);
      },
      V = async (g) => {
        const m = { ...g, designation_id: I };
        try {
          const u = b.UPDATE_EMPLOYEE(N),
            r = await v.post(u.url, m, { headers: u.headers });
          r.status === 200
            ? (_.success(r.data.message),
              p(null),
              P(null),
              s.toggleModal(),
              s.handlerefresh())
            : (console.error("Error in posting data", r),
              _.error("Failed to Upload"));
        } catch (u) {
          console.error("Error in posting data", u);
        }
      };
    return e.jsx("div", {
      className:
        "fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ",
      children: e.jsx("div", {
        className: "bg-white w-fit h-fit  font-lexend m-2",
        children: e.jsxs("form", {
          onSubmit: j(V),
          children: [
            e.jsxs("div", {
              className: "border-b-2 border-gray-300 mx-10 my-5",
              children: [
                e.jsxs("div", {
                  className: "grid grid-cols-3 gap-3",
                  children: [
                    e.jsx("label", {
                      className:
                        "block text-black text-lg font-medium mb-2 col-span-1 whitespace-nowrap",
                      htmlFor: "emp_name",
                      children: "Name:",
                    }),
                    e.jsx("input", {
                      type: "text",
                      id: "emp_name",
                      className:
                        "mx-2 font-lexend px-2 text-sm text-end outline-none col-span-2",
                      placeholder: "Employee Name",
                      ...i("emp_name"),
                    }),
                  ],
                }),
                n.emp_name &&
                  e.jsx("p", {
                    className: "text-red-500 text-xs text-end ",
                    children: n.emp_name.message,
                  }),
              ],
            }),
            e.jsxs("div", {
              className: "flex flex-col gap-3 mx-10 my-1",
              children: [
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: "grid grid-cols-3 gap-3",
                      children: [
                        e.jsx("label", {
                          className:
                            "text-black text-lg font-medium mb-2 col-span-2",
                          htmlFor: "dept_name",
                          children: "Department:",
                        }),
                        e.jsxs("select", {
                          className:
                            "text-sm text-black border border-gray-900 rounded-lg border-none outline-none",
                          id: "dept_name",
                          ...i("dept_name"),
                          children: [
                            e.jsx("option", { value: C, children: C }),
                            k.map((g, m) =>
                              e.jsx(
                                "option",
                                { value: g.dept_name, children: g.dept_name },
                                m
                              )
                            ),
                          ],
                        }),
                      ],
                    }),
                    n.dept_name &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: n.dept_name.message,
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
                            "text-black text-lg font-medium mb-2 col-span-1",
                          htmlFor: "address",
                          children: "Address:",
                        }),
                        e.jsx("input", {
                          type: "text",
                          id: "address",
                          className: "text-end outline-none col-span-2",
                          placeholder: "Address",
                          ...i("address"),
                        }),
                      ],
                    }),
                    n.address &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: n.address.message,
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
                            "text-black text-lg font-medium mb-2 col-span-1",
                          htmlFor: "pincode",
                          children: "Pincode:",
                        }),
                        e.jsx("input", {
                          type: "text",
                          id: "pincode",
                          className: "text-end outline-none col-span-2",
                          placeholder: "Pincode",
                          ...i("pincode"),
                        }),
                      ],
                    }),
                    n.pincode &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: n.pincode.message,
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
                            "text-black text-lg font-medium mb-2 col-span-1",
                          htmlFor: "dob",
                          children: "Date of Birth :",
                        }),
                        e.jsx("input", {
                          type: "text",
                          id: "dob",
                          className: "text-end outline-none col-span-2",
                          placeholder: "DOB",
                          ...i("dob"),
                        }),
                      ],
                    }),
                    n.dob &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: n.dob.message,
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
                            "text-black text-lg font-medium mb-2 col-span-2",
                          htmlFor: "designation",
                          children: "Desgination :",
                        }),
                        e.jsxs("select", {
                          className:
                            "text-sm text-black border border-gray-900 rounded-lg border-none outline-none",
                          id: "designation",
                          ...i("designation"),
                          onChange: q,
                          children: [
                            e.jsx("option", { value: d, children: d }),
                            E.map((g, m) =>
                              e.jsx(
                                "option",
                                {
                                  value: g.designation,
                                  children: g.designation,
                                },
                                m
                              )
                            ),
                          ],
                        }),
                      ],
                    }),
                    n.designation &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-end ",
                        children: n.designation.message,
                      }),
                  ],
                }),
                e.jsxs("div", {
                  className: " grid grid-cols-3 gap-3 ",
                  children: [
                    e.jsx("label", {
                      className:
                        " text-black text-lg font-medium mb-2 col-span-2",
                      htmlFor: "status",
                      children: "Status:",
                    }),
                    e.jsxs("select", {
                      className:
                        "   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none",
                      id: "status",
                      ...i("status"),
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
                    n.status &&
                      e.jsx("p", {
                        className: "text-red-500 text-xs text-center mb-3 ",
                        children: n.status.message,
                      }),
                  ],
                }),
              ],
            }),
            e.jsx("div", {
              className: "py-6",
              children: e.jsx(ee, { onCancel: s.toggleModal }),
            }),
          ],
        }),
      }),
    });
  },
  Be = `emp_name,designation_id,designation,dept_name,phone,email,address,pincode,status,created_by_user
name,DE***,designation,Department,1234567890,abc@gmail.com,address,123456,active,admin`,
  He = ({ permissions: s }) => {
    const [E, k] = l.useState(!1),
      N = s == null ? void 0 : s.includes("create"),
      C = s == null ? void 0 : s.includes("edit"),
      p = s == null ? void 0 : s.includes("delete"),
      d = s == null ? void 0 : s.includes("download"),
      [P, I] = l.useState(!1),
      [O, i] = l.useState(null),
      [n, j] = l.useState(!1),
      [h, U] = l.useState(null),
      [q, V] = l.useState(null),
      [g, m] = l.useState(null),
      [u, r] = l.useState(""),
      [A, te] = l.useState(1),
      [T] = l.useState(8),
      [z, se] = l.useState(1),
      [Ye, ae] = l.useState([]),
      [M, ne] = l.useState([]),
      [R, le] = l.useState(null),
      [de, $] = l.useState(null),
      [H, J] = l.useState("Bulk Upload"),
      [ie, oe] = l.useState(null),
      G = (t) => {
        le(R === t ? null : t);
      },
      re = (t) => R === t;
    l.useEffect(() => {
      F(), pe(), he();
    }, [u, A]);
    const ce = (t) => {
        t > 0 && t <= z && te(t);
      },
      F = () => {
        v.get(b.GET_EMPLOYEE.url, { headers: b.GET_EMPLOYEE.headers })
          .then((t) => {
            const a = Y(t.data.data);
            ne(a);
            const D = a.filter((x) =>
              Object.values(x).some((o) =>
                o.toString().toLowerCase().includes(u.toLowerCase())
              )
            );
            se(Math.ceil(D.length / T));
            const y = A * T,
              w = y - T;
            ae(D.slice(w, y));
          })
          .catch((t) => {
            console.error(t);
          });
      },
      me = () => {
        k(!E);
      },
      xe = () => {
        I(!P), i(null);
      },
      K = () => {
        j(!n), U(null);
      },
      pe = async () => {
        try {
          const t = await v.get(b.GET_DESIG_EMPLOYEEACTIVE.url, {
              headers: b.GET_DESIG_EMPLOYEEACTIVE.headers,
            }),
            a = Y(t.data.data);
          V(a);
        } catch (t) {
          console.error("Error fetching existing Roles:", t);
        }
      },
      he = async () => {
        try {
          const t = await v.get(b.GET_DEPT_EMPLOYEEACTIVE.url, {
              headers: b.GET_DEPT_EMPLOYEEACTIVE.headers,
            }),
            a = Y(t.data.data);
          m(a);
        } catch (t) {
          console.error("Error fetching existing Department:", t);
        }
      },
      B = A * T,
      L = B - T,
      Q = M.filter((t) =>
        Object.values(t).some((a) =>
          a.toString().toLowerCase().includes(u.toLowerCase())
        )
      ),
      ge = Q.slice().reverse().slice(L, B),
      ue = async () => {
        try {
          const t = b.DELETE_EMPLOYEE(h);
          await v.delete(t.url, { headers: t.headers }),
            K(),
            F(),
            _.success("Deleted successfully");
        } catch {
          _.error("Failed to delete");
        }
      },
      je = (t) => {
        $(t.target.files[0]), J("Upload");
      },
      be = () => {
        H === "Bulk Upload"
          ? document.getElementById("fileInput").click()
          : fe(de);
      },
      fe = async (t) => {
        try {
          const a = new FormData();
          a.append("file", t),
            localStorage,
            (
              await v.post(b.CSV_EMPLOYEE.url, a, {
                headers: { "Content-Type": "multipart/form-data" },
              })
            ).status === 200
              ? (J("Bulk Upload"),
                $(null),
                F(),
                _.success("Data Uploaded Successfully"))
              : _.error("Data failed to Upload");
        } catch (a) {
          console.log(a);
        }
      },
      ye = (t) => {
        oe(t.target.value);
      },
      Ee = async (t) => {
        if (t === "csv") {
          const a = M.map((o) => ({
              emp_id: o.emp_id,
              emp_name: o.emp_name,
              designation_id: o.designation_id,
              designation: o.designation,
              dept_name: o.dept_name,
              phone: o.phone,
              email: o.email,
              address: o.address,
              pincode: o.pincode,
              status: o.status,
              role: o.role,
              created_by_user: o.created_by_user,
            })),
            D = [
              Object.keys(a[0]).join(","),
              ...a.map((o) => Object.values(o).join(",")),
            ].join(`
`),
            y = new Blob([D], { type: "text/csv;charset=utf-8;" }),
            w = window.URL.createObjectURL(y),
            x = document.createElement("a");
          x.setAttribute("href", w),
            x.setAttribute("download", "Employee_data.csv"),
            (x.style.visibility = "hidden"),
            document.body.appendChild(x),
            x.click(),
            document.body.removeChild(x);
        } else if (t === "pdf")
          try {
            const D = Math.ceil(M.length / 30),
              y = new Ce("l", "mm", "a4");
            let w = 0;
            for (let x = 1; x <= D; x++) {
              const o = (x - 1) * 30,
                De = Math.min(o + 30, M.length),
                ve = M.slice(o, De).map((f) => [
                  f.emp_id,
                  f.emp_name,
                  f.designation,
                  f.dept_name,
                  f.phone,
                  f.email,
                  f.address,
                  f.pincode,
                  f.status,
                  f.created_by_user,
                ]);
              y.text(`Page ${x}`, 10, w + 10),
                y.autoTable({
                  startY: w + 15,
                  head: [
                    [
                      "Emp_Id",
                      "Emp_Name",
                      "Designation",
                      "Dept_Name",
                      "Phone",
                      "Email",
                      "Address",
                      "Pincode",
                      "Status",
                      "CreatedBy",
                    ],
                  ],
                  body: ve,
                  theme: "striped",
                }),
                x < D && (y.addPage(), (w = 10));
            }
            y.save("Employee_data.pdf");
          } catch (a) {
            console.error("Error exporting data:", a);
          }
      },
      Ne = () => {
        Ie(Be);
      };
    return e.jsxs(l.Fragment, {
      children: [
        e.jsx("div", {
          className: "  bg-blue-100 overflow-y-auto no-scrollbar",
          children: e.jsxs("div", {
            className: "h-screen",
            children: [
              e.jsxs("div", {
                className:
                  "flex flex-row items-center md:justify-end gap-3 p-2 mt-2 mx-8 flex-wrap",
                children: [
                  e.jsx(_e, {
                    value: u,
                    onChange: (t) => r(t.target.value),
                    placeholder: "Search Employee",
                  }),
                  N &&
                    e.jsx(Oe, {
                      onChange: je,
                      buttonText: H,
                      accept: ".csv",
                      onClick: be,
                    }),
                  d &&
                    e.jsx(Pe, {
                      selectedDoc: ie,
                      onChange: ye,
                      exportData: Ee,
                    }),
                ],
              }),
              e.jsx(we, {
                title: "MSCL Employee",
                hasCreatePermission: N,
                onClick: () => k(!0),
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
                                children: ["Employee Name ", e.jsx(S, {})],
                              }),
                            }),
                            e.jsx("th", {
                              children: e.jsxs("div", {
                                className:
                                  "flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",
                                children: ["Designation", e.jsx(S, {})],
                              }),
                            }),
                            e.jsx("th", {
                              children: e.jsxs("div", {
                                className:
                                  "flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",
                                children: ["Department", e.jsx(S, {})],
                              }),
                            }),
                            e.jsx("th", {
                              children: e.jsxs("div", {
                                className:
                                  "flex gap-2 items-center justify-start mx-3  my-2 font-lexend font-semibold whitespace-nowrap",
                                children: ["Phone", e.jsx(S, {})],
                              }),
                            }),
                            e.jsx("th", {
                              children: e.jsxs("div", {
                                className:
                                  "flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",
                                children: ["Email", e.jsx(S, {})],
                              }),
                            }),
                            e.jsx("th", {
                              children: e.jsxs("div", {
                                className:
                                  "flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",
                                children: ["Status", e.jsx(S, {})],
                              }),
                            }),
                            e.jsx("th", {
                              children: e.jsxs("div", {
                                className:
                                  "flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap",
                                children: ["CreatedBy", e.jsx(S, {})],
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
                        children: ge.map((t, a) =>
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
                                      L + a + 1 < 10
                                        ? `0${L + a + 1}`
                                        : L + a + 1,
                                    ],
                                  }),
                                }),
                                e.jsx("td", {
                                  children: e.jsx("p", {
                                    className:
                                      " mx-1  my-2 font-lexend whitespace-nowrap text-start text-sm capitalize text-gray-700",
                                    children: t.emp_name,
                                  }),
                                }),
                                e.jsx("td", {
                                  children: e.jsx("p", {
                                    className:
                                      "text-start text-sm  mx-1  my-2  font-lexend whitespace-nowrap capitalize text-gray-700",
                                    children: t.designation,
                                  }),
                                }),
                                e.jsx("td", {
                                  children: e.jsx("p", {
                                    className:
                                      "text-start text-sm  mx-1  my-2  font-lexend whitespace-nowrap capitalize text-gray-700",
                                    children: t.dept_name,
                                  }),
                                }),
                                e.jsx("td", {
                                  children: e.jsx("p", {
                                    className:
                                      "text-start text-sm mx-3  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",
                                    children: t.phone,
                                  }),
                                }),
                                e.jsx("td", {
                                  children: e.jsx("p", {
                                    className:
                                      "text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",
                                    children: t.email,
                                  }),
                                }),
                                e.jsx("td", {
                                  children: e.jsx("p", {
                                    className:
                                      "text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",
                                    children: t.status,
                                  }),
                                }),
                                e.jsx("td", {
                                  children: e.jsx("p", {
                                    className:
                                      "text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap capitalize text-gray-700",
                                    children: t.created_by_user,
                                  }),
                                }),
                                e.jsx("td", {
                                  children: e.jsxs("div", {
                                    className: "flex justify-start mx-1.5 my-3",
                                    children: [
                                      e.jsx(Se, { onClick: () => G(a) }),
                                      re(a) &&
                                        e.jsxs("div", {
                                          className:
                                            " bg-white shadow-md rounded-lg ml-1",
                                          children: [
                                            C &&
                                              e.jsx("button", {
                                                className:
                                                  "block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",
                                                onClick: () => {
                                                  I(!0), i(t.emp_id), G();
                                                },
                                                children: "Edit",
                                              }),
                                            p &&
                                              e.jsx("button", {
                                                className:
                                                  "block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left",
                                                onClick: () => {
                                                  j(!0), U(t.emp_id), G();
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
                            a
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
                  e.jsx(Te, { handleDownload: Ne }),
                  e.jsx(ke, {
                    Length: M.length,
                    currentPage: A,
                    totalPages: z,
                    firstIndex: L,
                    lastIndex: B,
                    paginate: ce,
                    hasNextPage: B >= Q.length,
                  }),
                ],
              }),
            ],
          }),
        }),
        E &&
          e.jsx(Le, {
            toggleModal: me,
            handlerefresh: F,
            ExistingDesignation: q,
            ExistingDept: g,
          }),
        P &&
          e.jsx(Ae, {
            toggleModal: xe,
            handlerefresh: F,
            ExistingDesignation: q,
            ExistingDept: g,
            adminId: O,
          }),
        n && e.jsx(Me, { toggleDeleteModal: K, delete: ue }),
      ],
    });
  };
export { He as default };
