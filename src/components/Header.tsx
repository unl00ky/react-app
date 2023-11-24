import { useState, } from "react";

interface iPropsHeader {
  createTask: (taskMsg: string) => void;
}

export const Header = ({ createTask }: iPropsHeader) => {
  const [lightMode, setLightMode] = useState(false);

  const handleTheme = () => {
    setLightMode((current) => !current);
  };
  document.body.className = lightMode ? "lightMode" : "";

  const [taskMsg, setTaskMsg] = useState("");
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskMsg === "") {
      return;
    }
    createTask(taskMsg);
    setTaskMsg("");
  }

  return (
    <>
      <div className="mainBg"></div>
      <nav className="navKinda container">
        <h1>T O D O</h1>
        <button onClick={handleTheme} className="themeBtn"></button>
      </nav>
      <section className="container">
        <form onSubmit={handleSubmitForm} className="formField">
          <input className="addBtn" type="submit" value="+" />
          <input
            className="userInput"
            type="text"
            placeholder="Create a new todo..."
            autoComplete="off"
            value={taskMsg}
            onChange={(e) => setTaskMsg(e.target.value)}
          />
        </form>
      </section>
    </>
  );
};
