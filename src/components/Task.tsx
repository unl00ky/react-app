import checkIcon from "../images/icon-check.svg";
import { iTask } from "../App";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface iPropsTask {
  task: iTask;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

export const Task = ({ task, deleteTask, toggleTask }: iPropsTask) => {
  const [checkToggle, setCheckToggle] = useState(task.completed);

  const handleCheckbox = () => {
    setCheckToggle(!checkToggle);
    toggleTask(task.id);
  };

  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: task.id});
  const style= {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="task">
        <label className="customCheckbox">
          <input onChange={handleCheckbox} type="checkbox" />
          <span className={`checkMark ${task.completed ? "opacityOn" : ""}`}>
            <img src={checkIcon} />
          </span>
        </label>
        <p className={task.completed ? "taskCompleted" : ""}>{task.message}</p>
        <button
          onClick={() => deleteTask(task.id)}
          className="deleteBtn"
        ></button>
      </div>
    </>
  );
};
