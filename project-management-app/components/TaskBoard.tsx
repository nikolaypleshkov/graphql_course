import React, { FormEvent, useState } from "react";
import { Button, Card, Form, FormControl, Modal } from "react-bootstrap";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Draggable } from "react-beautiful-dnd";

const UpdateTaskMutation = gql`
  mutation Mutation(
    $id: String!
    $title: String
    $description: String
    $status: String
    $userId: String
  ) {
    updateTask(
      id: $id
      title: $title
      description: $description
      status: $status
      userId: $userId
    ) {
      id
      title
      description
    }
  }
`;

const DeleteTaskMutation = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id) {
      id
    }
  }
`;
const TaskBoard: React.FC<ITask> = ({
  title,
  description,
  id,
  category,
  index,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>(title);
  const [taskDescription, setTaskDescription] = useState<string>(description);
  const [assignTo, setAssignTo] = useState<string>("");

  const [updateTask, { data, loading, error }] =
    useMutation(UpdateTaskMutation);
  const [deleteTask] = useMutation(DeleteTaskMutation);
  const handleClose = () => {
    setShowModal(false);
  };

  const handleTaskUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTask({
      variables: {
        title: taskTitle,
        description: taskDescription,
        id: id,
        status: category,
      },
    });
    handleClose();
  };

  const handleTaskDelete = () => {
    deleteTask({
      variables: {
        id: id,
      },
    });

    handleClose();
  };
  return (
    <div>
      <Draggable draggableId={id} index={index}>
        {(provider) => (
          <Card
            className="task-container"
            onClick={() => setShowModal(true)}
            {...provider.draggableProps}
            {...provider.dragHandleProps}
            ref={provider.innerRef}
          >
            <Card.Body>{title}</Card.Body>
          </Card>
        )}
      </Draggable>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update a Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleTaskUpdate(e)}>
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
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Update
              </Button>
              <FontAwesomeIcon
                icon={faTrash}
                size="lg"
                onClick={handleTaskDelete}
              />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TaskBoard;
