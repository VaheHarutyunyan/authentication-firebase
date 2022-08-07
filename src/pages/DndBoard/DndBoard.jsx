import React, { useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { COLUMN_NAMES } from "./constants";

import "./DndBoard.scss";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const MovableItem = ({
  name,
  index,
  currentColumnName,
  moveCardHandler,
  setItems,
}) => {
  const [editor] = useState(() => withReact(createEditor()));

  const changeItemColumn = (currentItem, columnName) => {
    setItems((prevState) => {
      return prevState.map((e) => {
        return {
          ...e,
          column: e.name === currentItem.name ? columnName : e.column,
        };
      });
    });
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "Our first type",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCardHandler(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "Our first type",
    item: { index, name, currentColumnName, type: "Our first type" },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name } = dropResult;
        const { TO_DO, IN_PROGRESS, REVIEW, DONE } = COLUMN_NAMES;
        switch (name) {
          case IN_PROGRESS:
            changeItemColumn(item, IN_PROGRESS);
            break;
          case REVIEW:
            changeItemColumn(item, REVIEW);
            break;
          case DONE:
            changeItemColumn(item, DONE);
            break;
          case TO_DO:
            changeItemColumn(item, TO_DO);
            break;
          default:
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} className="movable-item" style={{ opacity }}>
      <Slate editor={editor} value={initialValue}>
        <Editable className="slate--card" />
      </Slate>
    </div>
  );
};

const Column = ({ children, className, title }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "Our first type",
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),

    canDrop: (item) => {
      const { currentColumnName } = item;
      return currentColumnName;
    },
  });

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return "rgb(188,251,255)";
      } else if (!canDrop) {
        return "rgb(255,188,188)";
      }
    } else {
      return "";
    }
  };

  return (
    <div
      ref={drop}
      className={className}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <p>{title}</p>
      {children}
    </div>
  );
};

export const DndBoard = () => {
  const [items, setItems] = useState([]);
  const handleAddTasks = () => {
    setItems([
      ...items,
      { id: ++items.length, name: "Item " + items.length, column: TO_DO },
    ]);
  };

  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState];

        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };

  const returnItemsForColumn = (columnName) => {
    return items
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableItem
          key={item.id}
          name={item.name}
          currentColumnName={item.column}
          setItems={setItems}
          index={index}
          moveCardHandler={moveCardHandler}
        />
      ));
  };

  const { TO_DO, IN_PROGRESS, REVIEW, DONE } = COLUMN_NAMES;

  return (
    <div className="container-dnd">
      <div className="dnd-header">
        <Button type="none" key={"logout"} onClick={handleAddTasks}>
          <PlusCircleOutlined />
          Add Task
        </Button>
      </div>
      <div className="dnd-body">
        <DndProvider backend={HTML5Backend}>
          <Column title={TO_DO} className="column-dnd do-it-column">
            {returnItemsForColumn(TO_DO)}
          </Column>
          <Column title={IN_PROGRESS} className="column-dnd in-progress-column">
            {returnItemsForColumn(IN_PROGRESS)}
          </Column>
          <Column title={REVIEW} className="column-dnd awaiting-review-column">
            {returnItemsForColumn(REVIEW)}
          </Column>
          <Column title={DONE} className="column-dnd done-column">
            {returnItemsForColumn(DONE)}
          </Column>
        </DndProvider>
      </div>
    </div>
  );
};
