import {useState, useEffect} from 'react';
import {Button, Form, Grid, Loader} from "semantic-ui-react"
import {useRouter} from "next/router"

const CreateForm = () => {
    const [newForm, setNewForm] = useState({
        id: "",
        first: "",
        last: "",
        email: "",
        phone: "",
        address: ""
    });

    const {id, first, last, email, phone, address} = newForm;

    const {push, query} = useRouter();
    const [isSubmit, setIsSubmit] = useState(false);
    const [errors, setErrors] = useState({});

    const getForm = async () => {
        const response = await fetch(`http://localhost:3000/api/forms/${query.id}`);
        const data = await response.json();
        setNewForm({ id: data.id, first: data.first, last: data.last, email: data.email, phone: data.phone, address: data.address});
    };

    useEffect(() => {
        if (query.id) getForm();
    }, [query.id]);

    const validate = () => {
        let errors = {};
        if(!id) {
            errors.id = "ID is Required"
        }
        if(!first) {
            errors.first = "First Name is Required"
        }
        if(!last) {
            errors.last = "Last Name is Required"
        }
        if(!email) {
            errors.email = "Email is Required"
        }
        if(!phone) {
            errors.phone = "Phone is Required"
        }
        if(!address) {
            errors.address = "Address is Required"
        }
        return errors
    }

    const heandleSubmit = async (e) => {
        e.preventDefault();
        let errors = validate();

        if (Object.keys(errors).length) return setErrors(errors);
        setIsSubmit(true);
        if (query.id) {
            await updateForm();
        } else {
            await createForm();
        }
        await createForm();
        await push("/");
    };

    const updateForm = async () => {
        try {
            await fetch(`http://localhost:3000/api/forms/${query.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newForm)
            });
        } catch (error) {
            console.log(error);
        }
    };

    const createForm = async () => {
        try {
            await fetch("http://localhost:3000/api/forms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newForm)
            });
        } catch (error) {
            console.log(error);
        }
    };
    const handleChange =(e) => {
        const { name, value } = e.target;
        setNewForm({ ...newForm, [name]: value });
    };
  return (
      <Grid centered verticalAlign='middle' columns="6" style={{height: "80vh"}}>
          <Grid.Row>
          <Grid.Column textAlign='center'>
              <div>
                  <h1>{query.id ? "Update Form" : "Create Form"}</h1>
                  <div>
                      {isSubmit ? (<Loader active inline="centered" />):(
                          <Form onSubmit={heandleSubmit}>
                            <Form.Input 
                            error={
                                errors.id ? {content: "Please Enter ID"} : null
                            }
                            label="ID" 
                            placeholder="Enter ID" 
                            name="id" 
                            onChange={handleChange}
                            value={id}
                            autoFocus
                            />
                            <Form.Input
                            error={
                                errors.first ? {content: "Please Enter First Name"} : null
                            }
                            label="First Name" 
                            placeholder="Enter First Name" 
                            name="first" 
                            onChange={handleChange}
                            value={first}
                            autoFocus
                            />
                            <Form.Input
                            error={
                                errors.last ? {content: "Please Enter Last Name"} : null
                            }
                            label="Last Name" 
                            placeholder="Enter Last Name" 
                            name="last" 
                            onChange={handleChange}
                            value={last}
                            autoFocus
                            />
                            <Form.Input
                            error={
                                errors.email ? {content: "Please Enter Email"} : null
                            }
                            label="Email" 
                            placeholder="Enter Email" 
                            name="email" 
                            onChange={handleChange}
                            value={email}
                            autoFocus
                            />
                            <Form.Input
                            error={
                                errors.phone ? {content: "Please Enter Phone"} : null
                            }
                            label="Phone" 
                            placeholder="Enter Phone" 
                            name="phone" 
                            onChange={handleChange}
                            value={phone}
                            autoFocus
                            />
                            <Form.Input
                            error={
                                errors.address ? {content: "Please Enter Address"} : null
                            }
                            label="Address" 
                            placeholder="Enter Address" 
                            name="address" 
                            onChange={handleChange}
                            value={address}
                            autoFocus
                            />
                            <Button type='submit' primary>
                                {query.id ? "Update" : "Submit"}
                            </Button>
                          </Form>
                      )}
                  </div>
              </div>
          </Grid.Column>
          </Grid.Row>
      </Grid>
  );
};

export default CreateForm;
