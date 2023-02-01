import { Route} from "react-router-dom";
import { Route as AppRoute } from '../types';
import { PageDefault } from '../components/PageDefault';
import { ProtectedComponent } from "../components/ProtectedComponent";


export const AddRoute = ({ component: Component, ...route }: AppRoute) => {
 if(route.isAuthenticated){
       return (<Route key={route.key} path={route.path!} element={Component ? <ProtectedComponent>
           <Component/>
       </ProtectedComponent> : <PageDefault />} />)
    }
 
    return   <Route key={route.key} path={route.path!} element={Component ? <Component /> : <PageDefault />} />
};