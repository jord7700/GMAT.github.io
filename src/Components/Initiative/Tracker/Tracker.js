import * as React from 'react';
import { Button, Grid, Paper, styled } from '@material-ui/core';
import InitBox from './InitBox/InitBox';

export default function Tracker({groups, party, hidden}) {
    // create local copy of groups and party
    const [localHidden, sethidden] = React.useState(hidden);
    const [allUnits, setUnits] = React.useState([]);

    const updateUnits = () => {
        const retArray = [];
        groups.forEach((unit) => {
            if(unit.track){
                for(let i = 0; i < unit.count; i++){
                    retArray.push({
                        key: i,
                        name: `${unit.name} (${i + 1})`,
                        health: unit.health,
                        bonus: unit.bonus,
                        player: false,
                        initiative: 0
                    });
                }
            }
        });
        party.forEach((unit, i) => {
            if(unit.track && unit.name !== ''){
                retArray.push({
                    key: i,
                    name: `${unit.name}`,
                    health: unit.health,
                    bonus: unit.bonus,
                    player: true,
                    initiative: 0
                });
            }
        });
        return retArray;
    };

    if(localHidden !== hidden){
        sethidden(hidden);
        setUnits(updateUnits);
    }

    const handleChange = index => (event) => {
        const unit = allUnits[index]
        unit[event.target.name] = event.target.value ? event.target.value: event.target.checked;
        allUnits[index] = unit;
    };

    const sortUnits = () => {
        setUnits(() => {
            const tempArray = [...allUnits];
            tempArray.sort(function(a, b){return b.initiative - a.initiative === 0 ? b.bonus - a.bonus : b.initiative - a.initiative});
            return tempArray;
        })
    }

    const rollInits = () => {
        setUnits(() => {
            const tempArray = [...allUnits];
            tempArray.forEach(unit => {
                if(!unit.player) {
                    unit.initiative = Math.floor(Math.random() * 21) + parseInt(unit.bonus, 10);
                }
            });
            return tempArray;
        })
    }

    const changeTurns = () => {
        setUnits(() => {
            const tempArray = [...allUnits];
            const temp = tempArray.shift();
            tempArray.push(temp);
            return tempArray;
        })
    }
    
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        height: 32,
        lineHeight: '32px',
      }));

    const headerGrid = (
        <Grid container spacing={4}>
            <Grid item xs={2}>
                <Item>Name</Item>
            </Grid>
            <Grid item xs={1}>
                <Item>Health</Item>
            </Grid>
            <Grid item xs={1}>
                <Item>Initiative</Item>
            </Grid>
        </Grid>
    );
    const groupBox = (group, index) => {
        // console.log('rerender');
        return (
        <div className='GroupBox' key={group.key}>
            <Grid container spacing={4}>
                <Grid item xs={2}>
                    <Item>{group.name}</Item>
                </Grid>
                <Grid item xs={1}>
                    <Item>{group.health}</Item>
                </Grid>
                <Grid item xs={1}>
                    <Item>
                        <InitBox key={'init' + group.key} initVal={group.initiative} onUpdateInit={handleChange(index)}/>
                    </Item>
                </Grid>
            </Grid>
        </div>
        );
}
    
    return (
        <div
            className='Groups'
            style={{display: hidden === false ? 'grid' : 'none'}}
        >
            {headerGrid}
            {allUnits.map((group, index) => {
                const displayedUnits = [];
                displayedUnits.push(groupBox(group, index));
                return displayedUnits;
            })
            }
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Button 
                        className='AddGroupButton'
                        variant="outlined" 
                        size="small"
                        onClick={sortUnits}
                    >
                        <span className="material-icons">sort</span>
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Button 
                        className='AddGroupButton'
                        variant="outlined" 
                        size="small"
                        onClick={changeTurns}
                    >
                        <span className="material-icons">repeat</span>
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Button 
                        className='AddGroupButton'
                        variant="outlined" 
                        size="small"
                        onClick={rollInits}
                    >
                        <span className="material-icons">shuffle</span>
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}