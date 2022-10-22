import * as React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragStart,
  DraggingStyle,
  NotDraggingStyle,
  DragUpdate,
  ResponderProvided,
} from "react-beautiful-dnd";
import { isEmpty } from "lodash";

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle
) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: "100%",
  position: "relative",
});

const Experimental = () => {
  const queryAttr = "data-rbd-drag-handle-draggable-id";
  const [placeholderProps, setPlaceholderProps] = React.useState<any>();
  const [listItems, updateListItems] = React.useState<any>([
    {
      id: "task-1",
      content:
        "This This This This This This This This This This This This This This This This This This",
    },
    {
      id: "task-2",
      content: "is is is is is is is is is is is is is",
    },
    {
      id: "task-3",
      content:
        "awesome awesome awesome awesome awesome awesome awesome awesome awesome awesome awesome awesome awesome awesome awesome awesome awesome",
    },
    {
      id: "task-4",
      content: "!",
    },
  ]);

  const handleDragStart = (event: DragStart) => {
    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = event.source.index;
    var clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentElement).paddingTop) +
      //@ts-ignore
      [...draggedDOM.parentElement.children]
        .slice(0, sourceIndex)
        .reduce((total, curr) => {
          // @ts-ignore
          const style = curr.currentStyle || window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentElement).paddingLeft
      ),
    });
  };

  const handleDragEnd = (result: DropResult) => {
    setPlaceholderProps({});
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      listItems,
      result.source.index,
      result.destination.index
    );

    updateListItems(items);
  };

  const handleDragUpdate = (
    initial: DragUpdate,
    provided: ResponderProvided
  ) => {
    if (!initial.destination) {
      return;
    }

    const draggedDOM = getDraggedDom(initial.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = initial.destination.index;
    const sourceIndex = initial.source.index;
    //@ts-ignore
    const childrenArray = [...draggedDOM.parentElement.children];
    const movedItem = childrenArray[sourceIndex];
    childrenArray.splice(sourceIndex, 1);

    const updatedArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex + 1),
    ];

    var clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentElement).paddingTop) +
      updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
        // @ts-ignore
        const style = curr.currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentElement).paddingLeft
      ),
    });
  };

  const getDraggedDom = (draggableId: string) => {
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    return draggedDOM;
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
    >
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            //@ts-ignore
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {listItems.map((item: any, index: number) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    //@ts-ignore
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {placeholderProps !== undefined && snapshot.isDraggingOver && (
              <div
                className="placeholder"
                style={{
                  top: placeholderProps.clientY,
                  left: placeholderProps.clientX,
                  height: placeholderProps.clientHeight,
                  width: placeholderProps.clientWidth,
                }}
              />
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Experimental;
