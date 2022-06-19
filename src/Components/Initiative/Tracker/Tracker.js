import * as React from 'react';
import { Grid, Paper, styled } from '@material-ui/core';

export default function Tracker(props) {
    // const groups = props.groups;
    // const party = props.party;
    // create local copy of groups and party
    const allUnits = (() => {
        const retArray = [];
        props.groups.forEach((unit, index) => {
            if(unit.track){
                for(let i = 0; i < unit.count; i++){
                    retArray.push({
                        name: `${unit.name} (${i + 1})`,
                        health: unit.health,
                        bonus: unit.bonus
                    });
                }
            }
        });
        props.party.forEach((unit, index) => {
            if(unit.track && unit.name !== ''){
                retArray.push({
                    name: `${unit.name}`,
                    health: unit.health,
                    bonus: unit.bonus
                });
            }
        });
        return retArray;
    })()

    // const allUnits = allUnitsFunc(props.groups, props.party);
    
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
    const groupBox = (group) => (
        <div className='GroupBox' key={group.name}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Item>{group.name}</Item>
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
            {allUnits.map((group) => {
                const displayedUnits = [];
                displayedUnits.push(groupBox(group));
                return displayedUnits;
            })
            }
        </div>
    );
}