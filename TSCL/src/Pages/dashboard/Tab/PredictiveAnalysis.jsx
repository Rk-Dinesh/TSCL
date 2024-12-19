import React from "react";


const PredictiveAnalysis = () => {
 
  return (
    <div className="  font-lexend mx-2 my-5 h-screen  ">
     
     <p className="text-[#023047] text-base text-center font-medium my-1  whitespace-nowrap bg-white rounded-lg py-3 px-3">
     Predictive Analysis Tab (1 year data required to process.)
          </p>
      <div className="grid grid-cols-12 gap-2  mt-3 mb-2">
        <div className="md:col-span-6 col-span-12 p-3 border-2 bg-white rounded-lg py-2 overflow-x-auto no-scrollbar shadow-md h-[320px]">
          <div className="flex justify-between mb-1 mt-2">
            <p className="text-[#023047] text-lg font-medium">
            Predicted Grievance Volume :
            </p>
          </div>
          <p className="mx-1 text-sm mb-2 whitespace-nowrap text-gray-600">
          Forecasting the expected number of grievances from history
          </p>
          <p className="text-sm text-center mt-24 text-red-600">Stay Tuned ! Analyzed Data Expected Soon...</p>
        </div>
        <div className="md:col-span-6 col-span-12 p-3 border-2 bg-white rounded-lg py-2 overflow-x-auto no-scrollbar shadow-md h-[320px]">
          <div className="flex justify-between mb-1 mt-2">
            <p className="text-[#023047] text-lg font-medium">
            Risk Alerts:
            </p>
          </div>
          <p className="mx-1 text-sm mb-4  text-gray-600">
          Identification of areas or types of grievances that are likely to escalate or have a high impact.
          </p>
          <p className="text-sm text-center mt-24 text-red-600">Stay Tuned ! Analyzed Data Expected Soon...</p>
        </div>
      </div>

      <div className=" mt-2 md:col-span-6 col-span-12 p-3 border-2  bg-white rounded-lg py-2 overflow-x-auto no-scrollbar shadow-md h-[320px]">
        <p className="text-[#023047] text-lg font-medium mb-1 mt-2 mx-3 whitespace-nowrap">
        Resource Allocation Suggestions :
        </p>
        <p className="mx-3 text-sm mb-2 whitespace-nowrap text-gray-600">
        Recommendations on where to allocate more resources based on grievance patterns.
        </p>
        <p className="text-sm text-center mt-24 text-red-600">Stay Tuned ! Analyzed Data Expected Soon...</p>
      </div>

      
    </div>
  );
};

export default PredictiveAnalysis;
