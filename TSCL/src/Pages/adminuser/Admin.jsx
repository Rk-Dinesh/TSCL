import React, { Fragment, useState, useEffect } from "react";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddAdmin from "./AddAdmin";
import axios from "axios";
import { downloadCSV } from "../../Host";
import decryptData from "../../Decrypt";
import EditAdmin from "./EditAdmin";
import DeleteModal from "../Modal/DeleteModal";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import BulkUploadButton from "../../components/BulkUploadButton";
import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import FileUploadButton from "../../components/FileUploadButton";
import DocumentDownload from "../../components/DocumentDownload";
import HeaderButton from "../../components/HeaderButton";
import API_ENDPOINTS from "../../ApiEndpoints/api/ApiClient";
import PasswordAdmin from "./PasswordAdmin";

const csvData = `user_name,dept_name,phone,email,address,pincode,login_password,status,role,created_by_user
UserName,Department,phone,email@gmail.com,Address,123456,passord,status,role,admin`;

const Admin = ({ permissions }) => {
  const [isModal, setIsModal] = useState(false);
  const hasCreatePermission = permissions?.includes("create");
  const hasEditPermission = permissions?.includes("edit");
  const hasDeletePermission = permissions?.includes("delete");
  const hasDownloadPermission = permissions?.includes("download");
  const [editModal, setEditModal] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [phoneID, setPhoneID] = useState(null);
  const [adminId, setAdminId] = useState(null);
  const [fileupload, setFileupload] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const [ExistingRoles, setExistingRoles] = useState(null);
  const [ExistingEmployees, setExistingEmployees] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const [file, setFile] = useState(null);
  const [buttonText, setButtonText] = useState("Bulk Upload");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isZone, setIsZone] = useState([]);
  const [isWard, setIsWard] = useState([]);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const isDropdownOpen = (index) => dropdownOpen === index;

  useEffect(() => {
    handlerefresh();
    fetchExistingRoles();
    fetchExistingEmployees();
    fetchZones();
    fetchWards();
  }, [searchValue, currentPage, itemsPerPage]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handlerefresh = () => {
    axios
      .get(API_ENDPOINTS.GET_ADMIN.url, {
        headers: API_ENDPOINTS.GET_ADMIN.headers,
      })
      .then((response) => {
        const responseData = decryptData(response.data.data);
        setAdmin(responseData);

        const filteredCenters = responseData.filter((admins) =>
          Object.values(admins).some((value) =>
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
    setAdminId(null);
  };

  const toggleDeleteCloseModal = () => {
    setIsDeleteModal(!isDeleteModal);
    setdeleteId(null);
  };

  const togglePassModal = () => {
    setIsChange(!isChange);
    setPhoneID(null);
  };

  const fetchExistingRoles = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_ROLE_ADMINACTIVE.url, {
        headers: API_ENDPOINTS.GET_ROLE_ADMINACTIVE.headers,
      });
      const responseData = decryptData(response.data.data);
      setExistingRoles(responseData);
    } catch (error) {
      console.error("Error fetching existing Roles:", error);
    }
  };

  const fetchExistingEmployees = async () => {
    try {
      const response = await axios.get(
        API_ENDPOINTS.GET_EMPLOYEE_ADMINACTIVE.url,
        {
          headers: API_ENDPOINTS.GET_EMPLOYEE_ADMINACTIVE.headers,
        }
      );
      const responseData = decryptData(response.data.data);
      setExistingEmployees(responseData);
    } catch (error) {
      console.error("Error fetching existing Department:", error);
    }
  };

  const fetchZones = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_ZONE_ADMINACTIVE.url, {
        headers: API_ENDPOINTS.GET_EMPLOYEE_ADMINACTIVE.headers,
      });
      const responseData = decryptData(response.data.data);
      setIsZone(responseData);
    } catch (error) {
      console.error("Error fetching existing Department:", error);
    }
  };
  const fetchWards = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_WARD_ADMINACTIVE.url, {
        headers: API_ENDPOINTS.GET_WARD_ADMINACTIVE.headers,
      });
      const responseData = decryptData(response.data.data);
      setIsWard(responseData);
    } catch (error) {
      console.error("Error fetching existing Department:", error);
    }
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredCenters = admin.filter((admins) =>
    Object.values(admins).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const currentItemsOnPage = filteredCenters
    .slice()
    .reverse()
    .slice(firstIndex, lastIndex);

  const handleDelete = async () => {
    try {
      const DELETE_ADMIN = API_ENDPOINTS.DELETE_ADMIN(deleteId);
      await axios.delete(DELETE_ADMIN.url, {
        headers: DELETE_ADMIN.headers,
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

      const response = await axios.post(
        API_ENDPOINTS.UPLOAD_ADMIN.url,
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
      const exportedData = admin.map((row) => ({
        user_id: row.user_id,
        user_name: row.user_name,
        dept_name: row.dept_name,
        phone: row.phone,
        email: row.email,
        address: row.address,
        pincode: row.pincode,

        status: row.status,

        role: row.role,
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
      link.setAttribute("download", "Admin_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === "pdf") {
      try {
        const rowsPerPage = 30;
        const totalPages = Math.ceil(admin.length / rowsPerPage);

        const pdf = new jsPDF("l", "mm", "a4");
        let yOffset = 0;

        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
          const startIndex = (currentPage - 1) * rowsPerPage;
          const endIndex = Math.min(startIndex + rowsPerPage, admin.length);
          const currentPageData = admin.slice(startIndex, endIndex);

          const tableData = currentPageData.map((row) => [
            row.user_id,
            row.user_name,
            row.dept_name,
            row.phone,
            row.email,
            row.address,
            row.pincode,

            row.status,

            row.role,
            row.created_by_user,
          ]);

          pdf.text(`Page ${currentPage}`, 10, yOffset + 10);
          pdf.autoTable({
            startY: yOffset + 15,
            head: [
              [
                "User_Id",
                "User_Name",
                "Dept_Name",
                "Phone",
                "Email",
                "Address",
                "Pincode",

                "Status",

                "Role",
                "CreatedBy",
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

        pdf.save("Admin_data.pdf");
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
          <div className="flex flex-row items-center md:justify-end gap-3 p-2 mt-2 mx-8 flex-wrap ">
            <SearchInput
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search Admin"
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
            title="MSCL Admin"
            hasCreatePermission={hasCreatePermission}
            onClick={() => setIsModal(true)}
          />

          <div
            className={`bg-white  mx-4 rounded-lg overflow-x-auto mt-1  p-3 ${
              admin.length < 7 ? "h-3/5" : "h-fit"
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
                      "Username",
                      "Department",
                      "Phone",
                      "Email",
                      "Status",
                      "Role",
                      "CreatedBy",
                      "Action",
                    ].map((heading) => (
                      <th key={heading} className="py-2">
                        <div
                          className={`flex gap-2 items-center mx-${
                            heading === "#"
                              ? "6"
                              : heading === "Phone"
                              ? "3"
                              : "1"
                          } my-2 font-lexend font-semibold ${
                            heading === "Action"
                              ? "justify-start"
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
                  {currentItemsOnPage.map((admins, index) => (
                    <tr className="border-b-2 border-gray-300" key={index}>
                      <td className="">
                        <p className="text-center text-sm mx-4 my-2 font-lexend whitespace-nowrap  text-gray-700">
                          {" "}
                          {firstIndex + index + 1 < 10
                            ? `0${firstIndex + index + 1}`
                            : firstIndex + index + 1}
                        </p>
                      </td>
                      <td>
                        <p className=" mx-1  my-2 font-lexend whitespace-nowrap text-start text-sm capitalize text-gray-700">
                          {admins.user_name}
                        </p>
                      </td>
                      <td>
                        <p className="text-start text-sm  mx-1  my-2  font-lexend whitespace-nowrap capitalize text-gray-700">
                          {admins.dept_name}
                        </p>
                      </td>
                      <td>
                        <p className="text-start text-sm mx-3  my-2 font-lexend whitespace-nowrap capitalize text-gray-700">
                          {admins.phone}
                        </p>
                      </td>
                      <td>
                        <p className="text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap capitalize text-gray-700">
                          {admins.email}
                        </p>
                      </td>
                      <td>
                        <p className="text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap capitalize text-gray-700">
                          {admins.status}
                        </p>
                      </td>
                      <td>
                        <p className="text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap capitalize text-gray-700">
                          {admins.role}
                        </p>
                      </td>
                      <td>
                        <p className="text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap capitalize text-gray-700">
                          {admins.created_by_user}
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
                                <div>
                                  <button
                                    className="block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left"
                                    onClick={() => {
                                      setEditModal(true);
                                      setAdminId(admins.user_id);
                                      toggleDropdown();
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left"
                                    onClick={() => {
                                      setIsChange(true);
                                      setPhoneID(admins.phone);
                                      toggleDropdown();
                                    }}
                                  >
                                    Password
                                  </button>
                                </div>
                              )}
                              {hasDeletePermission && (
                                <button
                                  className="block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left"
                                  onClick={() => {
                                    setIsDeleteModal(true);
                                    setdeleteId(admins.user_id);
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
              Length={admin.length}
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
        <AddAdmin
          toggleModal={toggleModal}
          handlerefresh={handlerefresh}
          ExistingRoles={ExistingRoles}
          ExistingEmployees={ExistingEmployees}
          isZone={isZone}
          isWard={isWard}
        />
      )}
      {editModal && (
        <EditAdmin
          toggleModal={toggleEModal}
          handlerefresh={handlerefresh}
          ExistingRoles={ExistingRoles}
          adminId={adminId}
          isZone={isZone}
          isWard={isWard}
        />
      )}
      {isDeleteModal && (
        <DeleteModal
          toggleDeleteModal={toggleDeleteCloseModal}
          delete={handleDelete}
        />
      )}
      {isChange && (
        <PasswordAdmin togglePassModal={togglePassModal} phoneID={phoneID} />
      )}
    </Fragment>
  );
};

export default Admin;
