import { useNavigate } from 'react-router-dom'

const useAppNavigate = () => {
    const navigate = useNavigate()

    function appNavigate(route){
        if(route ==="/"){
            navigate(route)
            document.location.reload();
        }
        else navigate(route);
    }


    return appNavigate
}

export default useAppNavigate