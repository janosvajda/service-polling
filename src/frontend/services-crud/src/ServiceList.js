import React, { Component } from "react";

class ServiceList extends Component {
    render() {
        return (
            <div className="serviceListMain">
                <div className="header">
                    <form>
                        <input placeholder="Enter service name">
                        </input>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ServiceList;
