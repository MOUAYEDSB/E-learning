import "./dataGrid.css"
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { assets } from "../../assets/assets";
import ArrowIcon from "../../assets/ArrowIcon"

export const DataGrid = ({columns:initialColumns, items, setItems}) => {
    const headerRefs = useRef([]);
    const [isDragging, setIsDragging] = useState(false);
    const [initialWidth, setInitialWidth] = useState(0);
    const [initialMouseX, setInitialMouseX] = useState(0);
    const [targetIndex, setTargetIndex] = useState(0);
    const [columns, setColumns] = useState(initialColumns);
    const [widths, setWidths] = useState(initialColumns.map(column => column.width || '100px'));
    
    //example input
    /*const columns = [
        { field: 'title', headerName: 'Title', type : 'select', options: ["Mr","Mdm"] , width: "120px", minWidth: "85px"},
        { field: 'name', headerName: 'Name', type : 'text', width: "100px" },
        { field: 'email', headerName: 'E-mail Address', type : 'text', width: "250px" },
        { field: 'age', headerName: 'Age', type : 'number', width: "60px" },
        { field: 'action', headerName: 'Action', type : 'edit', width: "150px" },
    ];

    const [items, setItems] = useState([
    {
        title:"Mr",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        age: 30,
    },
    {
        title:"Mdm",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        age: 28,
    },
    ]);*/

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            fontFamily: "Poppins",
            fontSize:"14px",
            background: 'transparent',
            borderColor: state.isFocused ? '#949494 !important' : 'transparent' ,
            borderRadius: "0.25rem",
            minHeight: '32px',
            height: '32px',
            minWidth: '85px',
            width:"100%",
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#b9b9b9',
            },
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
            ...styles,
            backgroundColor: isSelected?"#e0e0e0":isFocused?"#f7f7f7":'transparent',
            color: '#000',
            fontFamily: "Poppins",
            fontSize:"14px"
        }),
        menu: (provided, state) => ({
            ...provided,
            zIndex: 9999,
            padding:0,
        }),

        valueContainer: (provided, state) => ({
            ...provided,
            height: '32px',
            padding: '0 0 0 0.5rem'
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: "#9b9b9b",
            fontFamily: "Poppins",
            fontSize:"14px"
        }),
        input: (provided, state) => ({
            ...provided,
            margin: '0px',
            padding:'0px',
        }),
        indicatorSeparator: state => ({
            display: 'none',
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            height: '32px',
            backgroundColor: "transparent"
        }),
        indicatorContainer: (provided, state) => ({
            ...provided,
            backgroundColor: "transparent"
        }),
    };

    const handleMouseDown = (e) => {
        const target = e.target.closest('.data-grid-resize-handle');
        if (target) {
            const index = target.getAttribute("id");
            if (index !== null) {
                setIsDragging(true);
                setTargetIndex(index);
                setInitialMouseX(e.clientX);
                setInitialWidth(parseInt(columns[index].width));
                document.body.classList.add('resizing-active');
                console.log(`Resizing column: ${index}`);
            } else {
                console.error('Column index is null');
            }
        } else {
            console.error('No resize handle found');
        }
    };

    const handleMouseUp = (e) => {
        setIsDragging(false);
        document.body.classList.remove('resizing-active');
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const mouseMoveX = e.clientX - initialMouseX;
            const newWidth = initialWidth + mouseMoveX;
            if (columns[targetIndex].minWidth){
                columns[targetIndex].width = newWidth>=parseInt(columns[targetIndex].minWidth)?`${newWidth}px`:columns[targetIndex].minWidth;
            }else columns[targetIndex].width = `${newWidth}px`;
            setColumns([...columns]);
        }
    };

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDragging, columns, targetIndex, initialWidth]);

    const renderCell = (column, item, index) => {
        switch (column.type) {
            case 'text':
                return(
                    <input type="text" value={item[column.field]}
                        onChange={(e) => handleInputChange(index, "nom", e.target.value)}/>)
            case 'number':
                return(
                    <input type="number" value={item[column.field]}
                        onChange={(e) => handleInputChange(index, "nom", e.target.value)}/>)
            case 'select':
                const formattedOptions=[];
                column.options.map(option => formattedOptions.push({value:option,label:option}));
                let indx =0;
                for (var i=0 ; i < formattedOptions.length ; i++)
                {
                    if (formattedOptions[i]["value"] == item[column.field]) {
                        indx = i;
                        break;
                    }
                }
                return(
                    <Select
                        menuPortalTarget={document.body} options={formattedOptions} 
                        defaultValue={formattedOptions[indx]} styles={customStyles}>
                        {column.options.map((option, i) => (
                            <>
                                <option value={i}>{option}</option>
                            </>
                        ))}
                    </Select>
                )
            case 'status':
            return(
                <div className="data-grid-status" style={{backgroundColor:`${column.options[item[column.field]]}`}}>
                    <label>{item[column.field]}</label>
                </div>
            )
            case 'edit':
                return(
                    <>
                        <button className="data-grid-delete-button">
                            <img src={assets.DeleteIcon}/>
                        </button>
                        <button className="data-grid-edit-button">
                            <img src={assets.EditIcon}></img>
                        </button>
                    </>
                )
        }
    };
    function sortRows(column){
        const sorted = [...items].sort((a, b) => {
            if (typeof a[column.field] === 'string') {
                // String comparison
                return a[column.field].localeCompare(b[column.field]);
            } else if (typeof a[column.field] === 'number') {
                // Numeric comparison
                return a[column.field] - b[column.field];
            }
        });
        setItems(sorted);
    }
    return(
        <div className="data-grid">
            <div className="data-grid-header">
                {columns.map((column, index) => (
                    <div className="data-grid-header-cell" style={{width:`${column.width}`, minWidth: `${column.width}`}}>
                        <span key={index}>
                            {column.headerName}
                        </span>
                        {column.sort && (
                            <div onClick={() => sortRows(column)} className = "data-grid-sort-arrow">
                                <ArrowIcon  fillColor='#a0a0a0'/>
                            </div>)}
                        <div id={index} ref={el => headerRefs.current[index] = el}
                            onMouseDown={handleMouseDown} className="data-grid-resize-handle">
                                <div/>
                        </div>
                    </div>
                ))}
            </div>
            {items.map((item, index) => (
            <div className="data-grid-row" key={index}>
                {columns.map(column => (
                    <div className="data-grid-cell" style={{width:`${column.width}`, minWidth: `${column.width}`}}>
                        {renderCell(column, item, index)}
                    </div>
                ))}
            </div>
            ))}
        </div>
    )
};
