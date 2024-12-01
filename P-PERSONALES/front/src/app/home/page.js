import {useHome} from "@/app/home/useHome";
export default function Home(){
    const home = useHome();
    return(
        <div>
            Hola
            {home.data}
        </div>
    )
}