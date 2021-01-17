import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import { FiUser } from "react-icons/fi"
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

export default function ProfileMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);


  return (
    <div className={classes.root}>
        <IconButton 
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          variant="outlined" 
          size="small" 
          className={classes.outline}>
          <FiUser/>
        </IconButton>
        <Popper className={classes.paper} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Popper>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  paper: {
    zIndex: 1
  },
  root: {
    width: '2rem',
    padding: '0.5rem 1rem',
    paddingRight: '1.3rem',
    textAlign: 'center',
    margin: 'auto 0',
  },
  outline: {
    height: '2rem',
    width: '2rem',
    borderRadius: '50%',
    border: '0.15rem solid var(--grey-unselect)',
    '& span': {
      '& svg': {
        fontSize: '2rem',
        borderRadius: '50%',
        color: 'var(--grey-unselect)',
      },
      '& svg:hover': {
        color: 'var(--blue-highlight)',
        cursor: 'pointer',
      }
    },
  }
}));
