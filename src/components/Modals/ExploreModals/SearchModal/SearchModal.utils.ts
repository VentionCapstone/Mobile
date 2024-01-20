export type SelectedCards = {
  [key: string]: boolean;
};

type CollapsableCardsMap = {
  wherePressed: SelectedCards;
  whenPressed: SelectedCards;
};

export const COLLAPSABLE_CARDS_POSITIONS: CollapsableCardsMap = {
  wherePressed: {
    where: false,
    when: true,
  },
  whenPressed: {
    where: true,
    when: false,
  },
} as const;
