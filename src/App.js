import { createRef, useState } from "react";
// import logo from './logo.svg';
import './App.css';
import { Space } from 'antd';

import CForm from './components/Form';
import FilterBar from './components/FilterBar';
import Header from "./components/Header";
import CTable from "./components/Table";
import DataContext from "./contexts/DataContext";
import originData from "./assets/data";

function App() {
  const formRef = createRef();
  const [data, setData] = useState(originData);

  return (
    <div className="App">
      <DataContext.Provider value={{...data, setData: setData}}>
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: 'flex',
          }}
        >
          <Header />
          <FilterBar setData={setData} />
          <CForm ref={formRef} setData={setData} />
          <CTable setData={setData} />
        </Space>
      </DataContext.Provider>
    </div>
  );
}

export default App;
