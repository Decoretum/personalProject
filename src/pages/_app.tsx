import '../styles/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function MyApp({Component, pageProps}){
    let client = new QueryClient();
    return (
        <QueryClientProvider client={client}>
            <div style={{margin: '2vw', maxHeight: '400vh'}}>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <Component {...pageProps}/>
            </div>
        </QueryClientProvider>
    )
}