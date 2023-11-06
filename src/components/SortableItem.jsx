import React, { useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// checkbox selected data 
let data = [];

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id })
  // dnd kit style 
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // select dom image and check field
  const imageOverley = useRef();
  const checkField = useRef();
  const galleryImg = useRef();

  // handle mouse over in gallery image
  const handleMouseOver = () => {
    imageOverley.current.style.display = "block";
    checkField.current.style.display = "block";
  };

  // handle mouse out in gallery image
  const handleMouseOut = () => {
    const value = checkField.current.value;
    const seletItem = data.find((item) => item == value);

    if (!seletItem) {
      imageOverley.current.style.display = "none";
      checkField.current.style.display = "none";
    }
  };

  // handle on drag in gallery image
  const activeDrag = () => {
    if (props.activeDrag) {
      const over = imageOverley.current.id;
      const existData = data.find((item) => item == over);
      if (!existData) {
        imageOverley.current.style.display = "none";
        checkField.current.style.display = "none";
      }
    }
  };
  activeDrag();

  // handle Checkbox
  const handleCheck = (e) => {
    props.setDataRemove(false);

    const value = e.target.value.toString();
    const existingData = data.find((item) => item == value);
    const removeData = data.filter((item) => item != value);

    if (existingData) {
      imageOverley.current.style.opacity = 1;
      galleryImg.current.style.opacity = 1;
      data = removeData;
    } else {
      imageOverley.current.style.opacity = 0.2;
      galleryImg.current.style.opacity = 0.5;
      data = [...data, value];
    }
    props.setSelectedData(data);
  };

  // delete data remove from checkbox selected data
  if (props.dataRemove) {
    data = [];
  }

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="gallery-img-wrapper"
    >
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <div ref={imageOverley} id={props.value} className="overley-img"></div>
        <img ref={galleryImg} className="gallery-img" src={props.id} alt="" />
      </div>
      <input
        type="checkbox"
        ref={checkField}
        value={props.value}
        onChange={handleCheck}
        className="check-input-img"
      />
    </div>
  );
}

export default SortableItem;