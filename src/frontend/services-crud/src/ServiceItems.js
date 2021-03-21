import React, {Component} from "react";

/**
 * Items in service list component.
 *
 * @author Janos Vajda
 */
class ServiceItems extends Component {
    createService(item) {
        return <li key={item.key}>{item.text}</li>
    }

    render() {

        let serviceEntries = this.props.entries;
        let listItems = serviceEntries.map(this.createService);

        return (
            <ul className="serviceList">
                {listItems}
            </ul>
        );
    }
};

export default ServiceItems;
