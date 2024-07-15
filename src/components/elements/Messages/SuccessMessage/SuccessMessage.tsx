import {
    
    Message,
    Icon,
    MessageContent,
    
  } from 'semantic-ui-react';


  export default function SuccessMessage () {

    <Message
         icon
         id="bookers__message__success"
         compact
         color="green"
         size="small">
         <Icon name="check circle" size="small" />
         <MessageContent>
          Félicitations, votre compte O'Book Groove a bien été créé !
         </MessageContent>
    </Message>

    return (
        <SuccessMessage />
    )

}

