
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class DirectorySelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(evt) {
        console.log(evt.target.value);
        window.postMessage({
            type: 'select-dir'
        });
        this.setState({value: evt.target.value});
    } 

    render() {
        console.log(this.state);
        return (
            <Form>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Select a Directory</Form.Label>
                    <Button variant="primary" onClick={this.handleChange}>
                        Select Folder
                    </Button>
                </Form.Group>
            </Form>
        );
    }
}

export default DirectorySelector;