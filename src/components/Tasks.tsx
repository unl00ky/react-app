import { useState } from "react";
import { iTask } from "../App";
import { Task } from "./Task";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface iPropsTasks {
  tasks: iTask[];
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  handleClearCompleted: () => void;
  something: (active: any, over: any) => void;
}

export const Tasks = ({
  tasks,
  deleteTask,
  toggleTask,
  handleClearCompleted,
  something,
}: iPropsTasks) => {
  const [toggleAll, setToggleAll] = useState(true);
  const [toggleActive, setToggleActive] = useState(false);
  const [toggleCompleted, setToggleCompleted] = useState(false);

  const handleAllToggle = () => {
    setToggleAll(true);
    setToggleActive(false);
    setToggleCompleted(false);
  };

  const handleActiveToggle = () => {
    setToggleActive(true);
    setToggleAll(false);
    setToggleCompleted(false);
  };

  const handleCompletedToggle = () => {
    setToggleCompleted(true);
    setToggleActive(false);
    setToggleAll(false);
  };

  const handleDragEnd = (e: any) => {
    const {active, over} = e;
    if (active.id === over.id) {
      return;
    }
    something(active, over);
  };

  return (
    <>
      <main className="tasks container">
        {/* <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        > */}
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {toggleAll &&
              tasks.map((task) => (
                <Task
                  task={task}
                  deleteTask={deleteTask}
                  toggleTask={toggleTask}
                />
              ))}
              </SortableContext>
            {toggleCompleted &&
              tasks.map((task) =>
                task.completed ? (
                  <Task
                    task={task}
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                  />
                ) : null
              )}
            {toggleActive &&
              tasks.map((task) =>
                !task.completed ? (
                  <Task
                    task={task}
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                  />
                ) : null
              )}
        {/* </DndContext> */}
        <div className="footerKinda">
          <span>
            {tasks.filter((task) => task.completed !== true).length > 1
              ? `${
                  tasks.filter((task) => task.completed !== true).length
                } items left`
              : `${
                  tasks.filter((task) => task.completed !== true).length
                } item left`}
          </span>
          <button onClick={handleClearCompleted}>Clear Completed</button>
        </div>
      </main>
      <section className="categoriesMobile container">
        <input id="all" type="radio" name="category" />
        <label
          onClick={handleAllToggle}
          className={toggleAll ? "categoryChecked" : ""}
          htmlFor="all"
        >
          All
        </label>
        <input id="active" type="radio" name="category" />
        <label
          onClick={handleActiveToggle}
          className={toggleActive ? "categoryChecked" : ""}
          htmlFor="active"
        >
          Active
        </label>
        <input id="completed" type="radio" name="category" />
        <label
          onClick={handleCompletedToggle}
          className={toggleCompleted ? "categoryChecked" : ""}
          htmlFor="completed"
        >
          Completed
        </label>
      </section>
    </>
  );
};
