import React, { useState } from "react";
import RequestJE from "./RequestJE";

function RequestJETab({permissions}) {
  const [activeTab, setActiveTab] = useState("tab1");
  const include = 'no';


  return (
    <div className="overflow-auto no-scrollbar">
      <ul className="flex mb-2 list-none justify-center mt-1">
        <li className="-mb-px mr-1">
          <a
            className={`text-white   font-medium rounded-sm text-sm px-5 py-1.5 text-center  ${
              activeTab === "tab1" ? "bg-gray-700" : "bg-gray-400"
            }`}
            onClick={() => setActiveTab("tab1")}
          >
            Current Grievances
          </a>
        </li>
        <li className="-mb-px mr-1">
          <a
            className={`text-white   font-medium rounded-sm text-sm px-5 py-1.5 text-center ${
              activeTab === "tab2" ? "bg-gray-700" : "bg-gray-400"
            }`}
            onClick={() => setActiveTab("tab2")}
          >
            Closed Grievances
          </a>
        </li>
      </ul>
      <div className="mx-1 ">
        {activeTab === "tab1" && <RequestJE permissions={permissions} include={include} endpoint={'getbyassignnotclosed'} />}
        {activeTab === "tab2" &&<RequestJE permissions={permissions} endpoint={'getbyassignclosed'}/>}
      </div>
    </div>
  );
}

export default RequestJETab;
