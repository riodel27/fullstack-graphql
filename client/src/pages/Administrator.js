/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
import React, { useState } from "react"
import "antd/dist/antd.css"
import { Button, Divider, Modal, Table } from "antd"
import { gql, useQuery } from "@apollo/client"

const ADMINISTRATORS = gql`
  {
    administrators {
      id
      username
      email
    }
  }
`

function Administrator() {
  const [newAdminModal, setAddNewModalVisible] = useState(false)
  const { loading, error, data } = useQuery(ADMINISTRATORS)
  const administrators = data && data.administrators

  if (loading) return <p>Loading...</p>

  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <span>
          <Button
            style={{ backgroundColor: "#fa8c16", color: "white" }}
            onClick={() => setAddNewModalVisible(true)}
          >
            Edit
          </Button>
          <Divider type="vertical" />
          <Button type="danger">Delete</Button>
        </span>
      )
    }
  ]

  return (
    <div>
      <h1>Administrator</h1>
      <Button type="primary" onClick={() => setAddNewModalVisible(true)}>
        Add new
      </Button>
      <Table columns={columns} dataSource={administrators} />
      <Modal
        title="Administrator Details"
        centered
        visible={newAdminModal}
        onCancel={() => setAddNewModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setAddNewModalVisible(false)}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => setAddNewModalVisible(false)}
          >
            Save
            {/* TODO: Form */}
            {/* TODO: One form for add and update administrator */}
          </Button>
        ]}
      >
        <p>some contents...</p>
      </Modal>
    </div>
  )
}

export default Administrator
