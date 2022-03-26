import * as React from 'react';
import {Tabs, Tab, Box} from '@material-ui/core';

export default function InitiativeBar(props) {
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={props.value}
        onChange={props.onChange}
        aria-label="secondary tabs"
      >
        <Tab value="groups" label="Groups" />
        <Tab value="party" label="Party" />
        <Tab value="tracker" label="Tracker" />
      </Tabs>
    </Box>
  );
}