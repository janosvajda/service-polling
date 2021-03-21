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
        return [{"name":"id","status":"2"},{"name":"url","status":"dfsdfs"}];
    }

    addItem(e) {
        if (this._inputElement.value !== "") {

            let newItem = {
                text: this._inputElement.value,
                key: Date.now()
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
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this._inputElement = a}
                               placeholder="enter task">
                        </input>
                        <button type="submit">add</button>
                    </form>
                </div>
                <ServiceItems entries={this.state.items}/>
            </div>
        );
    }
}


export default ServiceList;
