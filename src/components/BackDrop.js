import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useRecoilValue } from 'recoil';
import { UITxtLoading } from 'data/recoil';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'var(--blue-highlight)',
    background: 'white'
  },
}));

export default function BackDrop({open}) {
  const txtLoading = useRecoilValue(UITxtLoading)
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        {/* <CircularProgress color="inherit" /> */}
        <h1>{txtLoading}</h1>
        {/* {console.log(txtLoading)} */}
      </Backdrop>
    </div>
  );
}
