import * as React from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import profile from './assets/gericht.png';
import home from './assets/home.png';
import search from './assets/search.png';
import menu from './assets/menu.png';
import close from './assets/close.png';
import AboutUs from './AboutUs'; // Import the AboutUs component
import Search  from './Search';
import Footer from './Footer';
export default function App() {
  const [currentTab, setCurrentTab] = React.useState("Home");
  const [showMenu, setShowMenu] = React.useState(false);
  const offsetValue = React.useRef(new Animated.Value(0)).current;
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const closeButtonOffset = React.useRef(new Animated.Value(0)).current;

  const renderTabContent = () => {
    if (currentTab === "Home") {
      return (
        <React.Fragment>
          <AboutUs />
          <Footer />
        </React.Fragment>
      );
    } else if (currentTab === "Search") {
      return (
        <React.Fragment>
          <Search />
          <Footer />
        </React.Fragment>
      );
    }  else {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
        <Image source={profile} style={{ width: 200, height: 60, borderRadius: 10, marginTop: 60 }} />
        <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'black', marginTop: 20 }}>Bienvenue</Text>
        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {TabButton(currentTab, setCurrentTab, "Home", home)}
          {TabButton(currentTab, setCurrentTab, "Search", search)}
          
        </View>
      </View>

      <Animated.View
        style={{
          flexGrow: 1,
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 15,
          paddingVertical: 20,
          borderRadius: showMenu ? 15 : 0,
          transform: [{ scale: scaleValue }, { translateX: offsetValue }],
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true,
            }).start();

            Animated.timing(offsetValue, {
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true,
            }).start();

            Animated.timing(closeButtonOffset, {
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true,
            }).start();

            setShowMenu(!showMenu);
          }}
        >
          <Image
            source={showMenu ? close : menu}
            style={{ width: 20, height: 20, tintColor: 'red', marginTop: 60 }}
          />
        </TouchableOpacity>

        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black', paddingTop: 20 }}>{currentTab}</Text>

        {renderTabContent()}

      </Animated.View>
    </SafeAreaView>
  );
}

const TabButton = (currentTab, setCurrentTab, title, image) => {
  return (
    <TouchableOpacity onPress={() => {
      if (title === "LogOut") {
        // Do your Stuff...
      } else {
        setCurrentTab(title);
      }
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab === title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={image} style={{
          width: 25, height: 25,
          tintColor: currentTab === title ? "#5359D1" : "white"
        }} />

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab === title ? "#5359D1" : "white"
        }}>{title}</Text>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5359D1',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
