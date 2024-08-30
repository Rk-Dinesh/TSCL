import React, { Fragment, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from 'react-toastify';
import { IoMdSearch } from "react-icons/io";
import AddDepartment from "./AddDepartment";
import axios from "axios";
import { API, formatDate } from "../../Host";
import logo from "../../assets/images/logo1.png"
import decryptData from "../../Decrypt";
import EditDepartment from "./EditDepartment";
import DeleteModal from "../Modal/DeleteModal";

import { PiFileCsvLight } from "react-icons/pi";
import { PiFilePdfDuotone } from "react-icons/pi";
import { HiOutlineDocument } from "react-icons/hi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const csvData=`dept_name,org_name,status,created_by_user
PWD,Org_1,active,admin`;

const Department = ({ permissions }) => {
  const hasCreatePermission = permissions?.includes('create');
  const hasEditPermission = permissions?.includes('edit');
  const hasDeletePermission = permissions?.includes('delete');

  const [isModal, setIsModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const [deptId, setDeptId] = useState(null);
  const [ExistingOrganiZations, setExistingOrganiZations] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [department, setDepartmnent] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const token = sessionStorage.getItem('token'); 

  const [file, setFile] = useState(null);
  const [buttonText, setButtonText] = useState("Bulk Upload");
  const [selectedDoc, setSelectedDoc] = useState(null)




  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const isDropdownOpen = (index) => dropdownOpen === index;

  useEffect(() => {
   handlerefresh()
   fetchExistingOrganiZations()
  }, [searchValue, currentPage]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handlerefresh = () => {
    axios.get(`${API}/department/get`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((response) => {
      const responseData = decryptData(response.data.data)
      setDepartmnent(responseData);

      const filteredCenters = responseData.filter((dept) =>
        Object.values(dept).some((value) =>
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
    setDeptId(null);
  };

  const toggleCloseModal = () => {
    setIsModal(!isModal);
  };

  const toggleDeleteCloseModal = () => {
    setIsDeleteModal(!isDeleteModal);
    setdeleteId(null)
  };

  const fetchExistingOrganiZations = async () => {
    try {
      const response = await axios.get(`${API}/organization/getactive`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      const responseData = decryptData(response.data.data);
      setExistingOrganiZations(responseData);
    } catch (error) {
      console.error("Error fetching existing Organisations:", error);
    }
  };

  
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredCenters = department.filter((dept) =>
    Object.values(dept).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const currentItemsOnPage = filteredCenters.slice(firstIndex, lastIndex);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/department/delete?dept_id=${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toggleDeleteCloseModal()
      handlerefresh();
      setDepartmnent(
        department.filter((status) => department.dept_id !== deleteId)
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

      const response = await axios.post(`${API}/organization/uploadcsv`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
      const exportedData = department.map((row) => ({
        
        dept_id: row.dept_id,
        dept_name: row.dept_name,
        org_name: row.org_name,
        status: row.status,
        created_by_user: row.created_by_user
      }));
  
      const csvData = [
        Object.keys(exportedData[0]).join(","),
        ...exportedData.map((row) => Object.values(row).join(",")),
      ].join("\n");
  
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "Department_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === "pdf") {
      try {
        const rowsPerPage = 30;
        const totalPages = Math.ceil(department.length / rowsPerPage);
  
        const pdf = new jsPDF("l", "mm", "a4");
        let yOffset = 0;
  
        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
          const startIndex = (currentPage - 1) * rowsPerPage;
          const endIndex = Math.min(startIndex + rowsPerPage, department.length);
          const currentPageData = department.slice(startIndex, endIndex);
  
          const tableData = currentPageData.map((row) => [
            
            row.dept_id,
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
                "DeptId",
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
  
        pdf.save("Department_data.pdf");
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
        <div className="h-screen">
          <div className="flex flex-row items-center md:justify-end gap-3 p-2 mt-3 mx-8 flex-wrap">
            <div className="flex items-center gap-3 bg-white py-2 px-3 rounded-full">
              <IoMdSearch className="text-xl" />
              <input
                type="search"
                className="outline-none bg-transparent text-base"
                placeholder="Search Department"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            {hasCreatePermission && (
               <div className="relative text-center   hover:text-white py-1.5 rounded-full">
                
               <input
                 type="file"
                 id="fileInput"
                 className="hidden"
                 onChange={handleFileChange}
                 accept=".csv"
               />
               
               <button
                 className="flex items-center gap-2 justify-center border-primary border-2 font-normal text-base w-36 py-1.5  rounded-full text-primary hover:text-white hover:bg-primary  "
                 onClick={handleButtonClick}
               >
                  <FaPlus />
                 {buttonText}
               </button>
               
             </div>
            )}
            
            <form>
                <select
                  className="block w-full py-2 px-2  text-sm border-2 text-gray-400  border-gray-300 rounded-full bg-gray-50 outline-none"
                  onChange={setDocs}
                 
                >
                  <option  hidden>
                   Download
                  </option>

                  <option value="csv">CSV</option>
                  <option value="pdf">PDF</option>
                </select>
              </form>
              {selectedDoc === null && (
                <HiOutlineDocument className="text-2xl text-gray-500" />
              )}
              {selectedDoc === "csv" && <PiFileCsvLight className="text-3xl text-gray-500" onClick={() => exportData("csv")}/>}
              {selectedDoc === "pdf" && (
                <PiFilePdfDuotone className="text-3xl text-gray-500" onClick={() => exportData("pdf")}/>
              )}
          </div>

          <div className="flex justify-between items-center my-2 mx-8 gap-1 flex-wrap">
            <h1 className="md:text-xl text-lg font-medium  font-lexend">
              Department
            </h1>
              {hasCreatePermission && (
              <button
                className="flex  gap-2  items-center border-2 bg-blue-500 text-white font-lexend rounded-full p-2 w-fit justify-between"
                onClick={()=>setIsModal(true)}
              >
                <FaPlus /> Add Department
              </button>
              )}
          </div>

          <div className="bg-white mx-4 rounded-lg my-3 overflow-x-auto h-3/5 no-scrollbar">
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
                    <p className="flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap">
                      Last UpdatedAt <RiExpandUpDownLine />
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
                {currentItemsOnPage.slice().reverse().map((dept, index) => (
                  <tr className="border-b-2 border-gray-300" key={index}>
                    <td className="">
                      <div className="items-center mx-6 my-2 font-lexend whitespace-nowrap text-sm text-center text-gray-800">
                        {firstIndex + index + 1 < 10
                          ? `0${firstIndex + index + 1}`
                          : firstIndex + index + 1}
                      </div>
                    </td>
                    <td>
                      <div className="flex  gap-2 items-center justify-start mx-5 my-3  text-sm text-gray-800">
                        <img
                          src={logo}
                          alt="logo"
                          className="w-8 h-8"
                        />
                        <p className="font-lexend whitespace-nowrap capitalize   text-gray-800"> {dept.dept_name}</p>
                      </div>
                    </td>
                    <td className="">
                      <p className="capitalize mx-3 my-2 font-lexend text-start whitespace-nowrap text-sm text-gray-800">
                        {dept.org_name}
                      </p>
                    </td>
                    <td>
                      <p className="capitalize mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm text-gray-800">
                        {dept.status}
                      </p>
                    </td>
                    <td>
                      <p className="capitalize mx-1.5  my-2  font-lexend text-start whitespace-nowrap text-sm text-gray-800">
                        {dept.created_by_user}
                      </p>
                    </td>
                    <td>
                      <p className="capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-800 ">
                        {formatDate(dept.createdAt)}
                      </p>
                    </td>
                    <td>
                      <p className="capitalize text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-800">
                        {formatDate(dept.updatedAt)}
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
                                  setDeptId(dept.dept_id);
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
                                  setdeleteId(dept.dept_id);
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
          <div className="text-center">
            <button
              className="bg-primary px-3 py-2 rounded-full text-white text-sm font-alegerya"
              onClick={handleDownload}
            >
              Bulk Upload Template
            </button>
          </div>
            <nav
              className="flex items-center flex-column flex-wrap md:flex-row md:justify-between justify-center pt-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center font-alegerya">
                Showing{" "}
                <span className="text-gray-700">
                  {firstIndex + 1} to {Math.min(lastIndex, department.length)}
                </span>{" "}
                of{" "}
                <span className="text-gray-900">
                  {department.length} entries
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

      {isModal && (
        <AddDepartment
          toggleModal={toggleModal}
          toggleCloseModal={toggleCloseModal}
          ExistingOrganiZations={ExistingOrganiZations}
          handlerefresh={handlerefresh}
        />
      )}
       {editModal && (
        <EditDepartment
          toggleModal={toggleEModal}
          handlerefresh={handlerefresh}
          ExistingOrganiZations={ExistingOrganiZations}
          deptId={deptId}
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

export default Department;
