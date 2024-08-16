import React, { Fragment, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import AddDepartment from "./AddDepartment";
import axios from "axios";
import { API, formatDate } from "../../Host";
import logo from "../../assets/images/logo1.png"

const Department = () => {
  const [isModal, setIsModal] = useState(false);
  const [ExistingOrganiZations, setExistingOrganiZations] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [department, setDepartmnent] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/department/get`)
      .then((response) => {
        setDepartmnent(response.data.data);

        const filteredCenters = response.data.data.filter((dept) =>
          Object.values(dept).some((value) =>
            value.toString().toLowerCase().includes(searchValue.toLowerCase())
          )
        );

        setTotalPages(Math.ceil(filteredCenters.length / itemsPerPage));
        const lastIndex = currentPage * itemsPerPage;
        const firstIndex = lastIndex - itemsPerPage;

        setCurrentItems(filteredCenters.slice(firstIndex, lastIndex));
        fetchExistingOrganiZations();
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchValue, currentPage]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handlerefresh = () => {
    axios.get(`${API}/department/get`).then((response) => {
      setDepartmnent(response.data.data);

      const filteredCenters = response.data.data.filter((dept) =>
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

  const toggleCloseModal = () => {
    setIsModal(!isModal);
  };

  const fetchExistingOrganiZations = async () => {
    try {
      const response = await axios.get(`${API}/organization/get`);
      const responseData = response.data.data;
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

  return (
    <Fragment>
      <div className="  bg-blue-100 overflow-y-auto no-scrollbar">
        <div className="h-screen">
          <div className="flex flex-row md:justify-end gap-3 p-2 mt-3 mx-8 flex-wrap">
            <div className="flex items-center gap-3 bg-white py-1.5 px-3 rounded-full">
              <IoMdSearch className="text-xl" />
              <input
                type="search"
                className="outline-none bg-transparent text-base"
                placeholder="Search Department"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <a href="#">
              <button className="flex gap-2  items-center border-2 font-lexend border-blue-500 bg-slate-100 text-blue-500 rounded-full px-3 py-1.5 justify-center">
                {" "}
                <FaPlus />
                Bulk Upload
              </button>
            </a>
            <a href="#">
              <button className="flex gap-2 items-center border-2 font-lexend bg-slate-100 text-black rounded-full p-2 w-32 justify-between">
                {" "}
                CSV <RiArrowDropDownLine />
              </button>
            </a>
          </div>
          <div className="flex justify-between items-center my-2 mx-8 gap-1 flex-wrap">
            <h1 className="md:text-2xl text-lg font-medium  font-lexend">
              Department
            </h1>
            <a href="#">
              <button
                className="flex  gap-2  items-center border-2 bg-blue-500 text-white font-lexend rounded-full p-2.5 w-fit justify-between"
                onClick={toggleModal}
              >
                <FaPlus /> Add Department
              </button>
            </a>
          </div>

          <div className="bg-white mx-4 rounded-lg my-3 overflow-x-auto h-3/5 no-scrollbar">
            <table className="w-full  ">
              <thead className="">
                <tr className="border-b-2 border-gray-300">
                  <th className="">
                    <p className="flex gap-2 items-center mx-4 my-2 font-lexend justify-center font-semibold whitespace-nowrap">
                      Department Name <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th className="">
                    <p className="flex gap-2 items-center mx-4 my-2 font-lexend justify-center font-semibold whitespace-nowrap">
                      Org Name <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center font-semibold  whitespace-nowrap">
                      Status <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center font-semibold whitespace-nowrap">
                      CreatedBy <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center font-semibold whitespace-nowrap">
                      CreatedAt <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center font-semibold whitespace-nowrap">
                      Last UpdatedAt <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="text-center mx-4 my-3 font-semibold font-lexend  whitespace-nowrap">
                      Action
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItemsOnPage.map((dept, index) => (
                  <tr className="border-b-2 border-gray-300" key={index}>
                    <td>
                      <div className="flex gap-3 items-center justify-center mx-3 my-3 whitespace-nowrap">
                        <img
                          src={logo}
                          alt="logo"
                          className="w-9 h-9"
                        />
                        <p className="font-lexend "> {dept.dept_name}</p>
                      </div>
                    </td>
                    <td className="">
                      <p className=" mx-4 my-2 font-lexend text-center whitespace-nowrap">
                        {dept.org_name}
                      </p>
                    </td>
                    <td>
                      <p className=" mx-4  my-2 font-lexend text-center whitespace-nowrap">
                        {dept.status}
                      </p>
                    </td>
                    <td>
                      <p className=" mx-4  my-2  font-lexend text-center whitespace-nowrap">
                        {dept.created_by_user}
                      </p>
                    </td>
                    <td>
                      <p className=" text-center mx-4  my-2 font-lexend whitespace-nowrap ">
                        {formatDate(dept.createdAt)}
                      </p>
                    </td>
                    <td>
                      <p className="text-center mx-4  my-2 font-lexend whitespace-nowrap">
                        {formatDate(dept.updatedAt)}
                      </p>
                    </td>
                    <td>
                      <p className="flex justify-center mx-4 my-3">
                        <BsThreeDotsVertical />
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" my-3 mb-5 mx-7">
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
                    next
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
    </Fragment>
  );
};

export default Department;
