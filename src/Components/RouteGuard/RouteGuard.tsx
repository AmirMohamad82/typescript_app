import GoBack from "./GoBack";

interface ChildrenType {
  children: JSX.Element;
}

const RouteGuard = ({ children }: ChildrenType) => {
  return <>{!window.localStorage.getItem("token") ? <GoBack /> : children}</>;
};

export default RouteGuard;
