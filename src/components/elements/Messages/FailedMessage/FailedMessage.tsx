import { Message, Icon, MessageContent } from 'semantic-ui-react';
import { useAppSelector } from '../../../../hooks/redux';

export default function FailedMessage() {
  const { error } = useAppSelector((store) => store.books);

  return (
    <Message
      icon
      id="bookers__message__failed"
      compact
      color="red"
      size="small"
    >
      <Icon name="check circle" size="small" />
      <MessageContent>
        Suite à cette erreur : {error}. Merci d&apos;associer à nouveau votre
        compte Spotify.
      </MessageContent>
    </Message>
  );
}
