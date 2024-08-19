import React, { Fragment,useState,useEffect} from "react";
import { FaPlus } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import AddComplaint from "./AddComplaint";
import { API } from "../../Host";
import axios from "axios";

const Complaint = () => {
  const [isModal, setIsModal] = useState(false);
  const [ExistingRoles, setExistingRoles] = useState(null);
  const [ExistingDept, setExistingDept] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [complaint, setComplaint] = useState([]);

  useEffect(() => {
    handlerefresh();
    fetchExistingDepts();
    fetchExistingRoles();
  }, [searchValue, currentPage]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handlerefresh = () => {
    axios
      .get(`${API}/complaint/get`)
      .then((response) => {
        setComplaint(response.data.data);

        const filteredCenters = response.data.data.filter((comp) =>
          Object.values(comp).some((value) =>
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

  const fetchExistingRoles = async () => {
    try {
      const response = await axios.get(`${API}/role/get`);
      const responseData = response.data.data;
      setExistingRoles(responseData);
    } catch (error) {
      console.error("Error fetching existing Roles:", error);
    }
  };

  const fetchExistingDepts = async () => {
    try {
      const response = await axios.get(`${API}/department/get`);
      const responseData = response.data.data;
      setExistingDept(responseData);
    } catch (error) {
      console.error("Error fetching existing Department:", error);
    }
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredCenters = complaint.filter((comp) =>
    Object.values(comp).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const currentItemsOnPage = filteredCenters.slice(firstIndex, lastIndex);
  return (
    <Fragment>
    <div className="  bg-blue-100 overflow-y-auto no-scrollbar">
      <div className="h-screen">
      <div className="flex flex-row md:justify-end gap-3 p-2 mt-3 mx-8 flex-wrap">
      <p className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full">
        <IoMdSearch className="text-xl"/>
        <input
                type="search"
                className="outline-none bg-transparent text-base"
                placeholder="Search Complaint"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
        </p>
        <a href="#">
          <button className="flex gap-2 items-center border-2 border-blue-500 font-lexend bg-slate-100 text-blue-500 rounded-full px-3 py-1.5 justify-center">
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
        <h1 className="md:text-xl text-lg font-medium ">Complaint Category</h1>
       
          <button className="flex flex-row-2 gap-2  font-lexend items-center border-2 bg-blue-500 text-white rounded-full p-2.5 w-fit justify-between md:text-base text-sm" onClick={toggleModal}>
            <FaPlus /> Add Complaint
          </button>
       
      </div>
      <div className="bg-white mx-4 rounded-lg my-3 overflow-x-auto h-3/5 no-scrollbar">
        <table className="w-full  ">
          <thead>
          <tr className="border-b-2 border-gray-300 py-1">
              <th className="py-2">
              <p className=" mx-6 my-2 font-lexend font-semibold whitespace-nowrap">
                      # 
                    </p>
              </th>
              <th>
                <p  className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                Complaint type <RiExpandUpDownLine />
                </p>
              </th>
              <th>
                <p  className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                Department<RiExpandUpDownLine />
                </p>
              </th>
              <th>
                <p  className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                   TAT Type<RiExpandUpDownLine />
                </p>
              </th>
              <th>
                <p  className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                   Duration<RiExpandUpDownLine />
                </p>
              </th>
              <th>
                <p  className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                   Priority<RiExpandUpDownLine />
                </p>
              </th>
              <th>
                <p  className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                   Escalation-1<RiExpandUpDownLine />
                </p>
              </th>
              <th>
                <p  className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                Escalation-2<RiExpandUpDownLine />
                </p>
              </th>
              <th>
                <p  className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                Escalation-3<RiExpandUpDownLine />
                </p>
              </th>
              <th>
                <p  className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                   Status<RiExpandUpDownLine />
                </p>
              </th>
              <th>
                <p  className="flex gap-2 items-center justify-start mx-1.5  my-2 font-lexend font-semibold whitespace-nowrap">
                  CreatedBy<RiExpandUpDownLine />
                </p>
              </th>
              <th>
                <p  className="mx-3 my-3 text-center font-lexend font-semibold whitespace-nowrap">
                  Action
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
           {currentItemsOnPage.map((complaints,index)=>(
              <tr className="border-b-2 border-gray-300" key={index}>
                <td >
                  <p className="text-center text-sm mx-3 my-2 font-lexend whitespace-nowrap">  {firstIndex + index + 1 < 10
                            ? `0${firstIndex + index + 1}`
                            : firstIndex + index + 1}
                            </p>
                </td>
                <td>
                  <p className="mx-1.5  my-2 font-lexend whitespace-nowrap text-start text-sm">{complaints.complaint_type_title}</p>
                </td>
                <td>
                  <p className="mx-1.5  my-2  font-lexend whitespace-nowrap text-start text-sm">{complaints.dept}</p>
                </td>
                <td>
                <p className="mx-1.5  my-2  font-lexend whitespace-nowrap text-start text-sm">
                {complaints.tat_type} 
                  </p>
                </td>
                <td>
                  <p className=" mx-1.5  my-2 font-lexend whitespace-nowrap text-start text-sm">
                  {complaints.tat_duration}
                  </p>
                </td>
                <td>
                  <p className="mx-1.5  my-2 font-lexend whitespace-nowrap text-start text-sm">
                  {complaints.priority}
                  </p>
                </td>
                <td >
                  <div className="mx-1.5 my-3 flex gap-3 items-center justify-start text-sm font-lexend">  
                  <p className=" whitespace-nowrap  bg-gray-100 px-2 py-1 rounded-full">
                  {complaints.escalation_l1} 
                  </p>
                  <p className="  whitespace-nowrap text-start text-sm ">
                  {complaints.role_l1}
                  </p>
                  </div>
                </td>
                
                <td >
                  <div className="mx-1.5 my-3 flex gap-3 items-center justify-start  font-lexend">  
                  <p className=" whitespace-nowrap bg-gray-100 px-2 py-1 rounded-full text-start text-sm">
                  {complaints.escalation_l2} 
                  </p>
                  <p className=" whitespace-nowrap ">
                  {complaints.role_l2}
                  </p>
                  </div>
                </td>

                <td >
                  <div className="mx-1.5 my-3 flex gap-3 items-center justify-start  font-lexend">  
                  <p className=" whitespace-nowrap bg-gray-100 px-2 py-1 rounded-full text-start text-sm ">
                  {complaints.escalation_l3} 
                  </p>
                  <p className=" whitespace-nowrap text-start text-sm ">
                  {complaints.role_l3}
                  </p>
                  </div>
                </td>


                <td>
                  <div className="mx-1.5  my-2 font-lexend whitespace-nowrap text-start text-sm">
                  {complaints.status}
                  </div>
                </td>
                <td>
                  <p className="fmx-1.5  my-2 font-lexend whitespace-nowrap text-start text-sm">
                  {complaints.created_by_user}
                  </p>
                </td>
                <td>
                  <p className="mx-1.5 my-3 flex justify-center whitespace-nowrap">
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
                  {firstIndex + 1} to {Math.min(lastIndex, complaint.length)}
                </span>{" "}
                of <span className="text-gray-900">{complaint.length} entries</span>
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
    {isModal && <AddComplaint toggleModal={toggleModal} handlerefresh={handlerefresh} ExistingDept={ExistingDept} ExistingRoles={ExistingRoles}/>}
    </Fragment>
  );
};

export default Complaint;
