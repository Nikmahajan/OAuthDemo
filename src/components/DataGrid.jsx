/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import md5 from 'md5';
import './datagrid.css';
import TableSection from './TableSection';


class DataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  componentWillMount() {
    this.state.data.map((obj, index) => obj.checkboxId = `checkboxId${index}`);
  }
  render() {
    return (
      <div>
        <TableSection {...this.props} data={this.state.data} metadata={this.props.metadata} />
      </div>
    );
  }
}


export default DataGrid;
