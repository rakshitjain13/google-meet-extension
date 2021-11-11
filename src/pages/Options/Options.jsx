import React ,{useEffect}from 'react';
import './Options.css';


const Options = ({ title }) => {
    useEffect(()=>{
        navigator.webkitGetUserMedia({ audio: true }, s => {}, err => {})
    },[])
  return <div className="OptionsContainer">{title} Page</div>;
};

export default Options;