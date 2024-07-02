import { FormField, Button, Checkbox, Form, Segment, Header } from 'semantic-ui-react'
import './SignUp.scss';

export default function SignUp (){
  return (
  <Segment inverted className='Segment__SignUp'>
        <Form inverted size='large' className='Form__SignUp'>
        <Header inverted as='h1' className='h1__header'>Créer un compte</Header>
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
