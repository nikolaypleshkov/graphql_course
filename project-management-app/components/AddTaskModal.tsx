import React, { FormEvent, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Form, FormControl, Modal } from "react-bootstrap";

const CreateTaskMutation = gql`
  mutation CreateTask(
    $title: String!
    $description: String!
    $status: String
    $createTaskId: String
    $userId: String
  ) {
    createTask(
      title: $title
      description: $description
      status: $status
      id: $createTaskId
      userId: $userId
    ) {
      title
      description
      id
    }
  }
`;


const AddTaskModal = ({
  showModal,
  handleClose,
  category,
}: {
  showModal: boolean;
  handleClose: () => void;
  category: string;
}) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [assignTo, setAssignTo] = useState<string>("");

  const [createTask, { data, loading, error }] = useMutation(
    CreateTaskMutation,
    {
      onCompleted: (data) => {
        setTaskTitle("");
        setTaskDescription("");
        setAssignTo("");
      },
    }
  );
  const handleTaskCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTask({
      variables: {
        title: taskTitle,
        description: taskDescription,
        status: category,
      },
    });

    handleClose();
  };
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleTaskCreate(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <FormControl
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            ></FormControl>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <FormControl
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            ></FormControl>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Assign To</Form.Label>
            <FormControl
              type="text"
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
            ></FormControl>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTaskModal;
