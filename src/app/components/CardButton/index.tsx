import { Button } from 'bloomer';
import * as React from 'react';

interface Props {
  card_text: string;
  handleClick: (event: any) => void;
}

const style = {
  height: '2.1em',
  margin: '0.05em',
  width: '2.1em'
};

export default function CardButton({ card_text, handleClick }: Props) {
  let isColor = 'white';
  if (card_text.includes('s')) {
    isColor = 'info';
  } else if (card_text.includes('o')) {
    isColor = 'danger';
  }

  return (
    <Button
      style={style}
      isColor={isColor}
      className="button"
      onClick={handleClick}
      value={card_text}
    >
      {card_text}
    </Button>
  );
}
