import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, ActivityIndicator,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

import ImageView from '../NativeComponents/ImageView';
import ImagePickerModule from '../NativeModules/ImagePickerModule';
import Theme from '../Theme';
import FloatingOptions from '../Components/FloatingOptions';
import { useSchedule } from '../Context';
import CalendarModule from '../NativeModules/CalendarModule';

const Meet = ({ navigation }) => {
  const route = useRoute();
  const context = useSchedule();
  const { deleteEvent, addImage } = context;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: route.params.title });
  }, []);

  useEffect(() => {
    setImages(route.params.images);
  }, [route.params]);

  const getImageFromGallery = async () => {
    setLoading(true);
    try {
      const result = await ImagePickerModule.pickFromGallery();
      addImage(route.params.id, result);
      setImages((prev) => [...prev, result]);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const getImageFromCamera = async () => {
    setLoading(true);
    try {
      const result = await ImagePickerModule.pickFromCamera();
      addImage(route.params.id, result);
      setImages((prev) => [...prev, result]);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {
        loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Theme.backgroundB4} style={styles.loading} />
          </View>
        )
      }
      <ScrollView style={styles.scroll}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{route.params.description}</Text>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{route.params.location}</Text>
        <Text style={styles.label}>Start Date:</Text>
        <Text style={styles.value}>{route.params.init}</Text>
        <Text style={styles.label}>End Date:</Text>
        <Text style={styles.value}>{route.params.end}</Text>
        <View style={styles.imageContainer}>
          {
            images.map((item, index) => (
              <ImageView
                style={styles.image}
                key={index}
                src={{ uri: item }}
              />
            ))
          }
        </View>
      </ScrollView>
      {
        !loading
        && (
          <FloatingOptions
            items={[
              {
                icon: 'camera',
                onPress: getImageFromCamera,
              },
              {
                icon: 'paperclip',
                onPress: getImageFromGallery,
              }, {
                icon: 'calendar',
                onPress: () => {
                  const {
                    title, location, init, end,
                  } = route.params;
                  CalendarModule.createEvent(title, location, init, end);
                },
              },
              {
                icon: 'trash',
                onPress: () => {
                  deleteEvent(route.params);
                  navigation.goBack();
                },
              },
            ]}
          />
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.backgroundB2,
  },
  label: {
    color: Theme.text,
    fontWeight: 'bold',
    marginVertical: '2%',
  },
  value: {
    color: Theme.text,
    fontSize: 16,
    marginLeft: '10%',
  },
  loading: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: '60%',
  },
  loadingContainer: {
    backgroundColor: 'white',
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    opacity: 0.3,
  },
  imageContainer: {
    alignItems: 'center',
    margin: '5%',
  },
  image: {
    height: 300,
    width: 300,
    margin: '2%',
  },
  scroll: {
    padding: '4%',
  },
});
export default Meet;
