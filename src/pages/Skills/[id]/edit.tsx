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

type achObject = {
    name : string,
    description : string,
    category: string,
}


export default function Edit({props} : any){
    const [ error, setError ] = useState(<></>)
    const [ open, setOpen ] = useState(true);
    const [choice, setChoice] = useState('');
    const { push } = useRouter();

    const router = useRouter();
    let path = Number(router.query.id);

    function errors(data : achObject){
        if (data.name === ''){
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
        } else if (data.category === ''){
            setOpen(true);
            const a = (
            <div style={{marginTop: '1vh', position: 'fixed'}}>
                <mui.Alert onClose={() => {setOpen(false)}} severity="error" variant='filled'> 
                    <mui.AlertTitle> Validation Error: </mui.AlertTitle>
                    Fill out the category! 
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
        const result = errors(data);
        data = {...data, category: choice}
        if (result === 'success'){
            axios.put(`/api/Skills/${path}/edit`, data)
            .then((res) => {
                push(`/Skills/${path}/view`)
            })
        }

    }

    const { register, handleSubmit, reset } = useForm();

    //querying existing data
    const queryData = useQuery({
        enabled: !isNaN(path),
        queryKey: ['data'],
        queryFn: async () => {
            return axios.get(`/api/Skills/${path}/view`)
            .then((res) => {
                console.log(res.data.result[0]);
                let defaultValues : achObject = {
                    name : res.data.result[0].name,
                    description : res.data.result[0].description,
                    category: res.data.result[0].category,
            }
                reset({...defaultValues});
                setChoice(res.data.result[0].category)
                return res.data.result[0];
            })
        }
    })

    const iconData = useQuery({
        queryKey: ['icons'],
        queryFn: async () => {
            return axios.get('/api/Skills/')
            .then((res) => {
                return res.data.choices
            })
        }
    })

    console.log(iconData.data)


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
                        label='Name' 
                        {...register('name')} 
                        defaultValue={queryData.data.name}
                        id='name' 
                        style={{width: '30vw'}}
                        variant='standard' /> <br/>

                    <mui.FormControl fullWidth>
                        <mui.InputLabel id='choicelabel' style={{marginTop: '5vh'}}>Icon Choice</mui.InputLabel>
                        <mui.Select
                        variant='filled'
                        style={{width: '20vw', marginTop: '5vh'}}
                        labelId="choicelabel"
                        defaultValue={choice}
                        label='Choice'
                        onChange={(e) => {setChoice(e.target.value)}}
                        >
                        {
                            iconData?.data?.map((choice : string) => {
                                return <mui.MenuItem key={choice} value={choice}> {choice.charAt(0).toUpperCase() + choice.slice(1)} </mui.MenuItem>
                            })
                        }
                        </mui.Select>
                    </mui.FormControl>

                        <mui.TextField 
                        label='description' 
                        multiline
                        fullWidth
                        rows={10}
                        style={{marginTop: '2vh'}}
                        {...register('description')} 
                        defaultValue={queryData.data.description}
                        id='description' 
                        variant='filled' /> 

                        <mui.Button style={{marginTop: '2vh'}} type='submit' variant='contained'>
                            Submit
                        </mui.Button>

                        <Link href={`/Skills/${path}/view`}>
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