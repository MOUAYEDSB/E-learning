import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ArrowIcon } from "../../assets/ArrowIcon";
import { OptionsIcon } from "../../assets/OptionsIcon";
import { DeleteIcon } from "../../assets/DeleteIcon";

export const ContactGrid = ({
  columns: initialColumns,
  items = [],
  setItems,
  maxHeight,
  onDelete,
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [targetIndex, setTargetIndex] = useState(0);
  const [initialMouseX, setInitialMouseX] = useState(0);
  const [initialWidth, setInitialWidth] = useState(0);
  const [widths, setWidths] = useState(
    initialColumns.map((column) => column.width || "auto")
  );

  const [toggleOptions, setToggleOptions] = useState(-1);
  const [toggleQuickEdit, setToggleQuickEdit] = useState(false);

  const handleMouseDown = (e) => {
    const target = e.target.closest(".data-grid-resize-handle");
    if (target) {
      const index = target.getAttribute("id");
      if (index !== null) {
        setIsResizing(true);
        setTargetIndex(index);
        setInitialMouseX(e.clientX);
        setInitialWidth(parseInt(widths[index], 10) || 0);
        document.body.classList.add("resizing-active");
      }
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.body.classList.remove("resizing-active");
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const mouseMoveX = e.clientX - initialMouseX;
      const newWidth = initialWidth + mouseMoveX;
      setWidths((prevWidths) => {
        const minWidth = initialColumns[targetIndex].minWidth
          ? parseInt(initialColumns[targetIndex].minWidth, 10)
          : 0;
        const updatedWidths = [...prevWidths];
        updatedWidths[targetIndex] =
          newWidth >= minWidth ? `${newWidth}px` : `${minWidth}px`;
        return updatedWidths;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isResizing, targetIndex, initialWidth, initialMouseX]);

  const disableOffClickCheck = () => {
    setToggleOptions(-1);
    setToggleQuickEdit(false);
  };

  const handleDelete = (id) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="data-grid" style={{ maxHeight: maxHeight || "none" }}>
      
      
      <div className="data-grid-header">
        {initialColumns.map((column, index) => (
          <div
            className="data-grid-header-cell"
            style={{ width: widths[index], minWidth: column.minWidth }}
            key={column.field}
          >
            <span>{column.headerName}</span>
            {column.sort && (
              <div
                onClick={() => sortRows(column)}
                className="data-grid-sort-arrow"
              >
                <ArrowIcon fillColor="#a0a0a0" />
              </div>
            )}
            <div
              id={index}
              onMouseDown={handleMouseDown}
              className="data-grid-resize-handle"
            >
              <div />
            </div>
          </div>
        ))}
      </div>
      <div className="data-grid-rows-wrapper">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div className="data-grid-row" key={index}>
              {initialColumns.map((column, columnIndex) => (
                <div
                  className="data-grid-cell"
                  style={{
                    width: widths[columnIndex],
                    minWidth: column.minWidth,
                  }}
                  key={column.field}
                >
                  <span>{item[column.field] || "N/A"}</span>
                </div>
              ))}
              <div
                className={`data-grid-options-button ${
                  toggleOptions === index ? "show" : ""
                }`}
                onClick={() => setToggleOptions(index)}
              >
                <OptionsIcon fillColor="#637381" />
                <div className="data-grid-popup">
                  <div
                    className="data-grid-popup-option"
                    onClick={() => {
                      handleDelete(item._id);
                      setItems(items.filter((contact) => contact._id !== item._id));
                    }}
                  >
                    <div className="data-grid-popup-button">
                      <DeleteIcon fillColor="#1c252e" />
                    </div>
                    <span>Supprimer</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="data-grid-no-items">
            <span>No data available</span>
          </div>
        )}
      </div>
    </div>
  );
};

ContactGrid.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      type: PropTypes.string,
      minWidth: PropTypes.string,
    })
  ),
  items: PropTypes.array,
  setItems: PropTypes.func.isRequired,
  maxHeight: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};
