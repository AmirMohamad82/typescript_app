import Styled from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={Styled.loading}>
      <div className={Styled.ldsRipple}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
