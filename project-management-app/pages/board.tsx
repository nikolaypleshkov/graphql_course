import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Row } from "react-bootstrap";
import TaskBoard from "../components/TaskBoard";
import BoardSection from "../components/BoardSection";
import tasks from "./api/tasks";
import { DragDropContext } from "react-beautiful-dnd";
const AllTasksQuery = gql`
  query {
    tasks {
      id
      title
      description
      status
    }
  }
`;

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

const Board = () => {
  const { data, loading, error } = useQuery(AllTasksQuery, {
    onCompleted: (data) => {
      console.log(data);
    },
  });
  const [updateTask] = useMutation(UpdateTaskMutation);

  const onDragEnd = (res) => {
    const { destination, source, draggableId } = res;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      return;
    }

    updateTask({
        variables: {
            id: draggableId,
            status: destination.droppableId
        }
    })
  };

  const sections: Array<string> = ["Backlog", "In-Progress", "Review", "Done"];
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <div className="pt-3 h-100 d-flex flex-column">
      <Row>
        <h1>Project Title</h1>
      </Row>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-container d-flex flex-row flex-grow-1">
          {sections.map((section: string, index: number) => {
            const filteredTasks: Array<ITask> = data
              ? data.tasks.filter((task: ITask) => {
                  return task.status === section;
                })
              : [];
            return (
              <BoardSection key={index} title={section} tasks={filteredTasks} />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
