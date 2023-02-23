import * as React from 'react';
import {Tabs, Tab, Box} from '@material-ui/core';

type topBarProps = {
  value: string,
  onChange: (event: any, value: any) => void,
}

export default function TopBar(props: topBarProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={props.value}
        onChange={props.onChange}
        aria-label="secondary tabs"
      >
        <Tab value="one" label="Dice" />
        <Tab value="two" label="Initiative Tracker" />
        <Tab value="three" label="Item Three" />
      </Tabs>
    </Box>
  );
}
