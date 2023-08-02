import { Container, Box } from "@mui/material";
import { useForm } from 'react-hook-form'
import * as mui from '@mui/material'
import { useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function Edit({props} : any){
    const [ error, setError ] = useState(<></>)
    const [ open, setOpen ] = useState(true);
    const { push } = useRouter();

    const router = useRouter();
    let path = Number(router.query.id);

    function errors(data : object){
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
        const result = errors(data);
        if (result === 'success'){
            axios.put(`/api/achievements/${path}/edit`, data)
            .then((res) => {
                push(`/Achievements/${path}/view`)
            })
        }

    }

    const { register, handleSubmit, reset } = useForm();

    //querying existing data
    const queryData = useQuery({
        enabled: !isNaN(path),
        queryKey: ['data'],
        queryFn: async () => {
            return axios.get(`/api/achievements/${path}/view`)
            .then((res) => {
                console.log(res.data.result[0]);
                let defaultValues = {}
                defaultValues.title = res.data.result[0].title;
                defaultValues.Description = res.data.result[0].description;
                reset({...defaultValues});
                return res.data.result[0];
            })
        }
    })


    if (queryData.isFetching){
        return <h1 style={{marginLeft: '2vw'}}> Retrieving Achievement data </h1>
    }

    if (queryData.isError){
        return <h1 style={{marginLeft: '2vw'}}> Failed to retrieve Achievement data </h1>
    }

    if (queryData.isSuccess)
    return(
        <Container>
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
                        variant='standard' /> <br/>

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

                        <Link href='/Achievements'>
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