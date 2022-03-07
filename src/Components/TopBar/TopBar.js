import * as React from 'react';
import {Tabs, Tab, Box} from '@material-ui/core';

export default function TopBar(props) {
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={props.value}
        onChange={props.onChange}
        aria-label="secondary tabs"
      >
        <Tab value="one" label="Item One" />
        <Tab value="two" label="Item Two" />
        <Tab value="three" label="Item Three" />
      </Tabs>
    </Box>
  );
}