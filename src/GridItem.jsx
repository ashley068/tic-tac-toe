import React from "react";
import "./style.css";

class GridItem extends React.Component {
  clicked = () => {
    this.props.onClick(this.props.rindex, this.props.cindex, this.props.id);
  };

  render() {
    return (
      <div>
        <div className={this.props.classes} onClick={this.clicked}></div>
      </div>
    );
  }
}

export default GridItem;
