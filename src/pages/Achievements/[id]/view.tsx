import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";

export default function View(){
    const pathname = usePathname();
    const digit = Number(pathname?.replace(/\D/g, ''))
    const aQuery = useQuery({
        queryKey: ['ach'],
        queryFn: async () => {
            return axios.get(`/api/achievements/${digit}/view`)
            .then(
                (res) => {
                    console.log(res);
                    return res;
                }
            )
        }
    })
    return(
        <Container>
            
        </Container>
    )
}