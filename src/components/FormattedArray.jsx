import React from 'react';

// Utility function to format the array
const formattedArray = (arr) => {
    return arr.split('\n');
}

// format passed array
const FormattedArray = ({ arr }) => {
    const splitArray = formattedArray(arr);
    const arrJSX = splitArray.map((item, index) => (
        // display each line on a new line
        <div key={index}>{item}</div>
    ));
    // return formatted jsx
    return <div className='border'>{arrJSX}</div>;
}

export default FormattedArray;