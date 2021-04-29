import * as React from 'react';
import { List } from 'react-native-paper';


const DrugsController = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section title="Accordions">
      
      <List.Accordion
        title="Filtres"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="Ibuprofène" />
        <List.Item title="Antalgique" />
      </List.Accordion>
    </List.Section>
  );
};

export default DrugsController;