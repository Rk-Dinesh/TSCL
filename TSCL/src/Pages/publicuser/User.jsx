import React, { Fragment, useState, useEffect } from "react";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddUser from "./AddUser";
import axios from "axios";
import { API, downloadCSV } from "../../Host";
import decryptData from "../../Decrypt";
import EditUser from "./EditUser";
import { toast } from "react-toastify";
import DeleteModal from "../Modal/DeleteModal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import BulkUploadButton from "../../components/BulkUploadButton";
import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import FileUploadButton from "../../components/FileUploadButton";
import DocumentDownload from "../../components/DocumentDownload";
import HeaderButton from "../../components/HeaderButton";

const csvData = `public_user_name,phone,email,address,pincode,login_password,verification_status,user_status,role
user,1234567890,email@gmail.com, Address,123456,password,verified,status,user`;

const User = ({ permissions }) => {
  const hasCreatePermission = permissions?.includes("create");
  const hasEditPermission = permissions?.includes("edit");
  const hasDeletePermission = permissions?.includes("delete");
  const hasDownloadPermission = permissions?.includes("download");

  const [isModal, setIsModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [user, setUser] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const token = localStorage.getItem("token");

  const [file, setFile] = useState(null);
  const [buttonText, setButtonText] = useState("Bulk Upload");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [fileupload, setFileupload] = useState(false);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const isDropdownOpen = (index) => dropdownOpen === index;

  useEffect(() => {
    handlerefresh();
  }, [searchValue, currentPage, itemsPerPage]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handlerefresh = () => {
    axios
      .get(`${API}/public-user/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const responseData = decryptData(response.data.data);

        setUser(responseData);
        const filteredCenters = responseData.filter((users) =>
          Object.values(users).some((value) =>
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
  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const toggleEModal = () => {
    setEditModal(!editModal);
    setUserId(null);
  };

  const toggleDeleteCloseModal = () => {
    setIsDeleteModal(!isDeleteModal);
    setdeleteId(null);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredCenters = user.filter((users) =>
    Object.values(users).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const currentItemsOnPage = filteredCenters
    .slice()
    .reverse()
    .slice(firstIndex, lastIndex);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${API}/public-user/delete?public_user_id=${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

      const response = await axios.post(
        `${API}/public-user/uploadcsv`,
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
        setFileupload(false);
      } else {
        toast.error("Data failed to Upload");
        setFileupload(false);
      }
    } catch (error) {
      console.log(error);
      setFileupload(false);
    }
  };
  const setDocs = (event) => {
    setSelectedDoc(event.target.value);
  };

  const exportData = async (format) => {
    if (format === "csv") {
      // CSV Export
      const exportedData = user.map((row) => ({
        public_user_id: row.public_user_id,
        public_user_name: row.public_user_name,
        phone: row.phone,
        email: row.email,
        address: row.address,
        pincode: row.pincode,
        verification_status: row.verification_status,
        user_status: row.user_status,
      }));

      const csvData = [
        Object.keys(exportedData[0]).join(","),
        ...exportedData.map((row) => Object.values(row).join(",")),
      ].join("\n");

      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "User_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === "pdf") {
      try {
        const rowsPerPage = 30;
        const totalPages = Math.ceil(user.length / rowsPerPage);

        const pdf = new jsPDF("l", "mm", "a4");
        let yOffset = 0;

        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
          const startIndex = (currentPage - 1) * rowsPerPage;
          const endIndex = Math.min(startIndex + rowsPerPage, user.length);
          const currentPageData = user.slice(startIndex, endIndex);

          const tableData = currentPageData.map((row) => [
            row.public_user_id,
            row.public_user_name,
            row.phone,
            row.email,
            row.address,
            row.pincode,
            row.verification_status,
            row.user_status,
          ]);

          pdf.text(`Page ${currentPage}`, 10, yOffset + 10);
          pdf.autoTable({
            startY: yOffset + 15,
            head: [
              [
                "UserId",
                "UserName",
                "Phone",
                "Email",
                "Address",
                "Pincode",
                "VerificationStatus",
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

        pdf.save("User_data.pdf");
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
              placeholder="Search User"
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
            title="Public User"
            hasCreatePermission={hasCreatePermission}
            onClick={() => setIsModal(true)}
          />

          <div
            className={`bg-white  mx-4 rounded-lg overflow-x-auto mt-1  p-3 ${
              user.length < 6 ? "h-3/5" : "h-fit"
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
            <div className="overflow-x-auto ">
              <table className="w-full  mt-3">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    {[
                      "#",
                      "Public Username",
                      "Phone",
                      "Email",
                      "Status",
                      "Verification Status",
                      "Action",
                    ].map((heading) => (
                      <th key={heading} className="py-2">
                        <div
                          className={`flex gap-2 items-center mx-${
                            heading === "#"
                              ? "5"
                              : heading === "Phone"
                              ? "3"
                              : "1"
                          } my-2 font-lexend font-semibold ${
                            heading === "Action"
                              ? "justify-center"
                              : "justify-start"
                          } whitespace-nowrap`}
                        >
                          {heading !== "Action" && heading !== "#" && (
                            <>
                              {heading} <RiExpandUpDownLine />
                            </>
                          )}
                          {heading === "#" && "#"}
                          {heading === "Action" && "Action"}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentItemsOnPage.map((users, index) => (
                    <tr className="border-b-2 border-gray-300" key={index}>
                      <td className="">
                        <p className="text-center text-sm mx-1 my-2 font-lexend whitespace-nowrap text-gray-700">
                          {firstIndex + index + 1 < 10
                            ? `0${firstIndex + index + 1}`
                            : firstIndex + index + 1}
                        </p>
                      </td>
                      <td>
                        <p className=" mx-1  my-2 font-lexend whitespace-nowrap text-start text-sm capitalize text-gray-700">
                          {users.public_user_name}
                        </p>
                      </td>
                      <td>
                        <p className=" mx-3  my-2 font-lexend whitespace-nowrap text-start text-sm capitalize text-gray-700">
                          {users.phone}
                        </p>
                      </td>
                      <td>
                        <p className="text-start text-sm mx-1  my-2 font-lexend  whitespace-nowrap capitalize text-gray-700">
                          {users.email}
                        </p>
                      </td>
                      <td>
                        <p className=" mx-2  my-2 font-lexend whitespace-nowrap text-start text-sm capitalize text-gray-700">
                          {users.user_status}
                        </p>
                      </td>
                      <td>
                        <p className="text-start mx-1  my-2 font-lexend whitespace-nowrap text-sm  capitalize text-gray-700">
                          {users.verification_status}
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
                                    setUserId(users.public_user_id);
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
                                    setdeleteId(users.public_user_id);
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
              Length={user.length}
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
        <AddUser toggleModal={toggleModal} handlerefresh={handlerefresh} />
      )}
      {editModal && (
        <EditUser
          toggleModal={toggleEModal}
          handlerefresh={handlerefresh}
          userId={userId}
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

export default User;
