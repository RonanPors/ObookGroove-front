import { FormField, Button, Checkbox, Form, Segment, Header } from 'semantic-ui-react'

export default function SignUp (){
  return (
  <Segment inverted>
     <Header as='h1'>S'inscrire</Header>
    <Form inverted size='large'>
    <FormField >
      <label>email@domain.com</label>
      <input placeholder='email@domain.com' />
    </FormField>
    <FormField>
      <label>pseudo</label>
      <input placeholder='pseudo' />
    </FormField>
    <FormField>
      <label>Numéro de téléphone mobile</label>
      <input placeholder='Numéro de mobile' />
    </FormField>
    <FormField>
      <label>Password</label>
      <input placeholder='Password' />
    </FormField>
    <FormField>
      <label>Confirm password</label>
      <input placeholder='Confirm password' />
    </FormField>
    <FormField>
      <Checkbox label='I agree to the Terms and Conditions' />
    </FormField>
    <Button type='submit'>Créer un compte</Button>
   </Form>
  </Segment>
  
)
}
