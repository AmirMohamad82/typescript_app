import style from "./Navbar.module.css";

const Navbar = () => {
  const list: string[] = ["Message", "Today's Task", "Last Activity"];
  return (
    <nav className="navbar navbar-default col-sm-auto">
      <ul className="nav nav-tabs">
        {list.map((i, idx) => {
          return (
            <li
              key={idx}
              className={idx === 1 ? "navbar-item active" : "navbar-item"}
            >
              <button className={`btn btn-default btn-lg ${style.res}`}>{i}</button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Navbar;
