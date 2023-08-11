import Navbar from "../Components/Navbar/Navbar";
import Table from "../Components/Table/Table";
import Tasks from "../Components/TaskCard/Tasks";
import State from "../Components/Table/State";
import Loading from "../Components/Loading/Loading";
import { useEffect } from "react";
import { fetchTasks } from "../Features/FeatureTask/TaskSlice";
import User from "../Components/Navbar/User";
import Welcome from "../Components/Welcome/Welcome";
import { useAppDispatch, useAppSelector } from "../Store/hook";
import { Error } from "..";

const App = () => {
  const loading = useAppSelector((state) => state.task.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchTasks({
        error: (error) => {
          Error(error)
        },
      })
    );
  }, [dispatch]);

  return (
    <>
      {Welcome()}
      <User />
      <Navbar />
      <Table />
      <State />
      {loading ? <Loading /> : <Tasks />}
    </>
  );
};

export default App;
