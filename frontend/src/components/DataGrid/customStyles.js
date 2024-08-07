export const customStyles = {
    control: (provided, state) => ({
        ...provided,
        fontFamily: "Poppins",
        fontSize: "14px",
        background: 'transparent',
        borderColor: state.isFocused ? '#949494 !important' : 'transparent',
        borderRadius: "0.25rem",
        minHeight: '32px',
        height: '32px',
        minWidth: '85px',
        width: "100%",
        boxShadow: 'none',
        '&:hover': {
            borderColor: '#b9b9b9',
        },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
        ...styles,
        backgroundColor: isSelected ? "#e0e0e0" : isFocused ? "#f7f7f7" : 'transparent',
        color: '#000',
        fontFamily: "Poppins",
        fontSize: "14px"
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 9999,
        padding: 0,
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "black !important",
    }),
    valueContainer: (provided) => ({
        ...provided,
        height: '32px',
        padding: '0 0 0 0.5rem'
    }),
    placeholder: (provided) => ({
        ...provided,
        color: "#9b9b9b",
        fontFamily: "Poppins",
        fontSize: "14px"
    }),
    input: (provided) => ({
        ...provided,
        margin: '0px',
        padding: '0px',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: '32px',
        backgroundColor: "transparent"
    }),
};