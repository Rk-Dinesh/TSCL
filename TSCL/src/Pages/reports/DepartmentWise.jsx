import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo1.png";
import axios from "axios";
import { API } from "../../Host";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import { HiOutlineDocument } from "react-icons/hi";
import { PiFileCsvLight, PiFilePdfDuotone } from "react-icons/pi";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  AlignmentType,
  ImageRun,
  WidthType,
} from "docx";
import { AiOutlineFileWord } from "react-icons/ai";
import { fetchDepartment } from "../redux/slice/department";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";

const DepartmentWise = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const [report, setReport] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}/new-grievance/departmentGrievanceCounts`
        );
        setReport(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    dispatch(fetchDepartment());
  }, []);

  const Department = useSelector((state) => state.department);

  const handleSubmit = async () => {
    if (!startDate || !endDate || !department) {
      setError("All fields are required.");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setError("End date cannot be before start date.");
      return;
    }

    if (new Date(endDate) > new Date()) {
      setError("End date cannot be in the future.");
      return;
    }

    setError("");
    const formData = {
      startDate,
      endDate,
      department,
    };

    try {
      const response = await axios.get(
        `${API}/new-grievance/departmentGrievanceCounts`,
        {
          params: formData,
        }
      );
      setReport(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("There was an error fetching the data.");
    }
  };

  const handleExportCSV = () => {
    const csvData = [];
    csvData.push([
      "S.No",
      "Department",
      "Total Received",
      "Resolved",
      "Escalated",
      "Pending",
      "Repeated Received",
      "Repeated Resolved",
      "Repeated Escalated",
    ]);

    report.forEach((data, index) => {
      csvData.push([
        index + 1,
        data.department,
        data.total.count,
        data.total.resolved,
        data.total.escalated,
        data.total.pending,
        data.repeated.count,
        data.repeated.resolved,
        data.repeated.escalated,
      ]);
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvData.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Department_Wise_Report.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const input = document.getElementById("report-section");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 10, 20, pdfWidth - 20, pdfHeight - 20);
      pdf.save("DepartmentWiseReport.pdf");
    });
  };

  const handleExportWord = async () => {
    const tableRows = report.map((data, index) => {
      return new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(String(index + 1))] }),
          new TableCell({ children: [new Paragraph(data.department)] }),
          new TableCell({
            children: [new Paragraph(String(data.total.count))],
          }),
          new TableCell({
            children: [new Paragraph(String(data.total.resolved))],
          }),
          new TableCell({
            children: [new Paragraph(String(data.total.escalated))],
          }),
          new TableCell({
            children: [new Paragraph(String(data.total.pending))],
          }),
          new TableCell({
            children: [new Paragraph(String(data.repeated.count))],
          }),
          new TableCell({
            children: [new Paragraph(String(data.repeated.resolved))],
          }),
          new TableCell({
            children: [new Paragraph(String(data.repeated.escalated))],
          }),
        ],
      });
    });

    const table = new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph("S.No")] }),
            new TableCell({ children: [new Paragraph("Department")] }),
            new TableCell({ children: [new Paragraph("Total Received")] }),
            new TableCell({ children: [new Paragraph("Total Resolved")] }),
            new TableCell({ children: [new Paragraph("Total Escalated")] }),
            new TableCell({ children: [new Paragraph("Total Pending")] }),
            new TableCell({ children: [new Paragraph("Repeated Received")] }),
            new TableCell({ children: [new Paragraph("Repeated Resolved")] }),
            new TableCell({ children: [new Paragraph("Repeated Escalated")] }),
          ],
        }),
        ...tableRows,
      ],
    });

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "Madurai Municipal Corporation",
              heading: "Heading1",
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              text: "Department Wise Report",
              heading: "Heading2",
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              text: `Report Date Range: ${startDate} to ${endDate}`,
              alignment: AlignmentType.CENTER,
            }),
            table,
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "Department_Wise_Report.docx");
    });
  };

  const setDocs = (event) => {
    setSelectedDoc(event.target.value);
  };

  return (
    <div className="mx-3 my-3 overflow-y-auto ">
      <div className="bg-white rounded-lg font-lexend py-3 px-8">
        <h3 className="text-primary font-semibold text-lg my-2">
          Department Wise Report
        </h3>
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-4">
            <label htmlFor="" className="block my-2 text-slate-700">
              Select Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="outline-none border-2 border-gray-300 rounded-md py-2.5 px-5 w-full text-gray-500"
            />
          </div>
          <div className="col-span-4">
            <label htmlFor="" className="block my-2 text-slate-700">
              Select End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              max={new Date().toISOString().split("T")[0]}
              className="outline-none border-2 border-gray-300 rounded-md py-2.5 px-5 w-full text-gray-500"
            />
          </div>
          <div className="col-span-4">
            <label htmlFor="" className="block my-2 text-slate-700">
              Select Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="outline-none border-2 border-gray-300 rounded-md py-2.5 px-4 w-full text-gray-500"
            >
              <option value="">Select a Department</option>
              {Department.data &&
                Department.data.map((option, index) => (
                  <option key={index} value={option.dept_name}>
                    {option.dept_name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {error && <p className="text-red-500 my-2">{error}</p>}
        <div className="flex justify-end items-center gap-3 my-3">
          <select
            name="export-options"
            id="export-options"
            className="outline-none border-2 text-primary border-gray-300 rounded-md py-1.5 px-3 w-32"
            onChange={setDocs}
          >
            <option value="">Export</option>
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
            <option value="word">Word</option>
          </select>
          {selectedDoc === null && (
            <HiOutlineDocument className="text-2xl text-gray-500" />
          )}
          {selectedDoc === "csv" && (
            <PiFileCsvLight
              className="text-3xl text-gray-500"
              onClick={() => handleExportCSV()}
            />
          )}
          {selectedDoc === "pdf" && (
            <PiFilePdfDuotone
              className="text-3xl text-gray-500"
              onClick={() => handleExportPDF()}
            />
          )}
          {selectedDoc === "word" && (
            <AiOutlineFileWord
              className="text-3xl text-gray-500"
              onClick={() => handleExportWord()}
            />
          )}
          <button
            onClick={handleSubmit}
            className="w-32 py-1.5 text-white outline-none bg-primary rounded-md"
          >
            Continue
          </button>
        </div>
      </div>
      <div
        className="max-w-4xl mx-auto my-6 bg-white p-2 shadow-lg rounded-lg font-lexend "
        id="report-section"
      >
        <div className="bg-blue-800 text-white p-4 -m-2 rounded-t-lg">
          <div className="flex items-start justify-between mt-3 mx-6">
            <img src={logo} alt="Image" className="w-20 h-20 -mt-3" />
            <div>
              <h1 className="text-lg font-semibold text-center">
                Madurai Municipal Corporation
              </h1>
              <p className="text-sm text-center mt-2 text-gray-300">
                Department Wise report
              </p>
              {startDate && (
                <p className="text-sm text-center mt-2 text-gray-300">
                  {startDate} - {endDate}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm">
                Date:{" "}
                <span className="font-medium">
                  {new Date().toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="overflow-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm mt-4">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th
                  className="border border-gray-300 px-4 py-3 text-left"
                  rowSpan="1"
                >
                  S.no
                </th>
                <th
                  className="border border-gray-300 px-4 py-3 text-left "
                  rowSpan="1"
                >
                  Department
                </th>
                <th
                  className="border border-gray-300 px-4 py-3 text-center"
                  colSpan="4"
                >
                  Total
                </th>
                <th
                  className="border border-gray-300 px-4 py-3 text-center"
                  colSpan="3"
                >
                  Repeated
                </th>
              </tr>
              <tr className="bg-gray-100 text-gray-500">
                <th className="border border-gray-300 px-4 py-3 text-center"></th>
                <th className="border border-gray-300 px-4 py-3 text-center"></th>
                <th className="border border-gray-300 px-4 py-3 text-center">
                  Received
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center">
                  Resolved
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center">
                  Escalated
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center">
                  Pending
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center">
                  Received
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center">
                  Resolved
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center">
                  Escalated
                </th>
              </tr>
            </thead>
            <tbody>
              {report.map((data, index) => (
                <tr key={index} className="text-gray-500">
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    {data.department}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center underline text-blue-700"
                    onClick={() =>
                      navigate(`/reportdata?dept_name=${data.department}`)
                    }>
                    {data.total.count}
                  </td>
                  <td
                    className="border border-gray-300 px-4 py-3 text-center underline text-blue-700"
                    onClick={() =>
                      navigate(`/reportdata?dept_name=${data.department}&exclude_closed=false`)
                    }
                  >
                    {data.total.resolved}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center underline text-blue-700"
                  onClick={() =>
                    navigate(`/reportdata?dept_name=${data.department}&isEsacalted=yes`)
                  }>
                    {data.total.escalated}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center underline text-blue-700"
                    onClick={() =>
                      navigate(`/reportdata?dept_name=${data.department}&exclude_closed=true`)
                    }>
                    {data.total.pending}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center underline text-blue-700"
                  onClick={() =>
                    navigate(`/reportdata?dept_name=${data.department}&isReopened=yes`)
                  }>
                    {data.repeated.count}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center underline text-blue-700"
                   onClick={() =>
                    navigate(`/reportdata?dept_name=${data.department}&isReopened=yes&exclude_closed=false`)
                  }
                  >
                    {data.repeated.resolved}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center underline text-blue-700"
                       onClick={() =>
                        navigate(`/reportdata?dept_name=${data.department}&isEsacalted=yes&isReopened=yes`)
                      }>
                    {data.repeated.escalated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-gray-600 text-xs my-3 text-center">
          <p>
            Report generated on {new Date().toLocaleDateString()} &nbsp;&nbsp; |
            &nbsp;&nbsp; Powered by Madurai Municipal Corporation
          </p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentWise;
