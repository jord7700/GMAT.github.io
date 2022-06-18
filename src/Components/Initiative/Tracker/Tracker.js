import * as React from 'react';
import { Grid, Paper, styled } from '@material-ui/core';

export default function Tracker(props) {
    const groups = props.groups;
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        height: 32,
        lineHeight: '32px',
      }));

    const headerGrid = (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <Item>Name</Item>
            </Grid>
            <Grid item xs={1}>
                <Item>Health</Item>
            </Grid>
        </Grid>
    );
    const groupBox = (group, index) => (
        <div className='GroupBox' key={group.name + index}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Item>{group.name} ({index + 1})</Item>
                </Grid>
                <Grid item xs={1}>
                    <Item>{group.health}</Item>
                </Grid>
            </Grid>
        </div>
    );
    
    return (
        <div 
            className='Groups'
            style={{display: props.hidden === false ? 'grid' : 'none'}}
        >
            {headerGrid}
            {groups.map((group) => {
                if(group.track){
                    const allUnits = [];
                    for(let i = 0; i < group.count; i++){
                        allUnits.push(groupBox(group, i));
                    }
                    return allUnits;
                }
                return '';
            })}
        </div>
    );
}