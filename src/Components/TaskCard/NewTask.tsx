import { FormEvent, useState } from "react";
import { AddTask, fetchTasks } from "../../Features/FeatureTask/TaskSlice";
import { Error, Success, Warning } from "../..";
import { useAppDispatch } from "./../../Store/hook"

interface TaskType {
  title: string;
  description: string;
  unixTime: number;
  done: boolean;
}

const NewTask = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const done: boolean = false;
  const dispatch = useAppDispatch()

  const addTask = async (task : TaskType) => {
    await dispatch(AddTask(task));
    await dispatch(
      fetchTasks({
        error: (error) => {
          Error(error);
        },
      })
    );
    window.scrollTo(0, document.body.scrollHeight);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title && !description && !date) {
      Warning("Please fill out the form correctly");
      return;
    }

    const time: Date = new Date(date);
    const unixTime: number = Math.floor(time.getTime() / 1000);

    addTask({ title, description, unixTime, done });

    setTitle("");
    setDescription("");
    setDate("");

    Success("Task added successfully");
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="des">Description:</label>
          <input
            id="des"
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Date">Date:</label>
          <input
            id="Date"
            type="date"
            className="form-control"
            placeholder="Sunday 01:00 PM - 03:00 PM"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="text-center">
          <input
            type="submit"
            value="Add"
            className="btn btn-primary m-2 mt-3 rounded-3"
            data-bs-dismiss="modal"
          />
        </div>
      </form>
    </div>
  );
};

export default NewTask;
