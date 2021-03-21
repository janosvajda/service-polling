import React, {Component} from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

/**
 * Items in service list component.
 *
 * @author Janos Vajda
 */

class ServiceItems extends Component {

    onDeleteClick(id) {
        console.log('Delete item: ', id)
    }

    createService(item) {
        const self = this;
        console.log('Item in ServiceItems: ', item)
        return <div className="itemRow" key={item.id}>
            <span className="textColumn">{item.url}</span>
            <span className="buttonColum"><Button color="secondary"
                                                  onClick={() => console.log('work work')}>Delete</Button></span>

            <span className="buttonColum"><Button color="primary"
                                                  onClick={() => console.log('work work')}>Start service</Button></span>
        </div>
    }

    render() {

        let serviceEntries = this.props.entries;
        let listItems = serviceEntries.map(this.createService);

        return (
            <div className="listDiv">
                <Box width="100%" bgcolor="white.300" p={1} my={0.5}>
                        {listItems}
                </Box>
            </div>
        );
    }
};

export default ServiceItems;
