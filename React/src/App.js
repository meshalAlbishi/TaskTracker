import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const getTasks = async () => {
      const taskFromServer = await fetchTasks();
      setTasks(taskFromServer);
    };

    getTasks();

  }, []);

  // fetch tasks from db.json
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    return data;
  }

  // fetch task from db.json
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  }


  // Add Task
  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 10000) + 1;

    // add to db.json
    const res = await fetch(`http://localhost:5000/tasks/`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(task)
      });

    const data = await res.json();

    // add to ui
    setTasks([...tasks, data]);
  };

  // delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method: "DELETE"
      });

    // delete from ui
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // toggle reminder
  const toggleReminder = async (id) => {
    let task = await fetchTask(id);
    let updatedTask = { ...task, reminder: !task.reminder };

    // add to db.json
    const res = await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(updatedTask)
      });

    const data = await res.json();

    // update ui
    setTasks(
      tasks.map((task) => task.id === id ? data : task)
    );
  };

  // show add task form
  const showForm = () => setShowAddTask(!showAddTask);

  return (
    <Router>
      <div className="container">
        <Header onClick={showForm} showAdd={showAddTask} />


        {/* render  */}
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {/* show add task form */}
              {showAddTask && <AddTask onAdd={addTask} />}

              {/* show tasks */}
              {tasks.length > 0
                ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />)
                : ("No Task To Show")
              }
            </>
          )}
        />

        {/* footer */}
        <Route path='/about' component={About} />
        <Footer />

      </div>
    </Router>
  );
}

export default App;
