import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 52,
    height: 28,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(22px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: "#05BDD9",
        borderColor: "#05BDD9",
      },
    },
  },
  thumb: {
    width: 22,
    height: 22,
    margin: 2,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 28 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export default AntSwitch;