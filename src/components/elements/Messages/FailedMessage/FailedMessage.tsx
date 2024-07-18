import { Message, Icon, MessageContent } from 'semantic-ui-react';

export default function FailedMessage() {
  <Message icon id="bookers__message__success" compact color="red" size="small">
    <Icon name="check circle" size="small" />
    <MessageContent>
      Félicitations, votre compte O'Book Groove a bien été créé !
    </MessageContent>
  </Message>;

  return <FailedMessage />;
}
