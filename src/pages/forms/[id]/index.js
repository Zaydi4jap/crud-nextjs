import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Grid, Card } from 'semantic-ui-react';
import Error from 'next/error';

const Form = ({form, error}) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const {push, query} = useRouter();

    const deleteForm = async () => {
        const {id} = query;
        try {
            await fetch(`http://localhost:3000/api/forms/${id}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.log(error);
        }
    }
    const open = () => setConfirm(true);
    const close = () => setConfirm(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        await deleteForm();
        await push("/");
        close();
    }

    if (error && error.statusCode) {
        return <Error statusCode={error.statusCode} title={error.statusText} />
    }

    return (
        <Grid
        centered
        verticalAlign='middle'
        columns="1"
        style={{height: "80vh"}}
        >
            <Grid.Row>
                <Grid.Column textAlign='center'>
                    <Card centered>
                        <Card.Content>
                        <Card.Header>{form.id}</Card.Header>
                        <Card.Description>{form.first}</Card.Description>
                        <Card.Description>{form.last}</Card.Description>
                        <Card.Description>{form.email}</Card.Description>
                        <Card.Description>{form.phone}</Card.Description>
                        <Card.Description>{form.address}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button color='red' onClick={open} loading={isDeleting}>
                                Delete
                            </Button>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid.Row>
            <Confirm 
            content="Are you sure to delete form ?" 
            header="Please Confirm"
            open={confirm}
            onConfirm={handleDelete}
            onCancel={close}
            />
        </Grid>
    );

};

export async function getServerSideProps({ query: { id } }) {
    const res = await fetch(`http://localhost:3000/api/forms/${id}`);
    if (res.status === 200) {
        const form = await res.json();
        return {
            props: {
                form,
            },
        };
    }

    return {
        props: {
            error: {
                statusCode: res.status,
                statusText: "Invalid ID"
            },
        },
    };
}

export default Form;