/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
import { Button, Divider, Modal, Table, Input } from "antd"
import "antd/dist/antd.css"
import { ErrorMessage, Field, Formik, Form } from "formik"
import React, { useState } from "react"
import * as Yup from "yup"
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

const AddNewAdministratorSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .required("Required")
    .matches(
      /^(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*\W.*\W)[a-zA-Z0-9\S]{20,}$/,
      "Please improve password for security. Must have atleast 2 characters,numbers and symbols."
    )
})

function Administrator() {
  const [newAdminModal, setAddNewModalVisible] = useState(false)
  const [editModal, setEditModalVisible] = useState(false)

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
            onClick={() => setEditModalVisible(true)}
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
      {/* modal for adding new administrator */}
      <Modal
        title="Add New Administrator"
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
          </Button>
        ]}
      >
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={AddNewAdministratorSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log("values: ", values)
            setSubmitting(false)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="username" name="username" placeholder="username" />
              <ErrorMessage name="username" component="div" />

              <Field
                type="email"
                name="email"
                placeholder="email"
                component={Input}
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red" }}
              />

              <Field type="password" name="password" placeholder="password" />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red" }}
              />

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
      {/* modal for editing administrator */}
      <Modal
        title="Edit Administrator"
        centered
        visible={editModal}
        onCancel={() => setEditModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setEditModalVisible(false)}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => setEditModalVisible(false)}
          >
            Save
          </Button>
        ]}
      >
        {/* TODO: form */}
        <p>edit form...</p>
      </Modal>
    </div>
  )
}

export default Administrator
