import React, { Fragment, useState,useEffect} from "react";
import { FaPlus } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import AddUser from "./AddUser";
import axios from "axios";
import { API } from "../../Host";


const User = () => {
  const [isModal, setIsModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [user, setUser] = useState([]);

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
      .get(`${API}/public-user/get`)
      .then((response) => {
        setUser(response.data.data);

        const filteredCenters = response.data.data.filter((users) =>
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

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredCenters = user.filter((users) =>
    Object.values(users).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const currentItemsOnPage = filteredCenters.slice(firstIndex, lastIndex);

  return (
    <Fragment>
      <div className="  bg-blue-100 overflow-y-auto no-scrollbar">
        <div className="h-screen">
          <div className="flex flex-row md:justify-end gap-3 p-2 mt-3 mx-8 flex-wrap">
            <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full">
              <IoMdSearch className="text-xl" />
              <input
                type="search"
                className="outline-none bg-transparent text-base"
                placeholder="Search User"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
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
            <h1 className="md:text-2xl text-xl font-medium  items-center font-lexend">
              User Details
            </h1>
            <a href="#">
              <button
                className="flex flex-row-2 gap-2  items-center border-2  font-lexend bg-blue-500 text-white rounded-full p-2.5 w-fit justify-between md:text-base text-sm "
                onClick={toggleModal}
              >
                <FaPlus /> Add User Details
              </button>
            </a>
          </div>

          <div className="bg-white mx-4 rounded-lg my-3 overflow-x-auto h-3/5 no-scrollbar">
          <table>
            <thead>
            <th className=" pt-3 pb-1.5 px-4 font-semibold text-xl font-lexend">
                Public_User 
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
                      Public Username <RiExpandUpDownLine />
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
                      Verification Status
                      <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="mx-3 my-3 font-lexend font-semibold whitespace-nowrap">
                      Action
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
              {currentItemsOnPage.map((users,index)=>(
                <tr className="border-b-2 border-gray-300" key={index}>
                  <td className="">
                    <p className="text-center mx-3 my-2 font-lexend whitespace-nowrap">
                      
                    {firstIndex + index + 1 < 10
                            ? `0${firstIndex + index + 1}`
                            : firstIndex + index + 1}
                    </p>
                  </td>
                  <td>
                    <p className=" mx-3  my-2 font-lexend whitespace-nowrap text-center">
                     {users.public_user_name}
                    </p>
                  </td>
                  <td>
                    <p className=" mx-3  my-2 font-lexend whitespace-nowrap text-center">
                    {users.phone}
                    </p>
                  </td>
                  <td>
                    <p className="text-center mx-3  my-2 font-lexend whitespace-nowrap ">
                    {users.email}
                    </p>
                  </td>
                  <td>
                    <p className=" mx-3  my-2 font-lexend whitespace-nowrap text-center">
                    {users.user_status}
                    </p>
                  </td>
                  <td>
                    <p className="text-center mx-3  my-2 font-lexend whitespace-nowrap ">
                    {users.verification_status}
                    </p>
                  </td>

                  <td>
                    <p className="flex justify-center mx-3 my-3 whitespace-nowrap">
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
                  {firstIndex + 1} to {Math.min(lastIndex, user.length)}
                </span>{" "}
                of <span className="text-gray-900">{user.length} entries</span>
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
      {isModal && <AddUser toggleModal={toggleModal} handlerefresh={handlerefresh} />}
    </Fragment>
  );
};

export default User;
