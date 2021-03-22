import React, {Component} from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Fade from 'react-reveal/Fade';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

/**
 * Items in service list component.
 *
 * @author Janos Vajda
 */
class ServiceItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };

        this.selectedId = null;

        this.createService = this.createService.bind(this);
    }

    openDialog() {
        this.setState(state => ({
            open: true
        }));
    }

    handleClickOpen = () => {
        this.setState(state => ({
            open: true
        }));
    };

    handleClose = () => {
        this.setState(state => ({
            open: false
        }));
    };

    handleAgree = () => {
        console.log("Delete");
        this.deleteItem();
        this.handleClose();
    };

    handleDisagree = () => {
        console.log("Cancel deleting.");
        this.handleClose();
    };

    deleteItem() {

        (async () => {
            const rawResponse = await fetch('http://localhost:8888/service', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'id': this.selectedId})
            });

            const response = await rawResponse.json();

            if (response.result === 'ok') {
                document.getElementById(this.selectedId).remove();
            } else {
                alert('Delete failed. Please, try it again.')
            }

            this.selectedId = null;

        })();
    }

    render() {

        let serviceEntries = this.props.entries;
        let listItems = serviceEntries.map(this.createService);

        return (
            <div className="listDiv">
                <Box width="100%" bgcolor="white" p={1} my={0.5}>
                    {listItems}
                </Box>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Would you like to delete the selected item?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDisagree} color="primary">
                            No
                        </Button>
                        <Button onClick={this.handleAgree} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    createService(item) {
        console.log('Item in ServiceItems: ', item)

        const handleDelete = (id) => {
            console.log('handleDelete row Id: ', id);
            this.selectedId = id;
            this.openDialog();
        };

        const handleStatus = (id) => {
            console.log('handleStatus row Id: ', id)
            this.selectedId = id;
            this.openDialog();
        };

        return <Fade left>
            <div className="itemRow" key={ item.id } id={ item.id }>
                <span className="textColumn">{ item.url }</span>
                <span className="buttonColum"><Button color="secondary"
                                                      onClick={() => handleDelete(item.id)}
                >Delete</Button></span>

                <span className="buttonColum"><Button color="primary"
                                                      onClick={() => handleStatus(item.id)}>Start service</Button></span>
            </div>
        </Fade>
    }


    handleChange = () => {
        console.log('this.selectedId', this);
    }
};

export default ServiceItems;
