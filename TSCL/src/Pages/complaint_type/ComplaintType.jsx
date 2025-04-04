import React, { Fragment, useState, useEffect } from "react";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { API, formatDate } from "../../Host";
import axios from "axios";
import AddComplaintType from "./AddComplaintType";
import decryptData from "../../Decrypt";
import EditComplaintType from "./EditComplainType";
import DeleteModal from "../Modal/DeleteModal";
import Pagination from "../../components/Pagination";
import SearchHeader from "../../components/SearchHeader";
import API_ENDPOINTS from "../../ApiEndpoints/api/ApiClient";

const ComplaintType = ({ permissions }) => {
  const hasCreatePermission = permissions?.includes("create");
  const hasEditPermission = permissions?.includes("edit");
  const hasDeletePermission = permissions?.includes("delete");

  const [isModal, setIsModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [comptId, setComptId] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [complaint, setComplaint] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const token = localStorage.getItem("token");

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
      .get(API_ENDPOINTS.GET_COMPLAINTTYPE.url, {
        headers: API_ENDPOINTS.GET_COMPLAINTTYPE.headers,
      })
      .then((response) => {
        const responseData = decryptData(response.data.data);
        setComplaint(responseData);

        const filteredCenters = responseData.filter((complaintstype) =>
          Object.values(complaintstype).some((value) =>
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
    setComptId(null);
  };

  const toggleDeleteCloseModal = () => {
    setIsDeleteModal(!isDeleteModal);
    setdeleteId(null);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredCenters = complaint.filter((complaintstype) =>
    Object.values(complaintstype).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const currentItemsOnPage = filteredCenters
    .slice()
    .reverse()
    .slice(firstIndex, lastIndex);

  const handleDelete = async () => {
    try {
      const DELETE_COMPLAINTTYPE = API_ENDPOINTS.DELETE_COMPLAINTTYPE(deleteId);
      await axios.delete(DELETE_COMPLAINTTYPE.url, {
        headers: DELETE_COMPLAINTTYPE.headers,
      });
      toggleDeleteCloseModal();
      handlerefresh();
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <Fragment>
      <div className="  bg-blue-100 overflow-y-auto no-scrollbar">
        <div className="h-screen mt-10">
          <SearchHeader
            title="Complaint Type"
            hasCreatePermission={hasCreatePermission}
            onClick={() => setIsModal(true)}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />

          <div className="bg-white mx-4 rounded-lg my-3 h-3/5 ">
            <div className="overflow-x-auto  no-scrollbar">
              <table className="w-full  mt-3">
                <thead className="border-b-2 border-gray-300">
                  <tr className="border-b-2 border-gray-300">
                    {[
                      "#",
                      "Complaint Type",
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
                            heading !== "#" ? "justify-start" : "justify-center"
                          } whitespace-nowrap`}
                        >
                          {heading} {heading !== "#" && <RiExpandUpDownLine />}
                        </p>
                      </th>
                    ))}
                    <th>
                      <p className="mx-1.5 my-2 font-semibold font-lexend whitespace-nowrap text-center">
                        Action
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItemsOnPage.map((type, index) => (
                    <tr className="border-b-2 border-gray-300" key={index}>
                      <td className="">
                        <p className=" mx-3 my-2 font-lexend text-center whitespace-nowrap text-sm text-gray-700">
                          {firstIndex + index + 1 < 10
                            ? `0${firstIndex + index + 1}`
                            : firstIndex + index + 1}
                        </p>
                      </td>
                      <td>
                        <p className="mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm capitalize text-gray-700">
                          {type.complaint_type}
                        </p>
                      </td>
                      <td>
                        <p className="mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm capitalize text-gray-700">
                          {type.status}
                        </p>
                      </td>
                      <td>
                        <p className="text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                          {type.created_by_user}
                        </p>
                      </td>
                      <td>
                        <p className="text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                          {formatDate(type.createdAt)}
                        </p>
                      </td>
                      <td>
                        <p className="text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                          {formatDate(type.updatedAt)}
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
                                    setComptId(type.compliant_type_id);
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
                                    setdeleteId(type.compliant_type_id);
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
        <AddComplaintType
          toggleModal={toggleModal}
          handlerefresh={handlerefresh}
        />
      )}
      {editModal && (
        <EditComplaintType
          toggleModal={toggleEModal}
          handlerefresh={handlerefresh}
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

export default ComplaintType;
