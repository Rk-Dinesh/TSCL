import React, { Fragment, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import AddWard from "./AddWard";
import { API, formatDate } from "../../../Host";
import axios from "axios";

const Ward = () => {
  const [isModal, setIsModal] = useState(false);
  const [ExistingZones, setExistingZones] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [ward, setWard] = useState([])

  useEffect(() => {
    axios
      .get(`${API}/ward/get`)
      .then((response) => {
        setWard(response.data.data);

        const filteredCenters = response.data.data.filter((wards) =>
          Object.values(wards).some((value) =>
            value.toString().toLowerCase().includes(searchValue.toLowerCase())
          )
        );

        setTotalPages(Math.ceil(filteredCenters.length / itemsPerPage));
        const lastIndex = currentPage * itemsPerPage;
        const firstIndex = lastIndex - itemsPerPage;

        setCurrentItems(filteredCenters.slice(firstIndex, lastIndex));
        fetchExistingZones();
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
    axios.get(`${API}/ward/get`).then((response) => {
      setWard(response.data.data);

      const filteredCenters = response.data.data.filter((wards) =>
        Object.values(wards).some((value) =>
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

  const fetchExistingZones = async () => {
    try {
      const response = await axios.get(`${API}/zone/get`);
      const responseData = response.data.data;
      // console.log("fetch", responseData);

      setExistingZones(responseData);
    } catch (error) {
      console.error("Error fetching existing roles:", error);
    }
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredCenters = ward.filter((wards) =>
    Object.values(wards).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const currentItemsOnPage = filteredCenters.slice(firstIndex, lastIndex);


  return (
    <Fragment>
      <div className="  bg-blue-100 overflow-y-auto no-scrollbar">
        <div className="h-screen">
        <div className="flex flex-row justify-end gap-3 p-2 mt-3 mx-8">
        <div className="flex items-center gap-3 bg-white px-2 rounded-full">
              <IoMdSearch className="text-xl" />
              <input
                type="search"
                className="outline-none bg-transparent text-base"
                placeholder="Search Ward"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          <a href="#">
            <button className="flex gap-2 items-center border-2 border-blue-500 font-lexend bg-slate-100 text-blue-500 rounded-full p-2 w-40 justify-center">
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
          <h1 className="text-2xl font-medium ">Locality</h1>

          <button
            className="flex flex-row-2 gap-2  font-lexend items-center border-2 bg-blue-500 text-white rounded-full py-2 px-3 justify-between"
            onClick={toggleModal}
          >
            <FaPlus /> Add New Ward
          </button>
        </div>

        <div className="bg-white mx-6 rounded-lg my-3 overflow-x-auto h-3/5 no-scrollbar">
          <table>
            <thead>
            <th className="pt-4  pb-2 px-4 font-medium font-lexend text-lg whitespace-nowrap">
              Ward Catogories
            </th>
            </thead>
          </table>
          <table className="w-full  ">
            <thead className=" border-b-2 border-gray-300">
              <tr className="border-b-2 border-gray-300">
                <th className="">
                  <p className="flex gap-2 items-center justify-center mx-4 my-2 font-lexend font-semibold">
                    Ward <RiExpandUpDownLine />
                  </p>
                </th>
                <th className="">
                  <p className="flex gap-2 items-center justify-center mx-4 my-2 font-lexend font-semibold">
                    Zone <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center justify-center mx-4  my-2 font-lexend font-semibold">
                    CreatedBy <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center justify-center mx-4  my-2 font-lexend font-semibold">
                    CreatedAt
                    <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center justify-center mx-4  my-2 font-lexend font-semibold">
                    UpdatedAt
                    <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="text-center mx-4 my-3 font-semibold font-lexend">
                    Action
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItemsOnPage.map((wards,index)=>(
              <tr className="border-b-2 border-gray-300" key={index}>
                <td className="">
                  <p className="text-center mx-4 my-2 font-lexend whitespace-nowrap">{wards.ward_name}</p>
                </td>
                <td className="">
                  <p className="text-center mx-4 my-2 font-lexend whitespace-nowrap">{wards.zone_name}</p>
                </td>
                <td>
                  <p className="text-center mx-4  my-2 font-lexend whitespace-nowrap">{wards.created_by_user}</p>
                </td>
                <td>
                  <p className="text-center mx-4  my-2  font-lexend whitespace-nowrap">
                    {formatDate(wards.createdAt)}
                  </p>
                </td>
                <td>
                  <p className=" text-center mx-4  my-2 font-lexend whitespace-nowrap">
                  {formatDate(wards.updatedAt)}
                  </p>
                </td>
                <td>
                  <p className=" flex justify-center mx-4 my-3">
                    <BsThreeDotsVertical />
                  </p>
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
                {firstIndex + 1} to {Math.min(lastIndex, ward.length)}
              </span>{" "}
              of <span className="text-gray-900">{ward.length} entries</span>
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
        <AddWard
          toggleModal={toggleModal}
          toggleCloseModal={toggleCloseModal}
          ExistingZones={ExistingZones}
          handlerefresh={handlerefresh}
        />
      )}
    </Fragment>
  );
};

export default Ward;
