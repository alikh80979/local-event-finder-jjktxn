
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Platform } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { events } from '@/app/data/events';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const event = events.find(e => e.id === id);

  console.log('EventDetailScreen - Event ID:', id);
  console.log('EventDetailScreen - Found event:', event);

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Event Not Found',
            headerShown: true,
            headerLeft: () => (
              <Pressable onPress={() => router.back()} style={styles.backButton}>
                <IconSymbol name="chevron.left" color={colors.text} size={24} />
              </Pressable>
            ),
          }}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Event not found</Text>
          <Pressable style={styles.backToHomeButton} onPress={() => router.push('/(tabs)/(home)')}>
            <Text style={styles.backToHomeText}>Back to Events</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: event.title,
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <IconSymbol name="chevron.left" color={colors.text} size={24} />
            </Pressable>
          ),
        }}
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: event.imageUrl }} style={styles.eventImage} />
        
        <View style={styles.contentContainer}>
          <View style={styles.headerSection}>
            <Text style={styles.title}>{event.title}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{event.category}</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <IconSymbol name="calendar" color={colors.primary} size={20} />
              <Text style={styles.infoText}>{new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</Text>
            </View>

            <View style={styles.infoRow}>
              <IconSymbol name="clock" color={colors.primary} size={20} />
              <Text style={styles.infoText}>{event.time}</Text>
            </View>

            <View style={styles.infoRow}>
              <IconSymbol name="location" color={colors.primary} size={20} />
              <Text style={styles.infoText}>{event.location}</Text>
            </View>

            <View style={styles.infoRow}>
              <IconSymbol name="map" color={colors.primary} size={20} />
              <Text style={styles.infoText}>{event.distance} miles away</Text>
            </View>

            {event.price && (
              <View style={styles.infoRow}>
                <IconSymbol name="dollarsign" color={colors.primary} size={20} />
                <Text style={styles.infoText}>{event.price}</Text>
              </View>
            )}
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About This Event</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>

          <Pressable 
            style={styles.attendButton}
            onPress={() => {
              console.log('User interested in event:', event.title);
              // Here you could add logic to save the event to favorites or register interest
            }}
          >
            <Text style={styles.attendButtonText}>I'm Interested</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  eventImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  headerSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  categoryBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  categoryText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  descriptionSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  attendButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 0 : 100,
  },
  attendButtonText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  backToHomeButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backToHomeText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
});
