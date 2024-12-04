import React, { useEffect } from "react";
import { Modal, Input, Form } from "antd";

const EditUserModal = ({ visible, userData, onClose, onSave, onChange }) => {
  const [form] = Form.useForm(); 

  useEffect(() => {
    if (visible && userData) {
      form.setFieldsValue({
        name: userData.name,
        email: userData.email,
        age: userData.age,
        status: userData.status,
        city: userData.city,
        country: userData.country,
      });
    }
  }, [userData, visible, form]);

  return (
    <Modal
      title="Edit User"
      visible={visible}
      onOk={() => onSave(form.getFieldsValue())} 
      onCancel={onClose}
      okText="Save"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name:"
          name="name"
        >
          <Input
            onChange={(e) => onChange({ ...userData, name: e.target.value })}
            placeholder="Enter Name"
          />
        </Form.Item>

        <Form.Item
          label="Email:"
          name="email"
        >
          <Input
            onChange={(e) => onChange({ ...userData, email: e.target.value })}
            placeholder="Enter Email"
          />
        </Form.Item>

        <Form.Item
          label="Age:"
          name="age"
        >
          <Input
            onChange={(e) => onChange({ ...userData, age: e.target.value })}
            placeholder="Enter Age"
          />
        </Form.Item>

        <Form.Item
          label="Status:"
          name="status"
        >
          <Input
            onChange={(e) => onChange({ ...userData, status: e.target.value })}
            placeholder="Status"
          />
        </Form.Item>

        <Form.Item
          label="City:"
          name="city"
        >
          <Input
            onChange={(e) => onChange({ ...userData, city: e.target.value })}
            placeholder="City"
          />
        </Form.Item>

        <Form.Item
          label="Country:"
          name="country"
        >
          <Input
            onChange={(e) => onChange({ ...userData, country: e.target.value })}
            placeholder="Country"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
