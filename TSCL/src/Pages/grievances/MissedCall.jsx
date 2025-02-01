import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { API } from "../../Host";
import axios from "axios";

const MissedCall = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [originalCalls, setOriginalCalls] = useState([]); 
  const [filteredCalls, setFilteredCalls] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const agentPhone = localStorage.getItem('agentphone')

  useEffect(() => {
    const fetchDataFile = async () => {
      try {
        const response = await axios.get(
          `${API}/alohaa/missedcall?receiver_number=${agentPhone}`
        );
        const responseData = response.data.data;
        setOriginalCalls(responseData); 
        setFilteredCalls(responseData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchDataFile();
  }, []);


  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {

      setFilteredCalls(originalCalls);
    } else {
      const filtered = originalCalls.filter(
        (call) =>
          call.caller_number.includes(term) || call.receiver_number.includes(term)
      );
      setFilteredCalls(filtered);
    }

    setCurrentPage(1); 
  };


  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredCalls.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredCalls.length / entriesPerPage);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const handleEntriesPerPageChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

  const exportToCSV = () => {
    const headers = ["Caller", "Receiver", "Call Type", "Time", "Date"];
    const csvContent =
      headers.join(",") +
      "\n" +
      filteredCalls
        .map((call) => {
          const dateObj = new Date(call.received_at);
          return [
            call.caller_number,
            call.receiver_number,
            call.call_type,
            dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            dateObj.toLocaleDateString(),
          ].join(",");
        })
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "missed_calls.csv");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const headers = [["Caller", "Receiver", "Call Type", "Time", "Date"]];
    const data = filteredCalls.map((call) => {
      const dateObj = new Date(call.received_at);
      return [
        call.caller_number,
        call.receiver_number,
        call.call_type,
        dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        dateObj.toLocaleDateString(),
      ];
    });

    doc.autoTable({
      head: headers,
      body: data,
      theme: "striped",
    });

    doc.save("missed_calls.pdf");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-lexend">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">📞 Missed Calls</h2>

      <div className="flex flex-col md:flex-row justify-between items-center mb-3 mx-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Show</span>
          <select
            value={entriesPerPage}
            onChange={handleEntriesPerPageChange}
            className="outline-none p-1.5 rounded-md text-sm"
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm text-gray-700">entries</span>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by number..."
              value={searchTerm}
              onChange={handleSearch}
              className="border p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilteredCalls(originalCalls); 
                }}
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>
          <button
            onClick={exportToCSV}
            className="bg-blue-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-600"
          >
            Export CSV
          </button>
          <button
            onClick={exportToPDF}
            className="bg-red-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-red-600"
          >
            Export PDF
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden my-3">
        <div className="overflow-x-auto max-h-96">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 text-left">SI.No</th>
                <th className="py-3 px-4 text-left">Caller</th>
                <th className="py-3 px-4 text-left">Receiver</th>
                <th className="py-3 px-4 text-left">Call Type</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.length > 0 ? (
                currentEntries.map((call, index) => {
                  const dateObj = new Date(call.received_at);
                  return (
                    <tr
                      key={call._id}
                      className="border-b hover:bg-gray-50 transition-colors text-slate-800"
                    >
                      <td className="py-3 px-4">
                        {indexOfFirstEntry + index + 1 < 10
                          ? `0${indexOfFirstEntry + index + 1}`
                          : indexOfFirstEntry + index + 1}
                      </td>
                      <td className="py-3 px-4">{call.caller_number}</td>
                      <td className="py-3 px-4">{call.receiver_number}</td>
                      <td className="py-3 px-4 text-red-500 font-semibold">
                        MissedCall
                      </td>
                      <td className="py-3 px-4">
                        {dateObj.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-3 px-4">{dateObj.toLocaleDateString()}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-500">
                    No missed calls found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10">
        <span className="text-sm text-gray-700">
          Showing {indexOfFirstEntry + 1} to{" "}
          {Math.min(indexOfLastEntry, filteredCalls.length)} of{" "}
          {filteredCalls.length} entries
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`px-4 py-1 text-sm ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              } rounded-md`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissedCall;