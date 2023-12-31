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
    name : string,
    description : string,
    category: string,
}

export default function Create({props} : any){
    const { register, handleSubmit } = useForm();
    const [ error, setError ] = useState(<></>)
    const [ open, setOpen ] = useState(false);
    const [choice, setChoice] = useState('');
    const { push } = useRouter();


    function errors(data : objectAch){
        console.log(data)
        if (data.name === ''){
            setOpen(true);
            const a = (
            <div style={{marginTop: '1vh', position: 'fixed' }}>
                <mui.Alert onClose={() => {setOpen(false)}} severity="error" variant='filled'> 
                    <mui.AlertTitle> Validation Error: </mui.AlertTitle>
                    Fill out the title! 
                </mui.Alert>
            </div>
            )
      
            setError(a);
            return;
        } else if (data.category === ''){
            setOpen(true);
            const a = (
            <div style={{marginTop: '1vh', position: 'fixed'}}>
                <mui.Alert onClose={() => {setOpen(false)}} severity="error" variant='filled'> 
                    <mui.AlertTitle> Validation Error: </mui.AlertTitle>
                    Fill out the choice! 
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
        } 

        return 'success'
    }

    function submitData(data:any){
        data = {...data, category: choice}
        const result = errors(data);
        if (result === 'success'){
            axios.post('/api/Skills', data)
            .then((res) => {
                push('/Skills')
            })
        }

    }

    const choices = useQuery({
        queryKey: ['choices'],
        queryFn: async () => {
            return axios.get(`/api/Skills`)
            .then((res) => {
                console.log(res);
                return res.data.choices;
            })
        }
    })

    if (choices.isLoading && !choices.isSuccess){
        return (
            <Container>
                <mui.Typography variant='h5'> Loading Data </mui.Typography>
            </Container>
        )
    }

    if (choices.isError && !choices.isSuccess){
        return (
            <Container>
                <mui.Typography variant='h5'> Failed to load data </mui.Typography>
            </Container>
        )
    }


    return(
        <Container>
            {open ? error : ''}
            <h1 style={{margin: 'auto', width: '50%'}}> Add a Skill </h1>
                <Box style={{margin: 'auto', marginTop: '2vh', backgroundColor: 'white', borderRadius: '9px', padding: '15px', boxShadow: '0 0 10px #ccc', width: '50%'}}>
                    <form onSubmit={handleSubmit(submitData)}>
                        <mui.TextField 
                        label='Name' 
                        {...register('name')} 
                        id='name' 
                        style={{width: '30vw'}}
                        variant='standard' /> <br/>
                        
                        <mui.FormControl fullWidth>
                            <mui.InputLabel id='choicelabel' style={{marginTop: '5vh'}}>Icon Choice</mui.InputLabel>
                            <mui.Select
                            variant='filled'
                            style={{width: '20vw', marginTop: '5vh'}}
                            labelId="choicelabel"
                            value={choice}
                            label='Choice'
                            onChange={(e) => {setChoice(e.target.value)}}
                            >
                            {
                                choices?.data?.map((choice : string) => {
                                    return <mui.MenuItem key={choice} value={choice}> {choice.charAt(0).toUpperCase() + choice.slice(1)} </mui.MenuItem>
                                })
                            }
                            </mui.Select>
                        </mui.FormControl>

                        <mui.TextField 
                        label='Describe the skill' 
                        multiline
                        fullWidth
                        rows={10}
                        style={{marginTop: '2vh'}}
                        {...register('description')} 
                        id='description' 
                        variant='filled' /> 

                        <mui.Button style={{marginTop: '2vh'}} type='submit' variant='contained'>
                            Submit
                        </mui.Button>

                        <Link href='/Skills'>
                            <mui.Button style={{marginTop: '2vh', marginLeft: '2vw', backgroundColor: 'red'}} variant='contained'>
                                Back 
                            </mui.Button>
                        </Link>

                    </form>

                </Box>
                
                
        </Container>
    )
}