import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { API, formatDate } from "../../Host";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import decryptData from "../../Decrypt";

const RequestJE = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [report, setReport] = useState([]);
  const token = sessionStorage.getItem("token");
  const code = sessionStorage.getItem("code");
  const navigate = useNavigate();
  const [complainttype, setComplainttype] = useState([]);
  const [selectedComplaintType, setSelectedComplaintType] = useState("All");

  useEffect(() => {
    axios
      .get(`${API}/new-grievance/getbyassign?assign_user=${code}`, {
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

    fetchComplaintType();
  }, [searchValue, currentPage]);

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

  const currentItemsOnPage = filteredCenters.slice(firstIndex, lastIndex);

  const fetchComplaintType = async () => {
    try {
      const response = await axios.get(`${API}/complainttype/getactive`, {
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

  const handleComplaintTypeClick = (complaintType) => {
    setSelectedComplaintType(complaintType);
    const filteredReports = report.filter((report) =>
      complaintType === "All" ? true : report.complaint === complaintType
    );
    setCurrentItems(filteredReports.slice(firstIndex, lastIndex));
  };

  return (
    <div className="overflow-y-auto no-scrollbar">
      <div className="  font-lexend h-screen ">
   
        <div className="bg-white h-4/5 mx-3 rounded-lg mt-6  p-3">
          <div className="flex justify-between items-center gap-6 mt-2 mx-3">
            <div className="flex flex-wrap gap-3">
              <p className="text-lg  whitespace-nowrap">View Report</p>
            </div>
            {/* <div className="flex flex-wrap gap-2">
              {complainttype.map((type, index) => (
                <div key={index}>
                  <button
                    className={`px-2 py-1.5 ${
                      selectedComplaintType === type.complaint_type
                        ? "bg-primary text-white"
                        : "bg-white text-black"
                    } rounded-full`}
                    onClick={() => handleComplaintTypeClick(type.complaint_type)}
                    >
                      {type.complaint_type}
                    </button>
                  </div>
                ))}
                <button
                  className={`px-2 py-1.5 ${
                    selectedComplaintType === "All"
                      ? "bg-primary text-white"
                      : "bg-white text-black"
                  } rounded-full`}
                  onClick={() => handleComplaintTypeClick("All")}
                >
                  All
                </button>
              </div> */}
          </div>
          <div className=" rounded-lg  py-3 overflow-x-auto no-scrollbar">
            <table className="w-full mt-2 ">
              <thead className=" border-b border-gray-300  ">
                <tr className="">
                <th className="">
                  <p className=" mx-6 my-2 font-lexend font-semibold whitespace-nowrap">
                      # 
                    </p>
                  </th>
                  <th>
                    <p className="mx-1.5 my-2 text-start font-lexend  whitespace-nowrap">
                      Complaint No
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend  whitespace-nowrap">
                      Date and Time <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend  whitespace-nowrap">
                      Raised by <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-center mx-1.5 my-2 font-lexend  whitespace-nowrap">
                     Priority
                      <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-center mx-1.5 my-2 font-lexend  whitespace-nowrap">
                      Status <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend  whitespace-nowrap">
                      Action
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
                      <p className="border-2 w-28 border-gray-500 rounded-lg text-center py-1 my-1 capitalize ">
                        {report.grievance_id}
                      </p>
                    </td>
                    <td>
                      <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize">
                        {formatDate(report.createdAt)}
                      </p>
                    </td>
                    <td>
                      {" "}
                      <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize">
                        {report.public_user_name}
                      </p>
                    </td>
                    <td>
                      {" "}
                      <p className=" border w-28 border-gray-500 rounded-full text-center py-1 tex-sm capitalize">
                        {report.priority}
                      </p>
                    </td>
                    <td>
                      {" "}
                      <p className="border w-28 border-gray-500 rounded-full text-center py-1 tex-sm capitalize  ">
                        {report.status}
                      </p>
                    </td>
                    <td>
                      <div
                        className="mx-3 my-3 whitespace-nowrap"
                        onClick={() =>
                          navigate(`/view3`, {
                            state: {
                              grievanceId: report.grievance_id,
                            },
                          })
                        }
                      >
                        <BsThreeDotsVertical />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className=" mt-4 mb-5 mx-7">
          <nav
            className="flex items-center flex-column flex-wrap md:flex-row md:justify-between justify-center "
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center font-alegerya">
              Showing{" "}
              <span className="text-gray-700">
                {firstIndex + 1} to {Math.min(lastIndex, report.length)}
              </span>{" "}
              of <span className="text-gray-900">{report.length} entries</span>
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 font-alegerya">
              <li>
                <button
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-s-lg hover:bg-paginate-bg hover:text-primary-hover"
                >
                  &lt;&lt;
                </button>
              </li>

              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover"
                >
                  Back
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(
                  Math.max(0, currentPage - 2),
                  Math.min(totalPages, currentPage + 1)
                )

                .map((number) => (
                  <li key={number}>
                    <button
                      onClick={() => paginate(number)}
                      className={`flex items-center justify-center px-3 h-8 leading-tight border border-paginate-br hover:text-white hover:bg-primary ${
                        currentPage === number
                          ? "bg-primary text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {number}
                    </button>
                  </li>
                ))}

              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={lastIndex >= filteredCenters.length}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover"
                >
                  Next
                </button>
              </li>

              <li>
                <button
                  onClick={() => paginate(totalPages)}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-e-lg hover:bg-paginate-bg hover:text-primary-hover"
                >
                  &gt;&gt;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default RequestJE;
