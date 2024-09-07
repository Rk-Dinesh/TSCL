import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiExpandUpDownLine } from "react-icons/ri";
import { API,formatDate1 } from "../../Host";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import decryptData from "../../Decrypt";
import Pagination from "../../components/Pagination";
import HeaderButton from "../../components/HeaderButton";

const Request = ({ permissions }) => {
  const hasCreatePermission = permissions?.includes('create');
  const hasEditPermission = permissions?.includes('edit');
  const hasDeletePermission = permissions?.includes('delete');

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [report, setReport] = useState([]);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [complainttype, setComplainttype] = useState([]);
  const [Showing, setShowing] = useState([])
  const [selectedComplaintType, setSelectedComplaintType] = useState("All");
  const [statusColors, setStatusColors] = useState({});
  const [status, setStatus] = useState([])

  useEffect(() => {
    const fetchgrievance = async () => {
      try {
        const response = await axios.get(`${API}/new-grievance/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
      } catch (error) {}
    };

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
   
    fetchgrievance();
    fetchComplaintType();
    fetchActiveStatus()
  }, [searchValue, currentPage,selectedComplaintType]);

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

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredCenters = report.filter((report) =>
    Object.values(report).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const currentItemsOnPage = filteredCenters.slice().reverse()
  .filter((report) =>
    selectedComplaintType === "All"
      ? true
      : report.complaint_type_title === selectedComplaintType
  )
  .slice(firstIndex, lastIndex);
  

  const handleComplaintTypeClick = (complaintType) => {
    setSelectedComplaintType(complaintType);
    paginate(1)
  };

  const handleform = () => {
    navigate("/form");
  };



  return (
    <div className="overflow-y-auto no-scrollbar">
      <div className="  font-lexend h-screen ">
      <HeaderButton
            title="Grievances"
            hasCreatePermission={hasCreatePermission}
            onClick={handleform}
          />
          
        <div className="bg-white h-4/5 mx-3 rounded-lg mt-3  p-3">
          <div className="flex flex-col md:flex-row justify-between items-center md:gap-6 gap-2 md:mt-2 mx-3">
            <div className="flex flex-wrap gap-3">
              <p className="text-lg  whitespace-nowrap">View Report</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {complainttype.map((type, index) => (
                <div key={index}>
                  <button
                    className={`px-2 py-1.5 capitalize ${
                      selectedComplaintType === type.complaint_type
                        ? "bg-primary text-white"
                        : "bg-blue-100 text-primary"
                    } rounded-full`}
                    onClick={() =>
                      handleComplaintTypeClick(type.complaint_type)
                    }
                  >
                    {type.complaint_type}
                  </button>
                </div>
              ))}
              <button
                className={`w-20 py-1.5 ${
                  selectedComplaintType === "All"
                    ? "bg-primary text-white"
                    : "bg-blue-100 text-primary"
                } rounded-full`}
                onClick={() => handleComplaintTypeClick("All")}
              >
                All
              </button>
            </div>
          </div>
          <div className=" rounded-lg  py-3 overflow-x-auto no-scrollbar">
            <table className="w-full mt-2 ">
              <thead className=" border-b border-gray-300  ">
                <tr className="">
                  <th className="">
                    <p className=" mx-3 my-2 font-lexend  font-medium whitespace-nowrap">
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
                      Raised by <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                      Complaint Type <RiExpandUpDownLine />
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
                      Assigned JE <RiExpandUpDownLine />
                    </p>
                  </th>

                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                      Date and Time <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-center mx-2 my-2 font-lexend font-medium  whitespace-nowrap">
                      Priority <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-center mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                      Status <RiExpandUpDownLine />
                    </p>
                  </th>
                 
                </tr>
              </thead>
              <tbody>
                {currentItemsOnPage.map((report, index) => (
                  <tr className=" border-b border-gray-300  " key={index}>
                    <td className="">
                      <div className="text-center text-sm mx-3 my-2 font-lexend whitespace-nowrap text-gray-700">
                        {firstIndex + index + 1 < 10
                          ? `0${firstIndex + index + 1}`
                          : firstIndex + index + 1}
                      </div>
                    </td>
                    <td>
                      <p className="border-2 w-28 border-slate-900 rounded-lg text-center py-1 my-1  text-slate-900 " 
                      onClick={() =>
                        navigate(`/view`, {
                          state: { grievanceId: report.grievance_id },
                        })
                      }>
                        {report.grievance_id}
                      </p>
                    </td>
                    <td>
                      {" "}
                      <p className="capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-700">
                        {report.public_user_name}
                      </p>
                    </td>
                    <td>
                      {" "}
                      <p className="capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-700">
                        {report.complaint_type_title}
                      </p>
                    </td>
                    <td>
                      {" "}
                      <p className="capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-700">
                        {report.dept_name}
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
                      <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-700">
                        {formatDate1(report.createdAt)}
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
      
        <div className=" mt-4 mb-5 mx-7">
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

export default Request;
