import "./dataGrid.css";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ArrowIcon } from "../../assets/ArrowIcon";
import { EditIcon } from "../../assets/EditIcon";
import { OptionsIcon } from "../../assets/OptionsIcon";
import { DeleteIcon } from "../../assets/DeleteIcon";
import { ViewIcon } from "../../assets/ViewIcon";
// import { QuickEdit } from "../QuickEdit/QuickEdit";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import defaultImage from "../../assets/defaultprofileimage.jpg"; // Updated path to default image

export const DataGrid = ({
  
  columns: initialColumns,
  items = [],
  setItems,
  maxHeight,
}) => {
  // eslint-disable-next-line no-unused-vars
  const { users, deleteUser } = useContext(UserContext);
  const navigate = useNavigate();

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [isResizing, targetIndex, initialWidth, initialMouseX, handleMouseMove]);

  const renderCell = (column, item) => {
    const { type, field } = column;
    const cellContent = item[field];
    const imageUrl = field === 'profileImgURL' ? `${import.meta.env.VITE_API_BASE_URL}/${cellContent}` : '';
  
    const handleImageError = (e) => {
      e.target.src = defaultImage;
    };
  
    switch (type) {
      case "text":
        return <span>{cellContent || "N/A"}</span>;
  
      case "image":
        return (
          <img
            src={imageUrl || defaultImage}
            alt="Profile"
            className="data-grid-image"
            onError={handleImageError}
          />
        );
  
      default:
        return <span>{cellContent || "N/A"}</span>;
    }
  };

  const disableOffClickCheck = () => {
    setToggleOptions(-1);
    setToggleQuickEdit(false);
  };

  return (
    <div className="data-grid" style={{ maxHeight: maxHeight || "none" }}>
      <div
        className={`offclick-check ${
          toggleOptions === -1 ? (toggleQuickEdit ? "darkBlock" : "") : "block"
        }`}
        onClick={disableOffClickCheck}
      ></div>
      <div className={`quick-edit ${toggleQuickEdit ? "show" : ""}`}>
        {/* <QuickEdit /> */}
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
                // eslint-disable-next-line no-undef
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
                  {renderCell(column, item)}
                </div>
              ))}
              <div
                className="data-grid-quick-edit-button"
                onClick={() => setToggleQuickEdit(true)}
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
                  <div
                    className="data-grid-popup-option"
                    onClick={() => navigate(`/user/${item._id}`)}
                  >
                    <div className="data-grid-popup-button">
                      <ViewIcon fillColor="#1c252e" />
                    </div>
                    <span>Voir</span>
                  </div>
                  <div className="data-grid-popup-option">
                    <div className="data-grid-popup-button">
                      <EditIcon fillColor="#1c252e" />
                    </div>
                    <span>Éditer</span>
                  </div>
                  <div
                    className="data-grid-popup-option"
                    onClick={() => {
                      deleteUser(item._id);
                      setItems(items.filter((user) => user._id !== item._id));
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

DataGrid.propTypes = {
  role: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      type: PropTypes.string,
      img: PropTypes.string,
      options: PropTypes.object,
      minWidth: PropTypes.string,
    })
  ),
  items: PropTypes.array,
  setItems: PropTypes.func.isRequired,
  maxHeight: PropTypes.string,
};
