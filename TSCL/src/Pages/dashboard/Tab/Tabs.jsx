import React, { useState } from 'react';
import GrivevanceAnalyticDashboard1 from './GrivenaceAnalyticesDashboard1';
import WardAnalyticDashboard2 from './WardAnalyiticsDashboard2';

function Tabs() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div className='overflow-auto no-scrollbar'>
      <ul className="flex mb-2 list-none justify-center mt-1">
        <li className="-mb-px mr-1">
          <a
            className={`text-white   font-medium rounded-sm text-sm px-5 py-1.5 text-center  ${
              activeTab === 'tab1' ? 'bg-gray-700' : 'bg-gray-400'
            }`}
            onClick={() => setActiveTab('tab1')}
          >
            Grievance Analytics
          </a>
        </li>
        <li className="-mb-px mr-1">
          <a
            className={`text-white   font-medium rounded-sm text-sm px-5 py-1.5 text-center ${
              activeTab === 'tab2' ? 'bg-gray-700' : 'bg-gray-400'
            }`}
            onClick={() => setActiveTab('tab2')}
          >
           Ward Analytics
          </a>
        </li>
        {/* <li className="-mb-px mr-1">
          <a
            className={`text-white   font-medium rounded-sm text-sm px-5 py-1.5 text-center ${
              activeTab === 'tab3' ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300' : 'bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300'
            }`}
            onClick={() => setActiveTab('tab3')}
          >
            Tab 3
          </a>
        </li> */}
      </ul>
      <div className="mx-1 ">
        {activeTab === 'tab1' && (
          <GrivevanceAnalyticDashboard1 />
        )}
        {activeTab === 'tab2' && (
          <WardAnalyticDashboard2 />
        )}
        {/* {activeTab === 'tab3' && (
          <div className="tab-content block">
            <p>Tab 3 content</p>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Tabs;