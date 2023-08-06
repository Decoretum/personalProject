<mui.Grid container>
    <mui.Grid item> 
        <mui.FormControl fullWidth>
            <mui.InputLabel id='choicelabel' style={{marginTop: '5vh'}}>Skill</mui.InputLabel>
            <mui.Select
            variant='filled'
            style={{width: '20vw', marginTop: '5vh'}}
            labelId="choicelabel"
            value={skill}
            label='Skill'
            onChange={(e) => {setSkill(e.target.value)}}
            >
            {
                skillData?.data?.map((choice : string) => {
                    return <mui.MenuItem key={choice} value={choice.name}> {choice.name.charAt(0).toUpperCase() + choice.name.slice(1)} </mui.MenuItem>
                })
            }
            </mui.Select>
        </mui.FormControl>
    </mui.Grid>
<mui.Grid item>
                                    
                            </mui.Grid>
                        </mui.Grid>