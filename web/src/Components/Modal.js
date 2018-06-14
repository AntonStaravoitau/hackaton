import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Modal from 'material-ui/Modal';
import IconButton from 'material-ui/IconButton';
import Close from '@material-ui/icons/Close';
import Colors from '../Common/Themes/Colors';

function SimpleModal(props) {
    const { classes, isVisible, toggleModalVisible, children, modalWidth, modalHeight } = props;

    return (
        <Modal
            open={isVisible}
            onClose={() => toggleModalVisible(false)}
        >
            <section style={getModalStyle(modalWidth, modalHeight)} className={classes.modalWrapper}>
                <IconButton
                    className={classes.closeButton}
                    component='span'
                    onClick={() => toggleModalVisible(false)}
                >
                    <Close />
                </IconButton>
                <main className={classes.modalContent}>
                    {children}
                </main>
            </section>
        </Modal>
    )
}

function getModalStyle(modalWidth, modalHeight) {
    const top = 45;
    const left = 50;
    let modalWidthValue = modalWidth ? `${modalWidth}px` : 'auto';
    let modalHeightValue = modalHeight ? `${modalHeight}px` : 'auto';

    return {
        width: modalWidthValue,
        height: modalHeightValue,
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        outline: `none`,
    };
}

const styles = theme => ({
    modalWrapper: {
        position: 'absolute',
        minWidth: theme.spacing.unit * 40,
        minHeight: theme.spacing.unit * 15,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: Colors.brandSecondary,
        borderRadius: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        color: Colors.brandBorder,
    },
    modalContent: {},
    modalTitle: {
        marginTop: 0,
    },
    modalText: {},
    [theme.breakpoints.down('xs')]: {
        modalWrapper: {
            minWidth: 'auto',
            width: 'calc(100% - 68px)!important',
            transform: 'translate(-50%, -50%)!important',
        },
    },
});

SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const ModalWrapped = withStyles(styles)(SimpleModal);

export default ModalWrapped;