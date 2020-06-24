import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import BarChartIcon from '@material-ui/icons/BarChart';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { useState, useEffect } from 'react';


const drawerWidth = 190;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function SideBar() {
  const classes = useStyles();
  const [showSideBar, setshowSideBar] = useState(true);

  useEffect(() => {
    if (window.location.pathname === '/login' || window.location.pathname === '/') {
        setshowSideBar(false)
      }
  });

  let sideBar;
  if (showSideBar) {
    sideBar = <React.Fragment>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {/* {['Issues', 'Starred', 'Send email', 'Drafts'].map((text, index) => ( */}
              
              <Link 
                    color={"textPrimary"}
                    href={`/issue/create`}>
                    <ListItem button >
                      <ListItemIcon><AddIcon fontSize={"medium"}/></ListItemIcon>
                      <ListItemText primary={"Create Issue"} />
                    </ListItem>
                </Link>
                <Link 
                    color={"textPrimary"}
                    href={`/issues/`}>
                    <ListItem button >
                      <ListItemIcon><ListIcon /> </ListItemIcon>
                      <ListItemText primary={"Issues"} />
                    </ListItem>
                </Link>
          </List>
          <Divider />
          <List>
              <ListItem button>
                <ListItemIcon><AccountTreeIcon /></ListItemIcon>
                <ListItemText primary={"Projects"} />
              </ListItem>
              <ListItem button>
                <ListItemIcon><BarChartIcon /></ListItemIcon>
                <ListItemText primary={"Trackers"} />
              </ListItem>
          </List>
        </div>
      </Drawer>
    </React.Fragment>
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
     {sideBar}



      {/* display sideBar depends on current screen */}
      

      <main className={classes.content}>
        
        
        
      </main>
    </div>
  );
}
