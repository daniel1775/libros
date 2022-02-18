import { useState } from "react";
import { useEffect } from "react";
import Card from "../Card/Card.jsx";
import style from "./Filter.module.css";

export default function Filter( props ){
  const { showHome, filtered, searchText } = props
  const [ data, setData ] = useState([]);
  const [ band, setBand ] = useState(true);

  useEffect(() => {
    const consumeApi = async () => {
      fetch(`https://paladia-api.herokuapp.com/api/v1/books/${filtered}`)
      .then(json => json.json())
      .then(resul => setData(resul));
    }

    setBand(true);

    consumeApi();
  }, [ filtered ]);

  useEffect(() => {
    fetch(`https://paladia-api.herokuapp.com/api/v1/books`)
      .then(json => json.json())
      .then(resul => {
        let con = 0;
        setData([]);
        resul.forEach( element => {
          let aux = element.title.toLowerCase();
          if(searchText===""){
            setData([]);
          }else if(aux.includes(searchText.toLowerCase(), 0)){
            con++;
            console.log(aux);
            setData(prev =>  [...prev, element]);
          }
        });
        if(con===0){
          setData([]);
        }
      });

      setBand(false);
  }, [ searchText ]);

  return(
    <div className={`${style.container} ${!showHome ? style.show : style.hide}`}>
      {band ? 
        <h1 className={style.title}>{filtered.toUpperCase()}</h1> : 
        <p className={style.title}>Filtrado por: {searchText}</p>
      }
      <div className={style.cards}>
        {data?.map((element, i) =>
          <Card key={i} data={element} />
        )}
      </div>
    </div>
  );
}