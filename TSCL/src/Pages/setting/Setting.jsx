import React, { Fragment, useState,useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddRole from "./AddRole";
import { API, formatDate } from "../../Host";
import axios from "axios";
import { IoMdSearch } from "react-icons/io";
import decryptData from "../../Decrypt";


const Settings = () => {
  const [isModal, setIsModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [role, setRole] = useState([]);
  const token = sessionStorage.getItem('token');

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
      .get(`${API}/role/get`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      .then((response) => {
        const reponseData = decryptData(response.data.data)
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
  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredCenters = role.filter((roles) =>
    Object.values(roles).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const currentItemsOnPage = filteredCenters.slice(firstIndex, lastIndex);
  return (
    <Fragment>
      <div className="  bg-blue-100 overflow-y-auto no-scrollbar">
        <div className="h-screen mt-10">
          <div className="flex justify-between items-center my-2 mx-8 flex-wrap gap-3">
            <h1 className="md:text-xl text-lg font-medium "> Roles</h1>
            <div className="flex items-center  gap-3 flex-wrap">
            <div className="flex items-center gap-3 bg-white px-2 py-1.5 rounded-full ">
              <IoMdSearch className="text-xl" />
              <input
                type="search"
                className="outline-none bg-transparent text-base"
                placeholder="Search User"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
              <button className="flex flex-row-2 gap-2  font-lexend items-center border-2 bg-blue-500 text-white rounded-full py-1.5 w-fit justify-between px-3 md:text-base text-sm" onClick={()=>setIsModal(true)}>
                <FaPlus /> Add Role
              </button>
              </div>
           
          </div>

          <div className="bg-white mx-4 rounded-lg my-3 h-3/5 ">
            
            <div className="overflow-x-auto  no-scrollbar">
            <table className="w-full  mt-3">
              <thead className=" border-b-2 border-gray-300">
                
                <tr className="border-b-2 border-gray-300">
                  <th className="">
                  <p className=" mx-6 my-2 font-lexend font-semibold whitespace-nowrap">
                      # 
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font- whitespace-nowrap">
                      Role Name <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center mx-1.5  my-2 font-lexend justify-start font-semibold whitespace-nowrap">
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
                      UpdatedAt <RiExpandUpDownLine />
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
                {currentItemsOnPage.map((roles,index)=>(
                <tr className="border-b-2 border-gray-300" key={index}>
                  <td className="">
                    <p className=" mx-3 my-2 font-lexend text-center whitespace-nowrap text-sm">
                    {firstIndex + index + 1 < 10
                            ? `0${firstIndex + index + 1}`
                            : firstIndex + index + 1}
                    </p>
                  </td>
                  <td>
                    <p className="mx-1.5  my-2 font-lexend text-start whitespace-nowrap text-sm">
                     {roles.role_name}
                    </p>
                  </td>
                  <td>
                    <p className=" mx-1.5  my-2  font-lexend text-start whitespace-nowrap text-sm">
                    {roles.status}
                    </p>
                  </td>
                  <td>
                    <p className="text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm">
                    {roles.created_by_user}
                    </p>
                  </td>
                  <td>
                    <p className="text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm">
                     {formatDate(roles.createdAt)}
                    </p>
                  </td>
                  <td>
                    <p className="text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm">
                    {formatDate(roles.updatedAt)}
                    </p>
                  </td>
                  <td>
                    <p className="flex justify-center mx-1.5 my-2 whitespace-nowrap">
                      <BsThreeDotsVertical />
                    </p>
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
                  {firstIndex + 1} to {Math.min(lastIndex, role.length)}
                </span>{" "}
                of <span className="text-gray-900">{role.length} entries</span>
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
      {isModal && <AddRole toggleModal={toggleModal} handlerefresh={handlerefresh}/>}
    </Fragment>
  );
};

export default Settings;
