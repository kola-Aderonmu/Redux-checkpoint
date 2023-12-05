import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  editSelectedTask,
  filterTasks,
  resetFilters,
} from "../features/task/taskSlice";
import {
  getTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../utils/helper";

const AddTask = () => {
  const { taskEditing } = useSelector((state) => state.task);
  const [value, setValue] = React.useState("");
  const [filtering, setFiltering] = React.useState(true);

  const dispatch = useDispatch();
  // get the user input from the input field
  const handleInput = (event) => {
    setValue(event.target.value);
    console.log(value);
  };

  // add the input field value to the tasks
  const handleCreateNewTask = () => {
    if (/^\s*$/.test(value)) {
      return;
    }
    dispatch(addTask(value));
    setValue("");
  };

  // filter the tasks based on completed/pending
  const handleFilterTasks = (params) => {
    setFiltering(false);
    let storedTasks = getTasksFromLocalStorage();
    let tempTasks = storedTasks.filter((item) => item.isDone === params);
    dispatch(filterTasks(tempTasks));
  };

  React.useEffect(() => {
    setValue(taskEditing.description || " ");
  }, [taskEditing.id]);

  const saveEditedTask = () => {
    if (/^\s*$/.test(value)) {
      return;
    }
    let storedTasks = getTasksFromLocalStorage();
    console.log(storedTasks);
    let result = storedTasks.map((item) => {
      if (item.id === taskEditing.id) {
        console.log(item);
        item.description = value;
      }
      return item;
    });

    saveTasksToLocalStorage(result);
    dispatch(resetFilters());
    setValue("");
    dispatch(editSelectedTask(""));
  };

  return (
    <div>
      {/* create post section */}
      <section className="space-x-4 mt-5">
        <input
          onChange={handleInput}
          value={value}
          className="border-1 border-red-500 shadow-xl font-thin italic rounded-lg focus:ring-1 "
          style={{ width: "300px", height: "49px" }}
          placeholder="Enter Your Task"
        />
        {filtering || taskEditing ? (
          taskEditing ? (
            <button
              onClick={saveEditedTask}
              className="hover:bg-slate-100 text-red-300 text:hover"
            >
              Save Edit
            </button>
          ) : (
            <button
              onClick={handleCreateNewTask}
              className="bg-lime-500 rounded-md px-2 text-white hover:bg-amber-300 font-mono p-1"
            >
              Create Task
            </button>
          )
        ) : null}
      </section>
      {/* *********************** */}

      {/* filter post section */}
      <section className="flex gap-3 items-center my-4 shadow-slate-800 ">
        <p className="font-mono font-bold">Filter: </p>
        {/* show all tasks */}
        <button
          onClick={() => {
            dispatch(resetFilters());
            setFiltering(true);
          }}
          className="bg-blue-500 hover:bg-blue-800 px-2 rounded-md text-white font-mono p-1"
        >
          All Task
        </button>

        {/* filter pending tasks */}
        <button
          onClick={() => handleFilterTasks(false)}
          className="bg-orange-400 hover:bg-orange-800 px-2 rounded-md text-white font-mono p-1"
        >
          Pending
        </button>
        {/* filter completed tasks */}
        <button
          onClick={() => handleFilterTasks(true)}
          className="bg-green-500 hover:bg-green-800 px-2 rounded-md text-white font-mono p-1"
        >
          Completed
        </button>
      </section>
      {/* ******************************** */}
      <hr className="my-3 border-red-200"></hr>
    </div>
  );
};

export default AddTask;
