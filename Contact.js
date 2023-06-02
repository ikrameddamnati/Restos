import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Contact = () => {
  const handlePhoneLink = () => {
    Linking.openURL('tel:+212674378874');
  };

  const handleEmailLink = () => {
    Linking.openURL('mailto:NEAR@info_gmail.com');
  };

  const handleLinkedInLink = () => {
    Linking.openURL('https://www.linkedin.com/');
  };

  const handleGitHubLink = () => {
    Linking.openURL('https://github.com/');
  };

  const handleInstagramLink = () => {
    Linking.openURL('https://www.instagram.com/');
  };

  return (
    <View>
      <Text style={styles.heading}>Contactez nous</Text>
      <View style={styles.buttonContainer}>
        <Icon.Button name="envelope" backgroundColor="#3b5998" onPress={handleEmailLink}>
          Email
        </Icon.Button>
        <Icon.Button name="phone" backgroundColor="#008000" onPress={handlePhoneLink}>
          Phone
        </Icon.Button>
        <Icon.Button name="linkedin" backgroundColor="#0e76a8" onPress={handleLinkedInLink}>
          LinkedIn
        </Icon.Button>
        <Icon.Button name="github" backgroundColor="#000000" onPress={handleGitHubLink}>
          GitHub
        </Icon.Button>
        <Icon.Button name="instagram" backgroundColor="#e4405f" onPress={handleInstagramLink}>
          Instagram
        </Icon.Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default Contact;
