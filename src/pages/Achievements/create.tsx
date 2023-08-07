import { Container, Box, Modal, Checkbox } from "@mui/material";
import { useForm } from 'react-hook-form'
import * as mui from '@mui/material'
import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import '@/styles/achievements.css'

type objectAch = {
    title : string,
    skill : string,
    description : string,
    duration : string
}

type skillArch = {
    name: string, 
}

export default function Create({props} : any){
    const { register, handleSubmit } = useForm();
    const [ error, setError ] = useState(<></>)
    const [ open, setOpen ] = useState(true);
    const [check, setCheck ] = useState(['']);
    const [modal, setModal] = useState(false);
    const { push } = useRouter();

    function errors(data : objectAch){
        let empty = true;
        for (let i of data.skill){
            if (i !== ''){
                empty = false
            }
        }
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
        } else if (empty === true){
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
        data = {...data, skill: check}
        console.log(data);
        const result = errors(data);
        if (result === 'success'){
            axios.post('/api/achievements', data)
            .then((res) => {
                console.log(res)
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

    //handling checkbox
    function checkChange(value : string, isChecked : boolean){
        if (isChecked){
            setCheck([...check, value])
        } else {
            setCheck(check.filter((skill) => skill != value))
        }
    }
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
                            <>
                                <mui.Button 
                                variant='contained' 
                                style={{marginTop: '2vh'}}
                                onClick={() => {setModal(true)}}> 
                                    Select Skills
                                </mui.Button>

                                <Modal
                                open={modal === true}
                                onClose={() => {setModal(false)}}
                                >
                                    <Box className='modal'>
                                        {
                                            skillData?.data?.map((skill : skillArch) => {
                                                return (
                                                    <>
                                                        <mui.FormGroup>
                                                            {
                                                                check.includes(skill.name) ? 
                                                                (
                                                                    <mui.FormControlLabel onChange={(event : any) => {checkChange(event.target.value, event.target.checked)}} control={<Checkbox defaultChecked />} defaultValue={skill.name} value={skill.name} label={skill.name} /> 
                                                                    ) : (
                                                                        <mui.FormControlLabel onChange={(event : any) => {checkChange(event.target.value, event.target.checked)}} control={<Checkbox />} defaultValue={skill.name} value={skill.name} label={skill.name} /> 
                                                                        )
                                                            }
                                                        </mui.FormGroup>
                                                    </>
                                                )
                                            })
                                        }
                                    </Box>
                                    
                                </Modal>
                            </>


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