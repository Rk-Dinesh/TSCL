import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiExpandUpDownLine } from "react-icons/ri";
import { API, formatDate1 } from "../../Host";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";
import { addDays } from "date-fns";
import axios from "axios";
import decryptData from "../../Decrypt";
import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import DocumentDownload from "../../components/DocumentDownload";
import DateRangeComp from "../../components/DateRangeComp";
import ManyTicketTransfer from "../grievancesadmin/ManyTicketTransfer";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { IoIosEye } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchZone } from "../redux/slice/zone";
import { fetchWard } from "../redux/slice/ward";
import SearchableDropdown from "../../components/SearchableDropDown";
import { fetchOrigin } from "../redux/slice/origin";
import logo from "../../assets/images/logo1.png";

const RequestJE = ({ permissions, include, endpoint }) => {
  const hasCreatePermission = permissions?.includes("create");
  const hasEditPermission = permissions?.includes("edit");
  const hasDeletePermission = permissions?.includes("delete");
  const hasDownloadPermission = permissions?.includes("download");
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [status, setStatus] = useState([]);
  const [report, setReport] = useState([]);
  const [filteredGrievances, setFilteredGrievances] = useState([]);
  const token = localStorage.getItem("token");
  const code = localStorage.getItem("code");
  const navigate = useNavigate();
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [istransferModal, setIstransferModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const [selected, setSelected] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedPrior, setSelectedPrior] = useState(null);
  const [grievanceImages, setGrievanceImages] = useState({});
  const [statusColors, setStatusColors] = useState({});

  useEffect(() => {
    handlerefresh();
    fetchActiveStatus();
  }, []);

  useEffect(() => {
    dispatch(fetchZone());
    dispatch(fetchWard());
    dispatch(fetchOrigin());
  }, [dispatch]);

  const Zone = useSelector((state) => state.zone);
  const Ward = useSelector((state) => state.ward);
  const Origin = useSelector((state) => state.origin);

  useEffect(() => {
    if (Origin && Origin?.data) {
      const imageMapping = Origin?.data?.reduce((acc, resource) => {
        acc[resource.res_name] = resource.image;
        return acc;
      }, {});
      setGrievanceImages(imageMapping);
    }
  }, [Origin]);

  const handlerefresh = () => {
    axios
      .get(`${API}/new-grievance/${endpoint}?assign_user=${code}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const responseData = decryptData(response.data.data);
        setReport(responseData);

        const filteredCenters = responseData.filter((grievances) =>
          Object.values(grievances).some((value) =>
            value.toString().toLowerCase().includes(searchValue.toLowerCase())
          )
        );

        setFilteredGrievances(filteredCenters);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const filteredCenters = report.filter((grievances) =>
      Object.values(grievances).some((value) =>
        value.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    );

    setFilteredGrievances(filteredCenters);
  }, [searchValue]);

  useEffect(() => {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    setCurrentItems(filteredGrievances.slice(firstIndex, lastIndex));
    setTotalPages(Math.ceil(filteredGrievances.length / itemsPerPage));
  }, [filteredGrievances, currentPage, itemsPerPage]);

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

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleDateRangeChange = (range) => {
    const startDate = range[0].startDate;
    const endDate = range[0].endDate;
    const filteredCenters = report.filter((grievances) => {
      const createdAt = new Date(grievances.createdAt);
      return createdAt >= startDate && createdAt < addDays(endDate, 1);
    });

    setFilteredGrievances(filteredCenters);
    toast.success("Grievance filtered");
  };
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const handleComplaintTypeClick = (Type) => {
    setSelected(Type);
    setSelectedStatus(null);
    setSelectedPrior(null);
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
  const handleZone = (zone) => {
    if (zone === "All") {
      setSelectedZone(null);
    } else {
      setSelectedZone(zone);
    }
    paginate(1);
  };
  const handleWard = (ward) => {
    if (ward === "All") {
      setSelectedWard(null);
    } else {
      setSelectedWard(ward);
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

  const currentItemsOnPage = filteredGrievances
    .slice()
    .reverse()
    .filter((report) => {
      const complaintTypeMatch = selected === "All" ? true : "";
      const statusMatch =
        selectedStatus === null ? true : report.status === selectedStatus;
      const priorityMatch =
        selectedPrior === null ? true : report.priority === selectedPrior;
      const zoneMatch =
        selectedZone === null ? true : report.zone_name === selectedZone;
      const wardMatch =
        selectedWard === null ? true : report.ward_name === selectedWard;

      return (
        complaintTypeMatch &&
        statusMatch &&
        priorityMatch &&
        zoneMatch &&
        wardMatch
      );
    })
    .slice(firstIndex, lastIndex);

  const setDocs = (event) => {
    setSelectedDoc(event.target.value);
  };

  const exportData = async (format) => {
    if (format === "csv") {
      // CSV Export
      const exportedData = filteredGrievances.map((row) => ({
        grievance_id: row.grievance_id,
        grievance_mode: row.grievance_mode,
        complaint_type_title: row.complaint_type_title,
        dept_name: row.dept_name,
        zone_name: row.zone_name,
        ward_name: row.ward_name,
        street_name: row.street_name,
        pincode: row.pincode,
        complaint: row.complaint,

        public_user_id: row.public_user_id,
        public_user_name: row.public_user_name,
        phone: row.phone,
        assign_user: row.assign_user,
        assign_username: row.assign_username,
        assign_userphone: row.assign_userphone,
        status: row.status,
        escalation_level: row.escalation_level,

        priority: row.priority,
      }));

      const csvData = [
        Object.keys(exportedData[0]).join(","),
        ...exportedData.map((row) => Object.values(row).join(",")),
      ].join("\n");

      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "Grievance_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === "pdf") {
      try {
        const rowsPerPage = 30;
        const totalPages = Math.ceil(filteredGrievances.length / rowsPerPage);

        const pdf = new jsPDF("l", "mm", "a4");
        let yOffset = 0;

        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
          const startIndex = (currentPage - 1) * rowsPerPage;
          const endIndex = Math.min(
            startIndex + rowsPerPage,
            filteredGrievances.length
          );
          const currentPageData = filteredGrievances.slice(
            startIndex,
            endIndex
          );

          const tableData = currentPageData.map((row) => [
            row.grievance_id,
            row.grievance_mode,
            row.complaint_type_title,
            row.dept_name,

            row.pincode,
            row.complaint,

            row.public_user_name,
            row.phone,

            row.assign_username,
            row.assign_userphone,
            row.status,
            row.escalation_level,

            row.priority,
          ]);

          pdf.text(`Page ${currentPage}`, 10, yOffset + 10);
          pdf.autoTable({
            startY: yOffset + 15,
            head: [
              [
                "grievance_id",
                "grievance_mode",
                "complaintType",
                "dept",
                "pincode",
                "complaint",
                "publicUser",
                "phone",
                "assignUser",
                "assignUserphone",
                "status",
                "Escalation",
                "Priority",
              ],
            ],
            body: tableData,
            theme: "striped",
          });

          if (currentPage < totalPages) {
            pdf.addPage();
            yOffset = 10; // Set yOffset for the new page
          }
        }

        pdf.save("Grievance_data.pdf");
      } catch (error) {
        console.error("Error exporting data:", error);
      }
    }
  };

  const handleItemsPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handleCheckboxChange = (userId) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(userId)
        ? prevSelectedRows.filter((id) => id !== userId)
        : [...prevSelectedRows, userId]
    );
  };

  const toggleTModal = () => {
    setIstransferModal(!istransferModal);
    setSelectedRows([]);
  };

  return (
    <>
      <div className="">
        <div className="  font-lexend h-screen ">
          <div className="flex flex-row  gap-3 p-2 mt-1 mx-4 flex-wrap md:justify-between items-center ">
            <div className="flex gap-3">
              <DateRangeComp onChange={handleDateRangeChange} />
              <div className="flex items-center gap-3">
                <label
                  htmlFor="itemsPerPage"
                  className="font-medium text-gray-600"
                >
                  Page Entries
                </label>
                <select
                  id="itemsPerPage"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className=" p-1 outline-none text-sm rounded px-2"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
            <div className="flex flex-row flex-wrap gap-1.5">
              <SearchInput
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search Grievances"
              />

              {hasDownloadPermission && (
                <DocumentDownload
                  selectedDoc={selectedDoc}
                  onChange={setDocs}
                  exportData={exportData}
                />
              )}
            </div>
          </div>
          <div
            className={`bg-white  mx-4 rounded-lg mt-1  p-3 ${
              report.length < 8 ? "h-4/5" : "h-fit"
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-center md:gap-6 gap-2 md:mt-2 mx-3">
              <div className="flex flex-wrap gap-3">
                <p className="text-lg  whitespace-nowrap">View Report</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <div className="flex gap-2 flex-wrap">
                  <select
                    className="block w-full  px-1 py-2 text-center  text-sm bg-primary text-white  border border-none rounded-full  hover:border-gray-200 outline-none capitalize shadow-lg"
                    onChange={(e) => handleZone(e.target.value)}
                    value={selectedZone || ""}
                  >
                    <option hidden>Zone</option>
                    <option value="All">All</option>
                    {Zone &&
                      Zone?.data?.map((option, index) => (
                        <option key={index} value={option.zone_name}>
                          {option.zone_name}
                        </option>
                      ))}
                  </select>
                </div>
                {/* <div className="flex gap-2 flex-wrap">
                  <select
                    className="block w-full  px-1 py-2 text-center  text-sm bg-primary text-white  border border-none rounded-full  hover:border-gray-200 outline-none capitalize shadow-lg"
                    onChange={(e) => handleWard(e.target.value)}
                    value={selectedWard || ""}
                  >
                    <option hidden>Ward</option>
                    <option value="All">All</option>
                    {Ward &&
                      Ward.data.map((option, index) => (
                        <option key={index} value={option.ward_name}>
                          {option.ward_name}
                        </option>
                      ))}
                  </select>
                </div> */}
                <SearchableDropdown Ward={Ward} handleWard={handleWard} />

                <div className="flex gap-2 flex-wrap">
                  <select
                    className="block w-full  px-1 py-2 text-center  text-sm bg-primary text-white  border border-none rounded-full  hover:border-gray-200 outline-none capitalize shadow-lg"
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
                    className="block w-full  px-1 py-2 text-center  text-sm bg-primary text-white  border border-none rounded-full  hover:border-gray-200 outline-none capitalize shadow-lg"
                    onChange={(e) => handleStatus(e.target.value)}
                    value={selectedStatus || ""}
                  >
                    <option hidden>Status</option>
                    <option value="All">All</option>
                    {status &&
                      status.map((option, index) => (
                        <option key={index} value={option.status_name}>
                          {option.status_name}
                        </option>
                      ))}
                  </select>
                </div>
                <button
                  className={`w-20 py-1.5 ${
                    selected === "All"
                      ? "bg-primary text-white"
                      : "bg-white text-black"
                  } rounded-full shadow-lg`}
                  onClick={() => handleComplaintTypeClick("All")}
                >
                  All
                </button>
              </div>
            </div>
            {include == "yes" && (
              <div className="my-2 mx-3 flex flex-wrap gap-2 ">
                <button
                  className="bg-blue-300 shadow-md px-3 py-1 rounded-full text-white text-sm"
                  onClick={() => setIstransferModal(true)}
                >
                  Multi-Transfer
                </button>
              </div>
            )}
            <div className=" rounded-lg  py-3 overflow-x-auto ">
              <table className="w-full mt-2 ">
                <thead className=" border-b border-gray-300  ">
                  <tr className="">
                    {include === "yes" && (
                      <th className="">
                        <p className=" mx-3 my-2 font-lexend text-center font-semibold whitespace-nowrap">
                          <AiOutlineThunderbolt className="text-xl text-center text-primary" />
                        </p>
                      </th>
                    )}
                    <th className="">
                      <p className=" mx-6 my-2 font-lexend  font-medium whitespace-nowrap">
                        #
                      </p>
                    </th>
                    <th>
                      <p className="mx-1.5 my-2 text-start font-lexend font-medium  whitespace-nowrap">
                        Complaint No
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center justify-center mx-2 my-2 font-lexend font-medium  whitespace-nowrap">
                        Origin
                      </p>
                    </th>
                    <th>
                      <p className="mx-1.5 my-2 text-start font-lexend font-medium  whitespace-nowrap">
                        Complaint
                      </p>
                    </th>
                    <th>
                      <p className="mx-1.5 my-2 text-start font-lexend font-medium  whitespace-nowrap">
                        Ward
                      </p>
                    </th>
                    <th>
                      <p className="mx-1.5 my-2 text-center font-lexend font-medium  whitespace-nowrap">
                        Street
                      </p>
                    </th>

                    <th>
                      <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                        Raised by
                      </p>
                    </th>
                    <th>
                      <p className="mx-1.5 my-2 text-start font-lexend font-medium  whitespace-nowrap">
                        Phone
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                        Date and Time
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center justify-center mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                        Priority
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center justify-center mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                        Status
                      </p>
                    </th>
                    <th>
                      <p className="mx-1.5 my-2 text-start font-lexend font-medium  whitespace-nowrap">
                        Action
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItemsOnPage.map((report, index) => (
                    <tr className=" border-b border-gray-300  " key={index}>
                      {include === "yes" && (
                        <td className=" flex gap-2 items-center justify-center ">
                          <div className="flex items-center ">
                            <input
                              type="checkbox"
                              className="w-4 h-4 mt-4  text-dark bg-gray-800 border-gray-800 rounded"
                              checked={selectedRows.includes(
                                report.grievance_id
                              )}
                              onChange={() =>
                                handleCheckboxChange(report.grievance_id)
                              }
                            />
                            <label
                              className="sr-only"
                              htmlFor="checkbox-table-search-1"
                            >
                              checkbox
                            </label>
                          </div>
                        </td>
                      )}
                      <td className="">
                        <div className="text-center text-sm mx-3 my-2 font-lexend whitespace-nowrap text-gray-700 flex items-center justify-center">
                          {firstIndex + index + 1 < 10
                            ? `0${firstIndex + index + 1}`
                            : firstIndex + index + 1}
                          {report?.escalation_notify &&
                            report?.escalation_notify_read === "no" && (
                              <span
                                className="ml-2 w-3 h-3 bg-red-600 rounded-full"
                              ></span>
                            )}
                        </div>
                      </td>

                      <td>
                        <p
                          className="border-2 w-28 border-slate-900 rounded-lg text-center py-1 my-1 capitalize text-slate-900 "
                          onClick={() =>
                            navigate(
                              `/view3?grievanceId=${report.grievance_id}`
                            )
                          }
                        >
                          {report.grievance_id}
                        </p>
                      </td>
                      <td className="flex gap-1 items-center justify-center text-gray-700">
                        <img
                          src={grievanceImages[report.grievance_mode] || logo}
                          alt={report.grievance_mode}
                          className="w-6 h-6 mx-1.5 my-2 rounded-full"
                        />
                        {/* <p className="capitalize text-sm">{report.grievance_mode}</p> */}
                      </td>
                      <td>
                        {" "}
                        <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalizetext-gray-700">
                          {report.complaint}
                        </p>
                      </td>
                      <td>
                        {" "}
                        <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalizetext-gray-700">
                          {report.ward_name}
                        </p>
                      </td>
                      <td>
                        {" "}
                        <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalizetext-gray-700">
                          {report.street_name}
                        </p>
                      </td>
                      <td>
                        {" "}
                        <p className=" text-start ml-4 my-2 font-lexend whitespace-nowrap text-sm capitalizetext-gray-700">
                          {report.public_user_name}
                        </p>
                      </td>
                      <td>
                        {" "}
                        <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalizetext-gray-700">
                          {report.phone}
                        </p>
                      </td>
                      <td>
                        <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalizetext-gray-700">
                          {formatDate1(report.createdAt)}
                        </p>
                      </td>

                      <td>
                        <p
                          className={`border-2 w-28 rounded-full text-center py-1.5 mx-2 text-sm font-medium capitalize  ${
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
                      <td className="flex justify-center relative group">
                        <IoIosEye
                          className="text-xl"
                          onClick={() =>
                            navigate(
                              `/view3?grievanceId=${report.grievance_id}`
                            )
                          }
                        />
                        <span className="tooltip hidden group-hover:block absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-400 text-white text-xs rounded py-1 px-2">
                          View
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className=" mt-1 mb-5 mx-7">
            <Pagination
              Length={filteredGrievances.length}
              currentPage={currentPage}
              totalPages={totalPages}
              firstIndex={firstIndex}
              lastIndex={lastIndex}
              paginate={paginate}
              hasNextPage={lastIndex >= filteredGrievances.length}
            />
          </div>
        </div>
      </div>
      {istransferModal && (
        <ManyTicketTransfer
          toggleTModal={toggleTModal}
          selectedRows={selectedRows}
          handlerefresh={handlerefresh}
        />
      )}
    </>
  );
};

export default RequestJE;
