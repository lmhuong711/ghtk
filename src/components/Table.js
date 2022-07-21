import { Button, Form, Input, Popconfirm, Space, Table } from 'antd';
import { useState, useContext } from 'react';
import DataContext from '../contexts/DataContext';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
}) => {
    const dataContext = useContext(DataContext);
    const inputNode = <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Cần nhập ${title}!`,
                        },
                        {
                            validator: (_, value) => {
                                if (dataIndex !== 'msv') return Promise.resolve();
                                if (dataContext.data.map(e => e.msv).includes(value.trim()))
                                    return Promise.reject(new Error('MSV đã tồn tại'));
                                else return Promise.resolve();
                            }
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const CTable = (props) => {
    const dataContext = useContext(DataContext);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;

    const handleDelete = (key) => {
        const newData = dataContext.data.filter((item) => item.key !== key);
        props.setData({
            ...dataContext,
            data: newData,
        });
    };

    const edit = (record) => {
        form.setFieldsValue({
            msv: '',
            name: '',
            class: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...dataContext.data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                props.setData({
                    ...dataContext,
                    data: newData,
                });
                setEditingKey('');
            } else {
                newData.push(row);
                props.setData({
                    ...dataContext,
                    data: newData,
                });
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'MSV',
            dataIndex: 'msv',
            width: '20%',
            editable: true,
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            width: '40%',
            editable: true,
        },
        {
            title: 'Lớp',
            dataIndex: 'class',
            width: '20%',
            editable: true,
        },
        {
            title: '',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space size="middle" >
                        <Button onClick={() => save(record.key)} >Lưu</Button>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <Button>Hủy</Button>
                        </Popconfirm>
                    </Space>
                ) : (
                    <Space size="middle" >
                        <Button type="primary" disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Sửa
                        </Button>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <Button danger>Xóa</Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Space
            direction="vertical"
            size="middle"
            style={{
                display: 'flex',
                padding: '1rem'
            }}
        >
            <Form form={form} component={false}
                style={{
                    padding: '1rem',
                }}
            >
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={dataContext.search === "" ? dataContext.data : dataContext.data.filter((item) => item.name.toLowerCase().includes(dataContext.search.toLowerCase()))}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </Space>
    );
};

export default CTable;