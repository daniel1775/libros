import style from "./Home.module.css";

export default function Home( props ){
  const { children } = props;

  return(
    <div className={`${style.container}`}>
      {children}
    </div>
  );
}