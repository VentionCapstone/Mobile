export type SelectedCards = {
  [key: string]: boolean;
};

type CollapsableCardsMap = {
  wherePressed: SelectedCards;
  whenPressed: SelectedCards;
  guestsPressed: SelectedCards;
};

export const COLLAPSABLE_CARDS_POSITIONS: CollapsableCardsMap = {
  wherePressed: {
    where: false,
    when: true,
    guests: true,
  },
  whenPressed: {
    where: true,
    when: false,
    guests: true,
  },
  guestsPressed: {
    where: true,
    when: true,
    guests: false,
  },
} as const;
