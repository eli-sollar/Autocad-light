
import React, {  useRef } from "react";
export default function ContentEditor(props) {
    //const  = useRef < HTMLDivElement > (null);
  const defaultValue=useRef(props.value);
  const handleInput=(event)=>{
    if(props.onChange){
        props.onChange(event.target.innerHtml);
    }
  }
  return (
    <span
    contentEditable={true}
    onInput={handleInput}
    className="custom-textarea"
    dangerouslySetInnerHTML={{__html:defaultValue.current}}

    />
  );
}