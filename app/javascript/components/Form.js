import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import PropTypes from 'prop-types';
import List from './List';

const languages = [
    {
        value: 'Ruby',
        label: 'Ruby',
    },
    {
        value: 'Python',
        label: 'Python',
    },
    {
        value: 'Javascript',
        label: 'Javascript',
    },
    {
        value: 'PHP',
        label: 'PHP',
    },
    {
        value: 'Java',
        label: 'Java',
    },
];

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: 500,
        width: 300,
    },
    menu: {
        width: 300,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            language: "Ruby",
            setLanguage: "Ruby",
            projects: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            setLanguage: e.target.value
        })
    }

    handleSubmit(e) {
        const fetchRep = async () => {
            const res = await axios.get("https://api.github.com/search/repositories?q=language:" + this.state.setLanguage + "&sort=stars&order=desc&per_page=10")
                .then(response => {
                    this.setState({
                        projects: Array.from(response.data.items),
                    })
                }).catch(error => {
                    console.log("check login error", error);
                })
        }
        fetchRep();
        e.preventDefault();
    }


    render() {
        const { classes } = this.props;
        return (
            <div>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <div>
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Select"
                        className={classes.textField}
                        value={this.state.setLanguage}
                        onChange={this.handleChange}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        helperText="Please select a language"
                        margin="normal"
                    >
                        {languages.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ background: '#ef0044' }}
                        className={classes.submit}>
                            Search
                    </Button>
                </div>
            </form>
            <div>
                <List posts={this.state.projects}/>
            </div>
            </div>
        );
    }
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);