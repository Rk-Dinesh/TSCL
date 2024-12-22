import React, { Fragment, useState, useEffect } from "react";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { API, formatDate, truncateText } from "../../Host";
import axios from "axios";
import decryptData from "../../Decrypt";
import DeleteModal from "../Modal/DeleteModal";
import Pagination from "../../components/Pagination";
import SearchHeader from "../../components/SearchHeader";
import AddTemplate from "./AddTemplate";
import { toast } from "react-toastify";
import EditTemplate from "./EditTemplate";


const Template = ({ permissions }) => {
  const hasCreatePermission = permissions?.includes("create");
  const hasEditPermission = permissions?.includes("edit");
  const hasDeletePermission = permissions?.includes("delete");

  const [isModal, setIsModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [tempId, setTempId] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [template, setTemplate] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const token = localStorage.getItem("token");

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const isDropdownOpen = (index) => dropdownOpen === index;

  useEffect(() => {
    handlerefresh();
  }, [searchValue, currentPage,itemsPerPage]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handlerefresh = () => {
    axios
      .get(`${API}/template/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const responseData = decryptData(response.data.data);
        setTemplate(responseData);

        const filteredCenters = responseData.filter((templates) =>
          Object.values(templates).some((value) =>
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
    setTempId(null);
  };

  const toggleDeleteCloseModal = () => {
    setIsDeleteModal(!isDeleteModal);
    setdeleteId(null);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredCenters = template.filter((templates) =>
    Object.values(templates).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const currentItemsOnPage = filteredCenters
    .slice()
    .reverse()
    .slice(firstIndex, lastIndex);

  const handleDelete = async () => {
    try {
     
      await axios.delete(`${API}/template/delete?temp_id=${deleteId}`, {
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
            title="Template"
            hasCreatePermission={hasCreatePermission}
            onClick={() => setIsModal(true)}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />

          <div className={`bg-white  mx-4 rounded-lg overflow-x-auto mt-1  p-3 ${
              template.length < 6 ? "h-3/5" : "h-fit"
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
            <div className="overflow-x-auto  ">
              <table className="w-full  mt-1">
                <thead className=" border-b-2 border-gray-300">
                  <tr className="border-b-2 border-gray-300">
                    <th className="">
                      <p className=" mx-6 my-2 font-lexend font-semibold whitespace-nowrap">
                        #
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font- whitespace-nowrap">
                         Template Title
                        <RiExpandUpDownLine />
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font- whitespace-nowrap">
                        Department
                        <RiExpandUpDownLine />
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap">
                        Complaint Type <RiExpandUpDownLine />
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap">
                        Desc <RiExpandUpDownLine />
                      </p>
                    </th>
                    <th>
                      <p className="flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap">
                        Date & Time <RiExpandUpDownLine />
                      </p>
                    </th>
                    <th>
                      <p className="mx-1.5 my-2 font-semibold font-lexend whitespace-nowrap text-center">
                        Action
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItemsOnPage.map((temps, index) => (
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
                          {temps.temp_title}
                        </p>
                      </td>
                      <td>
                        <p className="mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm capitalize text-gray-700">
                          {temps.dept_name}
                        </p>
                      </td>
                      <td>
                        <p className="text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                          {temps.complaint_type}
                        </p>
                      </td>
                      <td>
                        <p className="text-start mx-1.5  my-2 font-lexend truncate text-sm capitalize text-gray-700">
                        {truncateText(temps.desc,5)}
                        </p>
                      </td>
                      <td>
                        <p className="text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                          {formatDate(temps.createdAt)}
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
                                    setTempId(temps.temp_id);
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
                                    setdeleteId(temps.temp_id);
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
              Length={template.length}
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
        <AddTemplate
          toggleModal={toggleModal}
          handlerefresh={handlerefresh}
        />
      )}
      {editModal && (
        <EditTemplate
          toggleModal={toggleEModal}
          handlerefresh={handlerefresh}
          tempId={tempId}
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

export default Template;
