

import React, { useEffect, useState } from "react"

const ImageWrapper = (props) => {

  const { src } = props;
  const [image, setImage] = useState("");


    const importImage = (imageName)=>{
      import(`../assets/images/${imageName}`).then((image) => setImage(image.default));
    };
    
    if(props.eagerLoading && src){    
      importImage(src);
     }

  useEffect(() => {
    if(!props.eagerLoading && src){

    
    importImage(src);
   }
  }, [])


  return (
    <div>{image && <img height={props.pHeight} width={props.pWidth} alt="" className={props.class} src={image} />}</div>
  )
}
export default ImageWrapper;

