import * as React from 'react';
import { Button, Grid, Paper, styled, Tooltip } from '@material-ui/core';
import InitBox from './InitBox/InitBox';
import { Unit } from 'src/Utils/types';

export default function Tracker(
    { units, hidden,
        onUnitChange,
    }: any) {
    // create local copy of groups and party
    const [localHidden, sethidden] = React.useState(hidden);
    const allUnits = units;

    if (localHidden !== hidden) {
        sethidden(hidden);
    }

    const handleChange = (index: number) => (event: any) => {
        const tempArray: any = [...allUnits];
        const unit: any = tempArray[index]
        unit[event.target.name] = event.target.value ? event.target.value : event.target.checked;
        tempArray[index] = unit;
    };

    const sortUnits = () => {
        const retVal = [...allUnits];
        retVal.sort(function (a: any, b: any) { return b.initiative - a.initiative === 0 ? b.bonus - a.bonus : b.initiative - a.initiative });
        onUnitChange(retVal);
    }

    const rollInits = () => {
        const retVal = [...allUnits];
        retVal.forEach((unit: any) => {
            if (!unit.player) {
                unit.initiative = Math.floor(Math.random() * 21) + parseInt(unit.bonus, 10);
            }
        });
        onUnitChange(retVal);
    }

    const changeTurns = () => {
        const retVal = [...allUnits];
        const temp: any = retVal.shift();
        retVal.push(temp);
        onUnitChange(retVal);
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
            <Grid item xs={1}>
                <Tooltip title='Next Turn'>
                    <Button
                        className='AddGroupButton'
                        variant='outlined'
                        size='small'
                        onClick={changeTurns}
                    >
                        <span className='material-icons'>repeat</span>
                    </Button>
                </Tooltip>
            </Grid>
            <Grid item xs={1}>
                <Tooltip title='Sort'>
                    <Button
                        className='AddGroupButton'
                        variant='outlined'
                        size='small'
                        onClick={sortUnits}
                    >
                        <span className='material-icons'>sort</span>
                    </Button>
                </Tooltip>
            </Grid>
        </Grid>
    );

    const groupBox = (group: any, index: number) => {
        return (
            <div className='GroupBox' key={group.id}>
                <Grid container spacing={4}>
                    <Grid item xs={2}>
                        <Item>{group.name}</Item>
                    </Grid>
                    <Grid item xs={1}>
                        <Item>
                            <InitBox key={'init' + group.id} name='health' initVal={group.health} onUpdate={handleChange(index)} />
                        </Item>
                    </Grid>
                    <Grid item xs={1}>
                        <Item>
                            <InitBox key={'init' + group.id} name='initiative' initVal={group.initiative} onUpdate={handleChange(index)} />
                        </Item>
                    </Grid>
                </Grid>
            </div>
        );
    }

    return (
        <div
            className='Groups'
            style={{ display: hidden === false ? 'grid' : 'none' }}
        >
            {headerGrid}
            {allUnits.map((group: any, index: number) => {
                const displayedUnits = [];
                displayedUnits.push(groupBox(group, index));
                return displayedUnits;
            })
            }
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Tooltip title='Roll Initiatives'>
                        <Button
                            className='AddGroupButton'
                            variant='outlined'
                            size='small'
                            onClick={rollInits}
                        >
                            <span className='material-icons'>shuffle</span>
                        </Button>
                    </Tooltip>
                </Grid>
            </Grid>
        </div>
    );
}
