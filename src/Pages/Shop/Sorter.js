import { Select } from 'antd';
import React from 'react';

const Sorter = ({setOnSortSelect}) => {

  return (
    <Select
    defaultValue="Featured"
    style={{
      width: '100%',
      marginTop: '10px'
    }}
    onChange={(value)=> setOnSortSelect(value)}
    options={[
      {
        value: 'Featured',
        label: 'Featured',
      },
      {
        value: 'Lowest Price',
        label: 'Lowest Price',
      },
      {
        value: 'Highest Price',
        label: 'Highest Price',
      },
    ]}
  />
  );
}

export default Sorter;
