import React, {Component} from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Fade from 'react-reveal/Fade';

/**
 * Items in service list component.
 *
 * @author Janos Vajda
 */

class ServiceItems extends Component {

    render() {

        let serviceEntries = this.props.entries;
        let listItems = serviceEntries.map(this.createService);

        return (
            <div className="listDiv">
                <Box width="100%" bgcolor="white" p={1} my={0.5}>
                    {listItems}
                </Box>
            </div>
        );
    }

    createService(item) {
        let selectedId = null;

        console.log('Item in ServiceItems: ', item)

        const handleDelete = (id) => {
            console.log('handleDelete row Id: ', id)
        };

        const handleStatus = (id) => {
            console.log('handleStatus row Id: ', id)
        };

        return <Fade left><div className="itemRow" key={item.id}>
            <span className="textColumn">{item.url}</span>
            <span className="buttonColum"><Button color="secondary"
                                                  onClick={() => handleDelete(item.id)}
            >Delete</Button></span>

            <span className="buttonColum"><Button color="primary"
                                                  onClick={() => handleStatus(item.id)}>Start service</Button></span>
        </div></Fade>
    }


    handleChange = () => {
        console.log('this.selectedId', this);
    }
};

export default ServiceItems;
