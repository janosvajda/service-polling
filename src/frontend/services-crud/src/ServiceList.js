import React, {Component} from "react";
import ServiceItems from "./ServiceItems";
import Utils from "./Utils"

/**
 * Service List component.
 *
 * @author Janos Vajda
 */
class ServiceList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        this.addItem = this.addItem.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        fetch("http://localhost:8888/service")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('Result of componentDidMount in ServiceList: ', result)
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    saveItem(newItem) {
        (async () => {
            const rawResponse = await fetch('http://localhost:8888/service', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            });
            const response = await rawResponse.json();

            console.log('Response of saveItem in ServiceList componenet: ', response);
        })();
    }

    addItem(e) {
        if (this._inputElement.value !== "" && Utils.isValidURL(this._inputElement.value)) {

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

            console.log('New item: ', newItem)
            this.saveItem(newItem);
        } else {
            alert('You can save only a valid url.'); //@todo change to material alert.
        }

        e.preventDefault();
    }

    render() {

        //@todo All form's element should be replaced width a Material compontents.
        return (
            <div className="serviceListMain">
                <div className="header">
                    <form onSubmit={ this.addItem }>
                        <input className="addInput" ref={ (a) => this._inputElement = a }
                               placeholder="Add new service">
                        </input>
                        <button className="addButton" type="Add">Add</button>
                    </form>
                </div>
                <ServiceItems entries={ this.state.items }/>
            </div>
        );
    }
}


export default ServiceList;
