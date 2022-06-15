import { faPlus, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Button, Col, Container } from "react-bootstrap";
import AddTaskModal from "./AddTaskModal";
import TaskBoard from "./TaskBoard";

interface IBoard {
  title: string;
  tasks: Array<ITask>;
}

const BoardSection = (props: IBoard) => {
  const { title, tasks } = props;
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <Col md={3} className="d-flex flex-column p-2">
        <div className="board-section-header d-flex flex-row align-items-center">
          <h3 className="me-auto">{title}</h3>
          <FontAwesomeIcon icon={faPlus} style={{ color: "#6f7782" }} />
        </div>
        <Droppable droppableId={title}>
          {(provider) => (
            <Container
              className="p-0 d-flex flex-column h-100"
              ref={provider.innerRef}
              {...provider.droppableProps}
            >
              {tasks &&
                tasks.map((task: ITask, index: number) => {
                  return (
                    <TaskBoard
                      key={task.id}
                      title={task.title}
                      description={task.description}
                      id={task.id}
                      category={title}
                      index={index}
                    />
                  );
                })}
              {tasks.length > 0 && (
                <Button
                  className="add-wrapper"
                  onClick={() => setShowModal(true)}
                >
                  <FontAwesomeIcon icon={faPlus} style={{ padding: "2px" }} />
                  Add Task
                </Button>
              )}
              {tasks.length === 0 && (
                <div className="is-empty d-flex flex-column">
                  <Button
                    className="add-wrapper"
                    onClick={() => setShowModal(true)}
                  >
                    <FontAwesomeIcon icon={faPlus} style={{ padding: "2px" }} />
                    Add Task
                  </Button>
                </div>
              )}
              {provider.placeholder}
            </Container>
          )}
        </Droppable>
      </Col>
      <AddTaskModal
        showModal={showModal}
        handleClose={handleClose}
        category={title}
      />
    </>
  );
};

export default BoardSection;
