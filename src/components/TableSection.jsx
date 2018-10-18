import React, { Component } from 'react';
import TableBody from './TableBody';
import TableHeader from './TableHeaader';

class TableSection extends Component {

  render() {
    if (!this.props.data || !this.props.data.length) {
      return null;
    }
    return (
      <div className="data-grid">
        <div className="content">
          <div className="table">
            <table>
              <thead>
                <tr className="total-record-row">
                  <th colSpan="6">{this.props.data.length} RECORDS</th>
                </tr>
                <tr className="table-header">
                  <TableHeader metadata={this.props.metadata} />
                </tr>
              </thead>
              <tbody>
                <TableBody {...this.props} tableData={this.props.data} metadata={this.props.metadata} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default TableSection;
