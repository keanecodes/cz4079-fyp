import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import { FaLayerGroup } from "react-icons/fa"
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import RadioButton from 'components/Radio'
import CheckBox from 'components/CheckBox'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useRecoilState, useSetRecoilState } from 'recoil'
import { 
  layerSelection, 
  modalControls,
  overlaySelection
} from 'data/recoil'
import { filterAttributes } from 'data/recoil';
import { selectedGeojsonArea } from 'data/recoil';

export default function LayersPopper() {
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

  const [controls, setControls] = useRecoilState(modalControls)
  const [layer, setLayer] = useRecoilState(layerSelection);
  const [overlay, setOverlay] = useRecoilState(overlaySelection);
  const setSelectedArea = useSetRecoilState(selectedGeojsonArea)
  const [filters, updateFilter] = useRecoilState(filterAttributes)
  
  //handler for radio groups
  const handleLayer = (e) => setLayer(e.target.value);

  //handler for checkboxes
  const handleChange = (e) => {
    setControls({ 
      ...controls,
      [group]: {
        ...controls[group],
        [e.target.type]: {
          ...controls[group][e.target.type],
          [e.target.name]: e.target.checked
        }
      }
    });
    if (group === 'layers') {
      let olyrs = [...overlay]
      //add checked layer
      if (e.target.checked) {
        olyrs.push(e.target.name)
        setOverlay(olyrs)
      } else { //remove checked layer
        const fOLyrs = olyrs.filter(val => val !== e.target.name);
        if (e.target.name.includes('Border')) {
          setSelectedArea(null)
          updateFilter({...filters, selectedArea: ['']})
        }
        setOverlay(fOLyrs)
      }
    }
  };  

  const group = 'layers'


  return (
    <div className={classes.root}>
        <IconButton 
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          variant="outlined" 
          size="small" 
          className={classes.icon}>
          <FaLayerGroup/>
        </IconButton>
        <Popper className={classes.paper} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                {controls[group].radio
                ? <RadioGroup value={layer} name={group}> 
                    {Object.keys(controls[group].radio).map(lbl => {
                      const val = controls[group].radio[lbl]
                      return (
                      <MenuItem key={`filter-modal-radio-${val}`} disableRipple>
                        <ListItemIcon>
                          <FormControlLabel 
                            value={val}
                            onClick={handleClose}
                            onChange={handleLayer}
                            control={<RadioButton value={val} />}
                            label={lbl}
                          />
                        </ListItemIcon>
                      </MenuItem>)
                    })}
                  </RadioGroup>
                  : null
                }
                {controls[group].checkbox
                  ? <FormGroup>
                      {Object.keys(controls[group].checkbox).map(lbl => 
                        <MenuItem key={`filter-modal-checkbox-${lbl}`} disableRipple>
                          <ListItemIcon>
                            <FormControlLabel
                              control={<CheckBox checked={controls[group].checkbox[lbl]} onChange={handleChange} name={lbl} />}
                              label={lbl}
                            />
                          </ListItemIcon>
                        </MenuItem>
                      )}
                    </FormGroup>
                  : null
                }
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
  icon: {
    height: '2rem',
    width: '2rem',
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
