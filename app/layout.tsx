import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'ACOM · Registro de cobros',description:'Registro de cobros y rendiciones de Animales de Compañía · Invetsa Bolivia',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>;}
