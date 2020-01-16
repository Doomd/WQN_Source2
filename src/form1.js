import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { withRouter } from 'react-router-dom';
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";

const Step1 = props => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwbrIjWVJfPDC4AZGHmopV3sDXDRvrZ7BniEVP2shUn0EjJDFV9/exec' //Production URL
    //const scriptURL = "https://script.google.com/macros/s/AKfycbzpbG1CcPH5y7BGW6cJ5r2VivimxL7EQl96RBx8Cp6qRj1MW7zm/exec" //Test URL https://docs.google.com/spreadsheets/d/1CoQ2ZOVJLT9U9OkgdEvxuX3vNg-wZwLjbOEYr0Ivfhc/edit#gid=0
    const { register, handleSubmit, errors } = useForm({
        mode: "onBlur"
    });
    const { action, state } = useStateMachine(updateAction);
    const [submitBut, setsubmitBut] = useState(false);

    const onSubmit = (data, e) => {
        e.preventDefault();
        action(data)
        console.log('Submit event', e)
        //alert(JSON.stringify(data))
        var form_data = new FormData();
        for (var key in data) {
            form_data.append(key, data[key]);
        }
        setsubmitBut(true)
        fetch(scriptURL, { method: 'POST', body: form_data })
            .then(response => success(data, response))
            .catch(error => fuckup(error))
    };

    function success(data, response) {
        console.log('Success!', response);
        //React Hook Form Wizard https://codesandbox.io/s/form-wizard-pages-kkg7m
        props.history.push("./form2")
    }

    function fuckup(error) {
        console.error('Error!', error.message);
        setsubmitBut(false)
        alert("Something Screwed Up. Please Try Again.");
    }
    return (

        <div id="form-page-1" className="form-page-1">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-header"><h2>Get A Personalized Quote Today!</h2></div>
                <h3 hidden>Form Page 1</h3>


                <div className="form-group">
                    <div className="row">

                        <div className="col-md-4">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                id="firstName" name="firstName" type="text" placeholder="Alex"
                                className="form-control input-md" ref={register({ required: true })}
                                defaultValue={state.data.firstName}
                            />
                            {errors.firstName && <div className="form_error">First Name is required</div>}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                id="lastName" name="lastName" type="text" placeholder="Smith" className="form-control input-md"
                                ref={register({ required: true })}
                                defaultValue={state.data.lastName}
                            />
                            {errors.lastName && <div className="form_error">Last Name is required</div>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="dob" style={{ display: 'block' }}>Date of Birth</label>
                            <input id="dob" name="dob" type="date" placeholder="MM/DD/YYYY" className="form-control input-md"
                                ref={register({ required: true })}
                                defaultValue={state.data.dob}
                            />
                            {errors.dob && <div className="form_error">Please Enter a valid birth date (mm/dd/yyyy)</div>}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-8">
                            <label htmlFor="address" style={{ display: 'block' }}>Address</label>
                            <input id="address" name="address" type="text" placeholder="Address" className="form-control input-md"
                                ref={register({ required: true })}
                                defaultValue={state.data.address}
                            />
                            {errors.address && <div className="form_error">Please enter your address</div>}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="address2" style={{ display: 'block' }}>Unit/Apt</label>
                            <input id="address2" name="address2" type="text" placeholder="Unit/Apt" className="form-control input-md"
                                ref={register({ required: false })}
                                defaultValue={state.data.address2}
                            />
                            {errors.address2 && <div className="form_error">Please enter your unit/apt number</div>}
                        </div>

                    </div>
                </div>


                <div className="form-group">
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="city" style={{ display: 'block' }}>City</label>
                            <input id="city" name="city" type="text" placeholder="City" className="form-control input-md"
                                ref={register({ required: true })}
                                defaultValue={state.data.city}
                            />
                            {errors.city && <div className="form_error">Please enter your city</div>}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="state" style={{ display: 'block' }}>State</label>
                            <select id="state" name="state" className="custom-select"
                                ref={register({ required: true, minLength: 1 })}
                                defaultValue={state.data.state || ""}
                            >
                                <option value="">Please Select</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV" selected>Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                            {errors.state && <div className="form_error">Please choose a state</div>}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="zip" style={{ display: 'block' }}>Zip Code:</label>
                            <input id="zip" name="zip" type="text" placeholder="Zip Code" className="form-control input-md"
                                ref={register({ required: true, minLength: 5, maxLength: 5 })}
                                defaultValue={state.data.zip}
                            />
                            {errors.zip && <div className="form_error">Please enter a 5-digit zip code</div>}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-5">
                            <label htmlFor="insured" style={{ display: 'block' }}>Are you currently insured?</label>
                            <div className="radio-group">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="insured" id="insured-0" value="Yes"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.insured === "Yes"}
                                    />
                                    <label className="form-check-label " htmlFor="insured-0"> I'm Currently Insured</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="insured" id="insured-1" value="No"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.insured === "No"}
                                    />
                                    <label className="form-check-label" htmlFor="insured-1"> I'm NOT Insured</label>
                                </div>
                            </div>
                            {errors.insured && <div className="form_error">Insurance Status is required</div>}
                        </div>

                        <div className="col">
                            <label className="control-label" htmlFor="interest" >How can we help you?</label>
                            <div className="radio-group">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input interest" type="radio" name="interest" id="interest-0" value="1"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.interest === "1"}
                                    />
                                    <label className="form-check-label" htmlFor="interest-0">I want to save money on insurance.</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input interest" type="radio" name="interest" id="interest-1" value="2"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.interest === "2"}
                                    />
                                    <label className="form-check-label interest" htmlFor="interest-1">I want better insurance.</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input className="form-check-input interest" type="radio" name="interest" id="interest-2" value="3"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.interest === "3"}
                                    />
                                    <label className="form-check-label" htmlFor="interest-2">I'm want personalized service.</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="interest" id="interest-3" value="4"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.interest === "4"}
                                    />
                                    <label className="form-check-label" htmlFor="interest-3">I'm just curious.</label>
                                </div>
                            </div>
                            {errors.interest && <div className="form_error">Please choose how we can help</div>}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="phone">Phone Number</label>
                            <input id="phone" name="phone" type="text" placeholder="702-555-5555" className="form-control input-md"
                                ref={register({
                                    required: true,
                                    pattern: /^([+]?[1]?[-.\s]?)([(]?)([2-9]\d{2})([)]?[-.\s]?)(\d{3})([-.\s]?)(\d{4})$/
                                })}
                                onBlur={e => {
                                    const value = e.target.value;
                                    const phoneRegex = /^([+]?[1]?[-.\s]?)([(]?)([2-9]\d{2})([)]?[-.\s]?)(\d{3})([-.\s]?)(\d{4})$/;
                                    if (phoneRegex.test(value)) {
                                        var normalizedNum = value.replace(phoneRegex, "$3-$5-$7");
                                        //alert("The formatted Phone Number is: " + normalizedNum);
                                        e.target.value = normalizedNum;
                                    } else {
                                        //alert("phone number wasn't valid! (" + normalizedNum + ")");
                                    }
                                }}
                                defaultValue={state.data.phone}
                            />
                            {errors.phone && <div className="form_error">Please Enter a valid US phone number</div>}
                        </div>
                        <div className="col-md-4">

                            <label htmlFor="email">Email</label>
                            <input
                                id="email" name="email" type="email" placeholder="your@emailaddress.com" className="form-control input-md"
                                ref={register({
                                    required: true,
                                    pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
                                })}
                                defaultValue={state.data.email}
                            />
                            {errors.email && <div className="form_error">Please Enter a Valid Email address</div>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="contactMethod">How would you like to be contacted?</label>
                            <div className="radio-group">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="contactMethod" id="contactMethod-email" value="email"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.contactMethod === "email"}
                                    />
                                    <label className="form-check-label" htmlFor="contactMethod-email">Email</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="contactMethod" id="contactMethod-phone" value="phone"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.contactMethod === "phone"}
                                    />
                                    <label className="form-check-label" htmlFor="contactMethod-phone">Phone Call</label>
                                </div>
                            </div>
                            {errors.contactMethod && <div className="form_error">Please choose how you'd prefer to be contacted</div>}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">

                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col text-center">
                            <button id="submit" name="submit" className="btn btn-primary" type="submit" disabled={submitBut} >{submitBut ? 'Sending...' : 'Get a Quote'}</button>
                            <div className="submit-message" hidden={!submitBut} >We're processing the first page...</div>
                        </div>
                    </div>
                </div>

            </form>
        </div>

    )
}

export default withRouter(Step1);