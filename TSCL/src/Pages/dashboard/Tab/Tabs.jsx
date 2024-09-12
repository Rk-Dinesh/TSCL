import React, { useState } from 'react';
import GrivevanceAnalyticDashboard1 from './GrivenaceAnalyticesDashboard1';
import WardAnalyticDashboard2 from './WardAnalyiticsDashboard2';
import EngineerMetrics from './EngineerMetrics';
import PredictiveAnalysis from './PredictiveAnalysis';

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
        <li className="-mb-px mr-1">
          <a
            className={`text-white   font-medium rounded-sm text-sm px-5 py-1.5 text-center ${
              activeTab === 'tab3' ? 'bg-gray-700' : 'bg-gray-400'
            }`}
            onClick={() => setActiveTab('tab3')}
          >
           Engineer Metrics
          </a>
        </li>
        <li className="-mb-px mr-1">
          <a
            className={`text-white   font-medium rounded-sm text-sm px-5 py-1.5 text-center ${
              activeTab === 'tab4' ? 'bg-gray-700' : 'bg-gray-400'
            }`}
            onClick={() => setActiveTab('tab4')}
          >
           Predictive Analysis
          </a>
        </li>
      </ul>
      <div className="mx-1 ">
        {activeTab === 'tab1' && (
          <GrivevanceAnalyticDashboard1 />
        )}
        {activeTab === 'tab2' && (
          <WardAnalyticDashboard2 />
        )}
        {activeTab === 'tab3' && (
          <EngineerMetrics />
        )}
        {activeTab === 'tab4' && (
          <PredictiveAnalysis />
        )}
      </div>
    </div>
  );
}

export default Tabs;