import { NavigationListOption, NavigationListSection } from 'src/types/navigationList';

interface GetSectionsProps {
  options?: NavigationListOption[];
  sections?: NavigationListSection[];
}

const getSections = ({ options, sections }: GetSectionsProps): NavigationListSection[] => {
  if (sections) return sections;

  if (options) {
    return [
      {
        title: '',
        data: options,
      },
    ];
  }

  return [];
};

export { getSections };
