import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo1.png";
import axios from "axios";
import { API } from "../../Host";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
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
} from "docx";
import { AiOutlineFileWord } from "react-icons/ai";


const PeriodicWise = () => {
  const [report, setReport] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}/new-grievance/complaintsByZoneAndPeriod`
        );
        setReport(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const departments = Array.from(
    new Set(
      report
        .flatMap((data) => data.departmentCounts.map((dept) => dept.department))
    )
  );
  
  const handleExportCSV = () => {
    const csvData = [];
    csvData.push([
      "S.No",
      "Name",
      "ID",
      "Department",
      "Zone",
      "Ward",
      "Received",
      "Resolved",
      "Pending",
    ]);

    report.forEach((data, index) => {
      csvData.push([
        index + 1,
        data.employeeName,
        data.employeeId,
        data.department,
        data.zone,
        data.ward,
        data.received,
        data.resolved,
        data.pending,
      ]);
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvData.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Employee_Wise_Report.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const element = document.getElementById("report-section");

    // Options for the html2pdf library
    const options = {
      margin: 2, // Margin for the PDF
      filename: "WardWiseReport.pdf", // Default filename
      image: { type: "jpeg", quality: 0.75 }, // Image settings for html2canvas
      html2canvas: { scale: 1.5 }, // Higher scale for better resolution
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" }, // PDF settings
    };

    // Generate PDF using html2pdf.js
    html2pdf().from(element).set(options).save(); // Save the generated PDF
  };

  const handleExportWord = () => {
    const tableRows = report.map((data, index) => {
      return new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(String(index + 1))] }),
          new TableCell({ children: [new Paragraph(data.employeeName)] }),
          new TableCell({
            children: [new Paragraph(String(data.employeeId))],
          }),
          new TableCell({
            children: [new Paragraph(String(data.department))],
          }),
          new TableCell({
            children: [new Paragraph(String(data.zone))],
          }),
          new TableCell({
            children: [new Paragraph(String(data.ward))],
          }),
          new TableCell({
            children: [new Paragraph(String(data.received))],
          }),
          new TableCell({
            children: [new Paragraph(String(data.closed))],
          }),
          new TableCell({
            children: [new Paragraph(String(data.pending))],
          }),
        ],
      });
    });

    const table = new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph("S.No")] }),
            new TableCell({ children: [new Paragraph("Name")] }),
            new TableCell({ children: [new Paragraph("ID")] }),
            new TableCell({ children: [new Paragraph("Department")] }),
            new TableCell({ children: [new Paragraph("Zone")] }),
            new TableCell({ children: [new Paragraph("Ward")] }),
            new TableCell({ children: [new Paragraph("Received")] }),
            new TableCell({ children: [new Paragraph("Resolved")] }),
            new TableCell({ children: [new Paragraph("Pending")] }),
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
              text: "Employee Wise Report",
              heading: "Heading2",
              alignment: AlignmentType.CENTER,
            }),
            table,
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "Employee_Wise_Report.docx");
    });
  };

  const setDocs = (event) => {
    setSelectedDoc(event.target.value);
  };


  return (
    <div className="mx-3 my-3 overflow-y-auto ">
      <div
        className="max-w-5xl mx-auto my-8 bg-white p-2 shadow-lg rounded-lg font-lexend "
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
                Periodic Wise report
              </p>
            
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
      <th className="border border-gray-300 px-4 py-3 text-left">S.No</th>
      <th className="border border-gray-300 px-4 py-3 text-center">Zone</th>
      <th className="border border-gray-300 px-4 py-3 text-center ">Opening Balance</th>
      <th className="border border-gray-300 px-4 py-3 text-center ">During This Week</th>
      <th className="border border-gray-300 px-4 py-3 text-center ">Total Pending</th>
      <th className="border border-gray-300 px-4 py-3 text-center ">Below 30 Days</th>
      <th className="border border-gray-300 px-4 py-3 text-center ">30-60 Days</th>
      <th className="border border-gray-300 px-4 py-3 text-center ">60-90 Days</th>
      <th className="border border-gray-300 px-4 py-3 text-center ">Above 90 Days</th>
      {departments.map((dept, index) => (
        <th
          key={index}
          className="border border-gray-300 px-4 py-3 text-center whitespace-nowrap"
        >
          {dept}
        </th>
      ))}
     
    </tr>
  </thead>
  <tbody>
    {report.map((data, index) => (
      <tr key={index} className="text-gray-500">
        <td className="border border-gray-300 px-4 py-3 text-center">
          {index + 1}
        </td>
        <td className="border border-gray-300 px-4 py-3 text-center whitespace-nowrap">
          {data.zone}
        </td>
        <td className="border border-gray-300 px-4 py-3 text-center">
          {data.openingBalance}
        </td>
        <td className="border border-gray-300 px-4 py-3 text-center">
          {data.duringThisWeek}
        </td>
        <td className="border border-gray-300 px-4 py-3 text-center">
          {data.totalPending}
        </td>
        <td className="border border-gray-300 px-4 py-3 text-center">
          {data.below30Days}
        </td>
        <td className="border border-gray-300 px-4 py-3 text-center">
          {data.between30and60Days}
        </td>
        <td className="border border-gray-300 px-4 py-3 text-center">
          {data.between60and90Days}
        </td>
        <td className="border border-gray-300 px-4 py-3 text-center">
          {data.above90Days}
        </td>
        {departments.map((dept, deptIndex) => {
          const deptData = data.departmentCounts.find(
            (d) => d.department === dept
          );
          return (
            <td
              key={deptIndex}
              className="border border-gray-300 px-4 py-3 text-center"
            >
              {deptData ? deptData.count : 0}
            </td>
          );
        })}
        
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

export default PeriodicWise;
