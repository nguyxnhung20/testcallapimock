import { useState, useEffect } from "react";
import { Table, Button, Space, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { userApi } from "../../api/userApi";
import UserForm from "./UserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userApi.getUsers();
      console.log("Fetched Users:", data);
      setUsers(data);
    } catch (error) {
      message.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setSelectedUser(null);
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setSelectedUser(record);
    setModalVisible(true);
  };

  const handleDelete = async (userId) => {
    try {
      if (!userId) {
        message.error("User ID is missing");
        return;
      }
      await userApi.deleteUser(userId);
      message.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (selectedUser) {
        await userApi.updateUser(selectedUser.userId, values);
        message.success("User updated successfully");
      } else {
        await userApi.createUser(values);
        message.success("User created successfully");
      }
      setModalVisible(false);
      fetchUsers();
    } catch (error) {
      message.error("Operation failed");
    }
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record.userId)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: "16px" }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add User
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey={(record) => record.userId}
        loading={loading}
      />

      <UserForm
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        initialValues={selectedUser}
        loading={loading}
      />
    </div>
  );
};

export default UserList;
