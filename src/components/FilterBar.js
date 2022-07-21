import { useContext } from "react";
import { Input, Space } from 'antd';
import DataContext from "../contexts/DataContext";
const { Search } = Input;


const FilterBar = (props) => {
    const dataContext = useContext(DataContext);
    const onSearch = (value) => props.setData({
        ...dataContext,
        search: value.trim()
    });

    return (
        <Space direction="vertical">
            <Search placeholder="Tìm theo tên" onSearch={onSearch} enterButton allowClear />
        </Space>
    )
};

export default FilterBar;