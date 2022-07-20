import React, { createRef } from "react";
import logo from './logo.svg';
import './App.css';
import { Space } from 'antd';

import CForm from './components/Form';
import FilterBar from './components/FilterBar';
import Header from "./components/Header";
import CTable from "./components/Table";

function App() {
  const [search, setSearch] = React.useState('');
  const formRef = React.createRef();
  const [newData, setNewData] = React.useState(null);

  return (
    <div className="App">
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: 'flex',
        }}
      >
        <Header />
        <FilterBar setSearch={setSearch} />
        <CForm ref={formRef} setNewData={setNewData} />
        <CTable newData={newData} setNewData={setNewData} search={search} />
      </Space>
    </div>
  );
}

export default App;
