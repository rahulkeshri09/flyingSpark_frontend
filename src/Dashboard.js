
import {removeUser} from './action'; 
function Dashboard(props){
   
    const data=props.store.getState();
    //handle logout and clear redux
    const handleLogout=()=>{
        props.store.subscribe(() => {
            console.log("update");
          })
        props.store.dispatch(removeUser());
        props.setIsLoggedin(false);
    }
    return(
        <div className="flex flex-col display-data">
            <div className="logout-btn cursor-pointer" onClick={handleLogout}>
                Logout
            </div>
            <div>
                E-mail : {data.userData.email}
            </div>
            <div>
                Gender : {data.userData.gender}
            </div>
            <div className="flex">
                Hobbies : &nbsp;<div className="flex flex-col jtc-sp-around" >
                    {
                        data.userData.hobbies.map((data)=>{
                            return (<span style={{marginRight:20}}>{data}</span>)
                        })
                    }
                    </div>
            </div>
        </div>
    )
}
export default Dashboard;