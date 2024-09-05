import React, { useState } from 'react';

function Tabs() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div>
      <ul className="flex mb-2 list-none justify-center mt-10">
        <li className="-mb-px mr-1">
          <a
            className={`bg-white inline-block py-2 px-4 font-semibold text-gray-700 hover:text-gray-900 ${
              activeTab === 'tab1' ? 'text-gray-900' : ''
            }`}
            onClick={() => setActiveTab('tab1')}
          >
            Tab 1
          </a>
        </li>
        <li className="-mb-px mr-1">
          <a
            className={`bg-white inline-block py-2 px-4 font-semibold text-gray-700 hover:text-gray-900 ${
              activeTab === 'tab2' ? 'text-gray-900' : ''
            }`}
            onClick={() => setActiveTab('tab2')}
          >
            Tab 2
          </a>
        </li>
        <li className="-mb-px mr-1">
          <a
            className={`bg-white inline-block py-2 px-4 font-semibold text-gray-700 hover:text-gray-900 ${
              activeTab === 'tab3' ? 'text-gray-900' : ''
            }`}
            onClick={() => setActiveTab('tab3')}
          >
            Tab 3
          </a>
        </li>
      </ul>
      <div className="bg-white p-4">
        {activeTab === 'tab1' && (
          <div className="tab-content block">
            <p>Tab 1 content</p>
          </div>
        )}
        {activeTab === 'tab2' && (
          <div className="tab-content block">
            <p>Tab 2 content</p>
          </div>
        )}
        {activeTab === 'tab3' && (
          <div className="tab-content block">
            <p>Tab 3 content</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tabs;