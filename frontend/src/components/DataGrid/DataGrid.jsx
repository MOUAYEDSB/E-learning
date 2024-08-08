import "./dataGrid.css";
import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import {ArrowIcon} from "../../assets/ArrowIcon";
import {EditIcon} from "../../assets/EditIcon";
import {OptionsIcon} from "../../assets/OptionsIcon";
import {DeleteIcon} from "../../assets/DeleteIcon";
import {ViewIcon} from "../../assets/ViewIcon";
import {QuickEdit} from "../QuickEdit/QuickEdit"

export const DataGrid = ({ columns: initialColumns, items, setItems, maxHeight }) => {
    const [isResizing, setIsResizing] = useState(false);
    const [targetIndex, setTargetIndex] = useState(0);
    const [initialMouseX, setInitialMouseX] = useState(0);
    const [initialWidth, setInitialWidth] = useState(0);
    const [widths, setWidths] = useState(initialColumns.map(column => column.width));
    const [toggleOptions, setToggleOptions] = useState(-1);
    const [toggleQuickEdit, settoggleQuickEdit] = useState(false);

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
                setIsResizing(true);
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
        setIsResizing(false);
        document.body.classList.remove('resizing-active');
    };

    const handleMouseMove = (e) => {
        if (isResizing) {
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
    }, [isResizing, targetIndex, initialWidth, initialMouseX]);

    function shadeColor(color, percent) {

        var R = parseInt(color.substring(1,3),16);
        var G = parseInt(color.substring(3,5),16);
        var B = parseInt(color.substring(5,7),16);
    
        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);
    
        R = (R<255)?R:255;  
        G = (G<255)?G:255;  
        B = (B<255)?B:255;  
    
        R = Math.round(R)
        G = Math.round(G)
        B = Math.round(B)
    
        var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
        var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
        var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
    
        return "#"+RR+GG+BB;
    }

    const renderCell = (column, item) => {
        switch (column.type) {
            case 'text':
                return (
                    <>
                        {column.img && <img className="row-img" src={item[column.img]}></img>}
                        <span>{item[column.field]}</span>
                    </>
                );
            case 'status':
                const backColor = column.options[item[column.field]][0];
                const color = column.options[item[column.field]][1];
                return(
                    <div className="data-grid-status" style={{backgroundColor:`${backColor}`}}>
                        <label style={{color:`${color}`}}>
                            {item[column.field]}
                        </label>
                    </div>
                );
            default:
                console.error(`Precise a VALID type for column '${column.field}'`);
                return null;
        }
    };

    const sortRows = (column) => {
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

    const disableOffClickCheck = () => {
        setToggleOptions(-1);
        settoggleQuickEdit(false);
    }
    return (
        <div className="data-grid" style={{maxHeight:`${maxHeight?maxHeight:'none'}`}}>
            <div className={`offclick-check ${toggleOptions==-1?(toggleQuickEdit?"darkBlock":""):"block"}`}
                onClick={disableOffClickCheck}></div>
            <div className={`quick-edit ${toggleQuickEdit?"show":""}`}>
                <QuickEdit></QuickEdit>
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
                                {renderCell(column, item)}
                            </div>
                        ))}
                        <div className="data-grid-quick-edit-button" onClick={() => settoggleQuickEdit(true)}>
                            <EditIcon fillColor="#637381"/>
                        </div>
                        <div className={`data-grid-options-button ${toggleOptions==index?"show":""}`} onClick={() => setToggleOptions(index)}>
                            <OptionsIcon fillColor="#637381"/>
                            <div className="data-grid-popup">
                                <div className="data-grid-popup-option">
                                    <div className="data-grid-popup-button">
                                        <ViewIcon fillColor="#1c252e"/>
                                    </div>
                                    <span>Voir</span>
                                </div>
                                <div className="data-grid-popup-option">
                                    <div className="data-grid-popup-button">
                                        <EditIcon fillColor="#1c252e"/>
                                    </div>
                                    <span>Editer</span>
                                </div>
                                <div className="data-grid-popup-option">
                                    <div className="data-grid-popup-button">
                                        <DeleteIcon fillColor="#ff5630"/>
                                    </div>
                                    <span>Supprimer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};