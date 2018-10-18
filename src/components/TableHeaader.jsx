import React, { Component } from 'react';
import md5 from 'md5';

class TableHeader extends Component {

  render() {
    const HeaderRow = ({ metadata }) => (
      <th>{metadata.name}</th>
    );
    return (
      this.props.metadata.map(colMetaDataHeader => (<HeaderRow
        metadata={colMetaDataHeader}
        key={md5((Math.random() * 46656).toString())}
                                                    />))
    );
  }
}

export default TableHeader;
