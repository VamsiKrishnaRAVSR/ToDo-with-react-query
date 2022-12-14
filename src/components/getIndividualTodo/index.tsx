import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import useGetTodo from "../../hooks/getTodo.hooks";
import { Button, Modal, Table } from "react-bootstrap";
import { Todo } from "../../types";
import useGetPatchTodo from "../../hooks/getPatchTodo";
import TodoList from "../commonFormikForm";
import useGetDeleteTodo from "../../hooks/getDeleteTodo";

const GetTodo = () => {
  const { id } = useParams();
  const { data } = useGetTodo(id as string);
  const navigate = useNavigate();
  const { mutate, isError, error } = useGetPatchTodo();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const initialValues: Todo = {
    id: data?.id,
    completed: data?.completed,
    user_id: data?.user_id,
    description: data?.description,
    completed_on: data?.completed_on,
    estimated_date: data?.estimated_date,
    title: data?.title,
  };

  const { mutate: diff } = useGetDeleteTodo();

  const deleteTodo = () => {
    diff(id as string);
  };

  const onSubmit = (values: Todo) => {
    console.log(values);
    mutate(values);
    if (isError) {
      alert("Something went wrong " + error);
    } else {
      setShow(!show);
    }
  };

  return (
    <div className="getTodo-container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TodoList initialValues={initialValues} onSubmit={onSubmit} />
        </Modal.Body>
      </Modal>
      <div>
        <h1>Todo Id - {id}</h1>
        <button onClick={() => navigate(-1)}>BAck</button>
      </div>
      <div>
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>completed</th>
              <th>Title</th>
              <th>description</th>
              <th>estimated_date</th>
              <th>completed_on</th>
              <th>Created on</th>
              <th>Edit ?</th>
              <th>Delete Todo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data?.id}</td>
              <td>{data?.completed ? "Yes" : "No"} </td>
              <td>{data?.title}</td>
              <td>{data?.description}</td>
              <td>{data?.estimated_date}</td>
              <td>{data?.completed_on}</td>
              <td>{data?.created_on}</td>
              <td>
                <Button onClick={handleShow}>Edit</Button>
              </td>
              <button>
                <Button onClick={deleteTodo}>Delete</Button>
              </button>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default GetTodo;
