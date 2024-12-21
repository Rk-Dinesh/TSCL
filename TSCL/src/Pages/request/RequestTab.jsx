import React, { useState } from "react";
import Request from "./Request";

function RequestTab({permissions}) {
  const [activeTab, setActiveTab] = useState("tab1");
  const include = 'yes';
  const operator = localStorage.getItem('name');
  const operator_id = localStorage.getItem('code')


  return (
    <div className="overflow-auto no-scrollbar">
      {/* <ul className="flex mb-2 list-none justify-center mt-1">
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
      </ul> */}
      <div className="mx-1 my-5 ">
        {activeTab === "tab1" && <Request permissions={permissions} include={include} endpoint={`getbyoperator?operator=${operator}&operator_id=${operator_id}`} />}
        {activeTab === "tab2" &&<Request permissions={permissions} endpoint={'byclosed'}/>}
      </div>
    </div>
  );
}

export default RequestTab;
