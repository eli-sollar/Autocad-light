import { Chip } from '@mui/material';
import react, { useReducer, useState } from 'react';
import DataManager from '../components/steps/DataManager';

export default function ChipsPanels(props) {
  const dataManager = new DataManager();
  const [display, setDisplay] = useState({});

  const [, forceUpdate] = useReducer(x => x + 1, 0);//hack
  const handleDelete = (id) => {
    
    let commandName = "delete";
    let data = props.mapMultiKey.get(id);
    let layerName = "PANELS";
    if(data){
    let groupId = data.groupId;
    dataManager.executeInAutocad(commandName, groupId, layerName);
    //props.mapMultiKey.delete(id);
    props.onChange(id);
    forceUpdate();
  }
    //setDataLoaded(true);
  };

  const handleClick = (id) => {
     let commandName = "";
    console.log(id);
     
     if (!display[id]) {
      for (const key in display) {
        display[key]=false;
      }
      display[id]=true;
      
    }else{
       commandName = "";
       display[id]=false;
    }
     setDisplay({...display});
     let data = props.mapMultiKey.get(id);
      let layerName = "PANELS"
      let groupId = data.groupId;
      dataManager.executeInAutocad(commandName, groupId, layerName);
 
     props.onSelected(id);
  };
  return (
    <>
      {[...props.mapMultiKey].map((entry) => {
        return <Chip variant={display[entry[0]]===true?"":"outlined"} label={entry[1]?.label} onClick={() => handleClick(entry[0])} onDelete={() => handleDelete(entry[0])} />
      })}
    </>);
}