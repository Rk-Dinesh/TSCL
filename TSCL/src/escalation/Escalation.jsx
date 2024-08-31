import React, { Fragment, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import { API, formatDate } from "../Host";
import axios from "axios";
import { toast } from "react-toastify";
import decryptData from "../Decrypt";


import { PiFileCsvLight } from "react-icons/pi";
import { PiFilePdfDuotone } from "react-icons/pi";
import { HiOutlineDocument } from "react-icons/hi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";

const csvData = `org_name,status,created_by_user
organization,active,admin`;

const Escalation = ({ permissions }) => {
  const hasCreatePermission = permissions?.includes("create");
  const hasEditPermission = permissions?.includes("edit");
  const hasDeletePermission = permissions?.includes("delete");

  
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  const [organization, setOrganization] = useState([]);
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  const dept = sessionStorage.getItem("dept");
  const [selectedDoc, setSelectedDoc] = useState(null);

  const navigate = useNavigate();



  useEffect(() => {
    handlerefresh();
  }, [searchValue, currentPage]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handlerefresh = () => {
    axios
      .get(`${API}/grievance-escalation/getbydeptrole?escalation_department=${dept}&escalation_to=${role}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const reponseData = decryptData(response.data.data);
        setOrganization(reponseData);

        const filteredCenters = reponseData.filter((org) =>
          Object.values(org).some((value) =>
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
  };


  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredCenters = organization.filter((org) =>
    Object.values(org).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const currentItemsOnPage = filteredCenters
    .slice()
    .reverse()
    .slice(firstIndex, lastIndex);

 
  const setDocs = (event) => {
    setSelectedDoc(event.target.value);
  };

  const exportData = async (format) => {
    if (format === "csv") {
      // CSV Export
      const exportedData = organization.map((row) => ({
        grievance_id: row.grievance_id,
        escalation_details: row.escalation_details,
        escalation_level: row.escalation_level,
        escalation_to: row.escalation_to,
        status: row.status,
        updatedAt: row.updatedAt,
        created_at: row.created_at,
      }));

      const csvData = [
        Object.keys(exportedData[0]).join(","),
        ...exportedData.map((row) => Object.values(row).join(",")),
      ].join("\n");

      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "Escalation_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === "pdf") {
      try {
        const rowsPerPage = 30;
        const totalPages = Math.ceil(organization.length / rowsPerPage);

        const pdf = new jsPDF("l", "mm", "a4");
        let yOffset = 0;

        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
          const startIndex = (currentPage - 1) * rowsPerPage;
          const endIndex = Math.min(
            startIndex + rowsPerPage,
            organization.length
          );
          const currentPageData = organization.slice(startIndex, endIndex);

          const tableData = currentPageData.map((row) => [
            row.grievance_id,
            row.escalation_details,
            row.escalation_level,
            row.escalation_to,
            row.status,
            row.updatedAt,
            row.created_at,
          ]);

          pdf.text(`Page ${currentPage}`, 10, yOffset + 10);
          pdf.autoTable({
            startY: yOffset + 15,
            head: [["grievance_id", "escalation_details", "escalation_level", "escalation_to","status","updatedAt","created_at"]],
            body: tableData,
            theme: "striped",
          });

          if (currentPage < totalPages) {
            pdf.addPage();
            yOffset = 10; // Set yOffset for the new page
          }
        }

        pdf.save("Escalation_data.pdf");
      } catch (error) {
        console.error("Error exporting data:", error);
      }
    }
  };

  const handleDownload = () => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bulkupload_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Fragment>
      <div className="  bg-blue-100 overflow-y-auto no-scrollbar">
        <div className="h-screen ">
          <div className="flex flex-row  gap-1 justify-between items-center my-7 mx-8 flex-wrap">
            <h1 className="md:text-xl text-lg font-medium whitespace-nowrap">
              {" "}
              Escalation
            </h1>
            <div className="flex flex-row items-center gap-2">
              <div className="flex  items-center gap-3 bg-white py-2 px-3 rounded-full">
                <IoMdSearch className="text-xl" />
                <input
                  type="search"
                  className="outline-none bg-transparent text-base"
                  placeholder="Search Escalation"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <form>
                <select
                  className="block w-full py-2 px-2  text-sm border-2 text-gray-400  border-gray-300 rounded-full bg-gray-50 outline-none"
                  onChange={setDocs}
                >
                  <option hidden>Download</option>

                  <option value="csv">CSV</option>
                  <option value="pdf">PDF</option>
                </select>
              </form>
              {selectedDoc === null && (
                <HiOutlineDocument className="text-2xl text-gray-500" />
              )}
              {selectedDoc === "csv" && (
                <PiFileCsvLight
                  className="text-3xl text-gray-500"
                  onClick={() => exportData("csv")}
                />
              )}
              {selectedDoc === "pdf" && (
                <PiFilePdfDuotone
                  className="text-3xl text-gray-500"
                  onClick={() => exportData("pdf")}
                />
              )}
            </div>
          </div>

          <div className="bg-white mx-4 rounded-lg my-3  h-3/5 ">
            <div className="overflow-x-auto no-scrollbar my-3">
              <table className="w-full  ">
                <thead className=" border-b-2 border-gray-300">
                  <tr className="border-b-2 border-gray-300">
                    <th className="py-2">
                      <p className=" mx-6 my-2 font-lexend font-semibold whitespace-nowrap">
                        #
                      </p>
                    </th>
                    <th className="">
                      <p className="flex gap-2 items-center mx-1.5 my-2 font-lexend justify-start font-semibold whitespace-nowrap">
                        Complaint No <RiExpandUpDownLine />
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap">
                       Department <RiExpandUpDownLine />
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap">
                       Complaint <RiExpandUpDownLine />
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center mx-1.5  my-2 font-lexend justify-center font-semibold whitespace-nowrap">
                      Date <RiExpandUpDownLine />
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap">
                        Over Due <RiExpandUpDownLine />
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap">
                        Escalated User <RiExpandUpDownLine />
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap">
                       Escalation Level <RiExpandUpDownLine />
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap">
                      Status <RiExpandUpDownLine />
                      </p>
                    </th>
                    <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                      Action
                    </p>
                  </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItemsOnPage.map((escalate, index) => (
                    <tr className="border-b-2 border-gray-300" key={index}>
                      <td className="">
                        <div className="items-center mx-6 my-2 font-lexend whitespace-nowrap text-sm text-center">
                          {firstIndex + index + 1 < 10
                            ? `0${firstIndex + index + 1}`
                            : firstIndex + index + 1}
                        </div>
                      </td>
                      <td>
                      <p className="border-2 w-28 border-slate-900 rounded-lg text-center py-1 my-1 capitalize text-slate-900 ">
                        {escalate.grievance_id}
                      </p>
                    </td>
                      <td>
                        <p className="capitalize mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm text-gray-800">
                          {escalate.escalation_department}
                        </p>
                      </td>
                      <td>
                        <p className="capitalize mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm text-gray-800">
                          {escalate.escalation_complaint}
                        </p>
                      </td>
                      <td>
                        <p className="capitalize mx-1.5  my-2  font-lexend text-center whitespace-nowrap text-sm text-gray-800">
                          {formatDate(escalate.updatedAt)}
                        </p>
                      </td>
                      <td>
                        <p className="capitalize mx-1.5  my-2  font-lexend text-center whitespace-nowrap text-sm text-gray-800">
                          {escalate.escalated_due}
                        </p>
                      </td>
                      <td>
                        <p className="capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-800">
                          {escalate.escalated_user}
                        </p>
                      </td>
                    
                      <td>
                        <p className="capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-800">
                          {escalate.escalation_details}
                        </p>
                      </td>
                      <td>
                        <p className="border w-26 rounded-full text-center py-1.5 mx-2 text-sm font-normal capitalize border-gray-800 text-gray-800">
                          {escalate.status}
                        </p>
                      </td>
                      <td>
                      <div
                        className="mx-3 my-3 whitespace-nowrap"
                        onClick={() =>
                          navigate(`/view`, {
                            state: {
                              grievanceId: escalate.grievance_id,
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

          <div className=" my-3 mb-5 mx-7">
            <nav
              className="flex items-center flex-column flex-wrap md:flex-row md:justify-between justify-center pt-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center font-alegerya">
                Showing{" "}
                <span className="text-gray-700">
                  {firstIndex + 1} to {Math.min(lastIndex, organization.length)}
                </span>{" "}
                of{" "}
                <span className="text-gray-900">
                  {organization.length} entries
                </span>
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
     
    </Fragment>
  );
};

export default Escalation;
