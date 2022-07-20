import React, { createRef } from "react";
import { Input, Space } from 'antd';
const { Search } = Input;


const FilterBar = (props) => {
    const onSearch = (value) => props.setSearch(value.trim());

    return (
        <Space direction="vertical">
            <Search placeholder="Tìm theo tên" onSearch={onSearch} enterButton allowClear />
        </Space>
    )
};

export default FilterBar;