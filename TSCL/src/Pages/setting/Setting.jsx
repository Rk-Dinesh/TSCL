import React, { Fragment, useState, useEffect } from "react";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { API, formatDate } from "../../Host";
import axios from "axios";
import decryptData from "../../Decrypt";
import DeleteModal from "../Modal/DeleteModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../../components/Pagination";
import SearchHeader from "../../components/SearchHeader";

const Settings = ({ permissions }) => {
  const hasCreatePermission = permissions?.includes("create");
  const hasEditPermission = permissions?.includes("edit");
  const hasDeletePermission = permissions?.includes("delete");

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [role, setRole] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

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
      .get(`${API}/role/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const reponseData = decryptData(response.data.data);
        setRole(reponseData);

        const filteredCenters = reponseData.filter((roles) =>
          Object.values(roles).some((value) =>
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

  const toggleDeleteCloseModal = () => {
    setIsDeleteModal(!isDeleteModal);
    setdeleteId(null);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredCenters = role.filter((roles) =>
    Object.values(roles).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const currentItemsOnPage = filteredCenters
    .slice()
    .reverse()
    .slice(firstIndex, lastIndex);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/role/delete?role_id=${deleteId}`, {
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

  const handleItemsPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <Fragment>
      <div className="  bg-blue-100 overflow-y-auto no-scrollbar">
        <div className="h-screen mt-10">
          <SearchHeader
            title="Role Access"
            hasCreatePermission={hasCreatePermission}
            onClick={() => navigate("/roleform")}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />

          <div
            className={`bg-white  mx-4 rounded-lg overflow-x-auto mt-1  p-3 ${
              role.length < 7 ? "h-3/5" : "h-fit"
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
            <div className="overflow-x-auto  ">
              <table className="w-full  mt-3">
                <thead className="border-b-2 border-gray-300">
                  <tr className="border-b-2 border-gray-300">
                    {[
                      "#",
                      "Role Name",
                      "Status",
                      "CreatedBy",
                      "CreatedAt",
                      "UpdatedAt",
                      "Action",
                    ].map((heading) => (
                      <th key={heading} className="">
                        <p
                          className={`flex gap-2 items-center mx-${
                            heading === "#" ? "3" : "1.5"
                          } my-2 font-lexend ${
                            heading === "Action"
                              ? "justify-center"
                              : "justify-start"
                          } font-semibold whitespace-nowrap`}
                        >
                          {heading !== "Action" && heading !== "#" && (
                            <>
                              {heading} <RiExpandUpDownLine />
                            </>
                          )}
                          {heading === "#" && "#"}
                          {heading === "Action" && "Action"}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentItemsOnPage.map((roles, index) => (
                    <tr className="border-b-2 border-gray-300" key={index}>
                      <td className="">
                        <p className=" mx-1 my-2 font-lexend text-center whitespace-nowrap text-sm text-gray-700">
                          {firstIndex + index + 1 < 10
                            ? `0${firstIndex + index + 1}`
                            : firstIndex + index + 1}
                        </p>
                      </td>
                      <td>
                        <p className="mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm capitalize text-gray-700">
                          {roles.role_name}
                        </p>
                      </td>
                      <td>
                        <p className=" mx-1.5  my-2  font-lexend text-start whitespace-nowrap text-sm capitalize text-gray-700">
                          {roles.status}
                        </p>
                      </td>
                      <td>
                        <p className="text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                          {roles.created_by_user}
                        </p>
                      </td>
                      <td>
                        <p className="text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                          {formatDate(roles.createdAt)}
                        </p>
                      </td>
                      <td>
                        <p className="text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                          {formatDate(roles.updatedAt)}
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
                                  onClick={() =>
                                    navigate("/editrole", {
                                      state: { role_id: roles.role_id },
                                    })
                                  }
                                >
                                  Edit
                                </button>
                              )}
                              {hasDeletePermission && (
                                <button
                                  className="block px-3 py-1.5 text-sm text-black hover:bg-gray-200 w-full text-left"
                                  onClick={() => {
                                    setIsDeleteModal(true);
                                    setdeleteId(roles.role_id);
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
          <div className=" my-3 mb-5 mx-7">
            <Pagination
              Length={role.length}
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

      {isDeleteModal && (
        <DeleteModal
          toggleDeleteModal={toggleDeleteCloseModal}
          delete={handleDelete}
        />
      )}
    </Fragment>
  );
};

export default Settings;
