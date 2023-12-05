import React from "react";
import { useSelector } from "react-redux";
import Task from "./Task";

const ListTasks = () => {
  const tasks = useSelector((state) => state.task.userTask);

  console.log(tasks);

  return tasks?.length === 0 ? (
    <p className="italic font-extralight">You have no task</p>
  ) : (
    <div className="text-xl italic font-extralight">
      {tasks?.map((item) => (
        <Task key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ListTasks;
