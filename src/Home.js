import {useState} from 'react';
import axios from 'axios';
import qs from 'qs';
import {addUser} from './action';
function Home(props){
    const [loginForm,setLoginForm]=useState(true);
    const [isChecked,setIschecked]=useState(new Array(4).fill(false));
    //open the log in form
    const openLoginForm=()=>{
        var loginBtn=document.getElementsByClassName("login-signup-btn");
        loginBtn[0].classList.add("active");
        loginBtn[1].classList.remove("active");
        setLoginForm(true);
        //reset form 
        document.resetForm?.reset();
    }
    //open sign up form
    const openSignupForm=()=>{
        var signupBtn=document.getElementsByClassName("login-signup-btn");
        signupBtn[1].classList.add("active");
        signupBtn[0].classList.remove("active");
        setLoginForm(false);
        //reset form 
        document.resetForm?.reset();
    }
    //handle sign up action
    const handleSignup=((e)=>{
        //prevent from refreshing the page
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;
        const test=e.target.hobby1.value;
        //store hobies
        var hobbies=[];
        //check which hobby is checkd
        for(let i=1;i<=4;i++){
            if(isChecked[i-1]){
                hobbies.push(e.target["hobby"+i].value);
            }
        }
        const gender=e.target.gender.value;
        var body={
            email:email,
            password:password,
            hobbies:hobbies,
            gender:gender
        }
        axios({
            method: "post",
            url: "http://localhost:8000/signup",
            data: qs.stringify(body),
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
            .then(function (response) {
              //handle success
              window.alert(response.data.message);
            })
            .catch(function (response) {
              //handle error
              window.alert("server error");
            });
            //reset form 
            document.resetForm?.reset();
    })
    //handle log in action
    const handleLogin=((e)=>{
        //prevent from refreshing the page
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;
        var body={
            email:email,
            password:password,
        }
        axios({
            method:"post",
            url:'http://localhost:8000/login',
            data:qs.stringify(body),
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res)=>{
            if(!res.data.user){
                // when user credentila is wrong
                window.alert("wrong user id or password");
                return;
            }
            // send data to redux
            props.store.subscribe(() => {
                console.log("update");
              })
            props.store.dispatch(addUser(res.data));
            props.setIsLoggedin(res.data.user);
        })
        .catch(function(res){
            window.alert("server error");
        })
        //reset form 
        document.resetForm?.reset();
    })
    //handle checkbox 
    const handleCheckbox=(index)=>{
        var arr=[...isChecked];
        arr[index]=!(arr[index]);
        setIschecked(arr);
    }
    return(
        <div className="login-signup-container">
            {/*---------login sign up main button */}
            <div className="flex jtc-sp-around">
                <div className="login-signup-btn cursor-pointer active" onClick={openLoginForm}>
                    Login
                </div>
                <div className="login-signup-btn cursor-pointer" onClick={openSignupForm}>
                    SignUp
                </div>
            </div>
            {/*-----------login sign up form---------- */}
            {
                
                loginForm?
                <div className="login-form">
                    <form action="#"className="flex flex-col" onSubmit={handleLogin} name="resetForm">
                        <input type="email" name="email" placeholder="Enter email" required/>
                        <input type="password" name="password" placeholder="Enter password" required/>
                        <button>
                            Submit
                        </button>
                    </form>
                </div>
                :
                <div>
                    <form action="#"className="flex flex-col" onSubmit={handleSignup} name="resetForm">
                        <input type="email" name="email" placeholder="Enter email" required/>
                        <input type="password" name="password" placeholder="Enter password" required/>
                        <h3 style={styles.selectHobbies}><u>Select hobbies</u></h3>
                        <div className="flex jtc-sp-around" style={{width:"80%",margin:"auto"}}>
                            <label>Reading</label>
                            <input 
                                className="checkbox-style"
                                type="checkbox" 
                                name="hobby1" 
                                value="reading" 
                                checked={isChecked[0]}
                                onChange={()=>handleCheckbox(0)}
                            />
                            <label>Travelling</label>
                            <input 
                                className="checkbox-style" 
                                type="checkbox" name="hobby2" 
                                value="travelling" 
                                checked={isChecked[1]}
                                onChange={()=>handleCheckbox(1)}
                            />
                            <label>Singing</label>
                            <input 
                                className="checkbox-style" 
                                type="checkbox" 
                                name="hobby3" 
                                value="singing" 
                                checked={isChecked[2]}
                                onChange={()=>handleCheckbox(2)}
                            />
                            <label>Dancing</label>
                            <input 
                                className="checkbox-style" 
                                type="checkbox" 
                                name="hobby4" 
                                value="dancing" 
                                checked={isChecked[3]}
                                onChange={()=>handleCheckbox(3)}
                            />
                        </div>
                        <h2 style={styles.selectHobbies}>
                            <u>Gender</u>
                        </h2>
                        <div className="flex jtc-sp-around" style={{width:"80%",margin:"auto"}}>
                            <label>Male</label>
                            <input style={{width:20,marginTop:10}}type="radio" name="gender" value="male" required/>
                            <label>Female</label>
                            <input style={{width:20,marginTop:10}}type="radio" name="gender" value="female" required/>
                        </div>
                        <button>
                            Submit
                        </button>
                    </form>
                </div>
            }
        </div>
    );
}
const styles={
    selectHobbies:{
        marginLeft:50,
        color:"white"
    }
}
export default Home;