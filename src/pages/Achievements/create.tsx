import { Container, Box } from "@mui/material";
import { useForm } from 'react-hook-form'
import * as mui from '@mui/material'
import { useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

type objectAch = {
    title : string,
    skill : string,
    description : string,
    duration : string
}

export default function Create({props} : any){
    const { register, handleSubmit } = useForm();
    const [ error, setError ] = useState(<></>)
    const [ open, setOpen ] = useState(true);
    const [skill, setSkill] = useState('');
    const { push } = useRouter();

    function errors(data : objectAch){
        if (data.title === ''){
            setOpen(true);
            const a = (
            <div style={{marginTop: '1vh', position: 'fixed', }}>
                <mui.Alert onClose={() => {setOpen(false)}} severity="error" variant='filled'> 
                    <mui.AlertTitle> Validation Error: </mui.AlertTitle>
                    Fill out the title! 
                </mui.Alert>
            </div>
            )
      
            setError(a);
            return;
        } else if (data.skill === ''){
            setOpen(true);
            const a = (
            <div style={{marginTop: '1vh', position: 'fixed'}}>
                <mui.Alert onClose={() => {setOpen(false)}} severity="error" variant='filled'> 
                    <mui.AlertTitle> Validation Error: </mui.AlertTitle>
                    Fill out the Skill! 
                </mui.Alert>
            </div>
            )
      
            setError(a);
            return;
        } else if (data.description === ''){
            setOpen(true);
            const a = (
            <div style={{marginTop: '1vh', position: 'fixed'}}>
                <mui.Alert onClose={() => {setOpen(false)}} severity="error" variant='filled'> 
                    <mui.AlertTitle> Validation Error: </mui.AlertTitle>
                    Fill out the description! 
                </mui.Alert>
            </div>
            )
      
            setError(a);
            return;
        } else if (data.duration === ''){
            setOpen(true);
            const a = (
            <div style={{marginTop: '1vh', position: 'fixed'}}>
                <mui.Alert onClose={() => {setOpen(false)}} severity="error" variant='filled'> 
                    <mui.AlertTitle> Validation Error: </mui.AlertTitle>
                    Fill out the duration! 
                </mui.Alert>
            </div>
            )
      
            setError(a);
            return;
        } 

        return 'success'
    }

    function submitData(data:any){
        data = {...data, skill:skill}
        const result = errors(data);
        if (result === 'success'){
            axios.post('/api/achievements', data)
            .then((res) => {
                push('/Achievements')
            })
        }

    }

    const skillData = useQuery({
        queryKey: ['skill'],
        queryFn: async () => {
            return axios.get('/api/Skills')
            .then((res) => {return res.data.results})
        }
    })
    return(
        <Container>
            {open ? error : ''}
            <h1 style={{margin: 'auto', width: '50%'}}> Add an Achievement </h1>
                <Box style={{margin: 'auto', marginTop: '2vh', backgroundColor: 'white', borderRadius: '9px', padding: '15px', boxShadow: '0 0 10px #ccc', width: '50%'}}>
                    <form onSubmit={handleSubmit(submitData)}>
                        <mui.TextField 
                        label='Title' 
                        {...register('title')} 
                        id='title' 
                        style={{width: '30vw'}}
                        variant='standard' /> <br/>
                        
                        {
                        skillData.isSuccess ? 
                        (
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
                        ) : skillData.isFetching ? (
                            <mui.Typography variant='body2' fontWeight='medium' style={{marginTop: '5vh'}}> Fetching Skills data </mui.Typography>
                        ) : (
                            <mui.Typography variant='body2' fontWeight='medium' style={{marginTop: '5vh'}}> Failed to Fetch Skills data </mui.Typography>
                        )
                        }
                        
                        <mui.TextField 
                        label='Duration' 
                        multiline
                        fullWidth
                        rows={2}
                        style={{marginTop: '2vh'}}
                        {...register('duration')} 
                        id='duration' 
                        variant='filled' /> 

                        <mui.TextField 
                        label='Description' 
                        multiline
                        fullWidth
                        rows={10}
                        style={{marginTop: '2vh'}}
                        {...register('description')} 
                        id='title' 
                        variant='filled' /> 

                        <mui.Button style={{marginTop: '2vh'}} type='submit' variant='contained'>
                            Submit
                        </mui.Button>

                        <Link href='/Achievements'>
                            <mui.Button style={{marginTop: '2vh', marginLeft: '2vw', backgroundColor: 'red'}} variant='contained'>
                                Back 
                            </mui.Button>
                        </Link>

                    </form>

                </Box>
                
                
        </Container>
    )
}