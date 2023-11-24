import { useState } from "react";

import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";

import { arrayMove } from "@dnd-kit/sortable";

export interface iTask {
  id: string;
  message: string;
  completed: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<iTask[]>([]);

  const createTask = (taskMsg: string) => {
    const task: iTask = {
      id: crypto.randomUUID(),
      message: taskMsg,
      completed: false,
    };
    setTasks((prevstate) => [...prevstate, task]);
  };
  const deleteTask = (id: string) => {
    setTasks((prevstate) => prevstate.filter((task) => task.id !== id));
  };
  const toggleTask = (id: string) => {
    setTasks((prevstate) =>
      prevstate.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const handleClearCompleted = () => {
    setTasks((prevstate: iTask[]) =>
      prevstate.filter((task) => task.completed !== true)
    );
  };

  const something = (active: any, over: any) => {
    setTasks((tasks) => {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);
      return arrayMove(tasks, oldIndex, newIndex);
    });
  };
  return (
    <>
      <Header createTask={createTask} />
      {tasks.length > 0 && (
        <Tasks
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          handleClearCompleted={handleClearCompleted}
          something={something}
        />
      )}
    </>
  );
}