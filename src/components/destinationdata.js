import { Component } from "react";
import "./Destinationstyles.css";

class Destinationdata extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="des-text">
          <h2>{this.props.heading}</h2>
          <p>{this.props.text}</p>
        </div>
        <div className="image">
          <img alt="img" className="image-1" src={this.props.img1} />
          <img alt="img" className="image-2" src={this.props.img2} />
        </div>
      </div>
    );
  }
}
export default Destinationdata;
