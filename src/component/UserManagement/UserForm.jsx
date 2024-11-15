import { useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";

const UserForm = ({ visible, onCancel, onSubmit, initialValues, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={initialValues ? "Edit User" : "Add User"}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item
          name="full_name"
          label="Full Name"
          rules={[{ required: true, message: "Please input the full name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input the email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="department"
          label="Department"
          rules={[{ required: true, message: "Please select department!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select role!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="position"
          label="Position"
          rules={[{ required: true, message: "Please input position!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserForm;
