import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../Store/Store";

export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async ({ error }: { error: (error: string) => void }) => {
    try {
      const response = await axios.get("http://localhost:4000/todos", {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      });
      return response.data;
    } catch (err: any) {
      error(err.response.data);
    }
  }
);

interface TaskType {
  title: string;
  description: string;
  unixTime: number;
  done: boolean;
}

export const AddTask = createAsyncThunk(
  "task/addTask",
  async (task: TaskType) => {
    const userId: number = Number(window.localStorage.getItem("id"));
    const owner: number = userId;
    const newTask = { userId, owner, ...task };
    await axios.post(
      "http://localhost:4000/todos",
      {
        userId: newTask.userId,
        owner: newTask.owner,
        title: newTask.title,
        description: newTask.description,
        date: newTask.unixTime,
        done: newTask.done,
      },
      {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      }
    );
  }
);

export const DeleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id: number) => {
    const response = await axios.delete(`http://localhost:4000/todos/${id}`, {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    });
    return response.data;
  }
);

interface TasksType {
  title: string;
  description: string;
  date: number;
  done: boolean;
  id: number;
  userId: number;
  owner?: number;
}

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (task: TasksType) => {
    const response = await axios.patch(
      `http://localhost:4000/todos/${task.id}`,
      {
        done: task.done,
      },
      {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  }
);

interface StateType {
  loading: boolean;
  filter: number;
  tasks:
    | {
        title: string;
        description: string;
        date: number;
        done: boolean;
        id: number;
        userId: number;
        owner?: number;
      }[]
    | null;
}

export const TaskSlice = createSlice({
  name: "task",
  initialState: {
    loading: false,
    tasks: [],
    filter: 0,
  } as StateType,

  reducers: {
    filter: (state, action: PayloadAction<number>) => {
      state.filter = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(AddTask.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(AddTask.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(DeleteTask.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(DeleteTask.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateTask.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks!.findIndex(
          (task: TasksType) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks![index] = action.payload;
        }
        state.loading = false;
      });
  },
});

export const OpenTasks = (state: RootState) =>
  state.task.tasks!.filter((task: TasksType) => !task.done);

export const ClosedTasks = (state: RootState) =>
  state.task.tasks!.filter((task: TasksType) => task.done);

export const selectOpenTasks = (state: RootState) =>
  state.task.tasks!.filter((task: TasksType) => !task.done)?.length;

export const selectClosedTasks = (state: RootState) =>
  state.task.tasks!.filter((task: TasksType) => task.done)?.length;

export const selectTotalTasks = (state: RootState) => state.task.tasks!.length;

export const { filter } = TaskSlice.actions;
export default TaskSlice.reducer;
