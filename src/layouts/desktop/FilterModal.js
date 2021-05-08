import React from 'react'
import { FiMenu } from "react-icons/fi"
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import FilterGroup from './FilterModalGroup';

export default function FilterModal() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button 
        onClick={() => setOpen(true)}
        startIcon={<FiMenu className={classes.icon} />}
        className={classes.button}
        disableRipple> 
        {'More'}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">More Selections</h2>
            <div className="modal-filter-cols">
              <FilterGroup title="Filter Attributes" group="attributes"/>
              <div>
                <FilterGroup title="Layers" group="layers" closePanel={() => setOpen(false)}/>
              </div>
            </div>
            <div className="modal-filter-footer">
              <div>
                <button>Reset</button>
                <button onClick={() => setOpen(false)}>Done</button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

const useStyles = makeStyles({
  button: { 
    textAlign: 'center',
    color: 'var(--grey-unselect)',
    fontWeight: 600,
    transition: 'all ease-in-out 0.15s',
    marginLeft: '-0.8rem',
    marginBottom: '-0.4rem',
    '&:hover': {
      color: 'var(--blue-highlight)',
      cursor: 'pointer',
    },
    '& span': {
      flexDirection: 'column',
      alignItems: 'center',
      margin: 0,
    },
  },
  icon: {
    fontSize: '1.5rem',    
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    color: 'var(--black-txt)',
    minHeight: '70vh',
    minWidth: '70vw',
    overflowY: 'hidden',
    backgroundColor: 'white',
    boxShadow: 'var(--light-background)',
    padding: '70px',
    borderRadius: '5px',
    border: 'none',
    position: 'relative',
    '&:focus': {
      border: 'none',
      outline: 'none',
    },
    '& h2': {
      textTransform: 'uppercase',
    },
    '& h3': {
      color: 'var(--blue-highlight)',
    },
    '& .modal-filter-cols': {
      display: 'flex',
      '& div': {
        flex: 1,
      }
    },
    '& .modal-filter-footer': {
      position: 'absolute',
      right: '5rem',
      bottom: '5rem',
      '& button': {
        color: 'white',
        marginTop: '20px',
        marginLeft: '16px',
        borderRadius: '5px',
        letterSpacing: '0.75px',
      },
      '& button:nth-child(1)': {
        background: 'var(--blue-highlight)'
      },
      '& button:nth-child(2)': {
        background: '#273246'
      }
    }
  },
});