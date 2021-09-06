import React, { Component} from "react";

import "./CreateAccount.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);


const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,    
      email: null,
      password: null,
      describe: null,
      hidden: true,
      password: '',
      formErrors: {
        firstName: "",        
        email: "",
        password: ""
      },
      isLocked: false
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }
  componentDidMount() {
    if (this.props.password) {
      this.setState({ password: this.props.password });
    }
  }

  // checkform(){
  //   if(
  //     this.state.firstName != null && 
  //     this.state.email != null &&
  //     !emailRegex.test(this.state.email)
  //     && this.state.password != null)
  //     {
  //       this.setState({isLocked: true});
  //       console.log(this.state)
  //     };
  // }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}       
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 5 ? "Minimum 5 characters" : "";
        break;
     
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Please enter a valid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 8 ? "Minimum 8 characters" : "";
        break;
      case "describe":
        formErrors.describe = 
          value === "none" ? "Select": "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => this.state);
    console.log(value, ':', this.state)
    if (this.state.firstName == null ){
      this.setState({isLocked: false});
    }
    else if (this.state.email == null || !emailRegex.test(this.state.email)){
      this.setState({isLocked: false});
    }
    else if (this.state.password == null){
      this.setState({isLocked: false});
    }
    else if (value === null || value === ""){
      this.setState({isLocked: false});
    }
    else{
      this.setState({isLocked: true});
    };
    // this.checkform();
  };



  render() {
    const { formErrors } = this.state;
    const lockedStyle = {
      backgroundColor: "#286EFA",
      border: '1px solid #286EFA', 
      color: "#FFFFFF",
    };

    const unlockedStyle = {
      backgroundColor: "#EDEDED",
      border: '1px solid #EDEDED',       
      color: "#AAAAAA",
    };

    return (

      <div className="wrapper">
        <div className="form-wrapper">
         
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="input_group firstName">
            
              <input
                className= {formErrors.firstName.length > 0 ? "error" : null}
                // placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                required
                onChange={this.handleChange}
              />
                <label htmlFor="firstName" className={formErrors.firstName.length > 0 ? "error" : null}>Your name</label>
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="input_group email">
             
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                // placeholder="Email"
                type="email"
                name="email"
                noValidate
                required
                onChange={this.handleChange}
              />
               <label htmlFor="email" className={formErrors.email.length > 0 ? "error" : null}>Email address</label>
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>

            <div className="firstName describe">          
               <select name="describe" onChange={this.handleChange} id="selectBox">   
                  <option value="none">I would describe my user type as</option>
                  <option value="developer">Developer</option>
                  <option value="design">Design</option>
               </select>
            </div>        
           
            <div className="input_group password">
           
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                // placeholder="Password"
                type={this.state.hidden ? 'password' : 'text'}
                name="password"
                noValidate
               
                onChange={this.handleChange}
              />
              <label htmlFor="password" className={formErrors.password.length > 0 ? "error" : null}>Password</label>
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
              <button className="passwordBtn" onClick={this.toggleShow}><i className="fas fa-eye"></i></button>
            </div>
            <div className="createAccount">
              {/* {console.log(this.state.isLocked)} */}
              <button style={this.state.isLocked ? lockedStyle : unlockedStyle} type="submit">Next</button>
             
            </div>
          </form>
        </div>
      </div>
    
     
    );
  }
}

export default CreateAccount;