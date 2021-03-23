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

        //@todo URLS should not be hard-coded in frontend code. It should come from an environment config.
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

        //@todo URLS should not be hard-coded in frontend code. It should come from an environment config.
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

        if (this._inputElementTitle.value === '' ) {
            alert('Nama of the service is required.');
            return;
        }

        if (this._inputElementUrl.value !== "" && Utils.isValidURL(this._inputElementUrl.value)) {

            let newItem = {
                title: this._inputElementTitle.value,
                url: this._inputElementUrl.value,
                id: 0,
                status: null,
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });

            this._inputElementTitle.value = "";
            this._inputElementUrl.value = "";

            console.log('New item: ', newItem)
            this.saveItem(newItem);
        } else {
            alert('You can add only a valid url.'); //@todo change to material alert.
        }

        e.preventDefault();
    }

    render() {

        //@todo All form's element should be replaced width a Material compontents.
        return (
            <div className="serviceListMain">
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <span className="inputTitle">Add new service:</span>
                        <input className="addInput" ref={(a) => this._inputElementTitle = a}
                               placeholder="Name of the service...">
                        </input>
                        <input className="addInput" ref={(a) => this._inputElementUrl = a}
                               placeholder="Url of the service...">
                        </input>
                        <button className="addButton" type="Add">Add</button>
                    </form>
                </div>
                <ServiceItems entries={this.state.items}/>
            </div>
        );
    }
}


export default ServiceList;
