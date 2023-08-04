import { Container, Box } from "@mui/material";
import { useForm } from 'react-hook-form'
import * as mui from '@mui/material'
import { useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";

type objectAch = {
    title : string,
    Description : string
}

export default function Create({props} : any){
    const { register, handleSubmit } = useForm();
    const [ error, setError ] = useState(<></>)
    const [ open, setOpen ] = useState(true);
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
        } else if (data.Description === ''){
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
        const { title, Description } = data;
        const result = errors(data);
        if (result === 'success'){
            axios.post('/api/achievements', data)
            .then((res) => {
                push('/Achievements')
            })
        }

    }
    return(
        <Container>
            <h1 style={{margin: 'auto', width: '50%'}}> Add a Skill </h1>
                <Box style={{margin: 'auto', marginTop: '2vh', backgroundColor: 'white', borderRadius: '9px', padding: '15px', boxShadow: '0 0 10px #ccc', width: '50%'}}>
                    <form onSubmit={handleSubmit(submitData)}>
                        <mui.TextField 
                        label='Name' 
                        {...register('name')} 
                        id='name' 
                        style={{width: '30vw'}}
                        variant='standard' /> <br/>

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
                {open ? error : ''}
                
        </Container>
    )
}