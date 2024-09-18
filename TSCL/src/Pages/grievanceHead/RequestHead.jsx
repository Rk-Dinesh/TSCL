import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiExpandUpDownLine } from "react-icons/ri";
import { API, formatDate } from "../../Host";
import axios from "axios";
import decryptData from "../../Decrypt";
import Pagination from "../../components/Pagination";

const RequestHead = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [status, setStatus] = useState([]);

  const [Complainttype, setComplainttype] = useState([]);
  const [department, setDepartment] = useState([]);
  const [Complaint, setComplaint] = useState([]);
  const [zone, setZone] = useState([]);
  const [ward, setWard] = useState([]);
  const [Street, setStreet] = useState([]);
  const [report, setReport] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);

  const token = sessionStorage.getItem("token");
  const dept = sessionStorage.getItem("dept");

  const navigate = useNavigate();

  const [selected, setSelected] = useState("All");
  const [statusColors, setStatusColors] = useState({});

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selecetedComplaint, setSelecetedComplaint] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedStreet, setSelectedStreet] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedComplainttype, setSelectedComplainttype] = useState(null);
  const [selectedPrior, setSelectedPrior] = useState(null);
  const [selectedAssign, setSelectedAssign] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/new-grievance/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const responseData = decryptData(response.data.data);

        setReport(responseData);

        const filteredCenters = responseData.filter((report) =>
          Object.values(report).some((value) =>
            value.toString().toLowerCase().includes(searchValue.toLowerCase())
          )
        );

        setTotalPages(Math.ceil(filteredCenters.length / itemsPerPage));
        const lastIndex = currentPage * itemsPerPage;
        const firstIndex = lastIndex - itemsPerPage;

        setCurrentItems(filteredCenters.slice(firstIndex, lastIndex));
      })
      .catch((error) => {
        console.error(error);
      });

    fetchDepartment();
    fetchZone();
    fetchActiveStatus();
    fetchComplaintType();
    fetchDeptUser();
  }, [searchValue, currentPage]);

  const fetchZone = async () => {
    try {
      const response = await axios.get(`${API}/zone/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = decryptData(response.data.data);
      setZone(responseData);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(`${API}/department/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = decryptData(response.data.data);
      setDepartment(responseData);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const fetchActiveStatus = async () => {
    try {
      const response = await axios.get(`${API}/status/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = decryptData(response.data.data);
      const colorMapping = responseData.reduce((acc, status) => {
        acc[status.status_name] = status.color;
        return acc;
      }, {});

      setStatus(responseData);
      setStatusColors(colorMapping);
    } catch (err) {
      console.error("Error fetching existing ActiveStatus:", err);
    }
  };

  const fetchDeptUser = async () => {
    try {
      const response = await axios.get(
        `${API}/user/getbydept?dept_name=${dept}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = decryptData(response.data.data);

      setDataUsers(responseData);
    } catch (err) {
      sconsole.error("Error fetching existing ActiveStatus:", err);
    }
  };

  const fetchComplaintType = async () => {
    try {
      const response = await axios.get(`${API}/complainttype/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = decryptData(response.data.data);
      setComplainttype(responseData);
    } catch (error) {
      console.error("Error fetching existing Complainttype:", error);
    }
  };

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredCenters = report.filter((report) =>
    Object.values(report).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const handleComplaintTypeClick = (Type) => {
    setSelected(Type);
    setSelectedDepartment(null);
    setSelectedZone(null);
    setSelectedWard(null);
    setSelectedStatus(null);
    setSelectedComplainttype(null);
    setSelectedPrior(null);
    setSelectedAssign(null);
    paginate(1);
  };
  const handleDept = async(depts) => {
    if (depts === "All") {
      setSelectedDepartment(null);
      setComplaint([]);
    } else {
      setSelectedDepartment(depts);
      setSelecetedComplaint(null);
      await axios
        .get(`${API}/complaint/getdept?dept_name=${depts}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const responseData = decryptData(response.data.data);
          setComplaint(responseData);
        });
    }
    paginate(1);
  };

  const handleC = (compt) => {
    if (compt === "All") {
      setSelecetedComplaint(null);
    } else {
      setSelecetedComplaint(compt);
    }
    paginate(1);
  };
  const handleZone = async(zones) => {
    if (zones === "All") {
      setSelectedZone(null);
      setWard([])
      setStreet([])
    } else {
      setSelectedZone(zones);
      setSelectedWard(null);
      setSelectedStreet(null);
      await axios
      .get(`${API}/ward/getzone?zone_name=${zones}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const responseData = decryptData(response.data.data);
        setWard(responseData);
      });
    }
    paginate(1);
  };

  const handleWard = async(wards) => {
    if (wards === "All") {
      setSelectedWard(null);
      setStreet([])
    } else {
      setSelectedWard(wards);
      setSelectedStreet(null);
      await axios
      .get(`${API}/street/getward?ward_name=${wards}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const responseData = decryptData(response.data.data);
        setStreet(responseData);
      });
    }
    paginate(1);
  };

  const handleStreet = (streets) => {
    if (streets === "All") {
      setSelectedStreet(null);
    } else {
      setSelectedStreet(streets);
    }
    paginate(1);
  };

  const handleStatus = (status) => {
    if (status === "All") {
      setSelectedStatus(null);
    } else {
      setSelectedStatus(status);
    }
    paginate(1);
  };
  const handleType = (type) => {
    if (type === "All") {
      setSelectedComplainttype(null);
    } else {
      setSelectedComplainttype(type);
    }
    paginate(1);
  };
  const handlePriority = (prior) => {
    if (prior === "All") {
      setSelectedPrior(null);
    } else {
      setSelectedPrior(prior);
    }
    paginate(1);
  };
  const handleAssign = (assign) => {
    if (assign === "All") {
      setSelectedAssign(null);
    } else {
      setSelectedAssign(assign);
    }
    paginate(1);
  };

  const currentItemsOnPage = filteredCenters
    .slice()
    .reverse()
    .filter((report) => {
      const complaintTypeMatch = selected === "All" ? true : "";
      const deptMatch =
        selectedDepartment === null
          ? true
          : report.dept_name === selectedDepartment;
      const CMatch =
        selecetedComplaint === null
          ? true
          : report.complaint === selecetedComplaint;
      const zoneMatch =
        selectedZone === null ? true : report.zone_name === selectedZone;
      const wardMatch =
        selectedWard === null ? true : report.ward_name === selectedWard;
      const streetMatch =
        selectedStreet === null ? true : report.street_name === selectedStreet;
      const statusMatch =
        selectedStatus === null ? true : report.status === selectedStatus;
      const CTypeMatch =
        selectedComplainttype === null
          ? true
          : report.complaint_type_title === selectedComplainttype;
      const priorityMatch =
        selectedPrior === null ? true : report.priority === selectedPrior;
      const assignMatch =
        selectedAssign === null
          ? true
          : selectedAssign === "Yet to be Assigned"
          ? !report.assign_username
          : report.assign_username === selectedAssign;

      return (
        complaintTypeMatch &&
        statusMatch &&
        deptMatch &&
        CMatch &&
        zoneMatch &&
        wardMatch &&
        streetMatch &&
        CTypeMatch &&
        priorityMatch &&
        assignMatch
      );
    })
    .slice(firstIndex, lastIndex);

  return (
    <div className="overflow-y-auto no-scrollbar">
      <div className="  font-lexend h-screen ">
        <div className="flex flex-wrap gap-2 mt-3 mx-4">
          <button
            className={`w-20  py-1 ${
              selected === "All"
                ? "bg-primary text-white"
                : "bg-white text-black"
            } rounded-full`}
            onClick={() => handleComplaintTypeClick("All")}
          >
            All
          </button>

          <div className="flex gap-2 flex-wrap">
            <select
              className="block w-full  px-1 md:py-2 py-1.5 text-center  text-sm bg-primary text-white  border border-none rounded-full  hover:border-gray-200 outline-none capitalize"
              onChange={(e) => handleDept(e.target.value)}
              value={selectedDepartment || ""}
            >
              <option hidden>Department</option>
              <option value="All">All</option>
              {department &&
                department.map((option) => (
                  <option key={option.dept_id} value={option.dept_name}>
                    {option.dept_name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex gap-2 flex-wrap">
            <select
              className="block w-full  px-1 md:py-2 py-1.5 text-center  text-sm bg-primary text-white  border border-none rounded-full  hover:border-gray-200 outline-none capitalize"
              onChange={(e) => handleC(e.target.value)}
              value={selecetedComplaint || ""}
            >
              <option hidden>Complaint</option>
              <option value="All">All</option>
              {Complaint &&
                Complaint.map((option) => (
                  <option
                    key={option.complaint_id}
                    value={option.complaint_type_title}
                  >
                    {option.complaint_type_title}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex gap-2 flex-wrap">
            <select
              className="block w-full  px-1 md:py-2 py-1.5 text-center  text-sm bg-primary text-white  border border-none rounded-full  hover:border-gray-200 outline-none capitalize"
              onChange={(e) => handleZone(e.target.value)}
              value={selectedZone || ""}
            >
              <option hidden>Zone</option>
              <option value="All">All</option>
              {zone &&
                zone.map((option) => (
                  <option key={option.zone_id} value={option.zone_name}>
                    {option.zone_name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex gap-2 flex-wrap">
            <select
              className="block w-full  px-1md:py-2 py-1.5 text-center  text-sm bg-primary text-white  border border-none rounded-full  hover:border-gray-200 outline-none capitalize"
              onChange={(e) => handleWard(e.target.value)}
              value={selectedWard || ""}
            >
              <option hidden>ward</option>
              <option value="All">All</option>
              {ward &&
                ward
                  .filter((ward) => ward.zone_name === selectedZone)
                  .map((option) => (
                    <option key={option.ward_id} value={option.ward_name}>
                      {option.ward_name}
                    </option>
                  ))}
            </select>
          </div>

          <div className="flex gap-2 flex-wrap">
            <select
              className="block w-full  px-1 md:py-2 py-1.5 text-center  text-sm bg-primary text-white  border border-none rounded-full  hover:border-gray-200 outline-none capitalize"
              onChange={(e) => handleStreet(e.target.value)}
              value={selectedStreet || ""}
            >
              <option hidden>Area</option>
              <option value="All">All</option>
              {Street &&
                Street.filter(
                  (streets) => streets.ward_name === selectedWard
                ).map((option) => (
                  <option key={option.street_id} value={option.street_name}>
                    {option.street_name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="bg-white h-4/5 mx-3 rounded-lg mt-4  p-3">
          <div className="flex flex-col md:flex-row justify-between items-center md:gap-6 gap-2 md:mt-2 mx-3">
            <div className="flex flex-wrap gap-3">
              <p className="md:text-lg text-sm whitespace-nowrap">
                View Report
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-2 flex-wrap">
                <select
                  className="block w-full  px-1 md:py-2 py-1.5 text-center  text-sm bg-primary text-white  border border-none rounded-full  hover:border-gray-200 outline-none capitalize"
                  onChange={(e) => handleAssign(e.target.value)}
                  value={selectedAssign || ""}
                >
                  <option hidden>Select Assign</option>
                  <option value="All">All</option>
                  <option value={"Yet to be Assigned"}>
                    Yet to be Assigned
                  </option>
                  {dataUsers &&
                    dataUsers.map((option) => (
                      <option key={option.user_id} value={option.user_name}>
                        {option.user_name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex gap-2 flex-wrap">
                <select
                  className="block w-full  px-1 md:py-2 py-1.5 text-center  text-sm bg-primary text-white  border border-none rounded-full  hover:border-gray-200 outline-none capitalize"
                  onChange={(e) => handlePriority(e.target.value)}
                  value={selectedPrior || ""}
                >
                  <option hidden>Priority</option>
                  <option value="All">All</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="flex gap-2 flex-wrap">
                <select
                  className="block w-full  px-1md:py-2 py-1.5 text-center  text-sm bg-primary text-white  border border-none rounded-full  hover:border-gray-200 outline-none capitalize"
                  onChange={(e) => handleStatus(e.target.value)}
                  value={selectedStatus || ""}
                >
                  <option hidden>Status</option>
                  <option value="All">All</option>
                  {status &&
                    status.map((option) => (
                      <option key={option.status_id} value={option.status_name}>
                        {option.status_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex gap-2 flex-wrap">
                <select
                  className="block w-full  px-1 md:py-2 py-1.5 text-center  text-sm bg-primary text-white  border border-none rounded-full  hover:border-gray-200 outline-none capitalize"
                  onChange={(e) => handleType(e.target.value)}
                  value={selectedComplainttype || ""}
                >
                  <option hidden>Complaint Type</option>
                  <option value="All">All</option>
                  {Complainttype &&
                    Complainttype.map((option) => (
                      <option
                        key={option.compliant_type_id}
                        value={option.complaint_type}
                      >
                        {option.complaint_type}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div className=" rounded-lg  md:py-3 py-1 overflow-x-auto no-scrollbar">
            <table className="w-full md:mt-1 ">
              <thead className=" border-b border-gray-300  ">
                <tr className="">
                  <th className="">
                    <p className=" mx-6 my-2 font-lexend font-medium whitespace-nowrap">
                      #
                    </p>
                  </th>
                  <th>
                    <p className="mx-1.5 my-2 text-start font-lexend font-medium  whitespace-nowrap">
                      Complaint No
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                      Complaint Type
                      <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                      Department
                      <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                      Complaint
                      <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                      Date and Time <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                      Raised by <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                      Zone <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                      Ward <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                      Street <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                      Assigned JE <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-center mx-2 my-2 font-lexend font-medium  whitespace-nowrap">
                      Priority <RiExpandUpDownLine />
                    </p>
                  </th>

                  <th>
                    <p className="flex gap-2 items-center justify-center mx-2 my-2 font-lexend font-medium  whitespace-nowrap">
                      Status <RiExpandUpDownLine />
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItemsOnPage.map((report, index) => (
                  <tr className=" border-b border-gray-300  " key={index}>
                    <td className="">
                      <div className="text-center text-sm mx-3 my-2 font-lexend whitespace-nowrap">
                        {firstIndex + index + 1 < 10
                          ? `0${firstIndex + index + 1}`
                          : firstIndex + index + 1}
                      </div>
                    </td>
                    <td>
                      <p
                        className="border-2 w-28 border-slate-900 rounded-lg text-center py-1 my-1  capitalize text-slate-900"
                        onClick={() =>
                          navigate(`/view3`, {
                            state: {
                              grievanceId: report.grievance_id,
                              deptName: report.dept_name,
                            },
                          })
                        }
                      >
                        {report.grievance_id}
                      </p>
                    </td>
                    <td>
                      {" "}
                      <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                        {report.complaint_type_title}
                      </p>
                    </td>
                    <td>
                      {" "}
                      <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                        {report.dept_name}
                      </p>
                    </td>
                    <td>
                      {" "}
                      <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                        {report.complaint}
                      </p>
                    </td>
                    <td>
                      <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                        {formatDate(report.createdAt)}
                      </p>
                    </td>
                    <td>
                      {" "}
                      <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                        {report.public_user_name}
                      </p>
                    </td>
                    <td>
                      {" "}
                      <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                        {report.zone_name}
                      </p>
                    </td>
                    <td>
                      {" "}
                      <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                        {report.ward_name}
                      </p>
                    </td>
                    <td>
                      {" "}
                      <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                        {report.street_name}
                      </p>
                    </td>
                    <td>
                      {" "}
                      <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                        {report.assign_username
                          ? report.assign_username
                          : "Yet to be assigned"}
                      </p>
                    </td>
                    <td>
                      <p
                        className={`border-2 w-26 rounded-full text-center py-1.5 mx-2 text-sm font-medium capitalize  ${
                          report.priority === "High"
                            ? "text-red-500 border-red-500"
                            : report.priority === "Medium"
                            ? "text-sky-500 border-sky-500"
                            : report.priority === "Low"
                            ? "text-green-500 border-green-500"
                            : ""
                        }`}
                      >
                        {report.priority}
                      </p>
                    </td>

                    <td>
                      <p
                        className="border-2 w-28 rounded-full text-center py-1 tex-sm font-normal mx-2 capitalize  "
                        style={{
                          borderColor: statusColors[report.status] || "gray",
                          color: statusColors[report.status] || "black",
                          fontSize: 14,
                        }}
                      >
                        {report.status}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className=" my-3 mb-5 mx-7">
          <Pagination
            Length={report.length}
            currentPage={currentPage}
            totalPages={totalPages}
            firstIndex={firstIndex}
            lastIndex={lastIndex}
            paginate={paginate}
            hasNextPage={lastIndex >= filteredCenters.length}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestHead;
