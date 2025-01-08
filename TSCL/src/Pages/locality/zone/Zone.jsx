import React, { Fragment, useState, useEffect } from "react";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddZone from "./AddZone";
import axios from "axios";
import { API, downloadCSV, formatDate } from "../../../Host";
import decryptData from "../../../Decrypt";
import EditZone from "./EditZone";
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

const csvData = `zone_name
ZoneName`;

const Zone = ({ permissions }) => {
  const hasCreatePermission = permissions?.includes("create");
  const hasEditPermission = permissions?.includes("edit");
  const hasDeletePermission = permissions?.includes("delete");
  const hasDownloadPermission = permissions?.includes("download");

  const [isModal, setIsModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [zoneId, setZoneId] = useState(null);

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  const [zone, setZone] = useState([]);
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
  }, [searchValue, currentPage]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handlerefresh = () => {
    axios
      .get(`${API}/zone/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const responseData = decryptData(response.data.data);
        setZone(responseData);

        const filteredCenters = responseData.filter((org) =>
          Object.values(org).some((value) =>
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
    setZoneId(null);
  };

  const toggleDeleteCloseModal = () => {
    setIsDeleteModal(!isDeleteModal);
    setdeleteId(null);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredCenters = zone.filter((org) =>
    Object.values(org).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const currentItemsOnPage = filteredCenters.slice(firstIndex, lastIndex);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/zone/delete?zone_id=${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      formData.append('created_by_user', localStorage.getItem('name'));

      const response = await axios.post(`${API}/zone/uploadcsv`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
      const exportedData = zone.map((row) => ({
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
      link.setAttribute("download", "Zone_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === "pdf") {
      try {
        const rowsPerPage = 30;
        const totalPages = Math.ceil(zone.length / rowsPerPage);

        const pdf = new jsPDF("l", "mm", "a4");
        let yOffset = 0;

        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
          const startIndex = (currentPage - 1) * rowsPerPage;
          const endIndex = Math.min(startIndex + rowsPerPage, zone.length);
          const currentPageData = zone.slice(startIndex, endIndex);

          const tableData = currentPageData.map((row) => [
            row.zone_id,
            row.zone_name,
            row.status,
            row.created_by_user,
          ]);

          pdf.text(`Page ${currentPage}`, 10, yOffset + 10);
          pdf.autoTable({
            startY: yOffset + 15,
            head: [["Zone_Id", "Zone_Name", "Status", "createdBy"]],
            body: tableData,
            theme: "striped",
          });

          if (currentPage < totalPages) {
            pdf.addPage();
            yOffset = 10; // Set yOffset for the new page
          }
        }

        pdf.save("Zone_data.pdf");
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
        <div className="h-screen ">
          <div className="flex flex-row items-center md:justify-end gap-3 p-2 mt-2 mx-8 flex-wrap">
            <SearchInput
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search Zone"
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
            title="Zone"
            hasCreatePermission={hasCreatePermission}
            onClick={() => setIsModal(true)}
          />

          <div className="bg-white mx-4 rounded-lg my-2  h-3/5 ">
            <div className="overflow-x-auto no-scrollbar ">
              <table className="w-full mt-3 ">
                <thead className=" border-b-2 border-gray-300">
                  <tr className="border-b-2 border-gray-300">
                    <th className="">
                      <p className=" mx-6 my-2 font-lexend font-semibold whitespace-nowrap">
                        #
                      </p>
                    </th>
                    <th className="">
                      <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-semibold">
                        Zone <RiExpandUpDownLine />
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold  whitespace-nowrap">
                        Status <RiExpandUpDownLine />
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold">
                        CreatedBy <RiExpandUpDownLine />
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold">
                        CreatedAt
                        <RiExpandUpDownLine />
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold">
                        UpdatedAt
                        <RiExpandUpDownLine />
                      </p>
                    </th>
                    <th>
                      <p className="text-center mx-1.5 my-3 font-lexend font-semibold">
                        Action
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItemsOnPage.map((zones, index) => (
                    <tr className="border-b-2 border-gray-300 " key={index}>
                      <td className="">
                        <div className="items-center mx-6 my-2 font-lexend whitespace-nowrap text-sm text-cente text-gray-700">
                          {firstIndex + index + 1 < 10
                            ? `0${firstIndex + index + 1}`
                            : firstIndex + index + 1}
                        </div>
                      </td>
                      <td className="">
                        <p className="capitalize text-start mx-1.5 my-2 font-lexend whitespace-nowrap text-sm text-gray-700">
                          {zones.zone_name}
                        </p>
                      </td>
                      <td>
                        <p className=" mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm capitalize text-gray-700">
                          {zones.status}
                        </p>
                      </td>
                      <td>
                        <p className="text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize  text-gray-700">
                          {zones.created_by_user}
                        </p>
                      </td>
                      <td>
                        <p className="text-start mx-1.5  my-2  font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                          {formatDate(zones.createdAt)}
                        </p>
                      </td>
                      <td>
                        <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                          {formatDate(zones.updatedAt)}
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
                                    setZoneId(zones.zone_id);
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
                                    setdeleteId(zones.zone_id);
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
            <Pagination
              Length={zone.length}
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
        <AddZone toggleModal={toggleModal} handlerefresh={handlerefresh} />
      )}
      {editModal && (
        <EditZone
          toggleModal={toggleEModal}
          handlerefresh={handlerefresh}
          zoneId={zoneId}
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

export default Zone;
