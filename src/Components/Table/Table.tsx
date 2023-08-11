import NewTask from "../TaskCard/NewTask";
import TodayDate from "../Today/TodayDate";

const Table = () => {
  return (
    <>
      <div className="row container">
        <div className="col-8 text">
          <p>
            Today's Task <br />
            <span><TodayDate /></span>
          </p>
        </div>
        <div className="col-4 m-auto float-end">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
          >
            + New Task
          </button>
        </div>
      </div>
      <div className="modal fade" id="myModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add task</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <NewTask />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
