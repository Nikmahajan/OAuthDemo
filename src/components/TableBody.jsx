/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import md5 from 'md5';
import Row from './Row';

class TableBody extends Component {


  render() {
    if (!this.props.tableData) {
      return null;
    }
    return this.props.tableData.map(rowData => (<Row
      data={rowData}
      metadata={this.props.metadata}
      handleChange={this.props.handleChange}
      key={md5((Math.random() * 46656).toString())}
                                                />));
  }
}

export default TableBody;
