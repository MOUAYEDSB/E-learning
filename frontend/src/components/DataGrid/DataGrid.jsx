import "./dataGrid.css";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { assets } from "../../assets/assets";
import { ArrowIcon } from "../../assets/ArrowIcon";
import { EditIcon } from "../../assets/EditIcon";
import { OptionsIcon } from "../../assets/OptionsIcon";
import { DeleteIcon } from "../../assets/DeleteIcon";
import { ViewIcon } from "../../assets/ViewIcon";
import { QuickEdit } from "../QuickEdit/QuickEdit";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export const DataGrid = ({
  role,
  columns: initialColumns,
  items = [],
  setItems,
  maxHeight,
}) => {
  const { users, deleteUser } = useContext(UserContext);
  const navigate = useNavigate();

  // State management for resizing columns
  const [isResizing, setIsResizing] = useState(false);
  const [targetIndex, setTargetIndex] = useState(0);
  const [initialMouseX, setInitialMouseX] = useState(0);
  const [initialWidth, setInitialWidth] = useState(0);
  const [widths, setWidths] = useState(
    initialColumns.map((column) => column.width)
  );

  // State management for toggling options and quick edit mode
  const [toggleOptions, setToggleOptions] = useState(-1);
  const [toggleQuickEdit, settoggleQuickEdit] = useState(false);

  // Handling column resizing on mouse events
  const handleMouseDown = (e) => {
    const target = e.target.closest(".data-grid-resize-handle");
    if (target) {
      const index = target.getAttribute("id");
      if (index !== null) {
        setIsResizing(true);
        setTargetIndex(index);
        setInitialMouseX(e.clientX);
        setInitialWidth(parseInt(widths[index], 10));
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
          newWidth >= minWidth ? `${newWidth}px` : minWidth;
        return updatedWidths;
      });
    }
  };

  // Adding event listeners for mouse movements
  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isResizing, targetIndex, initialWidth, initialMouseX]);

  // Function to handle different types of cell rendering
  const renderCell = (column, item) => {
    switch (column.type) {
      case "text":
        return (
          <>
            {column.img && (
              <img className="row-img" src={item[column.img]} alt="icon" />
            )}
            <span>{item[column.field]}</span>
          </>
        );
      case "status":
        const backColor = column.options[item[column.field]][0];
        const color = column.options[item[column.field]][1];
        return (
          <div
            className="data-grid-status"
            style={{ backgroundColor: `${backColor}` }}
          >
            <label style={{ color: `${color}` }}>{item[column.field]}</label>
          </div>
        );
      default:
        console.error(`Specify a valid type for column '${column.field}'`);
        return null;
    }
  };

  // Sorting function for columns that support sorting
  const sortRows = (column) => {
    const sorted = [...items].sort((a, b) => {
      const aValue = a[column.field];
      const bValue = b[column.field];
      if (typeof aValue === "string") {
        return aValue.localeCompare(bValue);
      } else if (typeof aValue === "number") {
        return aValue - bValue;
      }
      return 0;
    });
    setItems(sorted);
  };

  // Functions for handling UI interactions
  const disableOffClickCheck = () => {
    setToggleOptions(-1);
    settoggleQuickEdit(false);
  };
  
  return (
    <div
      className="data-grid"
      style={{ maxHeight: `${maxHeight ? maxHeight : "none"}` }}
    >
      <div
        className={`offclick-check ${
          toggleOptions === -1 ? (toggleQuickEdit ? "darkBlock" : "") : "block"
        }`}
        onClick={disableOffClickCheck}
      ></div>
      <div className={`quick-edit ${toggleQuickEdit ? "show" : ""}`}>
        <QuickEdit />
      </div>
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
        {Array.isArray(items) && items.length > 0 ? (
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
                  {renderCell(column, item)}
                </div>
              ))}
              <div
                className="data-grid-quick-edit-button"
                onClick={() => settoggleQuickEdit(true)}
              >
                <EditIcon fillColor="#637381" />
              </div>
              <div
                className={`data-grid-options-button ${
                  toggleOptions === index ? "show" : ""
                }`}
                onClick={() => setToggleOptions(index)}
              >
                <OptionsIcon fillColor="#637381" />
                <div className="data-grid-popup">
                  <div className="data-grid-popup-option" onClick={() => navigate(`/user/${item._id}`)}>
                    <div className="data-grid-popup-button">
                      <ViewIcon fillColor="#1c252e" />
                    </div>
                    <span>Voir</span>
                  </div>
                  <div className="data-grid-popup-option">
                    <div className="data-grid-popup-button">
                      <EditIcon fillColor="#1c252e" />
                    </div>
                    <span>Editer</span>
                  </div>
                  <div className="data-grid-popup-option">
                    <div className="data-grid-popup-button">
                      <DeleteIcon fillColor="#ff5630" />
                    </div>
                    <span onClick={() => deleteUser(item._id)}>Supprimer</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
      <div
        onClick={() => navigate("/user/create")}
        className="data-grid-add-button"
      >
        Ajouter
      </div>
    </div>
  );
};

DataGrid.propTypes = {
  role: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string,
      width: PropTypes.string,
      minWidth: PropTypes.string,
      type: PropTypes.string,
      options: PropTypes.object,
    })
  ).isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  setItems: PropTypes.func.isRequired,
  maxHeight: PropTypes.string,
};
