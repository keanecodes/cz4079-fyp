// /* global requestAnimationFrame, cancelAnimationFrame */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IOSSlider from 'components/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/IconButton';
import { MdPlayArrow, MdPause } from "react-icons/md";
import { useSetRecoilState } from 'recoil';
import { UITxtLoading } from 'data/recoil';

export default function Timeline({min, max, value, onChange}) {
  const setTxtLoading = useSetRecoilState(UITxtLoading)
  setTxtLoading("Loading Timeline...")
  const classes = useStyles();
  const [isPlaying, setIsPlaying] = useState(false);
  const [animation] = useState({});

  const MS_PER_DAY = 8.64e7;
  const ANIMATION_SPEED = 30;
  
  // prettier-ignore
  useEffect(() => {
    return () => animation.id && cancelAnimationFrame(animation.id);
  }, [animation]);

  if (isPlaying && !animation.id) {
    const span = value[1] - value[0];
    let nextValueMin = value[0] + (MS_PER_DAY * ANIMATION_SPEED);
    if (nextValueMin + span >= max) {
      nextValueMin = min;
    }
    animation.id = requestAnimationFrame(() => {
      animation.id = 0;
      onChange([nextValueMin, nextValueMin + span]);
    });
  }

  const isButtonEnabled = value[0] > min || value[1] < max;

  return (
    <div className={classes.root}>
      <Button variant="outlined"  disabled={!isButtonEnabled} onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? <MdPause title="Stop" /> : <MdPlayArrow title="Animate" />}
      </Button>
      <IOSSlider
        getAriaValueText={valuetext}
        aria-labelledby="ios slider"
        className={classes.timeline}
        // marks={marks}
        // step={1/12}
        min={min}
        max={max}
        value={value}
        onChange={(event, newValue) => onChange(newValue)}
        valueLabelDisplay="auto"
        valueLabelFormat={formatLabel}
      />
    </div>
  )
}

export const getTooltip = ({object}) => {
  return (
    object &&
    `\
    Time: ${new Date(object.timestamp).toUTCString()}
    Magnitude: ${object.magnitude}
    Depth: ${object.depth}
    `
  );
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '4rem',
    backgroundColor: 'white',
    color: 'var(--dark-background)',
    display: 'grid',
    gridTemplateColumns: 'minmax(50px, 5%) auto',
    textAlign: 'center',
    borderTop: '1px var(--grey-border) solid',
    overflow: 'auto',
    overflowY: 'hidden',
    '&>*': {
      margin: 'auto 0',
    }, 
    '& button': {
      position: 'sticky',
      left: '1rem',
      zIndex: 3,
      border: '0.1rem solid var(--dark-highlight)',
      borderRadius: '50%',
      height: '2.5rem',
      width: '2.5rem',
      margin: '0.5rem 1.5rem',
      color: 'var(--dark-highlight)',
      fontSize: '10rem',
      padding: '0.3rem'
    },
    '& button:hover': {
      color: 'var(--blue-highlight)',
    },
    '& button::after': {
      content: 'close-quote',
      width: '200%',
      height: '200%',
      position: 'absolute',
      zIndex: -1,
      backgroundColor: 'white',
    },
    '& button::before': {
      content: 'close-quote',
      position: 'absolute',
      borderRadius: '50%',
      height: '2.4rem',
      width: '2.4rem',
      border: '0.1rem solid var(--dark-highlight)',
    },
    '& button:hover::before': {
      border: '0.1rem solid var(--blue-highlight)',
    },
    '& button:disabled::before': {
      border: '0.1rem solid rgba(0, 0, 0, 0.26)',
    },
  },
  timeline: {
    zIndex: 2,
    margin: 'auto 1rem',
  }
}));


function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

function valuetext(value) {
  return `${value}`;
}

function formatLabel(t) {
  const date = new Date(t);
  return `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}`;
}

export function getTimeRange(data) {
  if (!data) {
    return null;
  }
  // console.log(data)
  return data?.reduce(
    (range, d) => {
      const t = d.timestamp;
      range[0] = Math.min(range[0], t);
      range[1] = Math.max(range[1], t);
      return range;
    },
    [Infinity, -Infinity]
  );
}