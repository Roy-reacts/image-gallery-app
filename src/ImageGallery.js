import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FaTrash } from "react-icons/fa";

const initialImages = [
  // Add your initial images here
  { id: "1", url: "../public/images/image-1.webp" },
  { id: "2", url: "../public/images/image-2.webp" },
  { id: "3", url: "../public/images/image-3.webp" },
  { id: "4", url: "../public/images/image-4.webp" },
  { id: "5", url: "../public/images/image-5.webp" },
  { id: "6", url: "../public/images/image-6.webp" },
  { id: "7", url: "../public/images/image-7.webp" },
  { id: "8", url: "../public/images/image-8.webp" },
  { id: "9", url: "../public/images/image-9.webp" },
  { id: "10", url: "../public/images/image-10.webp" },
  { id: "11", url: "../public/images/image-11.webp" },
 
  // Add more images
];

const ImageGallery = () => {
  const [images, setImages] = useState(initialImages);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedImages = [...images];
    const [reorderedItem] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedItem);

    setImages(updatedImages);
  };

  const handleDelete = (imageId) => {
    const updatedImages = images.filter((image) => image.id !== imageId);
    setImages(updatedImages);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="image-gallery" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: "flex" }}
            >
              {images.map((image, index) => (
                <Draggable
                  key={image.id}
                  draggableId={image.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <div className="image-container">
                        <img src={image.url} alt={`Image ${image.id}`} />
                        <button
                          onClick={() => handleDelete(image.id)}
                          className="delete-button"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageGallery;
