import React, { createRef } from "react";
import { Button, Form, Input, Col, Row } from 'antd';

const CForm = React.forwardRef((props, ref) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        // console.log('Success:', values);
        props.setNewData(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
            form={form} ref={ref}
            layout='inline' name="cform"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="MSV" name="msv"
                rules={[{
                    required: true,
                    message: 'Cần nhập MSV!',
                }]}
            >
                <Input allowClear />
            </Form.Item>
            <Form.Item
                label="Họ và tên" name="name"
                rules={[{
                    required: true,
                    message: 'Cần nhập tên!',
                }]}
            >
                <Input allowClear />
            </Form.Item><Form.Item
                label="Lớp" name="class"
                rules={[{
                    required: true,
                    message: 'Cần nhập lớp!',
                }]}
            >
                <Input allowClear />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Thêm
                </Button>
            </Form.Item>
            <Form.Item>
                <Button htmlType="button" onClick={() => ref.current.resetFields()}>
                    Làm mới
                </Button>
            </Form.Item>
        </Form >
    );
});


export default CForm;