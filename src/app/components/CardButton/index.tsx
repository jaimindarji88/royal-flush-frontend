import { Button } from 'bloomer';
import * as React from 'react';

interface Props {
  card_text: string;
  handleClick: (event: any) => void;
  selected?: boolean;
}

const style = {
  height: '2.1em',
  margin: '0.05em',
  width: '2.1em'
};

export default function CardButton({
  card_text,
  handleClick,
  selected
}: Props) {
  const bg = {
    backgroundColor: ''
  };
  let isColor = 'white';
  if (selected) {
    bg.backgroundColor = '#efeded';
  }
  if (card_text.includes('s')) {
    isColor = 'info';
    if (selected) {
      bg.backgroundColor = '#1382ce';
    }
  } else if (card_text.includes('o')) {
    isColor = 'danger';
    if (selected) {
      bg.backgroundColor = '#e4163e';
    }
  }

  return (
    <Button
      style={selected ? { ...style, ...bg } : style}
      isColor={isColor}
      className="button"
      onClick={handleClick}
      value={card_text}
    >
      {card_text}
    </Button>
  );
}
