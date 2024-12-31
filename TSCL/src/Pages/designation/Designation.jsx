import React, { Fragment, useState, useEffect } from "react";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";
import { API, downloadCSV, formatDate1 } from "../../Host";
import logo from "../../assets/images/logo1.png";
import decryptData from "../../Decrypt";
import DeleteModal from "../Modal/DeleteModal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AddDesgination from "./AddDesignation";
import EditDesgination from "./EditDesignation";
import BulkUploadButton from "../../components/BulkUploadButton";
import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import FileUploadButton from "../../components/FileUploadButton";
import DocumentDownload from "../../components/DocumentDownload";
import HeaderButton from "../../components/HeaderButton";
import API_ENDPOINTS from "../../ApiEndpoints/api/ApiClient";

const csvData = `designation,dept_name,org_name
Designation,Department,Organization`;

const Designation = ({ permissions }) => {
  const hasCreatePermission = permissions?.includes("create");
  const hasEditPermission = permissions?.includes("edit");
  const hasDeletePermission = permissions?.includes("delete");
  const hasDownloadPermission = permissions?.includes("download");

  const [isModal, setIsModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const [desgId, setDesgtId] = useState(null);
  const [ExistingOrganiZations, setExistingOrganiZations] = useState(null);
  const [ExistingDepartments, setExistingDepartments] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const token = localStorage.getItem("token");

  const [file, setFile] = useState(null);
  const [buttonText, setButtonText] = useState("Bulk Upload");
  const [selectedDoc, setSelectedDoc] = useState(null);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const isDropdownOpen = (index) => dropdownOpen === index;

  useEffect(() => {
    handlerefresh();
    fetchExistingOrganiZations();
    fetchExistingDepartments();
  }, [searchValue, currentPage,itemsPerPage]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handlerefresh = () => {
    axios
      .get(API_ENDPOINTS.GET_DESIGNATION.url, {
        headers: API_ENDPOINTS.GET_DESIGNATION.headers,
      })
      .then((response) => {
        const responseData = decryptData(response.data.data);
        setDesignation(responseData);

        const filteredCenters = responseData.filter((desgn) =>
          Object.values(desgn).some((value) =>
            value.toString().toLowerCase().includes(searchValue.toLowerCase())
          )
        );

        setTotalPages(Math.ceil(filteredCenters.length / itemsPerPage));
        const lastIndex = currentPage * itemsPerPage;
        const firstIndex = lastIndex - itemsPerPage;

        setCurrentItems(filteredCenters.slice(firstIndex, lastIndex));
      });
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };
  const toggleEModal = () => {
    setEditModal(!editModal);
    setDesgtId(null);
  };

  const toggleCloseModal = () => {
    setIsModal(!isModal);
  };

  const toggleDeleteCloseModal = () => {
    setIsDeleteModal(!isDeleteModal);
    setdeleteId(null);
  };

  const fetchExistingOrganiZations = async () => {
    try {
      const response = await axios.get(
        API_ENDPOINTS.GET_ORG_DESIGNATIONACTIVE.url,
        {
          headers: API_ENDPOINTS.GET_ORG_DESIGNATIONACTIVE.headers,
        }
      );
      const responseData = decryptData(response.data.data);
      setExistingOrganiZations(responseData);
    } catch (error) {
      console.error("Error fetching existing Organisations:", error);
    }
  };

  const fetchExistingDepartments = async () => {
    try {
      const response = await axios.get(
        API_ENDPOINTS.GET_DEPT_DESIGNATIONACTIVE.url,
        {
          headers: API_ENDPOINTS.GET_DEPT_DESIGNATIONACTIVE.headers,
        }
      );
      const responseData = decryptData(response.data.data);
      setExistingDepartments(responseData);
    } catch (error) {
      console.error("Error fetching existing Departments:", error);
    }
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredCenters = designation.filter((desgn) =>
    Object.values(desgn).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const currentItemsOnPage = filteredCenters
    .slice()
    .reverse()
    .slice(firstIndex, lastIndex);

  const handleDelete = async () => {
    try {
      const DELETE_DESIGNATION = API_ENDPOINTS.DELETE_DESIGNATION(deleteId);
      await axios.delete(DELETE_DESIGNATION.url, {
        headers: DELETE_DESIGNATION.headers,
      });
      toggleDeleteCloseModal();
      handlerefresh();
      setDesignation(
        designation.filter((status) => designation.desgination_id !== deleteId)
      );
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
      formData.append('created_by_user', localStorage.getItem('name'));

      const response = await axios.post(
        API_ENDPOINTS.UPLOAD_DESIGNATION.url,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setButtonText("Bulk Upload");
        setFile(null);
        handlerefresh();
        toast.success("Data Uploaded Successfully");
      } else {
        toast.error("Data failed to Upload");
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
      const exportedData = designation.map((row) => ({
        desgination_id: row.desgination_id,
        designation: row.designation,
        dept_name: row.dept_name,
        org_name: row.org_name,
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
      link.setAttribute("download", "Designation_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === "pdf") {
      try {
        const rowsPerPage = 30;
        const totalPages = Math.ceil(designation.length / rowsPerPage);

        const pdf = new jsPDF("l", "mm", "a4");
        let yOffset = 0;

        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
          const startIndex = (currentPage - 1) * rowsPerPage;
          const endIndex = Math.min(
            startIndex + rowsPerPage,
            designation.length
          );
          const currentPageData = designation.slice(startIndex, endIndex);

          const tableData = currentPageData.map((row) => [
            row.desgination_id,
            row.designation,
            row.dept_name,
            row.org_name,
            row.status,
            row.created_by_user,
          ]);

          pdf.text(`Page ${currentPage}`, 10, yOffset + 10);
          pdf.autoTable({
            startY: yOffset + 15,
            head: [
              [
                "Designation ID",
                "Designation",
                "DeptName",
                "OrgName",
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

        pdf.save("Designation_data.pdf");
      } catch (error) {
        console.error("Error exporting data:", error);
      }
    }
  };

  const handleDownload = () => {
    downloadCSV(csvData);
  };

  const handleItemsPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <Fragment>
      <div className="  bg-blue-100 overflow-y-auto no-scrollbar">
        <div className="h-screen">
          <div className="flex flex-row items-center md:justify-end gap-3 p-2 mt-2 mx-8 flex-wrap">
            <SearchInput
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search Designation"
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
            title="Designation"
            hasCreatePermission={hasCreatePermission}
            onClick={() => setIsModal(true)}
          />

          <div className={`bg-white  mx-4 rounded-lg overflow-x-auto mt-1  p-3 ${
              designation.length < 5 ? "h-3/5" : "h-fit"
            }`}>
          <div className="flex items-center gap-3 mx-3">
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
            <table className="w-full  mt-3">
              <thead className="">
                <tr className="border-b-2 border-gray-300">
                  <th className="py-2">
                    <p className=" mx-6 my-2 font-lexend font-semibold whitespace-nowrap">
                      #
                    </p>
                  </th>
                  <th className="">
                    <p className="flex gap-2 items-center mx-3 my-2 font-lexend justify-start font-semibold whitespace-nowrap">
                      Designation <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th className="">
                    <p className="flex gap-2 items-center mx-3 my-2 font-lexend justify-start font-semibold whitespace-nowrap">
                      Department Name <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th className="">
                    <p className="flex gap-2 items-center mx-1.5 my-2 font-lexend justify-start font-semibold whitespace-nowrap">
                      Org Name <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold  whitespace-nowrap">
                      Status <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap">
                      CreatedBy <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap">
                      CreatedAt <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="text-center mx-1.5 my-3 font-semibold font-lexend  whitespace-nowrap">
                      Action
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItemsOnPage.map((desgn, index) => (
                  <tr className="border-b-2 border-gray-300" key={index}>
                    <td className="">
                      <div className="items-center mx-6 my-2 font-lexend whitespace-nowrap text-sm text-center text-gray-800">
                        {firstIndex + index + 1 < 10
                          ? `0${firstIndex + index + 1}`
                          : firstIndex + index + 1}
                      </div>
                    </td>
                    <td className="">
                      <p className="capitalize mx-3 my-2 font-lexend text-start whitespace-nowrap text-sm text-gray-800">
                        {desgn.designation}
                      </p>
                    </td>
                    <td>
                      <div className="flex  gap-2 items-center justify-start mx-3 my-3  text-sm text-gray-800">
                        <img src={logo} alt="logo" className="w-8 h-8" />
                        <p className="font-lexend whitespace-nowrap capitalize   text-gray-800">
                          {" "}
                          {desgn.dept_name}
                        </p>
                      </div>
                    </td>
                    <td className="">
                      <p className="capitalize mx-3 my-2 font-lexend text-start whitespace-nowrap text-sm text-gray-800">
                        {desgn.org_name}
                      </p>
                    </td>
                    <td>
                      <p className="capitalize mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm text-gray-800">
                        {desgn.status}
                      </p>
                    </td>
                    <td>
                      <p className="capitalize mx-1.5  my-2  font-lexend text-start whitespace-nowrap text-sm text-gray-800">
                        {desgn.created_by_user}
                      </p>
                    </td>
                    <td>
                      <p className="capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-800 ">
                        {formatDate1(desgn.createdAt)}
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
                                  setDesgtId(desgn.desgination_id);
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
                                  setdeleteId(desgn.desgination_id);
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
          <div className=" my-2 mb-5 mx-7">
            <BulkUploadButton handleDownload={handleDownload} />
            <Pagination
              Length={designation.length}
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
        <AddDesgination
          toggleModal={toggleModal}
          toggleCloseModal={toggleCloseModal}
          ExistingOrganiZations={ExistingOrganiZations}
          ExistingDepartments={ExistingDepartments}
          handlerefresh={handlerefresh}
        />
      )}
      {editModal && (
        <EditDesgination
          toggleModal={toggleEModal}
          handlerefresh={handlerefresh}
          ExistingOrganiZations={ExistingOrganiZations}
          ExistingDepartments={ExistingDepartments}
          desgId={desgId}
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

export default Designation;
