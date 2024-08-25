import React, { Fragment, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import AddAdmin from "./AddAdmin";
import axios from "axios";
import { API } from "../../Host";
import decryptData from "../../Decrypt";
import EditAdmin from "./EditAdmin";
import DeleteModal from "../Modal/DeleteModal";

const Admin = () => {
  const [isModal, setIsModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [adminId, setAdminId] = useState(null);

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const [ExistingRoles, setExistingRoles] = useState(null);
  const [ExistingDept, setExistingDept] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const token = sessionStorage.getItem("token");

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const isDropdownOpen = (index) => dropdownOpen === index;

  useEffect(() => {
    handlerefresh();
    fetchExistingRoles()
    fetchExistingDepts()
  }, [searchValue, currentPage]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handlerefresh = () => {
   
    axios
      .get(`${API}/user/get`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const responseData = decryptData(response.data.data)
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
    setdeleteId(null)
  };

  const fetchExistingRoles = async () => {
    try {
      const response = await axios.get(`${API}/role/get`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = decryptData(response.data.data);
      setExistingRoles(responseData);
    } catch (error) {
      console.error("Error fetching existing Roles:", error);
    }
  };

  const fetchExistingDepts = async () => {
    try {
      const response = await axios.get(`${API}/department/get`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = decryptData(response.data.data);
      setExistingDept(responseData);
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

  const currentItemsOnPage = filteredCenters.slice(firstIndex, lastIndex);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/user/delete?user_id=${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toggleDeleteCloseModal()
      handlerefresh();
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };


  return (
    <Fragment>
      <div className="  bg-blue-100 overflow-y-auto no-scrollbar">
        <div className="h-screen">
          <div className="flex flex-row md:justify-end gap-3 p-2 mt-3 mx-8 flex-wrap">
            <p className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full">
              <IoMdSearch className="text-xl" />
              <input
                type="search"
                className="outline-none bg-transparent text-base"
                placeholder="Search Admin"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </p>
            <a href="#">
              <button className="flex gap-2 items-center border-2 border-blue-500  font-lexend bg-slate-100 text-blue-500 rounded-full px-3 py-1.5 justify-center">
                {" "}
                <FaPlus />
                Bulk Upload
              </button>
            </a>
            <a href="#">
              <button className="flex gap-2 items-center border-2 bg-slate-100  font-lexend text-black rounded-full px-3 py-1.5 w-28 justify-between">
                {" "}
                CSV <RiArrowDropDownLine />
              </button>
            </a>
          </div>
          <div className="flex justify-between items-center my-2 mx-8 gap-1 flex-wrap">
            <h1 className="md:text-2xl text-lg font-medium   font-lexend">
              TSCL User
            </h1>
            <a href="#">
              <button
                className="flex flex-row-2 gap-2  items-center border-2  font-lexend bg-blue-500 text-white rounded-full p-2.5 w-fit justify-between md:text-base text-sm"
                onClick={()=>setIsModal(true)}
              >
                <FaPlus /> Add User
              </button>
            </a>
          </div>

          <div className="bg-white mx-4 rounded-lg my-3  h-3/5 ">
    
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full  mt-3">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="py-2">
                  <p className=" mx-6 my-2 font-lexend font-semibold whitespace-nowrap">
                      # 
                    </p>
                  </th>
                  <th>
                    <div className="flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap">
                      Username <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap">
                      Department
                      <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap">
                      Phone
                      <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap">
                      Email
                      <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap">
                      Status
                      <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap">
                      Role
                      <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-semibold whitespace-nowrap">
                      CreatedBy
                      <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="mx-1 my-3 text-start font-lexend font-semibold whitespace-nowrap">
                      Action
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItemsOnPage.map((admins, index) => (
                  <tr className="border-b-2 border-gray-300" key={index}>
                    <td className="">
                      <p className="text-center text-sm mx-4 my-2 font-lexend whitespace-nowrap">
                        {" "}
                        {firstIndex + index + 1 < 10
                          ? `0${firstIndex + index + 1}`
                          : firstIndex + index + 1}
                      </p>
                    </td>
                    <td>
                      <p className=" mx-1  my-2 font-lexend whitespace-nowrap text-start text-sm">
                        {admins.user_name}
                      </p>
                    </td>
                    <td>
                      <p className="text-start text-sm  mx-1  my-2  font-lexend whitespace-nowrap ">
                        {admins.dept_name}
                      </p>
                    </td>
                    <td>
                      <p className="text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap ">
                        {admins.phone}
                      </p>
                    </td>
                    <td>
                      <p className="text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap ">
                        {admins.email}
                      </p>
                    </td>
                    <td>
                      <p className="text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap ">
                        {admins.status}
                      </p>
                    </td>
                    <td>
                      <p className="text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap ">
                        {admins.role}
                      </p>
                    </td>
                    <td>
                      <p className="text-start text-sm mx-1  my-2 font-lexend whitespace-nowrap ">
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
                                  setIsDeleteModal(true);
                                  setdeleteId(admins.user_id);
                                  toggleDropdown();
                                  
                                }}
                              >
                                Delete
                              </button>
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
          <div className=" my-3 mb-5 mx-7">
            <nav
              className="flex items-center flex-column flex-wrap md:flex-row md:justify-between justify-center pt-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center font-alegerya">
                Showing{" "}
                <span className="text-gray-700">
                  {firstIndex + 1} to {Math.min(lastIndex, admin.length)}
                </span>{" "}
                of <span className="text-gray-900">{admin.length} entries</span>
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
        <AddAdmin toggleModal={toggleModal} handlerefresh={handlerefresh} ExistingRoles={ExistingRoles} ExistingDept={ExistingDept}/>
      )}
      {editModal && (
        <EditAdmin
          toggleModal={toggleEModal}
          handlerefresh={handlerefresh}
          ExistingRoles={ExistingRoles} ExistingDept={ExistingDept}
          adminId={adminId}
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

export default Admin;
