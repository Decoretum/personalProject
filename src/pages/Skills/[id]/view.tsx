import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import Info from "@/components/skills/info";
import { Button, List, ListItem, Grid } from "@mui/material";
import Link from "next/link";


export default function View(){
    const router = useRouter();
    let path = Number(router.query.id);

    const aQuery = useQuery({
        enabled: !isNaN(path),
        queryKey: ['ach'],
        queryFn: async () => {
            return axios.get(`/api/Skills/${path}/view`)
            .then(
                (res) => {
                    console.log(res.data.result[0])
                    return res.data.result[0];
                }
            )
        },
    })
    

    if (aQuery.isFetching){
        return <h1 style={{marginLeft: '2vw'}}> Retrieving Skill data </h1>
    }

    if (aQuery.isError){
        return <h1 style={{marginLeft: '2vw'}}> Failed to retrieve Skill data </h1>
    }

    if (aQuery.isSuccess) return (
        <>    
            <Grid container style={{}}>
                <Grid item>
                    <Info props={aQuery.data} />
                </Grid>

                <Grid item>
                    <Link href='/Skills' style={{position: 'absolute', right: '10vw'}}>
                        <Button variant='contained'> Back </Button>
                    </Link>
                </Grid>
                
            </Grid>
        </>
    )
}