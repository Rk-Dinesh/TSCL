import React, { Fragment, useState, useEffect } from "react";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddComplaint from "./AddComplaint";
import {  downloadCSV } from "../../Host";
import axios from "axios";
import decryptData from "../../Decrypt";
import EditComplaint from "./EditComplaint";
import DeleteModal from "../Modal/DeleteModal";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Pagination from "../../components/Pagination";
import BulkUploadButton from "../../components/BulkUploadButton";
import SearchInput from "../../components/SearchInput";
import FileUploadButton from "../../components/FileUploadButton";
import DocumentDownload from "../../components/DocumentDownload";
import HeaderButton from "../../components/HeaderButton";
import API_ENDPOINTS from "../../ApiEndpoints/api/ApiClient";

const csvData = `complaint_type_title,dept_name,tat_type,tat_duration,priority,escalation_type,escalation_l1,role_l1,escalation_l2,role_l2,escalation_l3,role_l3,status,created_by_user
Title,Department,duration,Type,Priority,Type,duration1,role1,duration2,role2,duration3,role3,status,admin
`;

const Complaint = ({ permissions }) => {
  const hasCreatePermission = permissions?.includes("create");
  const hasEditPermission = permissions?.includes("edit");
  const hasDeletePermission = permissions?.includes("delete");
  const hasDownloadPermission = permissions?.includes("download");

  const [isModal, setIsModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const [comptId, setComptId] = useState(null);
  const [ExistingRoles, setExistingRoles] = useState(null);
  const [ExistingDept, setExistingDept] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [complaint, setComplaint] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const [file, setFile] = useState(null);
  const [buttonText, setButtonText] = useState("Bulk Upload");
  const [selectedDoc, setSelectedDoc] = useState(null);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const isDropdownOpen = (index) => dropdownOpen === index;

  useEffect(() => {
    handlerefresh();
    fetchExistingDepts();
    fetchExistingRoles();
  }, [searchValue, currentPage]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handlerefresh = () => {
    axios
      .get(API_ENDPOINTS.GET_COMPLAINT.url, {
        headers: API_ENDPOINTS.GET_COMPLAINT.headers,
      })
      .then((response) => {
        const responseData = decryptData(response.data.data);
        setComplaint(responseData);

        const filteredCenters = responseData.filter((comp) =>
          Object.values(comp).some((value) =>
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

  const fetchExistingRoles = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_ROLE_COMPLAINTACTIVE.url, {
        headers:API_ENDPOINTS.GET_ROLE_COMPLAINTACTIVE.headers,
      });
      const responseData = decryptData(response.data.data);
      setExistingRoles(responseData);
    } catch (error) {
      console.error("Error fetching existing Roles:", error);
    }
  };

  const fetchExistingDepts = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_DEPT_COMPLAINTACTIVE.url, {
        headers: API_ENDPOINTS.GET_DEPT_COMPLAINTACTIVE.headers,
      });
      const responseData = decryptData(response.data.data);
      setExistingDept(responseData);
    } catch (error) {
      console.error("Error fetching existing Department:", error);
    }
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const toggleEModal = () => {
    setEditModal(!editModal);
    setComptId(null);
  };

  const toggleDeleteCloseModal = () => {
    setIsDeleteModal(!isDeleteModal);
    setdeleteId(null);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredCenters = complaint.filter((comp) =>
    Object.values(comp).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const currentItemsOnPage = filteredCenters
    .slice()
    .reverse()
    .slice(firstIndex, lastIndex);

  const handleDelete = async () => {
    try {
      const DELETE_COMPLAINT = API_ENDPOINTS.DELETE_COMPLAINT(deleteId)
      await axios.delete(DELETE_COMPLAINT.url, {
        headers:DELETE_COMPLAINT.headers,
      });
      toggleDeleteCloseModal();
      handlerefresh();
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setButtonText("Upload");
  };

  const handleButtonClick = () => {
    if (buttonText === "Bulk Upload") {
      document.getElementById("fileInput").click();
    } else {
      // Call your API here to upload the file
      uploadFile(file);
    }
  };

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(API_ENDPOINTS.CSV_COMPLAINT.url,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // console.log("File uploaded successfully");
        setButtonText("Bulk Upload");
        setFile(null);
        handlerefresh();
        toast.success("Data Uploaded Successfully");
      } else {
        toast.error("Data failed to Upload");
        //console.log("File upload failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setDocs = (event) => {
    setSelectedDoc(event.target.value);
  };

  const exportData = async (format) => {
    if (format === "csv") {
      // CSV Export
      const exportedData = complaint.map((row) => ({
        complaint_id: row.complaint_id,
        complaint_type_title: row.complaint_type_title,
        dept_name: row.dept_name,
        tat_type: row.tat_type,
        tat_duration: row.tat_duration,
        priority: row.priority,
        escalation_type: row.escalation_type,
        escalation_l1: row.escalation_l1,
        role_l1: row.role_l1,
        escalation_l2: row.escalation_l2,
        role_l2: row.role_l2,
        escalation_l3: row.escalation_l3,
        role_l3: row.role_l3,
        status: row.status,
        created_by_user: row.created_by_user,
      }));

      const csvData = [
        Object.keys(exportedData[0]).join(","),
        ...exportedData.map((row) => Object.values(row).join(",")),
      ].join("\n");

      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "Complaint_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === "pdf") {
      try {
        const rowsPerPage = 30;
        const totalPages = Math.ceil(complaint.length / rowsPerPage);

        const pdf = new jsPDF("l", "mm", "a4");
        let yOffset = 0;

        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
          const startIndex = (currentPage - 1) * rowsPerPage;
          const endIndex = Math.min(startIndex + rowsPerPage, complaint.length);
          const currentPageData = complaint.slice(startIndex, endIndex);

          const tableData = currentPageData.map((row) => [
            row.complaint_id,
            row.complaint_type_title,
            row.dept_name,
            row.tat_type,
            row.tat_duration,
            row.priority,
            row.escalation_type,
            row.escalation_l1,
            row.role_l1,
            row.escalation_l2,
            row.role_l2,
            row.escalation_l3,
            row.role_l3,
            row.status,
            row.created_by_user,
          ]);

          pdf.text(`Page ${currentPage}`, 10, yOffset + 10);
          pdf.autoTable({
            startY: yOffset + 15,
            head: [
              [
                "complaint_id",
                "complaint_type_title",
                "dept_name",
                "tat_type",
                "tat_duration",
                "priority",
                "escalation_type",
                "escalation_l1",
                "role_l1",
                "escalation_l2",
                "role_l2",
                "escalation_l3",
                "role_l3",
                "Status",
                "createdBy",
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

        pdf.save("Complaint_data.pdf");
      } catch (error) {
        console.error("Error exporting data:", error);
      }
    }
  };

  const handleDownload = () => {
    downloadCSV(csvData);
  };

  return (
    <Fragment>
      <div className="  bg-blue-100 overflow-y-auto no-scrollbar">
        <div className="h-screen">
          <div className="flex flex-row items-center md:justify-end gap-3 p-2 mt-3 mx-8 flex-wrap">
            <SearchInput
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search Complaint"
            />
            {hasCreatePermission && (
              <FileUploadButton
                onChange={handleFileChange}
                buttonText={buttonText}
                accept=".csv"
                onClick={handleButtonClick}
              />
            )}
            {hasDownloadPermission && (
              <DocumentDownload
                selectedDoc={selectedDoc}
                onChange={setDocs}
                exportData={exportData}
              />
            )}
          </div>
          <HeaderButton
            title="Complaint"
            hasCreatePermission={hasCreatePermission}
            onClick={() => setIsModal(true)}
          />
          <div className="bg-white mx-4 rounded-lg my-3 overflow-x-auto h-3/5 no-scrollbar">
            <table className="w-full  ">
              <thead>
                <tr className="border-b-2 border-gray-300 py-1">
                  <th className="py-2">
                    <p className=" mx-6 my-2 font-lexend font-semibold whitespace-nowrap">
                      #
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                      Complaint <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                      Department
                      <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                      TAT Type
                      <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                      Duration
                      <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                      Priority
                      <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                      Escalation-1
                      <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                      Escalation-2
                      <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                      Escalation-3
                      <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                      Status
                      <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                      CreatedBy
                      <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="mx-3 my-3 text-center font-lexend font-semibold whitespace-nowrap">
                      Action
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItemsOnPage.map((complaints, index) => (
                  <tr className="border-b-2 border-gray-300" key={index}>
                    <td>
                      <p className="text-center text-sm mx-3 my-2 font-lexend whitespace-nowrap text-gray-700">
                        {" "}
                        {firstIndex + index + 1 < 10
                          ? `0${firstIndex + index + 1}`
                          : firstIndex + index + 1}
                      </p>
                    </td>
                    <td>
                      <p className="mx-1.5  my-2 font-lexend whitespace-nowrap text-start text-sm capitalize text-gray-700">
                        {complaints.complaint_type_title}
                      </p>
                    </td>
                    <td>
                      <p className="mx-1.5  my-2  font-lexend whitespace-nowrap text-start text-sm capitalize text-gray-700">
                        {complaints.dept_name}
                      </p>
                    </td>
                    <td>
                      <p className="mx-1.5  my-2  font-lexend whitespace-nowrap text-start text-sm capitalize text-gray-700">
                        {complaints.tat_type}
                      </p>
                    </td>
                    <td>
                      <p className=" mx-1.5  my-2 font-lexend whitespace-nowrap text-start text-sm capitalize text-gray-700">
                        {complaints.tat_duration}
                      </p>
                    </td>
                    <td>
                      <p className="mx-1.5  my-2 font-lexend whitespace-nowrap text-start text-sm capitalize text-gray-700">
                        {complaints.priority}
                      </p>
                    </td>
                    <td>
                      <div className="mx-1.5 my-3 flex gap-3 items-center justify-start text-sm font-lexend">
                        <p className=" whitespace-nowrap  bg-gray-100 px-2 py-1 rounded-full capitalize text-gray-700">
                          {complaints.escalation_l1}
                        </p>
                        <p className="  whitespace-nowrap text-start text-sm capitalize  text-gray-700">
                          {complaints.role_l1}
                        </p>
                      </div>
                    </td>

                    <td>
                      <div className="mx-1.5 my-3 flex gap-3 items-center justify-start  font-lexend">
                        <p className=" whitespace-nowrap bg-gray-100 px-2 py-1 rounded-full text-start text-sm capitalize text-gray-700">
                          {complaints && complaints.escalation_l2
                            ? complaints.escalation_l2
                            : "---"}
                        </p>
                        <p className=" whitespace-nowrap text-sm capitalize text-gray-700">
                          {complaints && complaints.role_l2
                            ? complaints.role_l2
                            : "---"}
                        </p>
                      </div>
                    </td>

                    <td>
                      <div className="mx-1.5 my-3 flex gap-3 items-center justify-start  font-lexend">
                        <p className=" whitespace-nowrap bg-gray-100 px-2 py-1 rounded-full text-start text-sm capitalize text-gray-700">
                          {complaints && complaints.escalation_l3
                            ? complaints.escalation_l3
                            : "---"}
                        </p>
                        <p className=" whitespace-nowrap text-start text-sm capitalize text-gray-700">
                          {complaints && complaints.role_l3
                            ? complaints.role_l3
                            : "---"}
                        </p>
                      </div>
                    </td>

                    <td>
                      <div className="mx-1.5  my-2 font-lexend whitespace-nowrap text-start text-sm capitalize text-gray-700">
                        {complaints.status}
                      </div>
                    </td>
                    <td>
                      <p className="fmx-1.5  my-2 font-lexend whitespace-nowrap text-start text-sm capitalize text-gray-700">
                        {complaints.created_by_user}
                      </p>
                    </td>
                    <td>
                      <div className="flex justify-start mx-1.5 my-3">
                        <BsThreeDotsVertical
                          onClick={() => toggleDropdown(index)}
                        />
                        {isDropdownOpen(index) && (
                          <div className=" bg-white shadow-md rounded-lg ml-1">
                            {hasEditPermission && (
                              <button
                                className="block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left"
                                onClick={() => {
                                  setEditModal(true);
                                  setComptId(complaints.complaint_id);
                                  toggleDropdown();
                                }}
                              >
                                Edit
                              </button>
                            )}
                            {hasDeletePermission && (
                              <button
                                className="block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left"
                                onClick={() => {
                                  setIsDeleteModal(true);
                                  setdeleteId(complaints.complaint_id);
                                  toggleDropdown();
                                }}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" my-3 mb-5 mx-7">
            <BulkUploadButton handleDownload={handleDownload} />
            <Pagination
              Length={complaint.length}
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
      {isModal && (
        <AddComplaint
          toggleModal={toggleModal}
          handlerefresh={handlerefresh}
          ExistingDept={ExistingDept}
          ExistingRoles={ExistingRoles}
        />
      )}
      {editModal && (
        <EditComplaint
          toggleModal={toggleEModal}
          handlerefresh={handlerefresh}
          ExistingDept={ExistingDept}
          ExistingRoles={ExistingRoles}
          comptId={comptId}
        />
      )}
      {isDeleteModal && (
        <DeleteModal
          toggleDeleteModal={toggleDeleteCloseModal}
          delete={handleDelete}
        />
      )}
    </Fragment>
  );
};

export default Complaint;
