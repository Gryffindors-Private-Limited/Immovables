import React, { Component } from "react";
import "./main.css";

class Main extends Component {
  render() {
    return (
      <div id="content">
        <h1>Add Property</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();

            const name = this.productName.value;
            const location = this.productLocation.value;
            const sqft = this.productSqft.value;
            const price = window.web3.utils.toWei(
              this.productPrice.value.toString(),
              "Ether"
            );
            this.props.createProduct(name, location, sqft, price);
          }}
        >
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => {
                this.productName = input;
              }}
              className="form-control"
              placeholder="Property Description"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productLocation"
              type="text"
              ref={(input) => {
                this.productLocation = input;
              }}
              className="form-control"
              placeholder="Property Location"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productSqft"
              type="text"
              ref={(input) => {
                this.productSqft = input;
              }}
              className="form-control"
              placeholder="Property Sqaure feet"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => {
                this.productPrice = input;
              }}
              className="form-control"
              placeholder="Property Price"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary ">
            Add Property
          </button>
        </form>
        <p>&nbsp;</p>
        <h2>Buy Property</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>

              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th scope="col">Square feet</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.props.products.map((product, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>

                  <td>{product.name}</td>
                  <td>{product.location}</td>
                  <td>{product.sqft}</td>
                  <td>
                    {window.web3.utils.fromWei(
                      product.price.toString(),
                      "Ether"
                    )}{" "}
                    Eth
                  </td>
                  <td>{product.owner}</td>
                  <td>
                    {!product.purchased ? (
                      <button
                        className="buy-btn btn-primary"
                        name={product.id}
                        value={product.price}
                        onClick={(event) => {
                          this.props.purchaseProduct(
                            event.target.name,
                            event.target.value
                          );
                        }}
                      >
                        Buy
                      </button>
                    ) : (
                      <button
                        className="buy-btn btn-danger"
                        onClick={(e) => {
                          alert("Sorry Dude, This property has been Sold");
                        }}
                      >
                        Sold
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
