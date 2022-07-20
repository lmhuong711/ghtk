import { Button, Form, Input, Popconfirm, Space, Table, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
const originData = [];

var key = 0;

for (let i = 0; i < 3; i++) {
    originData.push({
        key: key.toString(),
        msv: 'MSV' + key,
        name: `LMH ${key}`,
        class: `Class no. ${key++ % 10}`,
    });
}

const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
}) => {
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
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        if (props.newData != null) {
            const newData = {
                ...props.newData,
                key: key++,
            }
            setData([newData, ...data]);
            props.setNewData(null);
        }
    }, [props.newData]);

    const isEditing = (record) => record.key === editingKey;

    const handleDelete = (key) => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
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
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
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
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space size="middle" >
                        <Button onClick={() => save(record.key)} >Save</Button>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <Button>Cancel</Button>
                        </Popconfirm>
                    </Space>
                ) : (
                    <Space size="middle" >
                        <Button type="primary" disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Button>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <Button danger>Delete</Button>
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
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={props.search === "" ? data : data.filter((item) => item.name === props.search)}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};

export default CTable;