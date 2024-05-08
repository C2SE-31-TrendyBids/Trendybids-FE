import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FilterChart = ({params, setParams = () => {}}) => {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 100,
            },
        },
    };
    return (
        <div className="flex">
            <FormControl sx={{m: 1, minWidth: 80}} size="small">
                <InputLabel id="demo-simple-select-helper-label">Period</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={params?.period}
                    label="Period"
                    onChange={(e) => setParams({...params, period: e.target.value})}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Week"}>Week</MenuItem>
                    <MenuItem value={"Month"}>Month</MenuItem>
                    <MenuItem value={"Year"}>Year</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{m: 1, minWidth: 80}} size="small">
                <InputLabel id="demo-simple-select-helper-label">Year</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={params?.year}
                    label="Period"
                    onChange={(e) => setParams({...params, year: e.target.value})}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2023}>2023</MenuItem>
                    <MenuItem value={2022}>2022</MenuItem>
                    <MenuItem value={2021}>2021</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{m: 1, minWidth: 80}} size="small">
                <InputLabel id="demo-simple-select-helper-label">Month</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={params?.month}
                    label="Month"
                    onChange={(e) => setParams({...params, month: e.target.value})}
                    MenuProps={MenuProps}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={11}>11</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{m: 1, minWidth: 80}} size="small">
                <InputLabel id="demo-simple-select-helper-label">Week</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={params?.week}
                    label="Week"
                    onChange={(e) => setParams({...params, week: e.target.value})}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                </Select>
            </FormControl>

        </div>
    )
}

export default FilterChart