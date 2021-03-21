import React, {Component} from "react";
import ServiceItems from "./ServiceItems";

/**
 * Service List component.
 *
 * @author Janos Vajda
 */
class ServiceList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.loadItems()
        };

        this.addItem = this.addItem.bind(this);
    }

    loadItems() {
        return [
                {"id":"1","url":"https://vertx.io/get-started/","status":"0"},{"id":"2","url":"dfsdfs","status":"0"}
            ];
    }

    addItem(e) {
        if (this._inputElement.value !== "") {

            let newItem = {
                url: this._inputElement.value,
                id: 0,
                status: 0,
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });

            this._inputElement.value = "";
        }

        e.preventDefault();
    }

    render() {
        return (
            <div className="serviceListMain">
                <div className="header">
                    <form onSubmit={ this.addItem }>
                        <input ref={ (a) => this._inputElement = a }
                               placeholder="Enter new service name">
                        </input>
                        <button type="Add">add</button>
                    </form>
                </div>
                <ServiceItems entries={ this.state.items }/>
            </div>
        );
    }
}


export default ServiceList;
