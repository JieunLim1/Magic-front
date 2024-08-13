import Select from 'react-dropdown-select';
import React from 'react';
const Multi = ({ options, title }) => (
    <React.Fragment>
      <Select
        multi
        options={options}
        values={[]}
      />
    </React.Fragment>
  );
  export default Multi;