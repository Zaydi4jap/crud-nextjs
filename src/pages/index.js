import {Button, Card, Container, Grid} from "semantic-ui-react"
import Link from "next/link";
import {useRouter} from "next/router";

export default function Home({forms = []}) {
  const router = useRouter();
  if(forms.length === 0){
    return (
      <Grid centered verticalAlign="middle" columns="1" style={{height: "80vh"}}>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>There are no forms present. Please Create a new one</h1>
            <div>
              <Button primary onClick={() => router.push("/forms/new")}>
                Create Form
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
  return (
    <Container>
      <Card.Group itemsPerRow={4}>
        {forms && forms.map((form) => (
          <Card key={form._id}>
            <Card.Content>
              <Card.Header>
                <Link href={`/forms/${form._id}`}>
                  <a>{form.id}</a>
                </Link>
              </Card.Header>
              <p>{form.first}</p>
              <p>{form.last}</p>
              <p>{form.email}</p>
              <p>{form.phone}</p>
              <p>{form.address}</p>
            </Card.Content>
            <Card.Content extra>
            <Button 
                color="orange"
                onClick={() => router.push(`/forms/${form._id}`)}
              >
                View
              </Button>
              <Button 
                color="blue"
                onClick={() => router.push(`/forms/${form._id}/edit`)}
              >
                Edit
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  )
}

export async function getServerSideProps(){
  const response = await fetch("http://localhost:3000/api/forms");
  const forms = await response.json();

  return {
    props: {
      forms,
    },
  };
}