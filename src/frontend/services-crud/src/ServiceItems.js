import React, {Component} from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Fade from 'react-reveal/Fade';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';
import Utils from "./Utils"

/**
 * Items in service list component.
 *
 * @author Janos Vajda
 */
class ServiceItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openEdit: false
        };

        this.selectedId = null;
        this.selectedUrl = ''
        this.createService = this.createService.bind(this);
        this.render = this.render.bind(this);
    }

    handleTextFieldChange = (e) => {
        this.selectedUrl = e.target.value;
    }

    openDeleteDialog() {
        this.setState(state => ({
            open: true
        }));
    }

    handleClickOpenDeleteDialog = () => {
        this.setState(state => ({
            open: true
        }));
    };

    handleCloseDeleteDialog = () => {
        this.setState(state => ({
            open: false
        }));
    };

    handleAgreeDeleteDialog = () => {
        console.log("Delete");
        this.deleteItem();
        this.handleCloseDeleteDialog();
    };

    handleDisagreeDeleteDialog = () => {
        console.log("Cancel deleting.");
        this.handleCloseDeleteDialog();
    };

    openEditDialog() {
        this.setState(state => ({
            openEdit: true
        }));
    }

    handleClickOpenEditDialog = () => {
        this.setState(state => ({
            openEdit: true
        }));
    };

    handleCloseEditDialog = () => {
        this.setState(state => ({
            openEdit: false
        }));
    };

    handleAgreeEditDialog = () => {
        console.log("Edit");
        this.editItem();
        this.handleCloseEditDialog();
    };

    handleDisagreeEditDialog = () => {
        console.log("Cancel editing.");
        this.handleCloseEditDialog();
    };

    editItem() {
        console.log('this.selectedUrl in editItem', this.selectedUrl);

        if (this.selectedUrl === '' || !Utils.isValidURL(this.selectedUrl)) {
            alert('Not valid or empty URL.')
            return;
        }

        if (this.selectedId === '' || this.selectedId === null) return;

        console.log('Amended items', this.selectedId, this.selectedUrl);

        (async () => {
            const rawResponse = await fetch('http://localhost:8888/service', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'id': this.selectedId, 'url': this.selectedUrl})
            });

            const response = await rawResponse.json();

            if (response.result !== 'ok') {
                alert('Edit failed. Please, try it again.')
            }

            this.selectedId = null;
            this.selectedUrl = '';

            window.document.location.reload(); //@todo this should be more user firendly. it should just chaange values in the array.


        })();

    }

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
                    onClose={this.handleCloseDeleteDialog}
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
                        <Button onClick={this.handleDisagreeDeleteDialog} color="primary">
                            No
                        </Button>
                        <Button onClick={this.handleAgreeDeleteDialog} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.openEdit} onClose={this.handleCloseEditDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Amend URL</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                           Amending of the selected URL.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="urlField"
                            label="URL"
                            defaultValue={this.selectedUrl}
                            onChange={this.handleTextFieldChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDisagreeEditDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleAgreeEditDialog} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    createService(item) {
        console.log('Item in ServiceItems: ', item)

        if (item.status === null || item.status === '') {
            item.status = 'NOT CHECKED';
        }

        const handleDelete = (id) => {
            console.log('handleDelete row Id: ', id);
            this.selectedId = id;
            this.openDeleteDialog();
        };

        const handleEdit = (id, url) => {
            console.log('handleStatus row Id: ', id)
            this.selectedId = id;
            this.selectedUrl = url;
            this.openEditDialog();
        };

        return <Fade left>
            <div className="itemRow" key={item.id} id={item.id}>
                <span className="textColumn">{item.url}</span>
                <span className="itemRowStatus">{item.status}</span>
                <span className="buttonColum"><Button color="secondary"
                                                      onClick={() => handleDelete(item.id)}
                >Delete</Button></span>

                <span className="buttonColum"><Button color="primary"
                                                      onClick={() => handleEdit(item.id, item.url)}>Amend URL</Button></span>
            </div>
        </Fade>
    }


    handleChange = () => {
        console.log('this.selectedId', this);
    }
};

export default ServiceItems;
