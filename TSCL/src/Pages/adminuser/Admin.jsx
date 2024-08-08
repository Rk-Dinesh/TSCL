import React, { Fragment, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import AddAdmin from "./AddAdmin";
import axios from "axios";
import { API } from "../../Host";

const Admin = () => {
  const [isModal, setIsModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [admin, setAdmin] = useState([]);

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
      .get(`${API}/user/get`)
      .then((response) => {
        setAdmin(response.data.data);

        const filteredCenters = response.data.data.filter((admins) =>
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

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredCenters = admin.filter((admins) =>
    Object.values(admins).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const currentItemsOnPage = filteredCenters.slice(firstIndex, lastIndex);
  return (
    <Fragment>
      <div className="  bg-blue-100 overflow-y-auto no-scrollbar">
        <div className="h-screen">
          <div className="flex flex-row justify-end gap-3 p-2 mt-3 mx-8">
            <p className="flex items-center gap-3 bg-white px-2 rounded-full">
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
              <button className="flex gap-2 items-center border-2 border-blue-500  font-lexend bg-slate-100 text-blue-500 rounded-full p-2 w-40 justify-center">
                {" "}
                <FaPlus />
                Bulk Upload
              </button>
            </a>
            <a href="#">
              <button className="flex gap-2 items-center border-2 bg-slate-100  font-lexend text-black rounded-full p-2 w-32 justify-between">
                {" "}
                CSV <RiArrowDropDownLine />
              </button>
            </a>
          </div>
          <div className="flex justify-between items-center my-2 mx-8">
            <h1 className="text-2xl font-medium   font-lexend">
              Admin Details
            </h1>
            <a href="#">
              <button
                className="flex flex-row-2 gap-2  items-center border-2  font-lexend bg-blue-500 text-white rounded-full p-2.5 w-fit justify-between"
                onClick={toggleModal}
              >
                <FaPlus /> Add New Admin
              </button>
            </a>
          </div>

          <div className="bg-white mx-6 rounded-lg my-3 overflow-x-auto h-3/5 no-scrollbar">
          <table>
            <thead>
            <th className=" pt-3 pb-1.5 px-4 font-semibold text-xl font-lexend">
                Admin
              </th>
            </thead>
          </table>
            <table className="w-full  ">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="py-2">
                    <div className="flex gap-2 items-center justify-center mx-3 my-2 font-lexend font-semibold whitespace-nowrap">
                      S.no <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="flex gap-2 items-center justify-center mx-3  my-2 font-lexend font-semibold whitespace-nowrap">
                      Username <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="flex gap-2 items-center justify-center mx-3  my-2 font-lexend font-semibold whitespace-nowrap">
                      Department
                      <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="flex gap-2 items-center justify-center mx-3  my-2 font-lexend font-semibold whitespace-nowrap">
                      Phone
                      <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="flex gap-2 items-center justify-center mx-3  my-2 font-lexend font-semibold whitespace-nowrap">
                      Email
                      <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="flex gap-2 items-center justify-center mx-3  my-2 font-lexend font-semibold whitespace-nowrap">
                      Status
                      <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="flex gap-2 items-center justify-center mx-3  my-2 font-lexend font-semibold whitespace-nowrap">
                      Role
                      <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="flex gap-2 items-center justify-center mx-3  my-2 font-lexend font-semibold whitespace-nowrap">
                      CreatedBy
                      <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="mx-3 my-3 text-center font-lexend font-semibold whitespace-nowrap">
                      Action
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItemsOnPage.map((admins, index) => (
                  <tr className="border-b-2 border-gray-300">
                    <td className="">
                      <p className="items-center mx-4 my-2 font-lexend whitespace-nowrap">
                        {" "}
                        {firstIndex + index + 1 < 10
                          ? `0${firstIndex + index + 1}`
                          : firstIndex + index + 1}
                      </p>
                    </td>
                    <td>
                      <p className=" mx-3  my-2 font-lexend whitespace-nowrap text-center">
                        {admins.user_name}
                      </p>
                    </td>
                    <td>
                      <p className=" mx-3  my-2  font-lexend whitespace-nowrap text-center">
                        {admins.dept_name}
                      </p>
                    </td>
                    <td>
                      <p className="mx-3  my-2 font-lexend whitespace-nowrap text-center">
                        {admins.phone}
                      </p>
                    </td>
                    <td>
                      <p className="text-center mx-3  my-2 font-lexend whitespace-nowrap ">
                        {admins.email}
                      </p>
                    </td>
                    <td>
                      <p className="text-center mx-3  my-2 font-lexend whitespace-nowrap ">
                        {admins.status}
                      </p>
                    </td>
                    <td>
                      <p className="text-center mx-3  my-2 font-lexend whitespace-nowrap ">
                        {admins.role}
                      </p>
                    </td>
                    <td>
                      <p className="text-center mx-3  my-2 font-lexend whitespace-nowrap ">
                        {admins.created_by_user}
                      </p>
                    </td>
                    <td>
                      <div className="flex justify-center mx-3 my-3 whitespace-nowrap">
                        <BsThreeDotsVertical />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" my-5 mb-5 mx-7">
            <nav
              className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto font-alegerya">
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
        <AddAdmin toggleModal={toggleModal} handlerefresh={handlerefresh} />
      )}
    </Fragment>
  );
};

export default Admin;
