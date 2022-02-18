import style from "./CardImage.module.css";

export default function Category( props ){
  const { title, image, setFiltered, onHide } = props;

  return(
    <div onClick={() => {onHide(false); setFiltered((title.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}} className={style.container}>
      <div className={style.title}>{title}</div>
      <div className={style.effect}>{title}</div>
      <img className={style.image} src={image} alt=""/>
    </div>
  );
}