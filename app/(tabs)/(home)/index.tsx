
import React, { useState, useMemo } from "react";
import { Stack, router } from "expo-router";
import { 
  ScrollView, 
  Pressable, 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  Platform,
  TextInput
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/styles/commonStyles';
import { events, eventCategories, Event } from '@/app/data/events';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxDistance, setMaxDistance] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  console.log('HomeScreen - Current filters:', { selectedCategory, maxDistance, searchQuery });

  const filteredEvents = useMemo(() => {
    const filtered = events.filter(event => {
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      const matchesDistance = event.distance <= maxDistance;
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesDistance && matchesSearch;
    });
    
    console.log('Filtered events count:', filtered.length);
    return filtered;
  }, [selectedCategory, maxDistance, searchQuery]);

  const renderEventCard = (event: Event) => (
    <Pressable
      key={event.id}
      style={styles.eventCard}
      onPress={() => {
        console.log('Navigating to event:', event.id);
        router.push(`/event/${event.id}`);
      }}
    >
      <Image source={{ uri: event.imageUrl }} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventTitle} numberOfLines={2}>{event.title}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(event.category) }]}>
            <Text style={styles.categoryText}>{event.category}</Text>
          </View>
        </View>
        
        <View style={styles.eventInfo}>
          <View style={styles.infoRow}>
            <IconSymbol name="calendar" color={colors.textSecondary} size={16} />
            <Text style={styles.infoText}>
              {new Date(event.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <IconSymbol name="clock" color={colors.textSecondary} size={16} />
            <Text style={styles.infoText}>{event.time}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <IconSymbol name="map" color={colors.textSecondary} size={16} />
            <Text style={styles.infoText}>{event.distance} mi</Text>
          </View>
        </View>
        
        <Text style={styles.eventDescription} numberOfLines={2}>
          {event.description}
        </Text>
        
        {event.price && (
          <Text style={styles.eventPrice}>{event.price}</Text>
        )}
      </View>
    </Pressable>
  );

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'Music': colors.primary,
      'Sports': colors.secondary,
      'Arts': colors.accent,
      'Food': '#4CAF50',
      'Technology': '#9C27B0',
      'Business': '#607D8B',
      'Health': '#FF5722',
      'Education': '#795548',
      'Entertainment': '#E91E63'
    };
    return colorMap[category] || colors.primary;
  };

  const renderCategoryFilter = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.categoryContainer}
      contentContainerStyle={styles.categoryContent}
    >
      {eventCategories.map((category) => (
        <Pressable
          key={category}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.categoryButtonActive
          ]}
          onPress={() => {
            console.log('Category selected:', category);
            setSelectedCategory(category);
          }}
        >
          <Text style={[
            styles.categoryButtonText,
            selectedCategory === category && styles.categoryButtonTextActive
          ]}>
            {category}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );

  const renderDistanceFilter = () => (
    <View style={styles.distanceContainer}>
      <Text style={styles.filterLabel}>Distance: {maxDistance} miles</Text>
      <View style={styles.distanceButtons}>
        {[5, 10, 25, 50].map((distance) => (
          <Pressable
            key={distance}
            style={[
              styles.distanceButton,
              maxDistance === distance && styles.distanceButtonActive
            ]}
            onPress={() => {
              console.log('Distance selected:', distance);
              setMaxDistance(distance);
            }}
          >
            <Text style={[
              styles.distanceButtonText,
              maxDistance === distance && styles.distanceButtonTextActive
            ]}>
              {distance}mi
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Local Events",
          headerShown: Platform.OS === 'ios',
        }}
      />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Events</Text>
        <Text style={styles.headerSubtitle}>Find exciting events happening near you</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <IconSymbol name="magnifyingglass" color={colors.textSecondary} size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={(text) => {
              console.log('Search query changed:', text);
              setSearchQuery(text);
            }}
          />
        </View>
      </View>

      {renderCategoryFilter()}
      {renderDistanceFilter()}

      <ScrollView 
        style={styles.eventsContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.eventsContent,
          Platform.OS !== 'ios' && styles.eventsContentWithTabBar
        ]}
      >
        <Text style={styles.resultsText}>
          {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
        </Text>
        
        {filteredEvents.map(renderEventCard)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.text,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  categoryButtonTextActive: {
    color: colors.card,
  },
  distanceContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  distanceButtons: {
    flexDirection: 'row',
  },
  distanceButton: {
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  distanceButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  distanceButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  distanceButtonTextActive: {
    color: colors.card,
  },
  eventsContainer: {
    flex: 1,
  },
  eventsContent: {
    paddingHorizontal: 20,
  },
  eventsContentWithTabBar: {
    paddingBottom: 100,
  },
  resultsText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
    fontWeight: '500',
  },
  eventCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    marginRight: 12,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: colors.card,
    fontSize: 12,
    fontWeight: '600',
  },
  eventInfo: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  eventPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
