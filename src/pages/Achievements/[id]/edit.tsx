import { Container, Box, Modal, Checkbox } from "@mui/material";
import { useForm } from 'react-hook-form'
import * as mui from '@mui/material'
import { useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import '@/styles/achievements.css'

type achObject = {
    title : string,
    Description : string,
    Duration : string,
    skills: Array<string>
}

type skillsQuery = {
    
}

type dValues = {
    title : string,
    Description : string,
    Duration : string,
    skills: Array<string>,
}

type skillArch = {
    id : number,
    name : string
}

export default function Edit({props} : any){
    const [ error, setError ] = useState(<></>)
    const [ open, setOpen ] = useState(false);

    const [modal, setModal] = useState(false);
    const [check, setCheck ] = useState([[0, '']]);
    const { push } = useRouter();

    const[HID, setHID] = useState([0]);
    const [raw, setRaw] = useState({})

    const router = useRouter();
    let path = Number(router.query.id);

    function checkChange(namevalue: string, numvalue : number, isChecked : boolean){
        if (isChecked){        
            setCheck([...check, [numvalue, namevalue]])

        } else {
            setCheck(check.filter((array) => array[0] !== numvalue && array[1] !== namevalue))
        }

    }

    function checker(check : Array<any>, skill : skillArch ){
        let verdict = false;
        for (let i of check){
            if (i[1] === skill.name){
                return true;
            }
        }
        return verdict;
    }


    function errors(data : achObject){
        let empty = true;
        for (let i of data.skills){
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
            console.log(`skill empty`)
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
        } else if (data.Duration === ''){
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
        //pairing skill name and AchSkill ID
        let i = 0;
        data = {...data, skills: check, AchID: HID }
        // return console.log(data);
        const result = errors(data);
        if (result === 'success'){
            axios.put(`/api/achievements/${path}/edit`, data)
            .then((res) => {
                console.log(res)
                push(`/Achievements/${path}/view`)
            })
        }

    }

    const { register, handleSubmit, reset } = useForm();

    //query Associative Entity
    const skillsData = useQuery({
        enabled: !isNaN(path),
        queryKey: ['skills'],
        queryFn: async () => {
            return axios.get(`/api/AchSkills/${path}/view`)
            .then((res) => {
                let array = [];
                let namearray = [];
                let idarray = []
                let hidarray = []
                for (let i of res.data){
                    array.push(i);
                    namearray.push([i.id, i.name]);
                    hidarray.push(i.AchID)
                }

                setCheck(namearray);
                setHID(hidarray);
                return namearray;
            })
        }
    })



    //query all Skills
    const AllSkills = useQuery({
        enabled: !isNaN(path) && skillsData.isSuccess,
        queryKey: ['all'],
        queryFn: async () => {
            return axios.get(`/api/Skills/`)
            .then((res) => {
                console.log(res.data.results)
                return res.data.results;
            })
        }
    })

    //querying existing data
    const queryData = useQuery({
        enabled: !isNaN(path) && skillsData.isSuccess,
        queryKey: ['data'],
        queryFn: async () => {
            return axios.get(`/api/achievements/${path}/view`)
            .then((res) => {
                let defaultValues : dValues = {
                    title : res.data.result[0].title,
                    Description : res.data.result[0].description,
                    Duration : res.data.result[0].Duration,
                    skills : skillsData?.data,
            }
                reset({...defaultValues});
                return res.data.result[0];
            })
        }
    })

    console.log(check)

    if (queryData.isFetching){
        return <h1 style={{marginLeft: '2vw'}}> Retrieving Achievement data </h1>
    }

    if (queryData.isError){
        return <h1 style={{marginLeft: '2vw'}}> Failed to retrieve Achievement data </h1>
    }

    if (queryData.isSuccess)
    return(
        <Container>
            {open ? error : ''}
            <h1 style={{margin: 'auto', width: '50%'}}> 
                Edit Achievement 
                <EditOutlinedIcon style={{marginLeft: '2vw'}} />
            </h1>
                <Box style={{margin: 'auto', marginTop: '2vh', backgroundColor: 'white', borderRadius: '9px', padding: '15px', boxShadow: '0 0 10px #ccc', width: '50%'}}>
                    <form onSubmit={handleSubmit(submitData)}>
                        <mui.TextField 
                        label='Title' 
                        {...register('title')} 
                        id='title' 
                        style={{width: '30vw'}}
                        variant='standard' /> 

                        <mui.TextField 
                        label='Duration' 
                        {...register('Duration')} 
                        id='Duration' 
                        style={{width: '30vw', marginTop : '2vh'}}
                        variant='standard' /> <br/>

                        {
                        AllSkills.isSuccess && skillsData.isSuccess ? (<>
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
                                        AllSkills?.data?.map((skill : skillArch) => {
                                            return (
                                                <>
                                                    <mui.FormGroup>
                                                        {
                                                            (checker(check, skill) === true) ? 
                                                            (
                                                                <mui.FormControlLabel data-id={skill.id} onChange={(event : any) => {checkChange(skill.name, event.target.value, event.target.checked)}} control={<Checkbox defaultChecked />} defaultValue={skill.id} value={skill.id} label={skill.name} /> 
                                                                ) : (
                                                                    <mui.FormControlLabel data-id={skill.id} onChange={(event : any) => {checkChange(skill.name, event.target.value, event.target.checked)}} control={<Checkbox />} defaultValue={skill.id} value={skill.id} label={skill.name} /> 
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
                        ) : AllSkills.isFetching ? (
                            <mui.Typography variant='body2' fontWeight='medium' style={{marginTop: '5vh'}}> Fetching Skills data </mui.Typography>
                        ) : (
                            <mui.Typography variant='body2' fontWeight='medium' style={{marginTop: '5vh'}}> Failed to Fetch Skills data </mui.Typography>
                        )
                        }

                        <mui.TextField 
                        label='Description' 
                        multiline
                        fullWidth
                        rows={10}
                        style={{marginTop: '2vh'}}
                        {...register('Description')} 
                        id='Description' 
                        variant='filled' /> 

                        <mui.Button style={{marginTop: '2vh'}} type='submit' variant='contained'>
                            Submit
                        </mui.Button>

                        <Link href={`/Achievements/${path}/view`}>
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