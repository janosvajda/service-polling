import React from "react";
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
 */
class ServiceItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openEdit: false
        };

        this.selectedId = null;
        this.selectedUrl = '';
        this.selectedTitle = '';
        this.createService = this.createService.bind(this);
        this.render = this.render.bind(this);
    }

    handleUrlFieldChange = (e) => {
        this.selectedUrl = e.target.value;
    }

    handleTitleFieldChange = (e) => {
        this.selectedTitle = e.target.value;
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
        console.log('this.selectedTitle in editItem', this.selectedTitle);

        if (this.selectedUrl === '' || !Utils.isValidURL(this.selectedUrl)) {
            alert('Not valid or empty URL.'); //@todo all alerts should be changed to Material dialog component.
            return;
        }

        if (this.selectedTitle === '') {
            alert('Name is a required field.'); //@todo all alerts should be changed to Material dialog component.
            return;
        }

        if (this.selectedId === '' || this.selectedId === null) return;

        console.log('Amended items', this.selectedId, this.selectedUrl);

        //@todo URLS should not be hard-coded in frontend code. It should come from an environment config.
        (async () => {
            const rawResponse = await fetch('http://localhost:8888/service', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'id': this.selectedId, 'url': this.selectedUrl, 'title': this.selectedTitle})
            });

            const response = await rawResponse.json();

            if (response.result !== 'ok') {
                alert('Edit failed. Please, try it again.')
            }

            this.selectedId = null;
            this.selectedUrl = '';
            this.selectedTitle = '';

            window.document.location.reload(); //@todo This should be more sophisticated. It should just chaange the values in the array.
        })();

    }

    deleteItem() {

        //@todo URLS should not be hard-coded in frontend code. It should come from an environment config.
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
                document.getElementById(this.selectedId).remove(); //@todo this Vanillajs should be changed to React way.
            } else {
                alert('Delete failed. Please, try it again.') //@todo all alerts should be changed to Material dialog component.
            }

            this.selectedId = null;

        })();
    }

    render() {

        let serviceEntries = this.props.entries;
        let listItems = serviceEntries.map(this.createService);

        //@todo Dialogs should go to a separated component.
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

                <Dialog open={this.state.openEdit}
                        fullWidth={ true }
                        onClose={this.handleCloseEditDialog}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                           Amending of selected service.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="titleField"
                            label="Name"
                            defaultValue={this.selectedTitle}
                            onChange={this.handleTitleFieldChange}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="urlField"
                            label="URL"
                            defaultValue={this.selectedUrl}
                            onChange={this.handleUrlFieldChange}
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
            item.status = 'QUEUEING';
        }

        const handleDelete = (id) => {
            console.log('handleDelete row Id: ', id);
            this.selectedId = id;
            this.openDeleteDialog();
        };

        const handleEdit = (id, url, title) => {
            console.log('handleStatus row Id: ', id)
            this.selectedId = id;
            this.selectedUrl = url;
            this.selectedTitle = title;
            this.openEditDialog();
        };

        return <Fade left>
            <div className="itemRow" key={item.id} id={item.id}>
                <span className="textColumn bolder">{item.title}</span>
                <span className="textColumn">{item.url}</span>
                <span className="itemRowStatus">{item.status}</span>
                <span className="buttonColum"><Button color="secondary"
                                                      onClick={() => handleDelete(item.id)}
                >Delete</Button></span>

                <span className="buttonColum"><Button color="primary"
                                                      onClick={() => handleEdit(item.id, item.url, item.title)}>Edit</Button></span>
            </div>
        </Fade>
    }


    handleChange = () => {
        console.log('this.selectedId', this);
    }
};

export default ServiceItems;
