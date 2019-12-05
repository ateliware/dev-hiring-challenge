import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import Popup from "reactjs-popup";
import axios from 'axios';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    card: {
        Width: 500,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 24,
    },
    root: {
        width: '100%',
        maxWidth: 1000,
    },
    pos: {
        marginBottom: 12,
    },
    chip: {
        marginRight: theme.spacing(1),
    },
    section1: {
        margin: theme.spacing(5, 2),
        maxWidth: 1000,
    },
    section2: {
        margin: theme.spacing(2),
    },
    section3: {
        margin: theme.spacing(3, 1, 1),
    },
});

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: "",
            projects: [],
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(name, language, stars, login, image_url) {
        axios.post("/api/v1/repositories", {
            repository: {
                name: name,
                login_name: login,
                stars: stars,
                language: language,
                image_url: image_url
            }
        }, { withCredentials: true }
        ).then(response => {
            if (response.data.status === 'created') {
                console.log("created")
                toaster.notify('Repository saved!', {
                    position: 'top',
                    duration: 4000
                })
            }
        }).catch(error => {
            console.log("registration error", error);
        });
    }

    render() {
        const { classes } = this.props;
        console.log("DATA", this.props.posts)
        if (this.props.posts !== undefined) {
            return (
                this.props.posts.map((post) => {
                    return (
                        <div className='widget'>
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justify="center"
                                style={{ minHeight: '10vh' }}
                            >
                                <Grid item xs={12}>
                                    <div className={classes.root} >
                                        <div className={classes.section1}>
                                            <Grid container alignItems="center">
                                                <Grid item xs={6}>
                                                    <img
                                                        src={post.owner.avatar_url}
                                                        alt="new"
                                                        width="150" height="150"
                                                    />
                                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                        {post.name}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>

                                                <Divider variant="middle" />
                                            
                                                <div className={classes.section2}>
                                                    <Popup
                                                        trigger={open => (
                                                            <Button className="button" variant="outlined" style={{ color: '#ef0044' }}>Detalhes</Button>
                                                        )}
                                                        position="right center"
                                                        closeOnDocumentClick
                                                    >
                                                        <ul>
                                                            <li><Typography className={classes.title} variant="subtitle1: 'h6'" color="textSecondary" style={{ color: '#ef0044' }}>
                                                                forks: {post.forks}
                                                            </Typography></li>
                                                            <li><Typography className={classes.title} variant="subtitle1: 'h6'" color="textSecondary" style={{ color: '#ef0044' }}>
                                                                stars: {post.stargazers_count}
                                                            </Typography></li>
                                                            <li><Typography className={classes.title} variant="subtitle1: 'h6'" color="textSecondary" style={{ color: '#ef0044' }}>
                                                                language: {post.language}
                                                            </Typography></li>
                                                         </ul>  
                                                    </Popup>

                                                    <Button color="primary" variant="outlined" style={{ color: '#ef0044' }} onClick={e => this.handleClick(post.name, post.language, post.stargazers_count, post.owner.login, post.owner.avatar_url)}>
                                                        Salvar
                                                    </Button>

                                                    
                                                </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>);
                }));
        } else {
            return (
                <div className='widget'>
                </div>
            )
        }
    }
}

List.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(List);