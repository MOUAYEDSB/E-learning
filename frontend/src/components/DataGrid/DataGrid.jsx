import "./dataGrid.css";
import { useEffect, useState } from "react";
import Select from "react-select";
import { assets } from "../../assets/assets";
import { customStyles } from './customStyles'; 
import ArrowIcon from "../../assets/ArrowIcon";


export const DataGrid = ({ columns: initialColumns, items, setItems, maxHeight }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [targetIndex, setTargetIndex] = useState(0);
    const [initialMouseX, setInitialMouseX] = useState(0);
    const [initialWidth, setInitialWidth] = useState(0);
    const [widths, setWidths] = useState(initialColumns.map(column => column.width));

    //example input
    /*const columns = [
        { field: 'title', headerName: 'Title', type : 'select', options: ["Mr","Mdm"] , width: "120px", minWidth: "85px"},
        { field: 'name', headerName: 'Name', type : 'text', width: "150px", minWidth: '150px' },
        { field: 'email', headerName: 'Adresse E-mail', type : 'text', width: '250px', minWidth: '250px'},
        { field: 'age', headerName: 'Age', type : 'number', width: '60px', minWidth: "60px", sort: true},
        { field: 'status', headerName: 'Status', type : 'status',options: {online: '#48BB78',offline: '#d0d0d0'}, width: '80px',minWidth: '80px'},
        { field: 'action', headerName: 'Action', type : 'edit', width: '100px', minWidth: '65px'},
    ];

    const [items, setItems] = useState([
    {
        title:"Mr",
        name: "John Doe",
        email: "john.doe@example.com",
        age: 30,
        status: "online",
    },
    {
        title:"Mdm",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        age: 28,
        status: "online",
    },
    ]);*/
    
    const handleMouseDown = (e) => {
        const target = e.target.closest('.data-grid-resize-handle');
        if (target) {
            const index = target.getAttribute("id");
            if (index !== null) {
                setIsDragging(true);
                setTargetIndex(index);
                setInitialMouseX(e.clientX);
                setInitialWidth(parseInt(widths[index], 10));
                document.body.classList.add('resizing-active');
                console.log(`Resizing column: ${index}`);
            } else {
                console.error('Column index is null');
            }
        } else {
            console.error('No resize handle found');
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        document.body.classList.remove('resizing-active');
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const mouseMoveX = e.clientX - initialMouseX;
            const newWidth = initialWidth + mouseMoveX;
            setWidths(prevWidths => {
                const minWidth = initialColumns[targetIndex].minWidth ? parseInt(initialColumns[targetIndex].minWidth, 10) : 0;
                const updatedWidths = [...prevWidths];
                updatedWidths[targetIndex] = newWidth >= minWidth ? `${newWidth}px` : minWidth;
                return updatedWidths;
            });
        }
    };

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDragging, targetIndex, initialWidth, initialMouseX]);

    const renderCell = (column, item, index) => {
        switch (column.type) {
            case 'text':
                return (
                    <input
                        type="text"
                        value={item[column.field]}
                        onChange={(e) => handleInputChange(index, column.field, e.target.value)}
                    />
                );
            case 'number':
                return (
                    <input
                        type="number"
                        value={item[column.field]}
                        onChange={(e) => handleInputChange(index, column.field, e.target.value)}
                    />
                );
            case 'select':
                const formattedOptions = column.options.map(option => ({ value: option, label: option }));
                const selectedOption = formattedOptions.find(option => option.value === item[column.field]);
                return (
                    <Select
                        menuPortalTarget={document.body}
                        options={formattedOptions}
                        defaultValue={selectedOption}
                        styles={customStyles}
                    />
                );
            case 'status':
            return(
                <div className="data-grid-status" style={{backgroundColor:`${column.options[item[column.field]]}`}}>
                    <label>{item[column.field]}</label>
                </div>
            )
            case 'edit':
                return (
                    <>
                        <button className="data-grid-delete-button">
                            <img src={assets.DeleteIcon} alt="Delete" />
                        </button>
                        <button className="data-grid-edit-button">
                            <img src={assets.EditIcon} alt="Edit" />
                        </button>
                    </>
                );
            default:
                console.error(`Precise a VALID type for column '${column.field}'`);
                return null;
        }
    };

    function sortRows(column) {
        const sorted = [...items].sort((a, b) => {
            const aValue = a[column.field];
            const bValue = b[column.field];

            if (typeof aValue === 'string') {
                return aValue.localeCompare(bValue);
            } else if (typeof aValue === 'number') {
                return aValue - bValue;
            }
            return 0;
        });
        setItems(sorted);
    }

    return (
        <div className="data-grid" style={{maxHeight:`${maxHeight?maxHeight:'none'}`}}>
            <div className="data-grid-header">
                {initialColumns.map((column, index) => (
                    <div
                        className="data-grid-header-cell"
                        style={{ width: widths[index], minWidth: column.minWidth }}
                        key={column.field}
                    >
                        <span>{column.headerName}</span>
                        {column.sort && (
                            <div onClick={() => sortRows(column)} className="data-grid-sort-arrow">
                                <ArrowIcon fillColor='#a0a0a0' />
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
                {items.map((item, index) => (
                    <div className="data-grid-row" key={index}>
                        {initialColumns.map((column, columnIndex) => (
                            <div
                                className="data-grid-cell"
                                style={{ width: widths[columnIndex], minWidth: column.minWidth }}
                                key={column.field}
                            >
                                {renderCell(column, item, index)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};