import React, { Fragment, useState, useEffect } from "react";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddStreet from "./AddSreet";
import { API, downloadCSV, formatDate } from "../../../Host";
import axios from "axios";
import decryptData from "../../../Decrypt";
import EditStreet from "./EditStreet";
import DeleteModal from "../../Modal/DeleteModal";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import BulkUploadButton from "../../../components/BulkUploadButton";
import Pagination from "../../../components/Pagination";
import SearchInput from "../../../components/SearchInput";
import FileUploadButton from "../../../components/FileUploadButton";
import DocumentDownload from "../../../components/DocumentDownload";
import HeaderButton from "../../../components/HeaderButton";
import API_ENDPOINTS from "../../../ApiEndpoints/api/ApiClient";
import PaginationLimit from "../../../components/PaginationLimit";

const csvData = `ward_id,street_name
 Ward***,streetName`;

const Street = ({ permissions }) => {
  const hasCreatePermission = permissions?.includes("create");
  const hasEditPermission = permissions?.includes("edit");
  const hasDeletePermission = permissions?.includes("delete");
  const hasDownloadPermission = permissions?.includes("download");

  const [isModal, setIsModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [streetId, setStreetId] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const [ExistingWards, setExistingWards] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [street, setStreet] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const [file, setFile] = useState(null);
  const [fileupload, setFileupload] = useState(false);
  const [buttonText, setButtonText] = useState("Bulk Upload");
  const [selectedDoc, setSelectedDoc] = useState(null);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const isDropdownOpen = (index) => dropdownOpen === index;

  useEffect(() => {
    handlerefresh();
    fetchExistingWards();
  }, [searchValue, currentPage, itemsPerPage]);

  const handlerefresh = () => {
    axios
      .get(API_ENDPOINTS.GET_STREETLIMIT.url, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: searchValue, // Send search query to backend
        },
        headers: API_ENDPOINTS.GET_STREETLIMIT.headers,
      })
      .then((response) => {
        const responseData = decryptData(response.data.data);
        setCurrentItems(responseData); // Set current items directly
        setTotalPages(response.data.metadata.totalPages); // Update total pages
        setTotalItems(response.data.metadata.totalItems); // Update total items
      })
      .catch((error) => {
        console.error("Error fetching streets:", error);
        toast.error("Failed to fetch streets");
      });
  };

  useEffect(() => {
    if (searchValue.trim() !== "") {
        setCurrentPage(1); // Reset to the first page 
    }
}, [searchValue]);

  // Handle pagination
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const toggleEModal = () => {
    setEditModal(!editModal);
    setStreetId(null);
  };

  const toggleCloseModal = () => {
    setIsModal(!isModal);
  };

  const toggleDeleteCloseModal = () => {
    setIsDeleteModal(!isDeleteModal);
    setdeleteId(null);
  };

  const fetchExistingWards = async () => {
    try {
      const response = await axios.get(
        API_ENDPOINTS.GET_WARD_STREETACTIVE.url,
        {
          headers: API_ENDPOINTS.GET_WARD_STREETACTIVE.headers,
        }
      );
      const responseData = decryptData(response.data.data);
      setExistingWards(responseData);
    } catch (error) {
      console.error("Error fetching existing roles:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const DELETE_STREET = API_ENDPOINTS.DELETE_STREET(deleteId);
      await axios.delete(DELETE_STREET.url, {
        headers: DELETE_STREET.headers,
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
      setFileupload(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("created_by_user", localStorage.getItem("name"));

      const response = await axios.post(`${API}/street/uploadcsv`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setButtonText("Bulk Upload");
        setFile(null);
        handlerefresh();
        toast.success("Data Uploaded successfully");
        setFileupload(false);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
        setButtonText("Bulk Upload");
        setFile(null);
        setFileupload(false);
      } else {
        toast.error("An unexpected error occurred");
        console.log(error);

        setButtonText("Bulk Upload");
        setFile(null);
        setFileupload(false);
      }
    }
  };

  const setDocs = (event) => {
    setSelectedDoc(event.target.value);
  };

  const exportData = async (format) => {
    if (format === "csv") {
      // CSV Export
      const exportedData = street.map((row) => ({
        street_id: row.street_id,
        street_name: row.street_name,
        ward_id: row.ward_id,
        ward_name: row.ward_name,
        zone_id: row.zone_id,
        zone_name: row.zone_name,
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
      link.setAttribute("download", "Street_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === "pdf") {
      try {
        const rowsPerPage = 30;
        const totalPages = Math.ceil(street.length / rowsPerPage);

        const pdf = new jsPDF("l", "mm", "a4");
        let yOffset = 0;

        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
          const startIndex = (currentPage - 1) * rowsPerPage;
          const endIndex = Math.min(startIndex + rowsPerPage, street.length);
          const currentPageData = street.slice(startIndex, endIndex);

          const tableData = currentPageData.map((row) => [
            row.street_id,
            row.street_name,
            row.ward_id,
            row.ward_name,
            row.zone_id,
            row.zone_name,
            row.status,
            row.created_by_user,
          ]);

          pdf.text(`Page ${currentPage}`, 10, yOffset + 10);
          pdf.autoTable({
            startY: yOffset + 15,
            head: [
              [
                "street_id",
                "street_name",
                "ward_id",
                "ward_name",
                "zone_id",
                "zone_name",
                "status",
                "created_by_user",
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

        pdf.save("Street_data.pdf");
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
              placeholder="Search Street"
            />
            {hasCreatePermission && (
              <FileUploadButton
                onChange={handleFileChange}
                buttonText={buttonText}
                accept=".csv"
                onClick={handleButtonClick}
                fileupload={fileupload}
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
            title="Street"
            hasCreatePermission={hasCreatePermission}
            onClick={() => setIsModal(true)}
          />

          <div
            className={`bg-white  mx-4 rounded-lg mt-1  p-3 ${
              currentItems.length < 6 ? "h-3/5" : "h-fit"
            }`}
          >
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
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full  mt-3">
                <thead className="border-b-2 border-gray-300">
                  <tr className="border-b-2 border-gray-300">
                    {[
                      "#",
                      "Street",
                      "Ward",
                      "Zone",
                      "Status",
                      "CreatedBy",
                      "CreatedAt",
                      "UpdatedAt",
                    ].map((heading) => (
                      <th key={heading} className="">
                        <p
                          className={`flex gap-2 items-center mx-${
                            heading === "#" ? "6" : "1.5"
                          } my-2 font-lexend font-semibold ${
                            heading !== "#" ? "justify-start" : ""
                          } whitespace-nowrap`}
                        >
                          {heading} {heading !== "#" && <RiExpandUpDownLine />}
                        </p>
                      </th>
                    ))}
                    <th>
                      <p className="text-center mx-1.5 my-3 font-lexend font-semibold">
                        Action
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((streets, index) => (
                    <tr className="border-b-2 border-gray-300" key={index}>
                      <td className="">
                        <div className="items-center mx-6 my-2 font-lexend whitespace-nowrap text-sm text-center text-gray-700">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </div>
                      </td>
                      <td>
                        <p className="text-start text-sm mx-1.5 my-2 font-lexend whitespace-nowrap capitalize text-gray-700">
                          {streets.street_name}
                        </p>
                      </td>
                      <td>
                        <p className="text-start text-sm mx-1.5 my-2 font-lexend whitespace-nowrap capitalize text-gray-700">
                          {streets.ward_name}
                        </p>
                      </td>
                      <td>
                        <p className="text-start text-sm mx-1.5 my-2 font-lexend whitespace-nowrap capitalize text-gray-700">
                          {streets.zone_name}
                        </p>
                      </td>
                      <td>
                        <p className="text-start text-sm mx-1.5 my-2 font-lexend whitespace-nowrap capitalize text-gray-700">
                          {streets.status}
                        </p>
                      </td>
                      <td>
                        <p className="text-start text-sm mx-1.5  my-2 font-lexend whitespace-nowrap capitalize text-gray-700">
                          {streets.created_by_user}
                        </p>
                      </td>
                      <td>
                        <p className="text-start text-sm mx-1.5 my-2  font-lexend whitespace-nowrap capitalize text-gray-700">
                          {formatDate(streets.createdAt)}
                        </p>
                      </td>
                      <td>
                        <p className="text-start text-sm mx-1.5  my-2 font-lexend whitespace-nowrap capitalize text-gray-700">
                          {formatDate(streets.updatedAt)}
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
                                    setStreetId(streets.street_id);
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
                                    setdeleteId(streets.street_id);
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
          </div>

          <div className=" my-2 mb-5 mx-7">
            <BulkUploadButton handleDownload={handleDownload} />
            <PaginationLimit
              Length={currentItems.length}
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              paginate={paginate}
              hasNextPage={currentPage < totalPages}
            />
          </div>
        </div>
      </div>
      {isModal && (
        <AddStreet
          toggleModal={toggleModal}
          toggleCloseModal={toggleCloseModal}
          ExistingWards={ExistingWards}
          handlerefresh={handlerefresh}
        />
      )}
      {editModal && (
        <EditStreet
          toggleModal={toggleEModal}
          handlerefresh={handlerefresh}
          ExistingWards={ExistingWards}
          streetId={streetId}
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

export default Street;
