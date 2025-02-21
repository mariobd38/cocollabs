import { Button } from '@mantine/core';

import slack_icon from '../../../assets/logos/slack_logo.png';

function SlackIcon(props) {
  return (
    <img src={slack_icon} alt="" style={{ width: '1.4rem', height: '1.4rem' }}/>
  );
}

export function SlackButton(props) {
  return <Button leftSection={<SlackIcon />} variant="default" {...props} />;
}
