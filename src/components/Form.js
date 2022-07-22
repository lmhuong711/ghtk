import { forwardRef, useContext } from "react";
import { Button, Form, Input } from 'antd';
import DataContext from "../contexts/DataContext";

const CForm = forwardRef((props, ref) => {
    const [form] = Form.useForm();
    const dataContext = useContext(DataContext);

    const onFinish = (values) => {
        console.log(values);
        dataContext.setData({
            ...dataContext,
            data: [{
                key: dataContext.key,
                ...values
            },
            ...dataContext.data],
            key: dataContext.key + 1,
        });

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
                rules={[
                    {
                        required: true,
                        message: 'Cần nhập MSV!',
                    },
                    {
                        validator: (_, value) =>
                            dataContext.data.map(e => e.msv).includes(value.trim()) ?
                                Promise.reject(new Error('MSV đã tồn tại')) :
                                Promise.resolve(),
                    },
                ]}
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